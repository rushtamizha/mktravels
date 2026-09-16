"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

/**
 * Location field backed by Google Places Autocomplete through our own
 * `/api/places/autocomplete` proxy — no Maps JS SDK is loaded in the browser.
 *
 * It degrades to a plain text input when the API key is absent or the
 * request fails, so a booking can always be completed.
 */
export default function PlaceInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon = MapPin,
  id: providedId,
}) {
  const reactId = useId();
  const id = providedId ?? reactId;
  const listboxId = `${id}-listbox`;

  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const sessionTokenRef = useRef(null);
  // Set when the user picks a suggestion, so re-rendering that same text
  // does not immediately re-open the dropdown.
  const skipNextFetch = useRef(false);

  const text = value?.text ?? "";

  useEffect(() => {
    if (text.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }

    const controller = new AbortController();
    // Debounced so one suggestion request covers a burst of keystrokes.
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        sessionTokenRef.current ??= crypto.randomUUID();
        const response = await fetch("/api/places/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: text.trim(),
            sessionToken: sessionTokenRef.current,
          }),
          signal: controller.signal,
        });
        const data = await response.json();
        setSuggestions(data.suggestions ?? []);
        setOpen((data.suggestions ?? []).length > 0);
        setActiveIndex(-1);
      } catch {
        // Aborted or offline — stay a plain text field.
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text]);

  useEffect(() => {
    function onPointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const select = useCallback(
    (suggestion) => {
      skipNextFetch.current = true;
      onChange({ text: suggestion.full, placeId: suggestion.placeId });
      setOpen(false);
      setActiveIndex(-1);
      // A session token is consumed once a place is selected.
      sessionTokenRef.current = null;
    },
    [onChange]
  );

  function onKeyDown(event) {
    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      select(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600"
      >
        {label}
        {required && <span className="ml-0.5 text-orange-600">*</span>}
      </label>

      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
          }
          autoComplete="off"
          required={required}
          value={text}
          placeholder={placeholder}
          onChange={(event) =>
            onChange({ text: event.target.value, placeId: null })
          }
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-9 text-sm font-medium text-slate-900 transition-colors placeholder:font-normal placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/25"
        />
        {loading && (
          <Loader2
            className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-orange-500"
            aria-hidden="true"
          />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute z-50 mt-1.5 max-h-64 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl shadow-slate-900/10"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.placeId ?? index}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onPointerDown={(event) => {
                event.preventDefault();
                select(suggestion);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={`cursor-pointer px-3.5 py-2.5 text-sm transition-colors ${
                index === activeIndex ? "bg-orange-50" : "bg-white"
              }`}
            >
              <span className="block font-semibold text-slate-800">
                {suggestion.label}
              </span>
              {suggestion.secondary && (
                <span className="mt-0.5 block text-xs text-slate-500">
                  {suggestion.secondary}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

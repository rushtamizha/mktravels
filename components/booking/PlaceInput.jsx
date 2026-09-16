"use client";

import { useId } from "react";
import { MapPin } from "lucide-react";

/** Plain text location field; preserves the existing value/onChange shape. */
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
  const text = value?.text ?? "";

  return (
    <div className="relative">
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
          autoComplete="off"
          required={required}
          pattern={required ? ".*\\S.*" : undefined}
          title="Enter a city or address"
          value={text}
          placeholder={placeholder}
          onChange={(event) =>
            onChange({ text: event.target.value, placeId: null })
          }
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-9 text-sm font-medium text-slate-900 transition-colors placeholder:font-normal placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/25"
        />
      </div>
    </div>
  );
}

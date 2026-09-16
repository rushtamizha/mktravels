"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Navigation,
  Send,
  Users,
} from "lucide-react";

import PlaceInput from "./PlaceInput";
import { SelectField, TextField } from "./fields";
import {
  LOCAL_DURATIONS,
  TOUR_CATEGORIES,
  TRIP_TYPES,
  VEHICLES,
  buildWhatsAppMessage,
  estimateFare,
  findVehicle,
  formatINR,
  todayISO,
  whatsappUrl,
} from "@/lib/booking";

const EMPTY_PLACE = { text: "", placeId: null };

const AIRPORTS = [
  "Coimbatore International Airport (CJB)",
  "Cochin International Airport (COK)",
  "Madurai Airport (IXM)",
  "Tiruchirappalli Airport (TRZ)",
  "Bengaluru — Kempegowda (BLR)",
  "Chennai International Airport (MAA)",
];

export default function BookingWidget() {
  const [tripType, setTripType] = useState("round-trip");
  const [submitted, setSubmitted] = useState(false);

  const [pickup, setPickup] = useState(EMPTY_PLACE);
  const [drop, setDrop] = useState(EMPTY_PLACE);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("18:00");
  const [vehicleKey, setVehicleKey] = useState(VEHICLES[0]?.key ?? "sedan");
  const [duration, setDuration] = useState("hrs8");
  const [airport, setAirport] = useState(AIRPORTS[0]);
  const [airportDirection, setAirportDirection] = useState("to-airport");
  const [flightNumber, setFlightNumber] = useState("");
  const [tourCategory, setTourCategory] = useState(TOUR_CATEGORIES[0].value);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const minDate = useMemo(() => todayISO(), []);
  const isRoundTrip = tripType === "round-trip";
  const isTour = tripType === "tour-package";
  const isLocal = tripType === "local";
  const isAirport = tripType === "airport";
  const needsRoute = isRoundTrip || tripType === "one-way";

  const selectedCategory = useMemo(
    () => TOUR_CATEGORIES.find((c) => c.value === tourCategory),
    [tourCategory]
  );

  // Calculate the trip duration for the booking details.
  const tripDays = useMemo(() => {
    if (isTour) return selectedCategory?.days ?? 1;
    if (isRoundTrip && pickupDate && returnDate) {
      const diff =
        (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
      return Number.isFinite(diff) ? Math.max(1, Math.round(diff) + 1) : 1;
    }
    return 1;
  }, [isTour, isRoundTrip, selectedCategory, pickupDate, returnDate]);

  // Local packages use fixed rates and do not require a distance lookup.
  const fare = useMemo(
    () => isLocal ? estimateFare({ tripType, vehicleKey, duration }) : null,
    [isLocal, tripType, vehicleKey, duration]
  );

  function handleTripTypeChange(id) {
    setTripType(id);
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const vehicle = findVehicle(vehicleKey);
    const tripLabel = TRIP_TYPES.find((t) => t.id === tripType)?.label ?? tripType;

    const rows = [["Trip Type", tripLabel]];

    if (isTour) {
      rows.push(
        ["Package", tourCategory],
        ["Pickup City", pickup.text.trim()],
        ["Start Date", pickupDate],
        ["Pickup Time", pickupTime],
        ["Duration", `${tripDays} day${tripDays > 1 ? "s" : ""}`]
      );
    } else if (isLocal) {
      rows.push(
        ["City", pickup.text.trim()],
        ["Package", LOCAL_DURATIONS.find((d) => d.value === duration)?.label],
        ["Date", pickupDate],
        ["Pickup Time", pickupTime]
      );
    } else if (isAirport) {
      rows.push(
        ["Direction", airportDirection === "to-airport" ? "To airport" : "From airport"],
        ["Airport", airport],
        [airportDirection === "to-airport" ? "Pickup" : "Drop", pickup.text.trim()],
        ["Date", pickupDate],
        ["Time", pickupTime],
        ["Flight No.", flightNumber]
      );
    } else {
      rows.push(
        ["Pickup", pickup.text.trim()],
        ["Drop", drop.text.trim()],
        ["Pickup Date", pickupDate],
        ["Pickup Time", pickupTime]
      );
      if (isRoundTrip) {
        rows.push(["Return Date", returnDate], ["Return Time", returnTime]);
      }
    }


    if (fare?.total) {
      rows.push(["Indicative Fare", `${formatINR(fare.total)} (estimate)`]);
    }

    rows.push(["Name", name], ["Phone", phone], ["Notes", notes]);

    window.open(whatsappUrl(buildWhatsAppMessage(rows)), "_blank", "noopener");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-950/20 sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-blue-950">
          Booking request sent
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          We&apos;ve opened WhatsApp with your trip details. Our team confirms
          every booking by phone within 15 minutes.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full bg-blue-900 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue-800"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/25">
      {/* TRIP TYPE TABS */}
      <div
        role="tablist"
        aria-label="Booking type"
        className="no-scrollbar flex gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-2 py-2"
      >
        {TRIP_TYPES.map((type) => {
          const active = type.id === tripType;
          return (
            <button
              key={type.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleTripTypeChange(type.id)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                active
                  ? "bg-blue-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-blue-900"
              }`}
            >
              {type.short}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* ---------- TOUR PACKAGE ---------- */}
          {isTour && (
            <SelectField
              label="Choose Package"
              required
              className="sm:col-span-2"
              value={tourCategory}
              onChange={(e) => setTourCategory(e.target.value)}
            >
              {TOUR_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.value}
                </option>
              ))}
            </SelectField>
          )}

          {/* ---------- AIRPORT ---------- */}
          {isAirport && (
            <>
              <SelectField
                label="Direction"
                required
                value={airportDirection}
                onChange={(e) => setAirportDirection(e.target.value)}
              >
                <option value="to-airport">Going to the airport</option>
                <option value="from-airport">Coming from the airport</option>
              </SelectField>
              <SelectField
                label="Airport"
                required
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
              >
                {AIRPORTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectField>
            </>
          )}

          {/* ---------- LOCATIONS ---------- */}
          <PlaceInput
            label={
              isLocal
                ? "City"
                : isTour
                  ? "Pickup City"
                  : isAirport
                    ? airportDirection === "to-airport"
                      ? "Pickup Address"
                      : "Drop Address"
                    : "Pickup Location"
            }
            required
            value={pickup}
            onChange={setPickup}
            placeholder="e.g. Gandhipuram, Coimbatore"
            icon={MapPin}
          />

          {needsRoute && (
            <PlaceInput
              label="Drop Location"
              required
              value={drop}
              onChange={setDrop}
              placeholder="e.g. Ooty, Tamil Nadu"
              icon={Navigation}
            />
          )}

          {isLocal && (
            <SelectField
              label="Hourly Package"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              {LOCAL_DURATIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </SelectField>
          )}

          {/* {isTour && (
            <TextField
              label="Travellers"
              type="number"
              min="1"
              max="40"
              required
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          )} */}

          {/* ---------- DATES ---------- */}
          <TextField
            label={isTour ? "Start Date" : "Pickup Date"}
            type="date"
            required
            min={minDate}
            value={pickupDate}
            onChange={(e) => {
              setPickupDate(e.target.value);
              if (returnDate && e.target.value > returnDate) setReturnDate("");
            }}
          />

          <TextField
            label="Pickup Time"
            type="time"
            required
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />

          {isRoundTrip && (
            <>
              <TextField
                label="Return Date"
                type="date"
                required
                min={pickupDate || minDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
              <TextField
                label="Return Time"
                type="time"
                required
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
              />
            </>
          )}

          {isAirport && (
            <TextField
              label="Flight Number"
              placeholder="Optional — e.g. 6E 5312"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          )}

          {/* {!isTour && (
            <TextField
              label="Passengers"
              type="number"
              min="1"
              max="40"
              required
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          )} */}

          <SelectField
            label="Vehicle"
            required
            // Tour has an odd number of single-width fields; spanning the
            // vehicle picker keeps name/phone paired on the final row.
            className={isTour ? "sm:col-span-2" : ""}
            value={vehicleKey}
            onChange={(e) => setVehicleKey(e.target.value)}
          >
            {VEHICLES.map((vehicle) => (
              <option key={vehicle.key} value={vehicle.key}>
                {vehicle.name} · {vehicle.seats} seats
              </option>
            ))}
          </SelectField>

          {/* ---------- DETAILED EXTRAS ---------- */}
          {(isTour || isRoundTrip) && (
            <TextField
              label="Your Name"
              required
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {(isTour || isRoundTrip) && (
            <TextField
              label="Phone Number"
              type="tel"
              required
              inputMode="tel"
              pattern="[0-9+\s-]{10,15}"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          {(isTour || isRoundTrip) && (
            <div className="sm:col-span-2">
              <label
                htmlFor="booking-notes"
                className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600"
              >
                Itinerary Notes
              </label>
              <textarea
                id="booking-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  isTour
                    ? "Sightseeing preferences, hotel category, temples to cover…"
                    : "Stops on the way, luggage, child seat…"
                }
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-900 transition-colors placeholder:font-normal placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/25"
              />
            </div>
          )}
        </div>

        {/* ---------- LOCAL PACKAGE ESTIMATE ---------- */}
        {fare && (
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900/70">
                Indicative fare
              </span>
              <span className="text-xl font-extrabold text-blue-950">
                {formatINR(fare.total)}
              </span>
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-slate-600">
              {fare.breakdown.map((row) => row.label).join(" + ")}. {fare.note}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 py-4 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-orange-900/25 transition-colors hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Get instant quote on WhatsApp
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
          <Users className="h-3 w-3" aria-hidden="true" />
          Confirmed by phone in 15 minutes · No advance payment
        </p>
      </form>
    </div>
  );
}

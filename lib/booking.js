import { fareDetails } from "@/lib/data";

export const WHATSAPP_NUMBER = "918754142281";

export const TRIP_TYPES = [
  { id: "round-trip", label: "Round Trip", short: "Round Trip" },
  { id: "local", label: "Local / Hourly", short: "Local" },
  { id: "airport", label: "Airport Taxi", short: "Airport" },
  { id: "tour-package", label: "Tour Package", short: "Packages" },
];

export const TOUR_CATEGORIES = [
  { value: "One Day Tour Package", days: 1, href: "/tour-packages/one-day-tour-packages" },
  { value: "Two Day Tour Package", days: 2, href: "/tour-packages/two-day-tour-packages" },
  { value: "Three Day Tour Package", days: 3, href: "/tour-packages/three-day-tour-packages" },
  { value: "Four Day Tour Package", days: 4, href: "/tour-packages/four-day-tour-packages" },
  { value: "Five Day Tour Package", days: 5, href: "/tour-packages/five-day-tour-packages" },
  { value: "Six Day Tour Package", days: 6, href: "/tour-packages/six-day-tour-packages" },
  { value: "Seven Day Tour Package", days: 7, href: "/tour-packages/seven-day-tour-packages" },
  { value: "Eight Day Tour Package", days: 8, href: "/tour-packages/eight-day-tour-packages" },
  { value: "Nine Day Tour Package", days: 9, href: "/tour-packages/nine-day-tour-packages" },
  { value: "Navagraha Temple Tour", days: 2, href: "/temple-packages/navagraha-temple-tour-packages" },
  { value: "Pilgrimage Tour", days: 3, href: "/temple-packages/pilgrimage-tour-packages" },
];

export const LOCAL_DURATIONS = [
  { value: "hrs8", label: "8 Hours / 80 km" },
  { value: "hrs10", label: "10 Hours / 80 km" },
];

/** Flattens the fare table into the options the vehicle picker renders. */
export const VEHICLES = Object.entries(fareDetails.vehicles).map(
  ([key, vehicle]) => ({
    key,
    name: vehicle.name,
    seats: vehicle.seats ?? 4,
    perKm: vehicle.fares?.outstationKmBasis?.farePerKm ?? null,
    minKmPerDay: vehicle.fares?.outstationKmBasis?.minKmPerDay ?? 300,
    driverAllowance: vehicle.fares?.outstationKmBasis?.driverAllowancePerDay ?? 400,
    local: vehicle.fares?.local ?? null,
  })
);

export function findVehicle(key) {
  return VEHICLES.find((vehicle) => vehicle.key === key) ?? VEHICLES[0];
}

/**
 * Indicative fare, mirroring how the published tariff is calculated:
 * billable distance is the greater of the driven distance and the vehicle's
 * daily minimum, plus a driver allowance per day. Returned as an estimate —
 * tolls, parking and permits are quoted on confirmation.
 */
export function estimateFare({ tripType, vehicleKey, distanceKm, days = 1, duration = "hrs8" }) {
  const vehicle = findVehicle(vehicleKey);
  if (!vehicle) return null;

  if (tripType === "local") {
    const slab = vehicle.local?.[duration];
    if (!slab) return null;
    return {
      total: slab.totalAmount,
      breakdown: [
        { label: `${duration === "hrs10" ? "10" : "8"} hrs / ${slab.freeKm} km package`, value: slab.totalAmount },
      ],
      note: `Extra ₹${slab.extraKm}/km and ₹${slab.extraHour}/hour beyond the package.`,
    };
  }

  if (!vehicle.perKm || !distanceKm) return null;

  const tripDays = Math.max(1, days);
  // A round trip covers the same road twice.
  const drivenKm = tripType === "round-trip" ? distanceKm * 2 : distanceKm;
  const minimumKm = vehicle.minKmPerDay * tripDays;
  const billableKm = Math.max(drivenKm, minimumKm);
  const distanceFare = Math.round(billableKm * vehicle.perKm);
  const allowance = vehicle.driverAllowance * tripDays;

  return {
    total: distanceFare + allowance,
    billableKm,
    drivenKm,
    breakdown: [
      { label: `${billableKm} km × ₹${vehicle.perKm}/km`, value: distanceFare },
      { label: `Driver allowance × ${tripDays} day${tripDays > 1 ? "s" : ""}`, value: allowance },
    ],
    note:
      billableKm > drivenKm
        ? `Minimum ${vehicle.minKmPerDay} km/day applies for this vehicle.`
        : "Toll, parking and inter-state permit charges are extra.",
  };
}

export function formatINR(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `₹${value.toLocaleString("en-IN")}`;
}

/** Today in `YYYY-MM-DD`, used as the `min` for every date input. */
export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function buildWhatsAppMessage(payload) {
  const lines = ["*New Booking Request — MK Travels*", ""];

  for (const [label, value] of payload) {
    if (value === undefined || value === null || value === "") continue;
    lines.push(`*${label}:* ${value}`);
  }

  lines.push("", "_Sent from mktravelscoimbatore.com_");
  return lines.join("\n");
}

export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

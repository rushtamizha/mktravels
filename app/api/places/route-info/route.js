import { NextResponse } from "next/server";
import {
  MAPS_API_KEY,
  clientKeyFrom,
  hasMapsKey,
  rateLimit,
} from "@/lib/google-maps";

const ENDPOINT = "https://routes.googleapis.com/directions/v2:computeRoutes";

/** Builds a Routes API waypoint from either a place id or free text. */
function toWaypoint(point) {
  if (point?.placeId) return { placeId: point.placeId };
  if (typeof point?.text === "string" && point.text.trim()) {
    return { address: point.text.trim() };
  }
  return null;
}

export async function POST(request) {
  const limit = rateLimit(`route:${clientKeyFrom(request)}`, {
    limit: 20,
    windowMs: 60_000,
  });

  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const origin = toWaypoint(body?.origin);
  const destination = toWaypoint(body?.destination);

  if (!origin || !destination) {
    return NextResponse.json({ error: "missing_waypoints" }, { status: 400 });
  }

  if (!hasMapsKey) {
    return NextResponse.json({ unconfigured: true });
  }

  // Up to 3 stops between origin and destination for multi-city trips.
  const intermediates = Array.isArray(body?.stops)
    ? body.stops.map(toWaypoint).filter(Boolean).slice(0, 3)
    : [];

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": MAPS_API_KEY,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin,
        destination,
        ...(intermediates.length ? { intermediates } : {}),
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_UNAWARE",
        units: "METRIC",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "route_failed" }, { status: 200 });
    }

    const data = await response.json();
    const route = data.routes?.[0];

    if (!route) {
      return NextResponse.json({ error: "no_route" }, { status: 200 });
    }

    const distanceKm = Math.round((route.distanceMeters ?? 0) / 1000);
    // Routes API returns duration as a protobuf string, e.g. "12105s".
    const durationMinutes = Math.round(
      Number.parseInt(route.duration ?? "0", 10) / 60
    );

    return NextResponse.json({ distanceKm, durationMinutes });
  } catch {
    return NextResponse.json({ error: "route_failed" }, { status: 200 });
  }
}

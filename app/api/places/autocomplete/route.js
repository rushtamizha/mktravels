import { NextResponse } from "next/server";
import {
  MAPS_API_KEY,
  SEARCH_BIAS,
  clientKeyFrom,
  hasMapsKey,
  rateLimit,
} from "@/lib/google-maps";

const ENDPOINT = "https://places.googleapis.com/v1/places:autocomplete";

export async function POST(request) {
  const limit = rateLimit(`ac:${clientKeyFrom(request)}`, {
    limit: 40,
    windowMs: 60_000,
  });

  if (!limit.ok) {
    return NextResponse.json(
      { suggestions: [], error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 400 });
  }

  const input = typeof body?.input === "string" ? body.input.trim() : "";
  // The client also guards this, but the endpoint is public so it re-checks.
  if (input.length < 3 || input.length > 120) {
    return NextResponse.json({ suggestions: [] });
  }

  // Without a key the form still works — the inputs simply behave as plain
  // text fields, so booking is never blocked on configuration.
  if (!hasMapsKey) {
    return NextResponse.json({ suggestions: [], unconfigured: true });
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": MAPS_API_KEY,
        "X-Goog-FieldMask":
          "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat",
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: [SEARCH_BIAS.regionCode],
        languageCode: "en",
        // A session token groups keystrokes into one billable session.
        ...(body.sessionToken ? { sessionToken: body.sessionToken } : {}),
        locationBias: {
          circle: {
            center: {
              latitude: SEARCH_BIAS.latitude,
              longitude: SEARCH_BIAS.longitude,
            },
            radius: SEARCH_BIAS.radiusMeters,
          },
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ suggestions: [] }, { status: 200 });
    }

    const data = await response.json();
    const suggestions = (data.suggestions ?? [])
      .map((item) => item.placePrediction)
      .filter(Boolean)
      .slice(0, 6)
      .map((prediction) => ({
        placeId: prediction.placeId,
        label: prediction.structuredFormat?.mainText?.text ?? prediction.text?.text ?? "",
        secondary: prediction.structuredFormat?.secondaryText?.text ?? "",
        full: prediction.text?.text ?? "",
      }));

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 200 });
  }
}

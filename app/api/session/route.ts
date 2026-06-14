import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json({ error: "Backend URL missing" }, { status: 500 });
    }

    const response = await fetch(`${backendUrl}/api/auth/get-session`, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
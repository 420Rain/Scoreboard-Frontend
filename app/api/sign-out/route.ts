import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/sign-out`, {
      method: "POST",
      headers: { 
        cookie: request.headers.get("cookie") || "",
        "Origin": origin,
        "Content-Type": "application/json",
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend 403 reason:", errorText);
      return NextResponse.json(
        { error: "Failed to Logout" },
        { status: response.status }
      );
    }

    const nextResponse = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    const setCookieHeaders = response.headers.getSetCookie();
    
    for (const cookie of setCookieHeaders) {
      nextResponse.headers.append("Set-Cookie", cookie);
    }

    return nextResponse;

  } catch (error) {
    console.error("Error in Next.js API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

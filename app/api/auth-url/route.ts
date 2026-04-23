import { NextResponse } from "next/server";

export async function GET(){
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login-url`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.API_SECRET || "", 
        "Content-Type": "application/json",
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch login URL from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error in Next.js API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
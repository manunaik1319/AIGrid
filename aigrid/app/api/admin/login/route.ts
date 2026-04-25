import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SECRET   = new TextEncoder().encode(process.env.ADMIN_SECRET ?? "fallback-secret");

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      // Constant-time-ish delay to prevent timing attacks
      await new Promise(r => setTimeout(r, 500));
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await new SignJWT({ role: "admin", username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(ADMIN_SECRET);

    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getAllTools, addTool } from "@/lib/tools-service";

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET ?? "fallback-secret"
);

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  try { await jwtVerify(token, ADMIN_SECRET); return true; } catch { return false; }
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tools = await getAllTools();
  return NextResponse.json(tools);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const tool = await addTool(body);
  return NextResponse.json(tool, { status: 201 });
}

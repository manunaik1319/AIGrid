import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { editTool, removeTool } from "@/lib/tools-service";

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET ?? "fallback-secret"
);

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  try { await jwtVerify(token, ADMIN_SECRET); return true; } catch { return false; }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const updated = await editTool(params.id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const ok = await removeTool(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

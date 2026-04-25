import { NextResponse } from "next/server";
import { getAllTools } from "@/lib/tools-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const tools = await getAllTools();
  return NextResponse.json(tools);
}

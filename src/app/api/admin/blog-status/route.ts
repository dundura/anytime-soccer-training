import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const STATUS_FILE = path.join(process.cwd(), "src/data/blog-post-status.json");

function readStatus(): Record<string, { posted: boolean; postedAt: string | null }> {
  try {
    return JSON.parse(fs.readFileSync(STATUS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeStatus(data: Record<string, { posted: boolean; postedAt: string | null }>) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(readStatus());
}

export async function PATCH(req: NextRequest) {
  const { slug, posted } = await req.json();
  const status = readStatus();
  status[slug] = { posted, postedAt: posted ? new Date().toISOString() : null };
  writeStatus(status);
  return NextResponse.json({ success: true });
}

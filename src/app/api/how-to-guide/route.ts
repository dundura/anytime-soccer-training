import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * How-to Guide content feed.
 *
 * The app (app.anytime-soccer.com) renders the guide, but the wording lives
 * here so it can be edited without an app deploy: change
 * src/data/how-to-guide.json, push, and the app picks it up on the next load.
 *
 * The app ships its own copy as a fallback, so if this route is ever down or
 * malformed the guide still renders — it just shows the bundled wording.
 *
 * Public help content, so it is readable from anywhere: the app is served from
 * a different origin than this site, and the iOS WKWebView wrapper is a third.
 */

const GUIDE_FILE = path.join(process.cwd(), "src/data/how-to-guide.json");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  // Browsers revalidate every load (a 304 is cheap) so an edit shows up on the
  // next refresh rather than up to five minutes later; the CDN still caches, so
  // the revalidation rarely reaches this function.
  "Cache-Control": "public, max-age=0, must-revalidate, s-maxage=60, stale-while-revalidate=3600",
};

export async function GET() {
  try {
    const guide = JSON.parse(fs.readFileSync(GUIDE_FILE, "utf-8"));
    return NextResponse.json(guide, { headers: CORS });
  } catch {
    return NextResponse.json({ error: "guide unavailable" }, { status: 500, headers: CORS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

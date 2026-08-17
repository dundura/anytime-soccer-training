import { NextResponse } from "next/server";
import guide from "../../../data/how-to-guide.json";

/**
 * How-to Guide content feed.
 *
 * The app (app.anytime-soccer.com) renders the guide, but the wording lives
 * here so it can be edited without an app deploy: change
 * src/data/how-to-guide.json, push, and the app picks it up on the next load.
 *
 * The app ships its own copy as a fallback, so if this route is ever down the
 * guide still renders — it just shows the bundled wording.
 *
 * The JSON is imported, not read with fs at request time. Reading it by path
 * left the file outside the module graph, so a build reused the previous
 * prerendered response and edits went live only sometimes — the guide sat four
 * commits behind with every deployment reporting Ready. An import is a real
 * dependency: change the JSON and the route's output changes with it.
 *
 * Public help content, so it is readable from anywhere: the app is served from
 * a different origin than this site, and the iOS WKWebView wrapper is a third.
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  // Browsers revalidate every load (a 304 is cheap) so an edit shows up on the
  // next refresh rather than up to five minutes later; the CDN still caches, so
  // the revalidation rarely reaches this function.
  "Cache-Control": "public, max-age=0, must-revalidate, s-maxage=60, stale-while-revalidate=3600",
};

// Never prerendered, never revalidated on a timer: the response is built per
// request from the imported JSON. Importing the file was not enough on its own —
// builds kept serving a cached copy of this route's output, so the app showed
// wording several commits old while every deployment reported Ready.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return NextResponse.json(guide, { headers: CORS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

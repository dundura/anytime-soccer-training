import { NextRequest, NextResponse } from 'next/server';

/**
 * Partner referral links: www.anytime-soccer.com/r/CODE
 *
 * A partner reads their link out on a call, so it lives on the main domain
 * rather than on api. — but the click has to be recorded and the cookie set by
 * the API, which owns the partners table and the .anytime-soccer.com cookie.
 * So this hands straight over and the API does the work and the final redirect.
 *
 * Passes ?to= through, so a partner can point at a specific page rather than
 * always the homepage.
 */
const API = 'https://api.anytime-soccer.com';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  // Codes are letters and digits by construction. Anything else is not a code
  // and gets the homepage rather than a redirect built from user input.
  if (!/^[A-Za-z0-9]{1,48}$/.test(code || '')) {
    return NextResponse.redirect('https://www.anytime-soccer.com/', 302);
  }
  const incoming = req.nextUrl.searchParams;
  const out = new URLSearchParams();
  for (const key of ['to', 'c', 'aid']) {
    const v = incoming.get(key);
    if (v) out.set(key, v);
  }
  const qs = out.toString();
  return NextResponse.redirect(`${API}/r/${code}${qs ? '?' + qs : ''}`, 302);
}

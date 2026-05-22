import { NextRequest, NextResponse } from 'next/server';

const AST_API = 'https://api.anytime-soccer.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${AST_API}/api/public/ghl-contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}

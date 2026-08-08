import { NextRequest, NextResponse } from 'next/server';

const AST_API = 'https://api.anytime-soccer.com';

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
    }
    const res = await fetch(`${AST_API}/api/public/club-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

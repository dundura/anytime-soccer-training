import { NextRequest, NextResponse } from 'next/server';

const AST_API = 'https://api.anytime-soccer.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, inputs, results } = body;
    if (!email || !inputs || !results) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const res = await fetch(`${AST_API}/api/public/budget-pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, inputs, results }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

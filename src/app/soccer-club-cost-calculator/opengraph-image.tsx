import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Free Club Budget Calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f2642 0%, #1a4270 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ fontSize: '130px', marginBottom: '16px', lineHeight: 1 }}>📊</div>
        <div style={{ fontSize: '80px', fontWeight: '800', color: '#ffffff', lineHeight: 1.1, textAlign: 'center' }}>
          Club Budget
        </div>
        <div style={{ fontSize: '80px', fontWeight: '800', color: '#DC373E', lineHeight: 1.1, textAlign: 'center', marginBottom: '24px' }}>
          Calculator
        </div>
        <div style={{ fontSize: '26px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
          anytime-soccer.com
        </div>
      </div>
    ),
    { ...size }
  );
}

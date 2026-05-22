import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Free Soccer Resources — Anytime Soccer Training';
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
          padding: '60px',
        }}
      >
        <div style={{ fontSize: '36px', fontWeight: '700', color: '#DC373E', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
          Free Resources
        </div>
        <div style={{ fontSize: '76px', fontWeight: '800', color: '#ffffff', lineHeight: 1.1, textAlign: 'center', marginBottom: '28px' }}>
          Everything You Need<br />to Train Smarter
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['📋 Training Plans', '📊 Calculators', '📚 Ebooks', '👥 Community'].map(item => (
            <div key={item} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '10px 22px', fontSize: '22px', color: 'rgba(255,255,255,0.85)' }}>
              {item}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '24px', color: 'rgba(255,255,255,0.4)', marginTop: '36px', letterSpacing: '0.05em' }}>
          anytime-soccer.com
        </div>
      </div>
    ),
    { ...size }
  );
}

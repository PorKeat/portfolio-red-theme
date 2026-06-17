import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Alex KGM - DevOps Engineer & Fullstack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15), transparent 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #ef4444',
            backgroundColor: 'rgba(2, 6, 23, 0.8)',
            padding: '60px 80px',
            boxShadow: '0 0 50px rgba(239, 68, 68, 0.3)',
          }}
        >
          <div style={{ color: '#ef4444', fontSize: 32, letterSpacing: '0.2em', marginBottom: 20 }}>
            SYS.01_CONNECTION_ESTABLISHED
          </div>
          
          <h1 style={{ color: '#ffffff', fontSize: 80, fontWeight: 'bold', margin: '0 0 20px 0', textTransform: 'uppercase' }}>
            Alex KGM
          </h1>
          
          <div style={{ color: '#94a3b8', fontSize: 40, marginTop: 10 }}>
            DevOps Engineer & Fullstack Developer
          </div>

          <div
            style={{
              marginTop: 40,
              display: 'flex',
              gap: 20,
            }}
          >
            <div style={{ color: '#ef4444', fontSize: 24, padding: '10px 20px', border: '1px solid #ef4444' }}>Next.js</div>
            <div style={{ color: '#ef4444', fontSize: 24, padding: '10px 20px', border: '1px solid #ef4444' }}>Kubernetes</div>
            <div style={{ color: '#ef4444', fontSize: 24, padding: '10px 20px', border: '1px solid #ef4444' }}>AWS</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

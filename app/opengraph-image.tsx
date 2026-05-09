import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

export const alt = 'Rishi Singh - Full Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const profileImageData = await readFile(
    join(process.cwd(), 'public', 'Rishi_spiderman.png')
  );
  const profileImageBase64 = `data:image/png;base64,${profileImageData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b', // zinc-950
          backgroundImage: 'radial-gradient(circle at top right, rgba(232,0,28,0.2) 0%, transparent 50%), radial-gradient(circle at bottom left, rgba(232,0,28,0.1) 0%, transparent 50%)',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(24, 24, 27, 0.7)', // zinc-900 with opacity
            border: '1px solid rgba(232, 0, 28, 0.2)',
            borderRadius: '24px',
            padding: '60px',
            flexDirection: 'row',
            alignItems: 'center',
            boxShadow: '0 0 60px rgba(0,0,0,0.5)',
            position: 'relative',
          }}
        >
          {/* Avatar Container */}
          <div style={{ display: 'flex', position: 'relative' }}>
            <img
              src={profileImageBase64}
              width={280}
              height={280}
              style={{
                borderRadius: '50%',
                border: '4px solid #e8001c', // Spiderman accent color
                objectFit: 'cover',
                boxShadow: '0 0 30px rgba(232,0,28,0.4)',
              }}
            />
          </div>

          {/* Text Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '70px',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', marginBottom: '16px' }}>
              <span style={{ 
                color: '#e8001c', 
                backgroundColor: 'rgba(232,0,28,0.1)', 
                border: '1px solid rgba(232,0,28,0.3)',
                padding: '6px 16px', 
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
              }}>
                PORTFOLIO
              </span>
            </div>
            
            <h1
              style={{
                fontSize: '76px',
                fontWeight: '900',
                margin: '0 0 10px 0',
                lineHeight: '1',
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              Rishi Singh
            </h1>
            
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '500',
                color: '#a1a1aa', // zinc-400
                margin: '0 0 30px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Full Stack Developer
            </h2>
            
            <p
              style={{
                fontSize: '24px',
                color: '#d4d4d8', // zinc-300
                margin: '0 0 45px 0',
                maxWidth: '650px',
                lineHeight: '1.5',
              }}
            >
              Java, Spring Boot, React, Next.js, and .NET applications.
              Clean architecture, product engineering, and scalable backend systems.
            </p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Java', 'Spring Boot', 'React', '.NET Core'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: '#18181b', // zinc-900
                    border: '1px solid #3f3f46', // zinc-700
                    color: '#a1a1aa',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Text inside the box */}
          <div style={{ 
            position: 'absolute', 
            bottom: '40px', 
            left: '60px',
            right: '60px',
            display: 'flex', 
            justifyContent: 'space-between',
            color: '#71717a',
            fontSize: '16px',
            fontWeight: '500',
          }}>
            <span style={{ color: '#e8001c' }}>www.rishisingh.online</span>
            <span>Remote-friendly | Product engineering | Case studies</span>
          </div>
        </div>
      </div>
    )
  );
}

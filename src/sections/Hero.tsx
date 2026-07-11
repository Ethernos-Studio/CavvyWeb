import { useEffect, useRef, useState } from 'react';
import { CavvyMatrixApp } from '../effects/MatrixRain';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<CavvyMatrixApp | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new CavvyMatrixApp(containerRef.current);
    appRef.current = app;
    app.start();

    return () => {
      app.destroy();
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Three.js Matrix Rain canvas container */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ zIndex: 1, opacity: 0.7 }}
      />

      {/* Dark overlay with vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: `
            radial-gradient(ellipse at center, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.6) 100%),
            radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none grid-lines"
        style={{ zIndex: 2, opacity: 0.5 }}
      />

      {/* Content overlay */}
      <div
        className="relative flex flex-col items-center justify-center h-full"
        style={{ zIndex: 3, pointerEvents: 'none' }}
      >
        <div className="text-center px-4">
          {/* Decorative line */}
          <div
            className="hero-line hero-line-0 mx-auto mb-8"
            style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
            }}
          />

          {/* Line 1 */}
          <div
            className="hero-line hero-line-1"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 3vw, 28px)',
              color: '#64748b',
              fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif',
              fontWeight: 400,
              marginBottom: '0.3em',
              letterSpacing: '0.1em',
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            以极简语法
          </div>

          {/* Line 2 */}
          <div
            className="hero-line hero-line-2"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 3vw, 28px)',
              color: '#64748b',
              fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif',
              fontWeight: 400,
              marginBottom: '0.6em',
              letterSpacing: '0.1em',
              transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            触及底层性能
          </div>

          {/* Line 3 - Cavvy */}
          <div
            className="hero-line hero-line-3"
            style={{
              fontSize: 'clamp(64px, 12vw, 140px)',
              fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              marginBottom: '0.3em',
              transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 60px rgba(139, 92, 246, 0.3))',
              }}
            >
              Cavvy
            </span>
          </div>

          {/* Decorative dots */}
          <div
            className="hero-line hero-line-3"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8b5cf6', opacity: 0.6 }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ec4899', opacity: 0.6 }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#06b6d4', opacity: 0.6 }} />
          </div>

          {/* Subtitle */}
          <p
            className="hero-line hero-line-4"
            style={{
              fontSize: 'clamp(10px, 1.5vw, 13px)',
              color: '#475569',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '3rem',
            }}
          >
            Rust Frontend · LLVM Backend · Native Lightweight
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-line hero-line-5"
            style={{
              display: 'flex',
              gap: '1rem',
              pointerEvents: 'auto',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://github.com/cavvy-lang/Cavvy/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2.5rem',
                borderRadius: '9999px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: "'Noto Sans SC', sans-serif",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              下载最新版本
            </a>
            <a
              href="https://github.com/cavvy-lang/Cavvy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2.5rem',
                borderRadius: '9999px',
                color: '#e2e8f0',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: "'Noto Sans SC', sans-serif",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>

          {/* Version badge */}
          <div
            className="hero-line hero-line-5"
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <span
              className="tag tag-purple"
              style={{ fontSize: '10px' }}
            >
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: '250px',
          background: 'linear-gradient(to bottom, transparent, #0d0d0d)',
          zIndex: 4,
        }}
      />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 pointer-events-none"
        style={{
          transform: 'translateX(-50%)',
          zIndex: 5,
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)',
          }}
        />
      </div>
    </section>
  );
}

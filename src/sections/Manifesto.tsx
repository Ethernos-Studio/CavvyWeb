import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative"
      style={{
        minHeight: '70vh',
        background: '#0d0d0d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none grid-lines"
        style={{ opacity: 0.2 }}
      />

      <div
        ref={textRef}
        style={{
          textAlign: 'center',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Decorative top line */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
            margin: '0 auto 2rem',
          }}
        />

        <h2
          style={{
            fontSize: 'clamp(40px, 8vw, 88px)',
            fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 30%, #8b5cf6 60%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            代码即基石
          </span>
        </h2>

        {/* Decorative dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            margin: '2rem 0',
          }}
        >
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8b5cf6', opacity: 0.6 }} />
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ec4899', opacity: 0.6 }} />
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#06b6d4', opacity: 0.6 }} />
        </div>

        <p
          style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: '#64748b',
            fontFamily: "'Noto Sans SC', sans-serif",
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          从第一个 commit 开始，Cavvy 就注定不是玩具。
          <br />
          它是面向系统编程的严肃语言——简单，但绝不简陋。
        </p>

        {/* Decorative bottom line */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #ec4899, transparent)',
            margin: '2rem auto 0',
          }}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none pulse-glow"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none pulse-glow"
        style={{
          top: '40%',
          left: '30%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, transparent 70%)',
          zIndex: 0,
          animationDelay: '2s',
        }}
      />
    </section>
  );
}

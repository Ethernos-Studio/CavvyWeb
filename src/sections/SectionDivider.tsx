import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  glowColor?: string;
}

export default function SectionDivider({ glowColor = '#8b5cf6' }: SectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dividerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={dividerRef}
      style={{
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${glowColor}30, transparent)`,
        margin: '0 auto',
        maxWidth: '600px',
        transformOrigin: 'center',
      }}
    />
  );
}

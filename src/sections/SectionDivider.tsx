import { useEffect, useRef, useState } from 'react';

export default function SectionDivider({ glowColor = '#8b5cf6' }: { glowColor?: string }) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!dividerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(dividerRef.current!);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(dividerRef.current);
    return () => observer.disconnect();
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
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'opacity 1s cubic-bezier(0.2, 1, 0.3, 1), transform 1s cubic-bezier(0.2, 1, 0.3, 1)',
      }}
    />
  );
}

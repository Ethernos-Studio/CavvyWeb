import { useEffect, useState, useRef } from 'react';

const navLinks = [
  { label: '特性', href: '#philosophy' },
  { label: '工具链', href: '#toolchain' },
  { label: '开源', href: '#footer' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 80);
      // Hide nav when scrolling down, show when scrolling up
      if (currentY > lastScrollY.current && currentY > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full"
      style={{
        zIndex: 100,
        padding: '0 2rem',
        transition: 'transform 0.4s cubic-bezier(0.2, 1, 0.3, 1), background-color 0.4s ease, backdrop-filter 0.4s ease',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        backgroundColor: scrolled ? 'rgba(13, 13, 13, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="flex items-center gap-2"
          style={{
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: '#fff',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: '18px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#e2e8f0',
              letterSpacing: '-0.02em',
            }}
          >
            Cavvy
          </span>
        </a>

        {/* Links */}
        <div
          className="flex items-center"
          style={{ gap: '2.5rem' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="link-hover-line"
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                fontFamily: "'Noto Sans SC', sans-serif",
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/cavvy-lang/Cavvy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            style={{
              fontSize: '13px',
              color: '#0d0d0d',
              fontFamily: "'Noto Sans SC', sans-serif",
              textDecoration: 'none',
              padding: '7px 18px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              transition: 'all 0.3s ease',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

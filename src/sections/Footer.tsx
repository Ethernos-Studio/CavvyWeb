export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative"
      style={{
        background: 'linear-gradient(180deg, #0d0d0d, #111111)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '100px 0 40px',
      }}
    >
      {/* Top decorative line */}
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          transform: 'translateX(-50%)',
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '4rem',
            marginBottom: '80px',
          }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
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
              <h3
                style={{
                  fontSize: '22px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: '#e2e8f0',
                  letterSpacing: '-0.02em',
                }}
              >
                Cavvy
              </h3>
            </div>
            <p
              style={{
                fontSize: '14px',
                color: '#64748b',
                fontFamily: "'Noto Sans SC', sans-serif",
                lineHeight: 1.8,
                maxWidth: '280px',
              }}
            >
              静态类型、面向对象的编译型编程语言。
              Rust Frontend · LLVM Backend · Native Lightweight。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              资源
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'GitHub 仓库', href: 'https://github.com/cavvy-lang/Cavvy' },
                { label: '下载页面', href: 'https://github.com/cavvy-lang/Cavvy/releases' },
                { label: '文档', href: 'https://github.com/cavvy-lang/Cavvy/tree/main/docs' },
                { label: '路线图', href: 'https://github.com/cavvy-lang/Cavvy/blob/main/ROADMAP.md' },
              ].map((link) => (
                <li key={link.label} style={{ marginBottom: '0.875rem' }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover-line"
                    style={{
                      color: '#64748b',
                      fontSize: '14px',
                      fontFamily: "'Noto Sans SC', sans-serif",
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e2e8f0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#64748b';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              社区
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Ethernos Studio', href: 'https://github.com/Ethernos-Studio' },
                { label: '问题反馈', href: 'https://github.com/cavvy-lang/Cavvy/issues' },
                { label: '贡献指南', href: 'https://github.com/cavvy-lang/Cavvy/blob/main/CONTRIBUTING.md' },
              ].map((link) => (
                <li key={link.label} style={{ marginBottom: '0.875rem' }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover-line"
                    style={{
                      color: '#64748b',
                      fontSize: '14px',
                      fontFamily: "'Noto Sans SC', sans-serif",
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e2e8f0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#64748b';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
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
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: "'Noto Serif SC', serif",
                marginBottom: '1.5rem',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              开始编译
            </a>
            <p
              style={{
                fontSize: '12px',
                color: '#475569',
                fontFamily: "'Noto Sans SC', sans-serif",
                lineHeight: 1.6,
              }}
            >
              免费开源，GPL-3.0 许可证
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#475569',
              fontFamily: "'Noto Sans SC', sans-serif",
            }}
          >
            &copy; 2026 Ethernos Studio. 许可证：GPL-3.0
          </p>
          <div className="flex items-center gap-4">
            <span
              className="tag tag-purple"
              style={{ fontSize: '10px' }}
            >
              v5.1.1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

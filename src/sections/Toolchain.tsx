import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: 'cayc', desc: '一站式编译器 (.cay → .exe)', tag: '核心', color: '#8b5cf6' },
  { name: 'cay-ir', desc: '生成 LLVM IR (.cay → .ll)', tag: '中间', color: '#ec4899' },
  { name: 'ir2exe', desc: 'IR 编译器 (.ll → .exe)', tag: '链接', color: '#06b6d4' },
  { name: 'cay-check', desc: '代码检查与静态分析', tag: '分析', color: '#8b5cf6' },
  { name: 'cay-run', desc: '编译并运行 .cay / .caybc / .ll', tag: '运行', color: '#ec4899' },
  { name: 'cavly', desc: '包管理器与项目构建工具', tag: '生态', color: '#06b6d4' },
  { name: 'cay-lsp', desc: '语言服务器协议支持', tag: 'IDE', color: '#8b5cf6' },
  { name: 'cay-rcpl', desc: '交互式 RCPL 环境', tag: 'REPL', color: '#ec4899' },
  { name: 'cay-dt', desc: '文档生成工具', tag: '文档', color: '#06b6d4' },
  { name: 'cay-dp', desc: 'AST / 解析调试预览', tag: '调试', color: '#8b5cf6' },
];

export default function Toolchain() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="toolchain"
      ref={sectionRef}
      className="relative"
      style={{
        padding: '160px 0',
        background: '#0d0d0d',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none pulse-glow"
        style={{
          top: '30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '1.5rem',
            }}
          >
            Toolchain
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              完整的工具链生态
            </span>
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
              margin: '0 auto',
              borderRadius: '1px',
            }}
          />
        </div>

        {/* Tools grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: '1rem',
          }}
        >
          {tools.map((tool, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="card-glow"
              style={{
                background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(13, 13, 13, 0.95))',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.04)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${tool.color}30`;
                e.currentTarget.style.boxShadow = `0 8px 32px ${tool.color}10`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '1.5rem',
                  right: '1.5rem',
                  height: '2px',
                  background: `linear-gradient(90deg, ${tool.color}40, transparent)`,
                  borderRadius: '0 0 2px 2px',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: '#e2e8f0',
                  }}
                >
                  {tool.name}
                </span>
                <span
                  className="tag"
                  style={{
                    fontSize: '10px',
                    color: tool.color,
                    background: `${tool.color}12`,
                    border: `1px solid ${tool.color}20`,
                  }}
                >
                  {tool.tag}
                </span>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                  fontFamily: "'Noto Sans SC', sans-serif",
                  lineHeight: 1.6,
                }}
              >
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

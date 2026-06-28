import { useEffect, useRef, useState } from 'react';

const features = [
  {
    title: '原生机器码',
    desc: 'Cavvy 直接编译为 LLVM IR，再经 LLVM 优化管线生成原生可执行文件。无 VM、无 GC、零运行时依赖，性能对标 C++。',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: '显式内存管理',
    desc: 'Arena 分配、栈分配、手动堆分配——完全由你掌控。没有垃圾回收器的暂停，没有隐式分配，适合系统编程与嵌入式场景。',
    color: '#ec4899',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: '完整 OOP 支持',
    desc: '类、接口、继承、泛型、方法重载、Lambda 表达式——你熟悉的面向对象范式，全部在编译期展开，运行时零开销。',
    color: '#06b6d4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'FFI 无缝互操作',
    desc: '直接调用 C 函数和库，无需胶水代码。#link 指令声明链接库，extern 声明外部函数，与 C 生态无缝对接。',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: '泛型特化',
    desc: 'Vector<T>、Box<T> 等泛型容器在编译期单态化，每种类型生成专属机器码。零成本抽象，不是口号，是事实。',
    color: '#ec4899',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: '完整工具链',
    desc: '从 cayc 编译器到 cavly 包管理器，从 cay-lsp 语言服务器到 cay-rcpl 交互环境——开箱即用，无需拼凑。',
    color: '#06b6d4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

export default function IsometricShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const cardsVisible = useRef<Set<number>>(new Set());
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(headerRef.current!);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              cardsVisible.current.add(index);
              forceUpdate(n => n + 1);
            }, index * 80);
            observer.unobserve(card);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(card);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section
      id="showcase"
      className="relative"
      style={{ padding: '160px 0', background: '#0d0d0d', overflow: 'hidden' }}
    >
      <div className="absolute pointer-events-none pulse-glow" style={{ top: '10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none pulse-glow" style={{ bottom: '5%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)', animationDelay: '2s' }} />
      <div className="absolute inset-0 pointer-events-none grid-lines" style={{ opacity: 0.3 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 1s cubic-bezier(0.2, 1, 0.3, 1), transform 1s cubic-bezier(0.2, 1, 0.3, 1)',
          }}
        >
          <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.3em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.5rem' }}>
            Core Strengths
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontFamily: "'Playfair Display', 'Noto Serif SC', serif", fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            <span style={{ background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              编译器级的掌控力
            </span>
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', margin: '0 auto', borderRadius: '1px' }} />
          <p style={{ fontSize: '16px', color: '#64748b', fontFamily: "'Noto Sans SC', sans-serif", maxWidth: '560px', margin: '2rem auto 0', lineHeight: 1.8 }}>
            从泛型特化到显式内存管理，每个设计决策都指向同一个目标：让你写出既简洁又可控的代码。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '1.5rem' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="card-glow"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.05)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                opacity: cardsVisible.current.has(index) ? 1 : 0,
                transform: cardsVisible.current.has(index) ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                transition: `opacity 0.7s cubic-bezier(0.2, 1, 0.3, 1) ${index * 0.08}s, transform 0.7s cubic-bezier(0.2, 1, 0.3, 1) ${index * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${feature.color}25`;
                e.currentTarget.style.boxShadow = `0 20px 60px ${feature.color}12`;
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `radial-gradient(circle at 50% 50%, ${feature.color}08, transparent 50%)`, pointerEvents: 'none', opacity: 0, transition: 'opacity 0.4s ease' }} className="card-glow-bg" />
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${feature.color}15`, color: feature.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: `1px solid ${feature.color}20` }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontFamily: "'Noto Serif SC', serif", fontWeight: 600, color: '#e2e8f0', marginBottom: '0.75rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#64748b', fontFamily: "'Noto Sans SC', sans-serif" }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  {
    label: 'Hello World',
    c: `#include <stdio.h>

int main(int argc, char** argv) {
    printf("Hello, World!\n");
    return 0;
}`,
    cay: `public int main() {
    println("Hello, Cavvy!");
    return 0;
}`,
  },
  {
    label: '类与继承',
    c: `// C 没有类，用 struct + 函数指针
typedef struct {
    char* name;
    void (*speak)(struct Animal*);
} Animal;

void animal_speak(Animal* a) {
    printf("...\n");
}

Animal* dog_new(char* name) {
    Animal* d = malloc(sizeof(Animal));
    d->name = name;
    d->speak = dog_speak;
    return d;
}

// 手动管理 vtable，易错`,
    cay: `public class Animal {
    public String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        println("...");
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void speak() {
        println(this.name + " says: 汪汪!");
    }
}`,
  },
  {
    label: '泛型与类型安全',
    c: `// C: void* 丢失类型安全
typedef struct {
    void** items;
    int len;
} List;

void* list_get(List* l, int i) {
    return l->items[i];  // 返回 void*
}

void demo() {
    List* nums = list_new();
    list_add(nums, (void*)42);
    int* val = (int*)list_get(nums, 0);
    // 转错类型? 运行时崩溃
}`,
    cay: `public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T get() {
        return this.value;
    }
}

public class Main {
    public static void main() {
        Box<int> box = new Box<int>(42);
        int val = box.get(); // 编译期确定类型
    }
}`,
  },
];

export default function Philosophy() {
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
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="philosophy"
      ref={sectionRef}
      className="relative"
      style={{
        padding: '160px 0',
        background: '#0d0d0d',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.03) 0%, transparent 70%)',
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
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '100px' }}>
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
            Why Cavvy
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
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
              语法即哲学
            </span>
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
              margin: '1.5rem auto 0',
              borderRadius: '1px',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {comparisons.map((comp, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(13, 13, 13, 0.9))',
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 48px)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.04)',
                position: 'relative',
              }}
            >
              {/* Subtle corner accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.05), transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: index === 0 ? '#8b5cf6' : index === 1 ? '#ec4899' : '#06b6d4',
                    opacity: 0.8,
                  }}
                />
                <p
                  style={{
                    fontSize: '11px',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                  }}
                >
                  {comp.label}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                  gap: '1.5rem',
                }}
              >
                <CodePanel filename="traditional.c" code={comp.c} />
                <CodePanel filename="modern.cay" code={comp.cay} cavvy />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodePanel({ filename, code, cavvy }: { filename: string; code: string; cavvy?: boolean }) {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${cavvy ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.04)'}`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (cavvy) {
          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.08)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = cavvy ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.04)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', opacity: 0.6 }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', opacity: 0.6 }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', opacity: 0.6 }} />
        </div>
        <span style={{ fontSize: '11px', color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>
          {filename}
        </span>
      </div>
      <pre
        style={{
          padding: '1.5rem',
          overflow: 'auto',
          fontSize: '12px',
          lineHeight: 1.8,
          fontFamily: "'JetBrains Mono', monospace",
          margin: 0,
        }}
      >
        <code
          className={cavvy ? 'shimmer-text' : ''}
          style={{ color: cavvy ? undefined : '#475569' }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

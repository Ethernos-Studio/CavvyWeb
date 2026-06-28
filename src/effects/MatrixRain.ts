const CAVVY_KEYWORDS = [
  'class', 'public', 'private', 'static', 'void', 'int', 'string',
  'new', 'return', 'if', 'else', 'for', 'while', 'extends',
  'implements', 'interface', 'struct', 'enum', 'this', 'super',
  'println', 'var', 'fn', 'alias', 'extern', 'native', 'delete',
  'true', 'false', 'null', 'bool', 'double', 'float', 'long',
  'char', 'override', 'abstract', 'final', 'virtual', 'try',
  'catch', 'instanceof', 'namespace', 'using', 'import', 'const',
];

const SCI_SYMBOLS = ['{', '}', '(', ')', '[', ']', ';', '<', '>', '=', '+', '-', '*', '/', '&', '|', '!', ':', '.', ','];

interface Particle {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
  size: number;
  color: string;
}

export class CavvyMatrixApp {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private width: number = 0;
  private height: number = 0;
  private chars: string[] = [];

  constructor(container: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    container.appendChild(this.canvas);

    // Build character set
    this.chars = [...CAVVY_KEYWORDS, ...SCI_SYMBOLS];
    for (let i = 0x30; i <= 0x39; i++) this.chars.push(String.fromCharCode(i)); // 0-9

    this.resize();
    this.initParticles();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.width = this.canvas.parentElement!.clientWidth;
    this.height = this.canvas.parentElement!.clientHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.initParticles();
  };

  private initParticles() {
    this.particles = [];
    const count = Math.floor((this.width * this.height) / 8000);
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      speed: 0.3 + Math.random() * 0.7,
      char: this.chars[Math.floor(Math.random() * this.chars.length)],
      opacity: 0.1 + Math.random() * 0.3,
      size: 10 + Math.random() * 8,
      color: Math.random() > 0.7 ? '#8b5cf6' : Math.random() > 0.5 ? '#64748b' : '#475569',
    };
  }

  private draw = () => {
    this.ctx.fillStyle = '#0d0d0d';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      p.y += p.speed;
      if (p.y > this.height + 20) {
        p.y = -20;
        p.x = Math.random() * this.width;
        p.char = this.chars[Math.floor(Math.random() * this.chars.length)];
      }

      // Subtle flicker
      const flicker = 0.8 + Math.sin(Date.now() * 0.001 + p.x) * 0.2;
      this.ctx.globalAlpha = p.opacity * flicker;
      this.ctx.font = `${p.size}px "JetBrains Mono", monospace`;
      this.ctx.fillStyle = p.color;
      this.ctx.fillText(p.char, p.x, p.y);
    }

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(this.draw);
  };

  start() {
    this.draw();
  }

  destroy() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
    if (this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }
}

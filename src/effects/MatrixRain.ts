import * as THREE from 'three';

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

export class CavvyTokenEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private charMap: Map<string, { x: number; y: number; w: number; h: number }> = new Map();
  private tokenKeys: string[] = [];

  constructor(w: number, h: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d')!;
  }

  init() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = '22px "JetBrains Mono", monospace';
    ctx.textBaseline = 'top';

    let x = 0;
    let y = 0;
    const cellSize = 32;

    // ASCII chars
    for (let i = 0x21; i <= 0x7e; i++) {
      const ch = String.fromCharCode(i);
      ctx.fillStyle = '#4a3f6b';
      ctx.fillText(ch, x, y);
      this.charMap.set(ch, { x, y, w: cellSize, h: cellSize });
      x += cellSize;
      if (x + cellSize > this.canvas.width) {
        x = 0;
        y += cellSize;
      }
    }

    // Cavvy keywords - in purple tint
    for (const kw of CAVVY_KEYWORDS) {
      ctx.fillStyle = '#5a4a8a';
      ctx.fillText(kw, x, y);
      this.charMap.set(kw, { x, y, w: cellSize, h: cellSize });
      x += cellSize;
      if (x + cellSize > this.canvas.width) {
        x = 0;
        y += cellSize;
      }
    }

    // Symbols
    for (const sym of SCI_SYMBOLS) {
      ctx.fillStyle = '#3d3560';
      ctx.fillText(sym, x, y);
      this.charMap.set(sym, { x, y, w: cellSize, h: cellSize });
      x += cellSize;
      if (x + cellSize > this.canvas.width) {
        x = 0;
        y += cellSize;
      }
    }

    this.tokenKeys = [...this.charMap.keys()];
  }

  get seq() {
    if (window.innerWidth < 768) {
      return this.tokenKeys.slice(0, 20);
    }
    return this.tokenKeys;
  }

  draw(glitch: number, frame: number): HTMLCanvasElement {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 1024, 1024);

    const cols = 32;
    const rows = 32;
    const cellW = 1024 / cols;
    const cellH = 1024 / rows;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        // Slow down by using frame/6 instead of frame/4
        const seed = (col + 1) * 7919 + row * 104729 + Math.floor(frame / 6) * 31;
        const v = this.pseudoRandom(seed);

        if (v % 13 === 0) {
          // Dark purple base - much dimmer
          ctx.fillStyle = 'rgba(80, 60, 130, 0.06)';
          ctx.fillRect(col * cellW + 2, row * cellH + 2, cellW - 4, cellH - 4);

          if (v % 23 === 0) {
            const seq = this.seq;
            if (seq.length > 0) {
              const charKey = seq[(v + Math.floor(frame / 4)) % seq.length];
              const charInfo = this.charMap.get(charKey);
              if (charInfo) {
                ctx.drawImage(
                  this.canvas,
                  charInfo.x, charInfo.y, charInfo.w, charInfo.h,
                  col * cellW + 4, row * cellH + 4, cellW - 8, cellH - 8
                );
              }
            }
          }

          // Glitch - very rare and subtle
          if (glitch && glitch % 7 === 0 && v % 17 === 0) {
            ctx.fillStyle = 'rgba(139, 92, 246, 0.08)';
            ctx.fillRect(col * cellW + 2, row * cellH + 2, cellW - 4, cellH - 4);
          }
        }
      }
    }

    return this.canvas;
  }

  private pseudoRandom(seed: number): number {
    let s = seed;
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s;
  }
}

export class CavvyMatrixApp {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;
  private frame: number;
  private tokenEngine: CavvyTokenEngine;
  private uniforms: {
    u_time: { value: number };
    u_texture: { value: THREE.Texture | null };
    u_res: { value: THREE.Vector2 };
    u_glitch: { value: number };
  };
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private readonly frameInterval: number = 1000 / 15; // Cap at 15fps for slower, calmer effect

  constructor(container: HTMLElement) {
    this.clock = new THREE.Clock();
    this.frame = 0;
    this.tokenEngine = new CavvyTokenEngine(1024, 1024);
    this.tokenEngine.init();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0d0d0d);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.uniforms = {
      u_time: { value: 0 },
      u_texture: { value: null },
      u_res: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_glitch: { value: 0 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D u_texture;
        varying vec2 vUv;
        void main() {
          vec4 tex = texture2D(u_texture, vUv);
          // Darken the overall output - reduce brightness by 40%
          tex.rgb *= 0.6;
          // Slight purple tint to the dark areas
          tex.r = tex.r * 0.9 + 0.02;
          tex.g = tex.g * 0.8 + 0.01;
          tex.b = tex.b * 1.1 + 0.03;
          gl_FragColor = tex;
        }
      `,
      uniforms: this.uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
    window.addEventListener('resize', this.resize);
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.uniforms.u_res.value.set(w, h);
  }

  render(currentTime: number) {
    this.animationId = requestAnimationFrame(this.render.bind(this));

    // Frame rate limiting for slower, calmer effect
    const delta = currentTime - this.lastFrameTime;
    if (delta < this.frameInterval) return;
    this.lastFrameTime = currentTime - (delta % this.frameInterval);

    this.frame++;
    const time = this.clock.getElapsedTime();

    this.uniforms.u_time.value = time;
    // Much rarer glitch - less distracting
    this.uniforms.u_glitch.value = Math.floor(time * 10) % 200 < 3 ? Math.floor(Math.random() * 50) : 0;

    const canvas = this.tokenEngine.draw(this.uniforms.u_glitch.value, this.frame);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    if (this.uniforms.u_texture.value) {
      this.uniforms.u_texture.value.dispose();
    }
    this.uniforms.u_texture.value = texture;

    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.render(0);
  }

  destroy() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}

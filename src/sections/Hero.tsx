export default function Hero() {
  return (
    <section id="hero" className="section hero-block">
      <h2>以极简语法，触及底层性能</h2>
      <p className="muted">
        Cavvy 是一门静态类型、面向对象的编译型编程语言。Rust 前端，LLVM 后端，生成原生机器码。
      </p>
      <p className="muted">
        无虚拟机、无垃圾回收、零运行时依赖。
      </p>
      <div className="hero-actions">
        <a
          className="btn"
          href="https://github.com/cavvy-lang/Cavvy/releases"
          target="_blank"
          rel="noopener noreferrer"
        >
          下载最新版本
        </a>
        <a
          className="btn"
          href="https://github.com/cavvy-lang/Cavvy"
          target="_blank"
          rel="noopener noreferrer"
        >
          查看 GitHub
        </a>
      </div>
    </section>
  );
}

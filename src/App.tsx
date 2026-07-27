import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Toolchain from './sections/Toolchain';
import IsometricShowcase from './sections/IsometricShowcase';
import Manifesto from './sections/Manifesto';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="wrapper">
          <h1>
            <a href="/">Cavvy</a>
          </h1>
          <p className="tagline">编译型面向对象编程语言</p>
          <Navigation />
        </div>
      </header>

      <div className="wrapper clearfix">
        <div className="container">
          <main className="main">
            <div className="main-inner">
              <Hero />
              <hr />
              <Philosophy />
              <hr />
              <IsometricShowcase />
              <hr />
              <Toolchain />
              <hr />
              <Manifesto />
            </div>
          </main>

          <aside className="left">
            <div className="left-box">
              <div className="sidebar-title">快速链接</div>
              <ul className="sidebar-list">
                <li>
                  <a href="https://github.com/cavvy-lang/Cavvy/releases">
                    下载 Cavvy
                  </a>
                </li>
                <li>
                  <a href="https://github.com/cavvy-lang/Cavvy">
                    GitHub 仓库
                  </a>
                </li>
                <li>
                  <a href="#philosophy">语法哲学</a>
                </li>
                <li>
                  <a href="#toolchain">工具链</a>
                </li>
              </ul>

              <hr />

              <div className="sidebar-title">项目状态</div>
              <p className="small muted">
                当前版本：预览版
                <br />
                许可证：GPL-3.0
              </p>
            </div>
          </aside>

          <aside className="right">
            <div className="right-box">
              <div className="sidebar-title">关于</div>
              <p className="small muted">
                Cavvy 是一门静态类型、面向对象的编译型语言，前端基于 Rust，后端基于 LLVM。
              </p>

              <hr />

              <div className="sidebar-title">最新动态</div>
              <ul className="sidebar-list">
                <li>cayc 编译器可用</li>
                <li>cavly 包管理器开发中</li>
                <li>cay-lsp 已启动</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;

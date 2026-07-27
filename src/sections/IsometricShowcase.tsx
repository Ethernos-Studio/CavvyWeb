export default function IsometricShowcase() {
  return (
    <section id="showcase" className="section">
      <h2 className="section-title">编译器级的掌控力</h2>
      <p>
        从泛型特化到显式内存管理，每个设计决策都指向同一个目标：让你写出既简洁又可控的代码。
      </p>
      <ul className="feature-list">
        <li>
          <strong>原生机器码：</strong>
          Cavvy 直接编译为 LLVM IR，再经 LLVM 优化管线生成原生可执行文件。无 VM、无 GC、零运行时依赖。
        </li>
        <li>
          <strong>显式内存管理：</strong>
          Arena 分配、栈分配、手动堆分配完全由你掌控。没有垃圾回收器的暂停，没有隐式分配。
        </li>
        <li>
          <strong>完整 OOP 支持：</strong>
          类、接口、继承、泛型、方法重载、Lambda 表达式——你熟悉的面向对象范式，全部在编译期展开。
        </li>
        <li>
          <strong>FFI 无缝互操作：</strong>
          直接调用 C 函数和库，无需胶水代码。#link 指令声明链接库，extern 声明外部函数。
        </li>
        <li>
          <strong>泛型特化：</strong>
          Vector、Box 等泛型容器在编译期单态化，每种类型生成专属机器码。
        </li>
        <li>
          <strong>完整工具链：</strong>
          从 cayc 编译器到 cavly 包管理器，从 cay-lsp 到 cay-rcpl，开箱即用。
        </li>
      </ul>
    </section>
  );
}

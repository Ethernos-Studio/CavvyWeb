export default function Toolchain() {
  return (
    <section id="toolchain" className="section">
      <h2 className="section-title">完整的工具链生态</h2>
      <p>
        Cavvy 不仅是一门语言，更是一套围绕它构建的工具集合。
      </p>
      <table className="tool-table">
        <thead>
          <tr>
            <th>工具</th>
            <th>说明</th>
            <th>类型</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cayc</td>
            <td>一站式编译器（.cay → .exe）</td>
            <td><span className="tag">核心</span></td>
          </tr>
          <tr>
            <td>cay-ir</td>
            <td>生成 LLVM IR（.cay → .ll）</td>
            <td><span className="tag">中间</span></td>
          </tr>
          <tr>
            <td>ir2exe</td>
            <td>IR 编译器（.ll → .exe）</td>
            <td><span className="tag">链接</span></td>
          </tr>
          <tr>
            <td>cay-check</td>
            <td>代码检查与静态分析</td>
            <td><span className="tag">分析</span></td>
          </tr>
          <tr>
            <td>cay-run</td>
            <td>编译并运行 .cay / .caybc / .ll</td>
            <td><span className="tag">运行</span></td>
          </tr>
          <tr>
            <td>cavly</td>
            <td>包管理器与项目构建工具</td>
            <td><span className="tag">生态</span></td>
          </tr>
          <tr>
            <td>cay-lsp</td>
            <td>语言服务器协议支持</td>
            <td><span className="tag">IDE</span></td>
          </tr>
          <tr>
            <td>cay-rcpl</td>
            <td>交互式 RCPL 环境</td>
            <td><span className="tag">REPL</span></td>
          </tr>
          <tr>
            <td>cay-dt</td>
            <td>Token 调试工具</td>
            <td><span className="tag">调试</span></td>
          </tr>
          <tr>
            <td>cay-dp</td>
            <td>Parser 调试工具</td>
            <td><span className="tag">调试</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default function Philosophy() {
  return (
    <section id="philosophy" className="section">
      <h2 className="section-title">语法即哲学</h2>
      <p>
        Cavvy 的设计目标很简单：让系统编程保持简洁，同时不牺牲对底层的掌控。下面是几个与 C 的对比示例。
      </p>

      <h3 className="subsection-title">Hello World</h3>
      <div className="code-panels">
        <div className="code-panel">
          <div className="code-panel-title">traditional.c</div>
          <pre>
            <code>{`#include <stdio.h>

int main(int argc, char** argv) {
    printf("Hello, World!\\n");
    return 0;
}`}</code>
          </pre>
        </div>
        <div className="code-panel">
          <div className="code-panel-title">hello.cay</div>
          <pre>
            <code>{`fn main() -> i32{
    println("Hello, Cavvy!");
    return 0;
}`}</code>
          </pre>
        </div>
      </div>

      <h3 className="subsection-title">类与继承</h3>
      <div className="code-panels">
        <div className="code-panel">
          <div className="code-panel-title">animal.c</div>
          <pre>
            <code>{`// C 没有类，需要手动管理 vtable
typedef struct {
    char* name;
    void (*speak)(struct Animal*);
} Animal;

Animal* dog_new(char* name) {
    Animal* d = malloc(sizeof(Animal));
    d->name = name;
    d->speak = dog_speak;
    return d;
}`}</code>
          </pre>
        </div>
        <div className="code-panel">
          <div className="code-panel-title">animal.cay</div>
          <pre>
            <code>{`class Animal {
    pub String name;
    pub Animal(String name) {
        this.name = name;
    }
    pub fn speak() {
        println("...");
    }
}

class Dog extends Animal {
    pub Dog(String name) { super(name); }
    @Override
    pub fn speak() {
        println(this.name + " says: 汪汪!");
    }
}`}</code>
          </pre>
        </div>
      </div>

      <h3 className="subsection-title">泛型与类型安全</h3>
      <div className="code-panels">
        <div className="code-panel">
          <div className="code-panel-title">list.c</div>
          <pre>
            <code>{`// C: void* 丢失类型安全
typedef struct {
    void** items;
    int len;
} List;

void* list_get(List* l, int i) {
    return l->items[i];
}`}</code>
          </pre>
        </div>
        <div className="code-panel">
          <div className="code-panel-title">box.cay</div>
          <pre>
            <code>{`class Box<T> {
    pub T value;
    pub Box(T value) { this.value = value; }
    pub fn get() -> T { return this.value; }
}

fn main() -> i32{
    Box<int> box = Box<int>(42);
    let val = box.get(); // 编译期确定类型
    println(val);
    return 0;
}
`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

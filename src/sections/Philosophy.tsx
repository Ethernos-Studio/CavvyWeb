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
            <code>{`public int main() {
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
            <code>{`public class Animal {
    public String name;
    public Animal(String name) {
        this.name = name;
    }
    public void speak() {
        println("...");
    }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public void speak() {
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
            <code>{`public class Box<T> {
    private T value;
    public Box(T value) { this.value = value; }
    public T get() { return this.value; }
}

Box<int> box = new Box<int>(42);
int val = box.get(); // 编译期确定类型`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

// src/data/mockFiles.ts
// Static demo files used until GitHub API is connected
// Replace with real GitHub API calls in Phase 4

export interface MockFile {
    path: string;
    name: string;
    language: string;
    content: string;
}

export const MOCK_FILES: MockFile[] = [
    {
        path: 'WebTech/HTML/Snippets/hello-world.html',
        name: 'hello-world.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello World</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: white;
    }
    h1 {
      font-size: 3rem;
      background: linear-gradient(90deg, #06b6d4, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</head>
<body>
  <h1>Hello, World! 👋</h1>
</body>
</html>`,
    },
    {
        path: 'WebTech/CSS/Snippets/glassmorphism.html',
        name: 'glassmorphism.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Glassmorphism</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #020817, #0f1f3d);
      font-family: sans-serif;
    }
    .orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
    }
    .orb-1 { width: 400px; height: 400px; background: #06b6d4; top: -100px; left: -100px; }
    .orb-2 { width: 300px; height: 300px; background: #818cf8; bottom: -50px; right: -50px; }
    .card {
      position: relative;
      padding: 2rem;
      border-radius: 24px;
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      color: white;
      text-align: center;
      width: 320px;
    }
    h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p  { opacity: 0.7; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="card">
    <h2>✨ Glassmorphism</h2>
    <p>backdrop-filter: blur() creates this frosted glass effect.</p>
  </div>
</body>
</html>`,
    },
    {
        path: 'WebTech/JS/Snippets/counter.html',
        name: 'counter.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Counter</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0a0a;
      font-family: 'Segoe UI', sans-serif;
      color: white;
    }
    .counter {
      text-align: center;
      padding: 2.5rem;
      border-radius: 20px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
    }
    #count { font-size: 5rem; font-weight: 800; color: #06b6d4; line-height: 1; }
    .btns  { display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center; }
    button {
      padding: 0.6rem 1.5rem;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.07);
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover { background: rgba(255,255,255,0.14); transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="counter">
    <div id="count">0</div>
    <p style="opacity:0.5; margin-top:0.5rem">Click to count</p>
    <div class="btns">
      <button onclick="change(-1)">−</button>
      <button onclick="change(1)">+</button>
      <button onclick="reset()">↺</button>
    </div>
  </div>
  <script>
    let n = 0;
    const el = document.getElementById('count');
    function change(d) { n += d; el.textContent = n; el.style.color = n < 0 ? '#f87171' : '#06b6d4'; }
    function reset()   { n = 0;  el.textContent = 0; el.style.color = '#06b6d4'; }
  </script>
</body>
</html>`,
    },
    {
        path: 'Java/Snippets/HelloWorld.java',
        name: 'HelloWorld.java',
        language: 'java',
        content: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Full Stack Journey 🚀");

        // Variables & data types
        String name    = "Imamuddin";
        int    age     = 21;
        double version = 17.0;

        System.out.printf("Name: %s | Age: %d | Java: %.1f%n", name, age, version);
    }
}`,
    },
    {
        path: 'Java/Snippets/OOPDemo.java',
        name: 'OOPDemo.java',
        language: 'java',
        content: `// OOP Concepts: Class, Constructor, Inheritance, Polymorphism
abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public abstract String sound();

    @Override
    public String toString() {
        return name + " says: " + sound();
    }
}

class Dog extends Animal {
    public Dog(String name) { super(name); }

    @Override
    public String sound() { return "Woof! 🐶"; }
}

class Cat extends Animal {
    public Cat(String name) { super(name); }

    @Override
    public String sound() { return "Meow! 🐱"; }
}

public class OOPDemo {
    public static void main(String[] args) {
        Animal[] animals = { new Dog("Bruno"), new Cat("Kitty") };
        for (Animal a : animals) {
            System.out.println(a);
        }
    }
}`,
    },
    {
        path: 'Python/Snippets/hello.py',
        name: 'hello.py',
        language: 'python',
        content: `# Python Basics Demo
print("Hello, World! 🐍")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")

# Dictionary
student = {"name": "Imamuddin", "course": "Java Full Stack", "grade": "A"}
for key, val in student.items():
    print(f"  {key}: {val}")

# Function with default argument
def greet(name="World"):
    return f"Hello, {name}!"

print(greet("Python"))

# Lambda
double = lambda x: x * 2
print(f"Double 7 = {double(7)}")`,
    },
    {
        path: 'SQL/Scripts/basics.sql',
        name: 'basics.sql',
        language: 'sql',
        content: `-- SQL Basics Demo

-- Create table
CREATE TABLE IF NOT EXISTS students (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    NOT NULL,
    course  TEXT    NOT NULL,
    grade   TEXT,
    score   REAL
);

-- Insert data
INSERT INTO students (name, course, grade, score) VALUES
    ('Imamuddin', 'Java Full Stack', 'A', 95.5),
    ('Ali',       'Python',          'B', 82.0),
    ('Sara',      'React JS',        'A', 91.0),
    ('Ravi',      'Spring Boot',     'B', 78.5);

-- Select all
SELECT * FROM students;

-- Filter
SELECT name, score FROM students WHERE score > 80 ORDER BY score DESC;

-- Aggregate
SELECT course, AVG(score) AS avg_score FROM students GROUP BY course;`,
    },
    {
        path: 'SpringBoot/Snippets/RestController.java',
        name: 'RestController.java',
        language: 'java',
        content: `import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final List<String> students = new ArrayList<>();

    // GET all students
    @GetMapping
    public ResponseEntity<List<String>> getAll() {
        return ResponseEntity.ok(students);
    }

    // POST add student
    @PostMapping
    public ResponseEntity<String> add(@RequestBody String name) {
        students.add(name);
        return ResponseEntity.ok("Added: " + name);
    }

    // DELETE student by index
    @DeleteMapping("/{index}")
    public ResponseEntity<String> delete(@PathVariable int index) {
        if (index < 0 || index >= students.size()) {
            return ResponseEntity.badRequest().body("Invalid index");
        }
        String removed = students.remove(index);
        return ResponseEntity.ok("Removed: " + removed);
    }
}`,
    },
    {
        path: 'ReactJS/Snippets/UseStateDemo.tsx',
        name: 'UseStateDemo.tsx',
        language: 'typescript',
        content: `import { useState } from 'react';

interface Todo {
  id:   number;
  text: string;
  done: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggle = (id: number) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>📝 Todo App</h2>
      <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid #333' }}
        />
        <button onClick={add}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
          {todos.filter((t) => t.done).length}/{todos.length} done
        </p>
      )}
    </div>
  );
}`,
    },
];

// Helper: find a mock file by path
export function getMockFile(path: string): MockFile | undefined {
    return MOCK_FILES.find((f) => f.path === path);
}

// Helper: get all files for a course folder
export function getMockFilesForCourse(courseFolder: string): MockFile[] {
    return MOCK_FILES.filter((f) => f.path.startsWith(courseFolder));
}
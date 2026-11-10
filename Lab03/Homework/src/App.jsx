import { useState } from "react";
import "./index.css";

export default function App() {
  const [activeHomework, setActiveHomework] = useState("hw1");

  return (
    <main className="app">
      <header>
        <h1>Lab 03 - React 19 Homework</h1>
        <p>Production React 19</p>
      </header>

      <nav aria-label="Homework navigation">
        <button type="button" onClick={() => setActiveHomework("hw1")}>
          HW1 - Drum Kit
        </button>

        <button type="button" onClick={() => setActiveHomework("hw2")}>
          HW2 - 88-Key Piano
        </button>

        <button type="button" onClick={() => setActiveHomework("hw3")}>
          HW3 - PUBG VN Arena
        </button>
      </nav>

      <section aria-label="Homework content">
        {activeHomework === "hw1" && <h2>Homework 1 - Drum Kit</h2>}

        {activeHomework === "hw2" && <h2>Homework 2 - Grand Piano</h2>}

        {activeHomework === "hw3" && <h2>Homework 3 - PUBG VN Arena</h2>}
      </section>
    </main>
  );
}

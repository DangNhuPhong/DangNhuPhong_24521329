import { useState } from "react";
import "./App.css";
import { DrumMachine } from "./hw1/DrumMachine";

const HOMEWORKS = [
  { id: "hw1", name: "HW1 - Drum Kit" },
  { id: "hw2", name: "HW2 - 88-Key Piano" },
  { id: "hw3", name: "HW3 - PUBG VN Arena" },
];

export default function App() {
  const [activePage, setActivePage] = useState("hw1");

  return (
    <main className="site-shell">
      <header className="site-header">
        <p className="eyebrow">React 19 + Vite</p>
        <h1>Lab 03 - Homework</h1>
        <p>Production React 19</p>
      </header>

      <nav className="site-tabs" aria-label="Homework navigation">
        {HOMEWORKS.map((homework) => (
          <button
            key={homework.id}
            type="button"
            className={activePage === homework.id ? "tab active" : "tab"}
            aria-current={activePage === homework.id ? "page" : undefined}
            onClick={() => setActivePage(homework.id)}
          >
            {homework.name}
          </button>
        ))}
      </nav>

      <section className="panel">
        {activePage === "hw1" && <DrumMachine />}
        {activePage === "hw2" && <h2>Homework 2 - Piano</h2>}
        {activePage === "hw3" && <h2>Homework 3 - PUBG Arena</h2>}
      </section>
    </main>
  );
}

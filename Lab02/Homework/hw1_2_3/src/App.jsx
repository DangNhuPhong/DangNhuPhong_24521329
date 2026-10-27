import { useState } from "react";
import DataGrid from "./hw1/DataGrid.jsx";
import AudioVisualizer from "./hw2/AudioVisualizer.jsx";
import FlashSale from "./hw3/FlashSale.jsx";

const sections = [
  {
    id: "hw1",
    number: "01",
    title: "Data-Grid",
    subtitle: "Accessible data management",
  },
  {
    id: "hw2",
    number: "02",
    title: "Audio Engine",
    subtitle: "FIFO queue and visualizer",
  },
  {
    id: "hw3",
    number: "03",
    title: "Flash Sale",
    subtitle: "Timer and inventory state",
  },
];

export default function App() {
  const [active, setActive] = useState("hw1");

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setActive("hw1")}>
          <span className="brand-mark">L2</span>
          <span>Modern React Lab</span>
        </a>
        <span className="topbar-label">ENGINEERING HOMEWORK · 2026</span>
      </header>

      <section className="hero" id="home">
        <p className="eyebrow">UNIVERSITY OF INFORMATION TECHNOLOGY</p>
        <h1>Modern React Architecture</h1>
        <p className="hero-description">
          Three engineering exercises in one application: accessible data
          management, asynchronous audio processing, and flash-sale state
          management.
        </p>
        <div className="hero-tags">
          <span>React</span>
          <span>Vite</span>
          <span>Web APIs</span>
          <span>State Machines</span>
        </div>
      </section>

      <nav className="homework-nav" aria-label="Homework navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-card ${active === section.id ? "nav-card-active" : ""}`}
            aria-current={active === section.id ? "page" : undefined}
            onClick={() => setActive(section.id)}
          >
            <span className="nav-number">{section.number}</span>
            <span className="nav-title">{section.title}</span>
            <span className="nav-subtitle">{section.subtitle}</span>
          </button>
        ))}
      </nav>

      <div className="workspace">
        {active === "hw1" && <DataGrid />}
        {active === "hw2" && <AudioVisualizer />}
        {active === "hw3" && <FlashSale />}
      </div>

      <footer className="footer">
        <span>Lab 02 · Modern React Architecture</span>
        <span>One project · Three homework modules</span>
      </footer>
    </main>
  );
}

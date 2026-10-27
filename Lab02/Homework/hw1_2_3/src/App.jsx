import { lazy, Suspense, useState } from "react";

const DataGrid = lazy(() => import("./hw1/DataGrid.jsx"));
const AudioVisualizer = lazy(() => import("./hw2/AudioVisualizer.jsx"));
const FlashSale = lazy(() => import("./hw3/FlashSale.jsx"));
const Inventory = lazy(() => import("./hw3/Inventory.jsx"));

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
  {
    id: "inventory",
    number: "04",
    title: "Inventory",
    subtitle: "Stock reservation and checkout",
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
          Four engineering modules in one application: accessible data
          management, asynchronous audio processing, flash-sale state
          management, and inventory reservations.
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
            type="button"
            className={`nav-card ${
              active === section.id ? "nav-card-active" : ""
            }`}
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
        <Suspense fallback={<p role="status">Loading module...</p>}>
          {active === "hw1" && <DataGrid />}
          {active === "hw2" && <AudioVisualizer />}
          {active === "hw3" && <FlashSale />}
          {active === "inventory" && <Inventory />}
        </Suspense>
      </div>

      <footer className="footer">
        <span>Lab 02 · Modern React Architecture</span>
        <span>One project · Four modules</span>
      </footer>
    </main>
  );
}

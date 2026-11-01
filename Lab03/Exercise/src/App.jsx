import { useState } from "react";
import { DeveloperCard } from "./components/DeveloperCard.jsx";
import { ScientistDirectory } from "./components/ScientistDirectory.jsx";
import { SquadSelector } from "./components/SquadSelector.jsx";
import { PubgMatchTelemetry } from "./components/PubgMatchTelemetry.jsx";

export function App() {
  const [squadId, setSquadId] = useState("te");
  return (
    <main>
      <h1>Lab 3 — Production React 19</h1>
      <section aria-label="Exercise 1">
        <DeveloperCard />
      </section>
      <section aria-label="Exercise 2">
        <ScientistDirectory />
      </section>
      <section aria-label="Exercise 3">
        <h2>PUBG VN Telemetry</h2>
        <SquadSelector value={squadId} onChange={setSquadId} />
        <PubgMatchTelemetry squadId={squadId} />
      </section>
    </main>
  );
}

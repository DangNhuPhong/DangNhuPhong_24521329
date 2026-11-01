import { DeveloperCard } from "./components/DeveloperCard.jsx";
import { ScientistDirectory } from "./components/ScientistDirectory.jsx";
export function App() {
  return (
    <main>
      <h1>Lab 3 — Production React 19</h1>
      <section aria-label="Exercise 1">
        <DeveloperCard />
      </section>
      <section aria-label="Exercise 2">
        <ScientistDirectory />
      </section>
      <section aria-label="Exercise 3"></section>
    </main>
  );
}

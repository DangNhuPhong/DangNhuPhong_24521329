import { useId, useState } from "react";
import styles from "./ScientistDirectory.module.css";
export const SMART_PEOPLE = [
  { id: "sp-1", name: "Johann Goethe", age: 82, iq: 210 },
  { id: "sp-2", name: "Albert Einstein", age: 76, iq: 205 },
  { id: "sp-3", name: "Leonardo da Vinci", age: 67, iq: 180 },
  { id: "sp-4", name: "Isaac Newton", age: 84, iq: 190 },
  { id: "sp-5", name: "James Maxwell", age: 48, iq: 190 },
  { id: "sp-6", name: "William Sidis", age: 46, iq: 200 },
];

export function ScientistDirectory({ initialData = SMART_PEOPLE }) {
  // State
  const [people] = useState(initialData);
  const [query, setQuery] = useState("");
  const [minIq, setMinIq] = useState(160);
  const [sortBy, setSortBy] = useState("iq-desc");

  // Unique IDs
  const qId = useId();
  const iqId = useId();
  const sortId = useId();

  // Search
  const q = query.trim().toLowerCase();

  // Filter and sort
  const visible = people
    .filter((p) => p.name.toLowerCase().includes(q) && p.iq >= minIq)
    .toSorted((a, b) => (sortBy === "iq-desc" ? b.iq - a.iq : a.age - b.age));

  // Handle IQ input
  const handleIq = (e) => {
    const v = e.target.valueAsNumber;
    setMinIq(Number.isNaN(v) ? 0 : v);
  };
  const handleDelete = (id) =>
    setPeople((prev) => prev.filter((p) => p.id !== id));
  const handleReset = () => setPeople(initialData);

  return (
    <section aria-labelledby="dir-title" className={styles.directory}>
      <h2 id="dir-title">Pioneer Directory</h2>

      <form
        role="search"
        className={styles.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <label htmlFor={qId}>Name</label>

        <input
          id={qId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search scientist..."
        />

        <label htmlFor={iqId}>Min IQ</label>

        <input id={iqId} type="number" value={minIq} onChange={handleIq} />

        <label htmlFor={sortId}>Sort by</label>

        <select
          id={sortId}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="iq-desc">IQ (high to low)</option>
          <option value="age-asc">Age (young to old)</option>
        </select>
      </form>

      <ul className={styles.list}>
        {visible.map((p) => (
          <li key={p.id}>
            {p.name} — IQ {p.iq}, Age {p.age}
            <button
              type="button"
              onClick={() => handleDelete(p.id)}
              aria-label={`Delete ${p.name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <output role="status" aria-live="polite">
        Found {visible.length} pioneers
      </output>
      {visible.length === 0 && <p>No pioneers match your filters.</p>}

      {visible.length === 0 && <p>No scientist found.</p>}
    </section>
  );
}

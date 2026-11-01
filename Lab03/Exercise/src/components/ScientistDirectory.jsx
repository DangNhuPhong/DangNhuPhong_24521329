import { useId, useState } from "react";

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

  return (
    <section aria-labelledby="dir-title">
      <h2 id="dir-title">Pioneer Directory</h2>

      <form role="search" onSubmit={(e) => e.preventDefault()}>
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

      <ul>
        {visible.map((p) => (
          <li key={p.id}>
            {p.name} — IQ {p.iq}, Age {p.age}
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p>No scientist found.</p>}
    </section>
  );
}

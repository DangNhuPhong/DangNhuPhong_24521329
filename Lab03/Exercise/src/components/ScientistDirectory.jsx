import { useState } from "react";
const [people, setPeople] = useState(initialData);
export const SMART_PEOPLE = [
  { id: "sp-1", name: "Johann Goethe", age: 82, iq: 210 },
  { id: "sp-2", name: "Albert Einstein", age: 76, iq: 205 },
  { id: "sp-3", name: "Leonardo da Vinci", age: 67, iq: 180 },
  { id: "sp-4", name: "Isaac Newton", age: 84, iq: 190 },
  { id: "sp-5", name: "James Maxwell", age: 48, iq: 190 },
  { id: "sp-6", name: "William Sidis", age: 46, iq: 200 },
];

export function ScientistDirectory({ initialData = SMART_PEOPLE }) {
  return (
    <section aria-labelledby="dir-title">
      <h2 id="dir-title">Pioneer Directory</h2>
      <ul>
        {people.map((p) => (
          <li key={p.id}>
            {p.name} — IQ {p.iq}, Age {p.age}
          </li>
        ))}
      </ul>
    </section>
  );
}

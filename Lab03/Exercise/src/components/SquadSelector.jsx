import styles from "./SquadSelector.module.css";
const SQUADS = [
  { id: "ces", label: "Cerberus Esports" },
  { id: "te", label: "The Expendables" },
  { id: "ge", label: "Genius Esports" },
];

export function SquadSelector({ value, onChange }) {
  return (
    <nav className={styles.nav} aria-label="Select squad">
      {SQUADS.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-pressed={value === s.id}
          onClick={() => onChange(s.id)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}

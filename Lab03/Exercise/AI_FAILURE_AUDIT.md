# AI_FAILURE_AUDIT.md

## Failure #01: Redundant `useEffect` for filtered list (Exercise 2)

- **Prompt**: "Add a name search to ScientistDirectory."
- **AI Code**:
  ```jsx
  const [filtered, setFiltered] = useState(people);
  useEffect(() => {
    setFiltered(
      people.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    );
  }, [people, query]);
  ```
- **Bug**: The filtered list is derived data, but the AI stored it in extra state and synced it in an effect, so every keystroke renders twice.
- **DevTools Proof**: React Profiler shows 2 commits per typed character. (Screenshot: ……)
- **Engineering Fix (commit ……)**: Removed `filtered` and the effect; `visible` is computed during render. Profiler now shows 1 commit.

## Failure #02: Fetch without `AbortController` (Exercise 3)

- **Prompt**: "Fetch squad telemetry when squadId changes."
- **AI Code**:
  ```jsx
  useEffect(() => {
    fetch("/mock/pubg/" + squadId + ".json")
      .then((r) => r.json())
      .then((data) => setView({ status: "SUCCESS", data, error: null }));
  }, [squadId]);
  ```
- **Bug**: No cleanup, no abort, no `res.ok` check and no error state. A slow response for an old squad can overwrite the newer one.
- **DevTools Proof**: On Slow 3G, clicking CES, TE, GE quickly shows no `(canceled)` requests, and the panel can end on the wrong squad. (Screenshot: ……)
- **Engineering Fix (commit ……)**: Added `AbortController`, passed `signal` to `fetch`, returned `() => controller.abort()` and ignored `AbortError`. Earlier requests now show `(canceled)`.

## Failure #03: `.sort()` mutates state and index keys (Exercise 2)

- **Prompt**: "Sort the list by IQ and render it."
- **AI Code**:
  ```jsx
  const sorted = people.sort((a, b) => b.iq - a.iq);
  return (
    <ul>
      {sorted.map((p, i) => (
        <li key={i}>{p.name}</li>
      ))}
    </ul>
  );
  ```
- **Bug**: `.sort()` reorders the state array in place, and since `useState(initialData)` shares that reference, `initialData` is changed too. Index keys also make React reuse the wrong rows after delete or sort.
- **DevTools Proof**: Sort by age, then click Reset: the list does not return to the original order. Deleting a row also leaves the wrong items in place. (Screenshot: ……)
- **Engineering Fix (commit ……)**: Used `.toSorted()` on a filtered copy and `key={p.id}`. Reset now restores the original order.

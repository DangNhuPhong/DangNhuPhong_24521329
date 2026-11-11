import { useId, useState } from "react";
import { SQUADS } from "./pubgData";

const FIELDS = {
  wwcdCount: "WWCD",
  placementPts: "Placement Points",
  killPts: "Kill Points",
};

export function SquadLeaderboard() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("wwcdCount");

  const queryId = useId();
  const sortId = useId();

  const results = SQUADS.filter((squad) =>
    squad.squadName.toLowerCase().includes(query.trim().toLowerCase()),
  ).toSorted(
    (a, b) => b[sort] - a[sort] || a.squadName.localeCompare(b.squadName),
  );

  return (
    <section className="panel" aria-labelledby="standings-heading">
      <h3 id="standings-heading">PVS Vietnam Leaderboard</h3>

      <div className="filter-row">
        <div>
          <label htmlFor={queryId}>Filter Squads</label>

          <input
            id={queryId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={sortId}>Sort Descending</label>

          <select
            id={sortId}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            {Object.entries(FIELDS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <output role="status" aria-live="polite">
        Showing {results.length} squads
      </output>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Squad</th>
              <th>WWCD</th>
              <th>Placement</th>
              <th>Kills</th>
            </tr>
          </thead>

          <tbody>
            {results.map((squad) => (
              <tr key={squad.squadId}>
                <th scope="row">{squad.squadName}</th>
                <td>{squad.wwcdCount}</td>
                <td>{squad.placementPts}</td>
                <td>{squad.killPts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

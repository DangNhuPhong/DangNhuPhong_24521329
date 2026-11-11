import { useId, useMemo, useRef, useState } from "react";

import { KILL_FEED, SQUADS } from "./pubgData";

const ROW_HEIGHT = 38;
const VISIBLE_COUNT = 12;

export function KillFeed() {
  const [squad, setSquad] = useState("all");
  const [scrollY, setScrollY] = useState(0);

  const filterId = useId();
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    if (squad === "all") {
      return KILL_FEED;
    }

    return KILL_FEED.filter((item) => item.squadId === squad);
  }, [squad]);

  const start = Math.max(0, Math.floor(scrollY / ROW_HEIGHT) - 3);

  const end = Math.min(filtered.length, start + VISIBLE_COUNT + 6);

  const windowed = filtered.slice(start, end);

  const changeSquad = (value) => {
    setSquad(value);
    setScrollY(0);

    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  return (
    <section className="panel" aria-labelledby="feed-heading">
      <h3 id="feed-heading">Virtualized Kill Feed</h3>

      <label htmlFor={filterId}>Filter Squad</label>

      <select
        id={filterId}
        value={squad}
        onChange={(event) => changeSquad(event.target.value)}
      >
        <option value="all">All Squads</option>

        {SQUADS.map((item) => (
          <option key={item.squadId} value={item.squadId}>
            {item.squadName}
          </option>
        ))}
      </select>

      <p className="muted">
        {filtered.length} events. Only visible rows are rendered.
      </p>

      <div
        ref={listRef}
        className="feed-window"
        tabIndex={0}
        onScroll={(event) => setScrollY(event.currentTarget.scrollTop)}
        aria-label="Scrollable PUBG kill events"
      >
        <div
          style={{
            height: filtered.length * ROW_HEIGHT,
            position: "relative",
          }}
        >
          {windowed.map((item, index) => (
            <div
              className="feed-line"
              key={item.id}
              style={{
                top: (start + index) * ROW_HEIGHT,
                height: ROW_HEIGHT,
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

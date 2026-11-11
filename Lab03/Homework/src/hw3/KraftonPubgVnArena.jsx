import { useState } from "react";
import { INITIAL_DROPS } from "./pubgData";
import { AirdropCard } from "./AirdropCard";
import { SquadLeaderboard } from "./SquadLeaderboard";
import { KillFeed } from "./KillFeed";

import "./KraftonPubgVnArena.css";

export function KraftonPubgVnArena() {
  const [drops] = useState(() => {
    const start = Date.now();

    return INITIAL_DROPS.map((drop) => ({
      ...drop,
      dropEpochMs: start + drop.delayMs,
      expiryEpochMs: start + drop.delayMs + drop.liveMs,
    }));
  });

  return (
    <section className="stack" aria-labelledby="arena-heading">
      <section className="panel">
        <h2 id="arena-heading">HW3 - KRAFTON PUBG Vietnam Arena</h2>

        <p className="muted">
          Demo platform using anti-drift timers, optimistic inventory, and PUBG
          Vietnam leaderboard.
        </p>
      </section>

      <section className="stack" aria-labelledby="drop-heading">
        <h3 id="drop-heading">Timed Drops</h3>

        <div className="drop-grid">
          {drops.map((drop) => (
            <AirdropCard key={drop.id} drop={drop} />
          ))}
        </div>
      </section>

      <SquadLeaderboard />
      <KillFeed />
    </section>
  );
}

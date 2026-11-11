import { useState } from "react";
import { usePubgAirdropTimer } from "./usePubgAirdropTimer";
import { useCrateClaim } from "./useCrateClaim";
import { ClaimButton } from "./ClaimButton";
import { formatVnd } from "./pubgData";

function formatClock(ms) {
  const seconds = Math.ceil(ms / 1000);

  return (
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}` +
    ":" +
    `${String(seconds % 60).padStart(2, "0")}`
  );
}

export function AirdropCard({ drop }) {
  const [force409, setForce409] = useState(false);

  const { stock, status, message, claim } = useCrateClaim(drop.remainingStock);

  const opening = usePubgAirdropTimer(drop.dropEpochMs);

  const closing = usePubgAirdropTimer(drop.expiryEpochMs);

  const phase =
    opening.remainingMs > 0
      ? "WARMUP"
      : closing.remainingMs === 0
        ? "EXPIRED"
        : stock === 0
          ? "LOOTED_OUT"
          : "AIRDROP_LIVE";

  const handleClaim = () => {
    void claim(drop.id, force409);
    setForce409(false);
  };

  return (
    <article className="panel drop-card" aria-label={drop.title}>
      <div className="row">
        <h3>{drop.title}</h3>
        <span className="pill">{phase}</span>
      </div>

      <p className="price">{formatVnd(drop.priceVnd)}</p>

      <p>
        Stock: <strong>{stock}</strong>
      </p>

      <p className="countdown" aria-label="Airdrop countdown">
        {phase === "WARMUP"
          ? `Opening in ${formatClock(opening.remainingMs)}`
          : phase === "EXPIRED"
            ? "Drop closed"
            : `Closing in ${formatClock(closing.remainingMs)}`}
      </p>

      <ClaimButton
        disabled={phase !== "AIRDROP_LIVE" || status === "pending"}
        onClaim={handleClaim}
      />

      <label className="force-conflict">
        <input
          type="checkbox"
          checked={force409}
          onChange={(event) => setForce409(event.target.checked)}
        />
        Force 409 on next claim (demo)
      </label>

      <p
        className="claim-status"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message || "No claim yet"}
      </p>
    </article>
  );
}

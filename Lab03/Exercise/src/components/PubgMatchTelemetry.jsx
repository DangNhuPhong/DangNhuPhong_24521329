
import { useEffect, useState } from "react";
import { fetchKraftonPubgTelemetry } from "../services/pubgTelemetry.js";

export function PubgMatchTelemetry({ squadId = "te" }) {
  const [view, setView] = useState({
    status: "IDLE",
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    setView({
      status: "LOADING",
      data: null,
      error: null,
    });

    fetchKraftonPubgTelemetry(squadId, {
      signal: controller.signal,
    })
      .then((data) => {
        setView({
          status: "SUCCESS",
          data,
          error: null,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;

        setView({
          status: "ERROR",
          data: null,
          error: err.message,
        });
      });

    return () => {
      controller.abort();
    };
  }, [squadId]);

  // Loading state
  if (view.status === "LOADING" || view.status === "IDLE") {
    return <p>Syncing KRAFTON Radar...</p>;
  }

  // Error state
  if (view.status === "ERROR") {
    return <p>Blue-Zone Link Lost: {view.error}</p>;
  }

  // Success state
  if (view.status === "SUCCESS" && view.data) {
    return (
      <article>
        <h3>{view.data.name}</h3>

        <dl>
          <dt>Map</dt>
          <dd>{view.data.map}</dd>

          <dt>Phase</dt>
          <dd>{view.data.phase}</dd>

          <dt>Alive</dt>
          <dd>{view.data.alive}</dd>

          <dt>Kills</dt>
          <dd>{view.data.kills}</dd>

          <dt>WWCD</dt>
          <dd>{view.data.wwcdProb}</dd>

          <dt>Status</dt>
          <dd>{view.data.status}</dd>
        </dl>
      </article>
    );
  }

  return null;
}
import { useEffect, useRef, useState } from "react";
import { AudioQueue } from "./AudioQueue.js";

export default function AudioVisualizer() {
  const queueRef = useRef(null);
  const canvasRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);

  const [url, setUrl] = useState("");

  const [snapshot, setSnapshot] = useState({
    queue: [],
    activeTask: null,
    closed: false,
  });

  const [message, setMessage] = useState("Enter a direct audio URL to begin.");

  const [currentTrack, setCurrentTrack] = useState(null);
  const [loadedTracks, setLoadedTracks] = useState([]);

  useEffect(() => {
    const queue = new AudioQueue();
    queueRef.current = queue;

    const unsubscribe = queue.subscribe(setSnapshot);

    return () => {
      unsubscribe();

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch {
          // The source may already have stopped.
        }

        sourceRef.current.disconnect();
        sourceRef.current = null;
      }

      queue.close().catch(() => {});
    };
  }, []);

  function draw(analyser, canvas) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bins = new Uint8Array(analyser.frequencyBinCount);

    function frame() {
      if (!canvas.isConnected || sourceRef.current === null) {
        animationRef.current = null;
        return;
      }

      analyser.getByteFrequencyData(bins);

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barWidth = width / bins.length;

      bins.forEach((value, index) => {
        const barHeight = (value / 255) * height;

        ctx.fillStyle = `hsl(${190 + (index / bins.length) * 120} 75% 55%)`;

        ctx.fillRect(
          index * barWidth,
          height - barHeight,
          Math.max(1, barWidth - 1),
          barHeight,
        );
      });

      animationRef.current = requestAnimationFrame(frame);
    }

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    frame();
  }

  async function loadTrack(event) {
    event.preventDefault();

    const audioUrl = url.trim();

    if (!audioUrl || !queueRef.current) {
      setMessage("Please provide a valid audio URL.");
      return;
    }

    setMessage("Adding audio task to FIFO queue...");

    try {
      const result = await queueRef.current.enqueue(audioUrl);

      setLoadedTracks((previous) => {
        if (previous.some((track) => track.id === result.id)) {
          return previous;
        }

        return [...previous, result];
      });

      setCurrentTrack(result);
      setMessage(`Track ${result.id} loaded and decoded successfully.`);
      setUrl("");
    } catch (error) {
      setMessage(
        error.name === "AbortError"
          ? "Audio task cancelled."
          : `Failed to load audio: ${error.message}`,
      );
    }
  }

  async function playTrack() {
    if (!currentTrack) {
      setMessage("Load a track successfully before playing it.");
      return;
    }

    try {
      const context = await queueRef.current.getContext();

      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch {
          // The source may already have ended.
        }

        sourceRef.current.disconnect();
        sourceRef.current = null;
      }

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      const source = context.createBufferSource();
      const analyser = context.createAnalyser();

      analyser.fftSize = 512;
      source.buffer = currentTrack.audioBuffer;

      source.connect(analyser);
      analyser.connect(context.destination);

      sourceRef.current = source;
      analyserRef.current = analyser;

      source.onended = () => {
        if (sourceRef.current === source) {
          sourceRef.current = null;

          if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }

          setMessage("Playback finished.");
        }
      };

      source.start();

      draw(analyser, canvasRef.current);
      setMessage(`Playing track ${currentTrack.id}.`);
    } catch (error) {
      setMessage(`Playback failed: ${error.message}`);
    }
  }

  function stopPlayback() {
    const source = sourceRef.current;

    if (source) {
      sourceRef.current = null;

      try {
        source.stop();
      } catch {
        // The source may already have ended.
      }

      source.disconnect();
    }

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setMessage("Playback stopped.");
  }

  const allTasks = [
    ...(snapshot.activeTask ? [snapshot.activeTask] : []),
    ...snapshot.queue,
  ];

  return (
    <section className="panel" aria-labelledby="audio-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HOMEWORK 02</p>
          <h2 id="audio-heading">Audio Queue Visualizer</h2>
          <p>FIFO task processing, audio decoding and frequency analysis.</p>
        </div>

        <span className="status-pill">
          {snapshot.activeTask ? "Processing" : "Queue idle"}
        </span>
      </div>

      <form className="audio-form" onSubmit={loadTrack}>
        <label className="search-field">
          Direct audio URL
          <input
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/audio.mp3"
            required
          />
        </label>

        <button className="button button-primary" type="submit">
          Add to queue
        </button>
      </form>

      <p className="notice" role="status" aria-live="polite">
        {message}
      </p>

      <div className="audio-controls">
        <button
          className="button button-primary"
          onClick={playTrack}
          disabled={!currentTrack}
        >
          Play loaded track
        </button>

        <button className="button button-secondary" onClick={stopPlayback}>
          Stop
        </button>
      </div>

      <div className="visualizer-frame">
        <canvas
          ref={canvasRef}
          width="900"
          height="220"
          aria-label="Live audio frequency spectrum"
          role="img"
        />
      </div>

      <div className="section-heading compact-heading">
        <h3>FIFO queue</h3>
        <span className="muted">{allTasks.length} pending or active</span>
      </div>

      {allTasks.length === 0 ? (
        <p className="empty-state">No pending tasks.</p>
      ) : (
        <ul className="task-list">
          {allTasks.map((task) => (
            <li key={task.id} className="task-row">
              <div>
                <strong>Task #{task.id}</strong>
                <p className="truncate">{task.url}</p>
                <span className="muted">{task.status}</span>
              </div>

              <button
                className="button button-secondary"
                onClick={() => queueRef.current?.cancel(task.id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="section-heading compact-heading">
        <h3>Successfully loaded tracks</h3>
        <span className="muted">{loadedTracks.length} tracks</span>
      </div>

      {loadedTracks.length === 0 ? (
        <p className="empty-state">
          No tracks have been loaded successfully yet.
        </p>
      ) : (
        <ul className="task-list">
          {loadedTracks.map((track) => (
            <li key={track.id} className="task-row">
              <div>
                <strong>Track #{track.id}</strong>
                <p className="truncate">{track.url}</p>
                <span className="muted">SUCCESS</span>
              </div>

              <button
                className="button button-primary"
                onClick={() => {
                  setCurrentTrack(track);
                  setMessage(`Track ${track.id} selected for playback.`);
                }}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="help-text">
        Audio URLs must be reachable and permit browser cross-origin requests
        (CORS). The queue processes one task at a time, preserving FIFO order.
        FFT size is 512, giving 256 frequency bins.
      </p>
    </section>
  );
}

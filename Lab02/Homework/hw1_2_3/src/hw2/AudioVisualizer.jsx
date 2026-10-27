import { useEffect, useRef, useState } from "react";
import { AudioQueue } from "./AudioQueue.js";

export default function AudioVisualizer() {
  const queueRef = useRef(null);
  const canvasRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);

  const playbackListRef = useRef([]);
  const playbackIndexRef = useRef(0);
  const isPlayingRef = useRef(false);

  const [url, setUrl] = useState("");
  const [snapshot, setSnapshot] = useState({
    queue: [],
    activeTask: null,
    closed: false,
  });
  const [message, setMessage] = useState("Enter a direct audio URL to begin.");
  const [loadedTracks, setLoadedTracks] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const queue = new AudioQueue();
    queueRef.current = queue;

    const unsubscribe = queue.subscribe(setSnapshot);

    return () => {
      unsubscribe();

      isPlayingRef.current = false;

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

  function stopAnimation() {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function draw(analyser, canvas) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bins = new Uint8Array(analyser.frequencyBinCount);

    function frame() {
      if (!canvas.isConnected || !isPlayingRef.current) {
        animationRef.current = null;
        return;
      }

      analyser.getByteFrequencyData(bins);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / bins.length;

      ctx.clearRect(0, 0, width, height);

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

    stopAnimation();
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

        return [...previous, result].sort((a, b) => a.id - b.id);
      });

      setMessage(`Track ${result.id} loaded successfully.`);
      setUrl("");
    } catch (error) {
      setMessage(
        error.name === "AbortError"
          ? "Audio task cancelled."
          : `Failed to load audio: ${error.message}`,
      );
    }
  }

  function playNextTrack() {
    if (!isPlayingRef.current) return;

    const tracks = playbackListRef.current;
    const index = playbackIndexRef.current;

    if (index >= tracks.length) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setCurrentTrackId(null);
      stopAnimation();
      setMessage("All tracks have finished playing.");
      return;
    }

    const track = tracks[index];

    playbackIndexRef.current += 1;
    setCurrentTrackId(track.id);
    setMessage(`Playing track ${track.id} (${index + 1}/${tracks.length}).`);

    const context = queueRef.current.context;

    if (!context || context.state === "closed") {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setMessage("Audio context is unavailable. Press Play to try again.");
      return;
    }

    const source = context.createBufferSource();
    const analyser = context.createAnalyser();

    analyser.fftSize = 512;
    source.buffer = track.audioBuffer;

    source.connect(analyser);
    analyser.connect(context.destination);

    sourceRef.current = source;
    analyserRef.current = analyser;

    source.onended = () => {
      if (sourceRef.current !== source) return;

      source.disconnect();
      sourceRef.current = null;

      if (isPlayingRef.current) {
        stopAnimation();
        playNextTrack();
      }
    };

    source.start();
    draw(analyser, canvasRef.current);
  }

  async function startPlayback() {
    if (isPlayingRef.current) {
      setMessage("Playback is already running.");
      return;
    }

    if (loadedTracks.length === 0) {
      setMessage("Load at least one track before playing.");
      return;
    }

    try {
      await queueRef.current.getContext();

      // Play all successfully loaded tracks, oldest first.
      playbackListRef.current = [...loadedTracks].sort((a, b) => a.id - b.id);

      playbackIndexRef.current = 0;
      isPlayingRef.current = true;
      setIsPlaying(true);

      playNextTrack();
    } catch (error) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setMessage(`Playback failed: ${error.message}`);
    }
  }

  function stopPlayback() {
    // Prevent onended from advancing to another track.
    isPlayingRef.current = false;
    setIsPlaying(false);

    const source = sourceRef.current;
    sourceRef.current = null;

    if (source) {
      source.onended = null;

      try {
        source.stop();
      } catch {
        // The source may already have stopped.
      }

      source.disconnect();
    }

    stopAnimation();
    setCurrentTrackId(null);
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
          onClick={startPlayback}
          disabled={isPlaying || loadedTracks.length === 0}
        >
          Play all (FIFO)
        </button>

        <button
          className="button button-secondary"
          onClick={stopPlayback}
          disabled={!isPlaying}
        >
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
        <h3>FIFO loading queue</h3>
        <span className="muted">{allTasks.length} pending or active</span>
      </div>

      {allTasks.length === 0 ? (
        <p className="empty-state">No pending loading tasks.</p>
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
        <h3>Loaded tracks — playback order</h3>
        <span className="muted">{loadedTracks.length} tracks</span>
      </div>

      {loadedTracks.length === 0 ? (
        <p className="empty-state">
          No tracks have been loaded successfully yet.
        </p>
      ) : (
        <ul className="task-list">
          {loadedTracks.map((track, index) => (
            <li key={track.id} className="task-row">
              <div>
                <strong>
                  {index + 1}. Track #{track.id}
                  {currentTrackId === track.id ? " — PLAYING" : ""}
                </strong>
                <p className="truncate">{track.url}</p>
                <span className="muted">SUCCESS</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="help-text">
        Loading and playback both follow FIFO order. Press Play all (FIFO) to
        play every successfully loaded track, starting with the oldest. Playback
        advances automatically when each track ends. Audio URLs must allow
        browser cross-origin requests (CORS).
      </p>
    </section>
  );
}

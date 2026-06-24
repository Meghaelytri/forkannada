export function AudioPlayer() {
  return (
    <div className="ch-audio-row">
      <button className="play-btn" aria-label="Play audio">
        ▶
      </button>
      <div className="ch-audio-meta">
        <strong>Mallakamba</strong>
        3:02 / 8:42
        <div className="ch-audio-prog" />
      </div>
    </div>
  );
}

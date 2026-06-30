type AudioPlayerProps = {
  title: string;
  audioUrl?: string;
};

export function AudioPlayer({ title, audioUrl }: AudioPlayerProps) {
  return (
    <div className="ch-audio-row">
      <button className="play-btn" aria-label="Play audio">
        Play
      </button>
      <div className="ch-audio-meta">
        <strong>{title}</strong>
        {audioUrl ? "Audio available" : "Audio coming soon"}
        <div className="ch-audio-prog" />
      </div>
    </div>
  );
}

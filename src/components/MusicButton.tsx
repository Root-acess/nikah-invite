interface MusicButtonProps {
  playing: boolean;
  onToggle: () => void;
}

export function MusicButton({ playing, onToggle }: MusicButtonProps) {
  return (
    <button
      type="button"
      className={`music ${playing ? 'is-playing' : ''}`}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span className="music__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}

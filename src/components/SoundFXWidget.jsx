import { useSound } from "../hooks/useSound";

export default function SoundFXWidget() {
  const { soundEnabled, toggleSound, playPop } = useSound();

  const handleToggle = () => {
    toggleSound();
    if (!soundEnabled) {
      setTimeout(() => playPop(), 50);
    }
  };

  return (
    <div className="soundfx-widget-dock" title={soundEnabled ? "Mute UI Sound FX" : "Enable UI Sound FX"}>
      <button
        type="button"
        className={`btn-soundfx-toggle ${soundEnabled ? "active" : ""}`}
        onClick={handleToggle}
        aria-label={soundEnabled ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
      >
        {soundEnabled ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <span className="sound-bars-indicator">
              <span className="s-bar s1" />
              <span className="s-bar s2" />
              <span className="s-bar s3" />
            </span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            <span className="sound-muted-text">Muted</span>
          </>
        )}
      </button>
    </div>
  );
}

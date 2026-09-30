import { useTheme } from "../hooks/useTheme";

export default function ThemePaletteSwitcher() {
  const { accent, changeAccent, accents } = useTheme();

  return (
    <aside
      className="theme-palette-switcher"
      aria-label="Color Palette Switcher"
      role="radiogroup"
    >
      <div className="palette-switcher-inner">
        <span className="palette-label-group" title="Switch Theme Accent">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
          </svg>
          <span className="palette-label-text">Theme</span>
        </span>

        <div className="palette-dots-track">
          {accents.map((item) => {
            const isActive = accent === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={`Select ${item.name} theme`}
                className={`palette-color-dot ${isActive ? "active" : ""}`}
                style={{ "--dot-color": item.color }}
                onClick={() => changeAccent(item.id)}
                title={item.name}
              >
                <span className="dot-color-fill" />
                {isActive && (
                  <span className="dot-active-indicator" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

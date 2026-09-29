import { useTheme } from "./hooks/useTheme";
import CommandCenterStage from "./components/CommandCenterStage";

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();

  return (
    <div className="stark-portfolio-root">
      <CommandCenterStage theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

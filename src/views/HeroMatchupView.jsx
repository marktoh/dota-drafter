import { useOutletContext } from "react-router-dom";
import "./HeroMatchupView.css";

function HeroMatchupView() {
  const { description } = useOutletContext();
  return (
    <div className="hero-matchup-view">
      <pre>{description}</pre>
    </div>
  );
}

export default HeroMatchupView;

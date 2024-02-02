import { useParams, Outlet } from "react-router-dom";
import HeroCard from "../components/HeroCard";
import HEROES from "../mock/heroes.json";

import "./HeroViewLayout.css";

function HeroViewLayout() {
  const { heroId } = useParams();
  const hero = HEROES.find((hero) => hero.id === parseInt(heroId));
  if (!hero) return <p>Hero does not exist.</p>;
  return (
    <div className="hero-view">
      <HeroCard hero={hero} />
      <Outlet />
    </div>
  );
}

export default HeroViewLayout;

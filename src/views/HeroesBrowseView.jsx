import { useNavigate } from "react-router-dom";
import HeroesView from "./HeroesView";

function HeroesBrowseView() {
  const navigate = useNavigate();
  function navigateToHeroView(id) {
    navigate(`/heroes/${id}`);
  }
  return <HeroesView onClickFn={navigateToHeroView} />;
}

export default HeroesBrowseView;

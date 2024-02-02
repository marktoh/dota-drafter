import OpenDotaImage from "./OpenDotaImage";
import "./HeroPreview.css";

function HeroPreview({ heroId, img, name, onClickFn = () => {} }) {
  return (
    <div className="hero-preview" onClick={() => onClickFn(heroId)}>
      <OpenDotaImage path={img} />
      <div className="name">{name}</div>
    </div>
  );
}

export default HeroPreview;

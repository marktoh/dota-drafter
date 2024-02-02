import { imageUrl } from "../api/open-dota-url";
import "./OpenDotaImage.css";

/**
 * Example: /apps/dota2/images/dota_react/heroes/muerta.png?
 *
 * @param {String} path A path representing the image file location.
 * @returns
 */
function OpenDotaImage({ path }) {
  const completePath = imageUrl + path;
  return <img className="open-dota-image" src={completePath} alt={path} />;
}

export default OpenDotaImage;

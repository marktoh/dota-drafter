import './OpenDotaImage.css';

/**
 * Example: /apps/dota2/images/dota_react/heroes/muerta.png?
 * 
 * @param {String} path A path representing the image file location.
 * @returns 
 */
function OpenDotaImage({ path }) {
    const BASE_URL = "https://cdn.cloudflare.steamstatic.com";
    const completePath = BASE_URL + path
    return (
        <img className="open-dota-image" src={completePath} alt={path} />
    )
}

export default OpenDotaImage;
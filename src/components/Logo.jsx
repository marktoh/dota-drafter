import White from '../img/compact_light.jpeg';
import Dark from '../img/compact_dark.jpeg';
import './Logo.css';

function Logo({ theme }) {
    if (theme) {
        return <img className="logo" src={Dark} alt="Logo" />
    }
    return (
        <img className="logo" src={White} alt="Logo" />
    )
}
export default Logo;
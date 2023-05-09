import { Link } from 'react-router-dom';
import './Header.css';

function Header({ mode, onModeClick }) {
    return (
        <header className={`header ${mode ? 'dark' : 'light'}`}>
            <div className="logo">
                <Link to="/">
                    Dota Drafter
                </Link>
            </div>
            <div className="theme-btn" onClick={() => onModeClick(!mode)}>
                switch mode
            </div>
        </header>
    )
}

export default Header;
import Logo from './Logo';
import './Footer.css';
function Footer({ theme }) {
    return (
        <footer className="footer">
            <div className="block">
                <span className="copyright">Copyright © 2023 Mumbo Solutions. All rights reserved.</span>
                <div className="logo-container">
                    <Logo theme={theme} />
                </div>
            </div>
        </footer>
    )
}

export default Footer;
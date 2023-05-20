import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Profile({ user }) {
    const navigate = useNavigate();
    return (
        <div className="user-profile" onClick={() => navigate('/auth')}>
            <img src={user?.picture} alt="profile" />
            <div className="user-details">
                <div className="name">{user?.name}</div>
                <div className="email">{user?.email}</div>
            </div>
        </div>
    )
}
function LogInButton() {
    const navigate = useNavigate();
    return (
        <div className="login-btn" onClick={() => navigate('/auth')}>
            log in
        </div>
    )
}
function Supplementary({ user }) {
    return user ? <Profile user={user} /> : <LogInButton />
}
function Header({ mode, onModeClick, user }) {
    return (
        <header className={`header ${mode ? 'dark' : 'light'}`}>
            <div className="logo">
                <Link to="/">
                    <div className="text">
                        <h1 className="initial">D</h1>
                        <div className="right">
                            <div className="top">ota</div>
                            <div className="bottom">drafter</div>
                        </div>
                    </div>
                </Link>
            </div>
            <Supplementary user={user} />
        </header>
    )
}

export default Header;
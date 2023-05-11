import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import './LogoutFromGoogleForm.css'

function LogoutFromGoogleForm({ setUser }) {
    const navigate = useNavigate();
    function handleLogout() {
        googleLogout();
        setUser(undefined);
        navigate(-1);
    }
    return (
        <div className="log-out-from-google-form">
            <h1>Log out from Google</h1>
            <div className="log-out-btn" onClick={handleLogout}>log out</div>
        </div>
    )
}

export default LogoutFromGoogleForm;
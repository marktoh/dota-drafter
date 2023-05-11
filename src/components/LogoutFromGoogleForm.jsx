import { googleLogout } from '@react-oauth/google';

import './LogoutFromGoogleForm.css'

function LogoutFromGoogleForm({ onLogoutSuccess }) {
    function handleLogout() {
        googleLogout();
        onLogoutSuccess();
    }
    return (
        <div className="log-out-from-google-form">
            <h1>Log out from Google</h1>
            <div className="log-out-btn" onClick={handleLogout}>log out</div>
        </div>
    )
}

export default LogoutFromGoogleForm;
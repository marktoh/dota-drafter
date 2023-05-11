import Auth from '../components/Auth'

import './SignInWithGoogleForm.css';

function SignInWithGoogleForm({ onLoginSuccess }) {
    return (
        <div className="sign-in-with-google-form">
            <h1>Sign in with Google</h1>
            <Auth onLoginSuccess={onLoginSuccess} />
        </div>
    )
}

export default SignInWithGoogleForm;
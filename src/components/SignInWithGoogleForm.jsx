import Auth from '../components/Auth'

import './SignInWithGoogleForm.css';

function SignInWithGoogleForm({ setUser }) {
    return (
        <div className="sign-in-with-google-form">
            <h1>Sign in with Google</h1>
            <Auth setUser={setUser} />
        </div>
    )
}

export default SignInWithGoogleForm;
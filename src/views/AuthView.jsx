import LogoutFromGoogleForm from '../components/LogoutFromGoogleForm';
import SignInWithGoogleForm from '../components/SignInWithGoogleForm';
import './AuthView.css';

function Display({ user, setUser }) {
    return user ? 
        <LogoutFromGoogleForm setUser={setUser} /> :
        <SignInWithGoogleForm setUser={setUser} />
}
function AuthView({ user, setUser }) {
    return (
        <div className="auth-view">
            <Display user={user} setUser={setUser} />
        </div>
    )
}

export default AuthView;
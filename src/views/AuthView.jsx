import LogoutFromGoogleForm from "../components/LogoutFromGoogleForm";
import SignInWithGoogleForm from "../components/SignInWithGoogleForm";
import "./AuthView.css";

function Display({ user, onLoginSuccess, onLogoutSuccess }) {
  return user ? (
    <LogoutFromGoogleForm onLogoutSuccess={onLogoutSuccess} />
  ) : (
    <SignInWithGoogleForm onLoginSuccess={onLoginSuccess} />
  );
}
function AuthView({ user, onLoginSuccess, onLogoutSuccess }) {
  return (
    <div className="auth-view">
      <Display
        user={user}
        onLoginSuccess={onLoginSuccess}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default AuthView;

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Auth({ onLoginSuccess }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const decoded = jwt_decode(credentialResponse.credential);
        onLoginSuccess(decoded);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
      auto_select
    />
  );
}

export default Auth;

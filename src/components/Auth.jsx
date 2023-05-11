import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

function Auth({ setUser }) {
    const navigate = useNavigate();
    return (
        <GoogleLogin
        onSuccess={credentialResponse => {
            const decoded = jwt_decode(credentialResponse.credential);
            setUser(decoded);
            navigate(-1);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        useOneTap
        auto_select
        />
    )
}

export default Auth;
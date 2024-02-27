import { generateRandomString } from '../util/Util';

const Login = () => {

    const AUTH_URL = 'https://accounts.spotify.com/authorize';
    const redirect_uri = 'http://localhost:3000';
    const scope = 'user-read-private user-read-email user-read-currently-playing';

    const handleLogin = async () => {
        let state = generateRandomString(16);

        const queryParams = new URLSearchParams({
            response_type: 'code',
            client_id: '56925b59a5d246ccbace29a84d16e154',
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            show_dialog: true
        });

        window.location.href = `${AUTH_URL}?${queryParams.toString()}`;
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <button onClick={handleLogin}>Login Here</button>
        </div>
    )
}

export default Login;

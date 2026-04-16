
/**
 * Login component that provides a button to initiate Fitbit OAuth authentication.
 * Redirects the user to Fitbit's authorization page when clicked.
 */
const Login = () => {
    const handleLogin = () => {
        const clientId = import.meta.env.VITE_FITBIT_CLIENT_ID;
        const redirectUri = encodeURIComponent('http://localhost:5173/callback');
        const scope = encodeURIComponent('nutrition');
        const responseType = 'code';

        const authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = authUrl;
    };

    return <div className="flex items-center justify-center min-h-screen flex-col">
         <button
          className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login to Fitbit
        </button>
    </div>
}

export default Login
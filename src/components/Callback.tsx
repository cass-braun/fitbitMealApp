import React, { useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Callback component that handles the OAuth callback from Fitbit.
 * Exchanges the authorization code for an access token and stores it in local storage.
 */
const Callback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const exchangeCodeForToken = useCallback(async (code: string) => {
    const clientId = import.meta.env.VITE_FITBIT_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_FITBIT_CLIENT_SECRET;
    const redirectUri = 'http://localhost:5173/callback';

    const response = await fetch('https://api.fitbit.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code: code,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('fitbit_access_token', data.access_token);
        localStorage.setItem('fitbit_refresh_token', data.refresh_token);
        navigate('/');
    } else {
        console.error('Failed to exchange code for token');
        navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
        exchangeCodeForToken(code);
        } else {
        // Handle error
        console.error('No code in URL');
        navigate('/');
        }
  }, [searchParams, navigate, exchangeCodeForToken]);

  return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Authenticating...</p>
        </div>
  );
};

export default Callback;
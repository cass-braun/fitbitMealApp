import React, { useState } from 'react';
import Login from './Login';

/**
 * Home page component that displays the main content and manages authentication state.
 * Shows the word "Home" and provides login/logout functionality based on authentication status.
 */
const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('fitbit_access_token'));

  const handleLogout = () => {
        localStorage.removeItem('fitbit_access_token');
        localStorage.removeItem('fitbit_refresh_token');
        setIsAuthenticated(false);
  };

  if(!isAuthenticated) return <Login />
  
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
        <h1 className="text-4xl font-bold mb-4">Home</h1>

        <div className="flex flex-col items-center">
            <p className="mb-4">You are logged in!</p>
            <button
                className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    </div>
  );
};

export default Home;
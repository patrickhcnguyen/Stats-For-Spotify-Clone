import React, { useState, useEffect } from 'react';
import Navbar from './Pages/Navbar/navbar';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:8888/check-login-status', { 
          credentials: 'include',
        });
  
        const data = await response.json(); // Parse JSON response
        console.log("Login Status:", data.isLoggedIn);
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };
  
    checkLoginStatus();
  }, []);
  

  const handleLogin = () => {
    window.location.href = 'http://localhost:8888/login';
  };

  const handleLogout = async () => {
    await fetch('/logout', { credentials: 'include' });
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar title="Spotify Stats" isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      {isLoggedIn ? (
        <div>Welcome back!</div>
      ) : (
        <div>Please log in to access more features.</div>
      )}
    </div>
  );
};

export default App;

/**
 <>
 </> is a React fragment which we use to group multiple elements without adding unnecessary HTML elements like <div>
 */
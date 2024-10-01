import React, { useState, useEffect } from 'react';
import Navbar from './Pages/Navbar/navbar';
import Hero from './Pages/Hero/hero';

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
    <>
      <div>
        <Navbar title="Spotify Stats" isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
      <div>
        <Hero title="Welcome to Stats For Spotify" isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
    </>
  );
};

export default App;

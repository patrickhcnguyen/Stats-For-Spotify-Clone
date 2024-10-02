import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import Hero from './Components/Hero/hero';
import Box from './Components/Box/box';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:8888/check-login-status', { 
          credentials: 'include',
        });
  
        const data = await response.json();
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
    <Router>
      <Navbar 
        title="Stats For Spotify"
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <Hero title="Welcome to Stats For Spotify" isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="flex bg-gray-100"> 
        <Box /> 
        <Routes>
          {/* <Route path="/track/top" element={<TopTracks />} />
          <Route path="/artist/top" element={<TopArtists />} />
          <Route path="/genre/top" element={<TopGenres />} /> */}
          <Route path="/track/recent" element={<h1>Recently Played</h1>} />
          <Route path="/" element={<h1>Home Page Content</h1>} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;



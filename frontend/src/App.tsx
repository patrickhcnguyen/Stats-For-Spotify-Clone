import React, { useState } from 'react';
import Homepage from './Pages/Homepage/homepage';
import Navbar from './Pages/Navbar/navbar'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {

    setIsLoggedIn(true);
  };

  const handleLogout = () => {

    setIsLoggedIn(false);
  };

  return (
    <>
      {/* <Homepage /> */}
      <Navbar 
        title="Music Dashboard"
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </>
  );
}

export default App;

/**
 <>
 </> is a React fragment which we use to group multiple elements without adding unnecessary HTML elements like <div>
 */
import React from 'react';
import Homepage from './Pages/Homepage/homepage';
import Navbar from './Pages/Navbar/navbar'

function App() {
  return (
    <>
      {/* <Homepage /> */}
      <Navbar />
    </>
  );
}

export default App;

/**
 <>
 </> is a React fragment which we use to group multiple elements without adding unnecessary HTML elements like <div>
 */
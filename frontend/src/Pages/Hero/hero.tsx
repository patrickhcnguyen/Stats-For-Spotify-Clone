import React from 'react';

interface HeroProps {
  title: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, isLoggedIn, onLogin, onLogout }) => {
  return (
    <div
      style={{
        backgroundColor: '#99e0ff',
        backgroundImage: `
          radial-gradient(at 91% 82%, hsla(56, 60%, 74%, 1) 0px, transparent 50%), 
          radial-gradient(at 94% 98%, hsla(218, 60%, 70%, 1) 0px, transparent 50%),
          radial-gradient(at 25% 89%, hsla(188, 60%, 68%, 1) 0px, transparent 50%),
          radial-gradient(at 77% 64%, hsla(58, 50%, 77%, 1) 0px, transparent 50%),
          radial-gradient(at 26% 61%, hsla(73, 60%, 65%, 1) 0px, transparent 50%),
          radial-gradient(at 7% 69%, hsla(325, 60%, 69%, 1) 0px, transparent 50%),
          radial-gradient(at 4% 27%, hsla(347, 60%, 69%, 1) 0px, transparent 50%)
        `,
      }}
      className="w-full h-64 flex flex-col items-center justify-center"
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      {isLoggedIn ? (
        <p className="mt-2 text-lg">Welcome back!</p>
      ) : (
        <p className="mt-2 text-lg">Please log in to access more features.</p>
      )}
    </div>
  );
};

export default Hero;

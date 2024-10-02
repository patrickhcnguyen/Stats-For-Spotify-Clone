import React from 'react';
import { useLocation } from 'react-router-dom';
import { TopTracks, TopArtists, TopGenres, Recent } from '../TopData/topData';

const Box: React.FC = () => {
  const location = useLocation(); 
  const pathname = location.pathname; 

  const renderComponent = () => {
    switch (pathname) {
      case '/track/top':
        return <TopTracks />;
      case '/artist/top':
        return <TopArtists />;
      case '/genre/top':
        return <TopGenres />;
      case '/track/recent':
        return <Recent />;
      default:
        return <div>Select a category to view the stats.</div>; 
    }
  };

  return (
    <div className="border-black border-2 p-4 w-1/4 bg-gray-100 ml-12 mt-4 drop-shadow-lg">
      <h1 className="text-lg font-bold">Music Stats</h1>
      {renderComponent()} 
    </div>
  );
};

export default Box;

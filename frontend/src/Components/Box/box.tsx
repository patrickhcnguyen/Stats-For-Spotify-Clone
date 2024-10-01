import React from 'react';
import { TopTracks } from '../TopData/topData';

const Box: React.FC = () => {
  return (
    <div className="border-black border-2 p-4 w-1/4 bg-gray-100">
      <h1 className="text-lg font-bold">Music Stats</h1>
      <TopTracks />
    </div>
  );
};

export default Box;


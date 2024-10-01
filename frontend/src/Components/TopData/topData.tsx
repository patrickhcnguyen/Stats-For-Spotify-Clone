import React, { useEffect, useState } from 'react';

interface Track {
  name: string;
  artist: string;
}

export const TopTracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch('http://localhost:8888/top-tracks?time_range=short_term', {
          method: 'GET',
          credentials: 'include', // This was the fix lol
        });

        console.log('Response Status:', response.status);
        
        if (!response.ok) {
          const text = await response.text();
          console.error('Response Text:', text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON directly
        const trackData = data.items.map((item: any) => ({
          name: item.name,
          artist: item.artists[0].name,
        }));
        setTracks(trackData);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <div>
      <h2>Top Tracks</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            {index + 1}. {track.name} by {track.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};


// interface Artist {
//   name: string;
// }

// interface Genre {
//   name: string;
// }

// export const TopArtists: React.FC = () => {
//   const [artists, setArtists] = useState<Artist[]>([]);

//   useEffect(() => {
//     const fetchTopArtists = async () => {
//       const response = await fetch('/top-artists'); 
//       const data = await response.json();
//       const artistData = data.items.map((item: any) => ({
//         name: item.name,
//       }));
//       setArtists(artistData);
//     };

//     fetchTopArtists();
//   }, []);

//   return (
//     <div>
//       <h2>Top Artists</h2>
//       <ul>
//         {artists.map((artist, index) => (
//           <li key={index}>{index + 1}. {artist.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export const TopGenres: React.FC = () => {
//   const [genres, setGenres] = useState<Genre[]>([]);

//   useEffect(() => {
//     const fetchTopGenres = async () => {
//       const response = await fetch('/top-genres'); 
//       const data = await response.json();
//       const genreData = data.items.map((item: any) => ({
//         name: item.name,
//       }));
//       setGenres(genreData);
//     };

//     fetchTopGenres();
//   }, []);

//   return (
//     <div>
//       <h2>Top Genres</h2>
//       <ul>
//         {genres.map((genre, index) => (
//           <li key={index}>{index + 1}. {genre.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

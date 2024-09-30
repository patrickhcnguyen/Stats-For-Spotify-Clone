const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://accounts.spotify.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(cookieParser());

const authRoutes = require('./Components/auth');
const topArtistsRoutes = require('./Components/topArtists');
const topTrackRoutes = require('./Components/topTracks');
const topGenreRoutes = require('./Components/topGenres');

app.use(authRoutes);
app.use(topArtistsRoutes);
app.use(topTrackRoutes);
app.use(topGenreRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

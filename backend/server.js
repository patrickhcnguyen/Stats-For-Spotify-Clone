require('dotenv').config();

const express = require('express');
var cors = require('cors');
var crypto = require('crypto')
var querystring = require('querystring')
var request = require('request')

// need to figure out why these vars dont work when using .env 
// const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
// const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
// const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const client_id = "54da85c1c7114ffb810148c9cbdede29";
const client_secret = "e2abdb2c6d594b229a47f11aabeb7f92";
var redirect_uri = 'http://localhost:8888/callback';


const generateRandomString = (length) => {
    return crypto
    .randomBytes(60)
    .toString('hex')
    .slice(0, length);
}

var stateKey = 'spotify_auth_state'

const app = express();

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Spotify Authentication Service");
});

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

 app.get('/callback', function(req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
    } else {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        // Use 'request' to send the token request
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;
                console.log("Access token is:", access_token )

                // Redirect to your frontend or handle the tokens as needed
                res.redirect('/#' + querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
            } else {
                console.error('Token exchange error:', body); // Log the error response
                res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
            }
        });
    }
});

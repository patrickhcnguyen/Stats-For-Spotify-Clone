const express = require('express');
const request = require('request');
const router = express.Router();

// Assuming you've already got the necessary imports and setup

// Route to get user profile information
router.get('/profile', function(req, res) {
    const accessToken = req.cookies.access_token; // Access the access token from cookies

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        json: true
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.json(body); // Send back the user profile information
        } else {
            console.error('Error fetching user profile:', body);
            res.status(response.statusCode).json(body); // Send error response
        }
    });
});

module.exports = router;

require('dotenv').config();
const querystring = require('querystring');
const redirect_uri = 'http://localhost:5000/callback/'

const login = async (req, res) => {
    const scope = 'user-read-private user-read-email'

    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        show_dialog: true
    }));
}


module.exports = {
    login
}
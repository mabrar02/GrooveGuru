require('dotenv').config();
const querystring = require('querystring');

const redirect_uri = 'http://localhost:3000'
const apiEndpoint = 'https://accounts.spotify.com/api/token';


const login = async (req, res) => {
    let code = req.query.code || null;
    let state = req.query.state || null;
    
    if(code === null){
        res.json({
            "error": "state_mismatch"
        });
    }
    else{
        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + 
                (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            },
            body: `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
            json: true
        };

    fetch(apiEndpoint, authOptions)
        .then((response) => {
            if(response.status === 200){
                response.json().then((data) => {
                    let access_token = data.access_token
                    let refresh_token = data.refresh_token
                    let expires_in = data.expires_in
                    res.json({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        expires_in: expires_in
                    });

                });
            } 
            else {
                res.json({
                    "error": "invalid_token"
                });
            }
        });
    }
}

const refreshToken = async(req, res) => {
    console.log('refreshing');
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization' : 'Basic ' + 
            (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    }

    fetch(apiEndpoint, authOptions)
        .then((response) => {
            if(response.status === 200){
                response.json().then((data) => {
                    let access_token = data.access_token;
                    let expires_in = data.expires_in
                    res.json({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        expires_in: expires_in
                    });
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.json({
                "error":error
            });
        });
}

module.exports = {
    login,
    refreshToken
}
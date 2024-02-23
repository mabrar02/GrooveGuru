require('dotenv').config();
const querystring = require('querystring');
const redirect_uri = 'http://localhost:5000/auth/callback/'

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const apiEndpoint = 'https://accounts.spotify.com/api/token';

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
  
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
}

  
const login = async (req, res) => {
    const scope = 'user-read-private user-read-email'
    let state = generateRandomString(16);

    res.redirect(authEndpoint + 
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            show_dialog: true
        }));
}

const callback = async (req, res) => {
    let code = req.query.code || null;
    let state = req.query.state || null;
    
    if(state === null){
        res.redirect('/#' +
        querystring.stringify({
            error: 'state_mismatch'
        }));
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
            console.log(res.status);
            if(response.status === 200){
                response.json().then((data) => {
                    let access_token = data.access_token
                    let refresh_token = data.refresh_token
                    res.redirect('/#' + querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
                    console.log("access: " + access_token + "\nrefresh: " + refresh_token);
                })
            } 
            else {
                res.redirect('/#' + querystring.stringify({
                    error: 'invalid_token'
                }));
            }
        });
    }
}

const refreshToken = async(req, res) => {
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
                    const access_token = data.access_token;
                    res.send({access_token});
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
}

module.exports = {
    login,
    callback,
    refreshToken
}
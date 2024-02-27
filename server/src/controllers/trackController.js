require('dotenv').config();

const currentlyPlayingEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';

const getCurrentTrack = async (req, res) => {
    let token = req.query.token || null;

    if(token === null){
        res.json({
            "error": "invalid_token"
        });
    }
    else{
        fetch(currentlyPlayingEndpoint, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response) => response.json())
        .then((data) => {
            //console.log(data.item.external_urls.spotify);
            if(!data || !data.is_playing){
                res.json({
                    "error":"song not playing"
                })
            }
            else{
                res.json(data);
            }

        })
        .catch((error) => {
            console.log(error);
            res.json({
                "error":error
            });
        });
    }
}

module.exports = {
    getCurrentTrack
}
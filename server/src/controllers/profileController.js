require('dotenv').config();

const apiEndpoint = 'https://api.spotify.com/v1/me';

const profileInfo = async (req, res) => {
    let token = req.query.token || null;

    if(token === null){
        res.json({
            "error": "invalid_token"
        });
    }
    else{
        fetch(apiEndpoint, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response) => response.json())
        .then((data) => {
            res.json(data);
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
    profileInfo
}
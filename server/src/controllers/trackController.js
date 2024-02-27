require('dotenv').config();

const currentlyPlayingEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';
const recommendationsEndpoint = 'https://api.spotify.com/v1/recommendations';
const featuresEndpoint = 'https://api.spotify.com/v1/audio-features/';

const getSimilarFromTrack = async (req, res) => {
    let token = req.query.token || null;
    let trackId = req.query.trackId || null;

    const params = new URLSearchParams();

    if(token === null) {
        res.json({
            "error":"invalid_token"
        });
    }
    else if(trackId === null){
        res.json({
            "error":"invalid_trackId"
        });
    }
    else{
        params.append('limit', process.env.SONG_REC_LIMIT);
        params.append('seed_tracks', trackId);

        const recUrl = `${recommendationsEndpoint}?${params.toString()}`;

        fetch(recUrl, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response) => response.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.json({"error":error});
        });
    }
}

const getSimilarFromGenre = async (req, res) => {
    let token = req.query.token || null;
    let genre = req.query.genre || null;

    const params = new URLSearchParams();

    if(token === null) {
        res.json({
            "error":"invalid_token"
        });
    }
    else if(genre === null){
        res.json({
            "error":"invalid_genre"
        });
    }
    else{
        params.append('limit', process.env.SONG_REC_LIMIT);
        params.append('seed_genres', genre);

        const recUrl = `${recommendationsEndpoint}?${params.toString()}`;

        fetch(recUrl, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response) => response.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.json({"error":error});
        });
    }
}

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
            console.log(data.item.external_urls.spotify);
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

const getAudioFeatures = async (req, res) => {
    let token = req.query.token || null;
    let trackId = req.query.trackId || null;

    if(token === null) {
        res.json({
            "error":"invalid_token"
        });
    }
    else if(trackId === null){
        res.json({
            "error":"invalid_trackId"
        });
    }
    else{
        fetch(featuresEndpoint + trackId, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response) => response.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.json({"error":error});
        });
    }
}

const getSimilarFromFeatures = async (req, res) => {
    let token = req.query.token || null;
    let trackId = req.query.trackId || null;

    let energy = req.query.energy || null;
    let acoustic = req.query.acoustic || null;
    let dance = req.query.dance || null;
    let popularity = req.query.popularity || null;
    let mood = req.query.mood || null;

    const params = new URLSearchParams();

    if(token === null) {
        res.json({
            "error":"invalid_token"
        });
    }
    else if(trackId === null){
        res.json({
            "error":"invalid_trackId"
        });
    }
    else{
        params.append('limit', process.env.SONG_REC_LIMIT);
        params.append('seed_tracks', trackId);

        if(energy != null){
            params.append('target_energy', energy);
        }
        if(acoustic != null){
            params.append('target_acousticness', acoustic);
        }
        if(dance != null){
            params.append('target_danceability', dance);
        }
        if(popularity != null){
            params.append('target_popularity', popularity);
        }
        if(mood != null){
            params.append('target_valence', mood);
        }

        console.log(params.toString());

        const recUrl = `${recommendationsEndpoint}?${params.toString()}`;

        fetch(recUrl, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response) => response.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.json({"error":error});
        });
    }
}
module.exports = {
    getCurrentTrack,
    getSimilarFromTrack,
    getSimilarFromGenre,
    getAudioFeatures,
    getSimilarFromFeatures
}
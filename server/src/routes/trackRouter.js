const express = require('express')
const {getCurrentTrack, getSimilarFromTrack, getSimilarFromGenre, getAudioFeatures, getSimilarFromFeatures} = require("../controllers/trackController");
const router = express.Router()

router.get('/current', getCurrentTrack);
router.get('/features', getAudioFeatures);
router.get('/rec/song', getSimilarFromTrack);
router.get('/rec/genre', getSimilarFromGenre);
router.get('/rec/features', getSimilarFromFeatures);

module.exports = router
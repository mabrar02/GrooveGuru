const express = require('express')
const {getCurrentTrack} = require("../controllers/trackController");
const router = express.Router()

router.get('/current', getCurrentTrack);

module.exports = router
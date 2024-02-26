const express = require('express')
const {profileInfo} = require("../controllers/profileController");
const router = express.Router()

router.get('/info', profileInfo);

module.exports = router
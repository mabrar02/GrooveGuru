const express = require('express')
const {login, refreshToken} = require("../controllers/authController");
const router = express.Router()

router.get('/login', login);
router.get('/refresh', refreshToken);

module.exports = router
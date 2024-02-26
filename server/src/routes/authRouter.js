const express = require('express')
const {login, callback, refreshToken} = require("../controllers/authController");
const router = express.Router()

router.get('/login', login);
router.get('/refresh', refreshToken);
router.get('/test', (req, res) => {
    res.json({"msg": "test"});
})

module.exports = router
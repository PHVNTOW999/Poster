const express = require('express');
const {login, register, current} = require("../controllers/user");
const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.get('/register', current)

module.exports = router;
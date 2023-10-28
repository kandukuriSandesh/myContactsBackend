const express = require('express');
const { loginUser, registerUser, currentUser } = require('../controllers/userController');
const tokenAuthHandler = require('../middlewares/tokenAuthorisation');

const router = express.Router();

router.post('/login',loginUser)

router.post('/register',registerUser)

router.get('/current',tokenAuthHandler,currentUser)

module.exports = router

const { registrerPost, loginPost } = require('../controllers/auth');

const router = require('express').Router();


router.post('/register', registrerPost)

router.post('/login', loginPost)

module.exports = router;
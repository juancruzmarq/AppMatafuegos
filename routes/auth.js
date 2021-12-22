const { registerPost, loginPost } = require('../controllers/auth');

const router = require('express').Router();


router.post('/register', registerPost);

router.post('/login', loginPost);

module.exports = router;
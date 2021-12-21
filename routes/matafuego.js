const router = require('express').Router();
const { matafuegosPost } = require('../controllers/matafuegos');


router.post('/', matafuegosPost);

module.exports = router;
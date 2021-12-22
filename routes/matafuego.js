const router = require('express').Router();
const { matafuegosPost } = require('../controllers/matafuegos');


router.post('/:id', matafuegosPost);

module.exports = router;
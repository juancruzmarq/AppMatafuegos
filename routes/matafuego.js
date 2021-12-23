const router = require('express').Router();
const { matafuegosPost, matafuegosDelete, matafuegosPut } = require('../controllers/matafuegos');


router.post('/:id', matafuegosPost);
router.delete('/:id', matafuegosDelete);
router.put('/:id', matafuegosPut);


module.exports = router;
const { admin } = require('../controllers/admin');
const router = require('express').Router();
const {validarJWT} = require('../controllers/validaToken')

router.get('/', validarJWT, admin);

module.exports = router;
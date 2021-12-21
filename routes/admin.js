const { admin } = require('../controllers/admin');
const {validaToken} = require('../controllers/validaToken')
const router = require('express').Router();

router.get('/', validaToken, admin);

module.exports = router;
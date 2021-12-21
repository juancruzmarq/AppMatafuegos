const router = require('express').Router();
const { clientePost, clientesGet, clienteGet } = require('../controllers/clientes');


router.post('/', clientePost ) 
router.get('/', clientesGet)
router.get('/buscar/:id', clienteGet);

module.exports = router;
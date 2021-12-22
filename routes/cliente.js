const router = require('express').Router();
const { clientePost, clientesGet, clienteGet, clientePut, clienteDelete } = require('../controllers/clientes');


router.post('/', clientePost ) 
router.get('/', clientesGet)
router.get('/buscar/:id', clienteGet);
router.put('/actualizar/:id', clientePut);
router.delete('/eliminar/:id', clienteDelete);

module.exports = router;
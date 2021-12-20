const router = require('express').Router();

const Cliente = require('../models/Cliente');


router.post('/', async(req,res)=>{

    const cliente = new Cliente({
        name: req.body.name,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        cuil: req.body.cuil,
        matafuegos: []
    })

    
        try{
            const clienteDB = await cliente.save()
            res.json({
                error: null,
                data: clienteDB
            })
        }catch(error){
            res.status(400).json(error)
        }

})

module.exports = router;
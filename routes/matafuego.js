const router = require('express').Router();

const Matafuego = require('../models/Matafuego');


router.post('/', async(req,res)=>{

    // Formato YYYY-mm-dd
    const fecha = new Date(req.body.fechaCarga)
    

    const matafuego = new Matafuego({
        nroInterno: req.body.nroInterno,
        codigo: req.body.codigo,
        fechaCarga:  fecha,
        clienteID: req.body.clienteID
    })
 
        try{
            const matafuegoDB = await matafuego.save()
            res.json({
                error: null,
                data: matafuegoDB
            })
        }catch(error){
            res.status(400).json(error)
        }

})

module.exports = router;
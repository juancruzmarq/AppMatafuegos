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


router.get('/', async(req,res)=>{


    const[total, clientes] = await Promise.all([
        Cliente.countDocuments(),
        Cliente.find().select('name')
    ])

    res.json({
        total,
        clientes
    })
    

})


router.get('/buscar', async(req,res)=>{

    const id = req.body._id;

    const cliente = await Cliente.findOne({_id: id})

    res.json({
        cliente
    });
    
})

module.exports = router;
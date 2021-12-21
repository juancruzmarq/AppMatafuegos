const Cliente = require('../models/Cliente');

const clientePost =  async(req,res)=>{

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
}

const clientesGet = async(req,res)=>{


    const[total, clientes] = await Promise.all([
        Cliente.countDocuments(),
        Cliente.find().select('name')
    ])

    res.json({
        total,
        clientes
    })
}

const clienteGet =async(req, res) => {
    let id = req.params.id;
    await Cliente.find({ _id: id }, function(err, clienteBD) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ningún cliente con ese id',
                err
            });
        } else {
            return res.json({
                success: true,
                cliente: clienteBD
            });
        }
    })
}


module.exports = {
    clientePost,
    clientesGet,
    clienteGet
}
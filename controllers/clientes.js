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

const clienteGet = async(req, res) => {
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


const clientePut = async(req,res) =>{
    let id = req.params.id;
    const {name, email, telefono, direccion, cuil} = req.body;

    const cliente = await Cliente.find({_id: id})

    if(cliente){
        await Cliente.findOneAndUpdate(id,{name: name, 
            email: email, telefono: telefono, direccion: direccion, cuil:cuil });
        
        const clienteActualizado = await Cliente.find({_id: id})
        
            res.json({
                clienteActualizado
            })
    }else{
        return res.status(400).json({
            msg: "No se pudo actualizar el cliente"
        })
    }

    

}

const clienteDelete = async(req,res)=>{

    const {id} = req.params;

    const existe = await Cliente.findById(id)

    if(existe){
        const clienteDelete = await Cliente.findByIdAndDelete(id);
    
        if(clienteDelete){
            res.json({
                msg: "Cliente eliminado",
                clienteDelete
            })  
        }else{
            res.status(400).json({
                msg: "no se pudo eliminar el cliente"
            })
        }

    }else{
        res.status(400).json({
            msg: "El cliente no existe"
        })
    }

}

module.exports = {
    clientePost,
    clientesGet,
    clienteGet,
    clientePut,
    clienteDelete
}
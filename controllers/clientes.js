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
    const cliente = await Cliente.findOne({_id: id})

    if(cliente){
        res.json({
            cliente
        })
    }else{
        res.status(400).json({
            msg: "Cliente no encontrado"
        })
    }
}


const clientePut = async(req,res) =>{
    let id = req.params.id;
    const {name, email, telefono, direccion, cuil} = req.body;

    const cliente = await Cliente.find({_id: id})

    if(cliente){
        await Cliente.findOneAndUpdate({_id:id},{name: name, 
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

    let id = req.params.id;

    const existe = await Cliente.find({_id: id});

    if(existe){
        const clienteDeleted = await Cliente.findByIdAndDelete(id);
    
        if(clienteDeleted){
            res.json({
                msg: "Cliente eliminado correctamente",
                clienteDeleted
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
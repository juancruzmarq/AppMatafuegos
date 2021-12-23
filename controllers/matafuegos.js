
const Cliente = require('../models/Cliente');
const Matafuego = require('../models/Matafuego');

const matafuegosPost =  async(req,res)=>{

    // Formato YYYY-mm-dd
    const fecha = new Date(req.body.fechaCarga)
    const id = req.params.id;

    const matafuego = new Matafuego({
        nroInterno: req.body.nroInterno,
        codigo: req.body.codigo,
        fechaCarga:  fecha,
    })
     
    console.log(matafuego);
    try{
        await Cliente.findByIdAndUpdate(id, { $push: { 'matafuegos': matafuego } })
        const cliente = await Cliente.findOne({_id: id})
        res.json({
            error: null,
            data: cliente
        })
            
                

    }catch(error){
        res.status(400).json(error)
    }
    
}

const matafuegosDelete = async(req,res)=>{

    let id = req.params.id;
    const matafuegoID = req.body.id;


    const existe = await Cliente.find({_id: id});

    if(existe){
        const matafuegosDelete = await Cliente.findOneAndUpdate({_id: id}, {$pull: {matafuegos: {_id: matafuegoID}}}, {safe: true, multi:false});
        const cliente = await Cliente.findById(id)
        if(matafuegosDelete){
            res.json({
                msg: "Matafuego eliminado correctamente",
                cliente
            })  
        }else{
            res.status(400).json({
                msg: "no se pudo eliminar el matafuego"
            })
        }

    }else{
        res.status(400).json({
            msg: "El cliente no existe"
        })
    }

}

const matafuegosPut = async(req,res)=>{

    let id = req.params.id;
    const matafuegoID = req.body.id;
    const {nroInterno, codigo, fechaCarga} = req.body;

    const existe = await Cliente.find({_id: id});

    if(existe){
        const matafuegosDelete = await Cliente.updateOne({_id: id, "matafuegos.id": matafuegoID }, {$set: {"matafuegos.$.nroInterno":nroInterno, "matafuegos.$.codigo": codigo, "matafuegos.$.fechaCarga": fechaCarga}});

        const cliente = await Cliente.findById(id)
        if(matafuegosDelete){
            res.json({
                msg: "Matafuego eliminado correctamente",
                cliente
            })  
        }else{
            res.status(400).json({
                msg: "no se pudo eliminar el matafuego"
            })
        }

    }else{
        res.status(400).json({
            msg: "El cliente no existe"
        })
    }

}



module.exports ={
    matafuegosPost,
    matafuegosDelete,
    matafuegosPut

}
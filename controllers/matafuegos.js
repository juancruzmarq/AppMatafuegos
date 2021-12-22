
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

module.exports ={
    matafuegosPost
}
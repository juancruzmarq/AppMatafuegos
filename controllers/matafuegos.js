
const Cliente = require('../models/Cliente');
const Matafuego = require('../models/Matafuego');

const matafuegosPost =  async(req,res)=>{

    // Formato YYYY-mm-dd
    const fecha = new Date(req.body.fechaCarga)
    
    const clienteID = req.body.clienteID

    const matafuego = new Matafuego({
        nroInterno: req.body.nroInterno,
        codigo: req.body.codigo,
        fechaCarga:  fecha,
        clienteID: clienteID
    })
    
    const existeCliente =  Cliente.findOneAndUpdate(clienteID,{$push: {matafuegos: matafuego}})
    
    if(existeCliente){
        try{
            const matafuegoDB = await matafuego.save()
            
            
            
                res.json({
                    error: null,
                    data: matafuegoDB
                })

        }catch(error){
                res.status(400).json(error)
            }
    }else{
        return res.status(400).json({
            msg: "El cliente no existe"
        })
    }
        
            
        


}

module.exports ={
    matafuegosPost
}
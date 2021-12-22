const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('auth-token')

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    if(!token) return res.status(401).json({error: 'Acceso denegado'})
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(error){
        res.status(400).json({error: 'token no valido'})
    }
}




module.exports =  {validarJWT};
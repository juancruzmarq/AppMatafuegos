const jwt = require('jsonwebtoken');

//middleware para validar el token (rutas protegidas)

const verifyToken = (req, res, next ) =>{
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({error: 'Acceso denegado'})
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(error){
        res.status(400).json({error: 'token no valido'})
    }

    next();
}

module.exports ={ verifyToken }
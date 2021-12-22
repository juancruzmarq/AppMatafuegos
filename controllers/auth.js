const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const registerPost = async(req,res)=>{

    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos)
    const codigo = req.body.codigo

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
    })

    if(codigo === process.env.CODIGO){
        try{
            const userDB = await user.save();
            res.json({
                error: null,
                data: userDB
            })
        }catch(error){
            res.status(400).json(error)
        }
    }else{
        res.status(400).json({error: "Codigo Incorrecto"})
    }

}

const loginPost =  async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({error: 'Usuario no encontrado'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Contraseña no valida'});

    //JWT 

    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, process.env.TOKEN_SECRET, {expiresIn: 10});

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })

    res.json({
        error: null,
        data: token
    })
}

module.exports = {
    registerPost,
    loginPost
}
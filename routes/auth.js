const router = require('express').Router();

const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


//validaciones
const Joi = require('@hapi/joi');
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/register', async(req,res)=>{

    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos)
    

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    
    try{
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })
    }catch(error){
        res.status(400).json(error)
    }

    
})




router.post('/login', async(req,res)=>{
    //validaciones del login
    const {error} =  schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message});

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

    
})

module.exports = router;
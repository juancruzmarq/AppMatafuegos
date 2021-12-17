const express = require('express'); // para configurar el servidor
const mongoose = require('mongoose'); // base da datos 
const bodyparser = require('body-parser'); // para capturar el body
require('dotenv').config() // ocultar variables de entorno


const PORT = 8000;
const app = express(); // iniciar app

// capturar body
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Conexion base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cdd6b.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri)
.then(() => console.log('Base de dato conectada'))
.catch(e => console.log('error db', e));

//Importar rutas
const authRoutes = require('./routes/auth');
const validaToken = require('./routes/validate-token');
const admin = require('./routes/admin');

//rutas middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin', validaToken, admin);


//Iniciar servidor 
app.listen(PORT, ()=>{
    console.log(`servidor corriendo en puerto http://localhost:${PORT}`);
})
const express = require('express');
const { dbConexion } = require('../db/conexionDb');
const cors = require('cors');
const bodyparser = require('body-parser');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
    
        //DB
        this.conectarDB();

        //Middlewares 
        this.middlewares();

        //rutas
        this.routes();

        
    }

    async conectarDB(){
        await dbConexion()
    }

    middlewares(){
        this.app.use(bodyparser.urlencoded({extended: false}));
        this.app.use(bodyparser.json());
        this.app.use(cors());
    }

    routes(){
        //rutas middlewares
        this.app.use('/api/user', require('../routes/auth'));
        //this.app.use('/api/admin', require('../routes/admin'));
        this.app.use('/api/cliente', require('../routes/cliente'))
        this.app.use('/api/matafuego', require('../routes/matafuego'))
    }

    listen(){
        //Iniciar servidor 
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;
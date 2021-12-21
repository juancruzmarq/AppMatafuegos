require('dotenv').config() // ocultar variables de entorno
const Server = require('./models/server');
const server = new Server();
server.listen();

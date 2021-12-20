const mongoose = require('mongoose');

const matafuegoSchema = mongoose.Schema({
    nroInterno: {
        type: Number,
        required: true,
    },
    codigo: {
        type: String,
        required: true
    },
    fechaCarga: {
        type: Date,
    }
})
const clienteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        min: 6,
        max: 1024
    },
    telefono:{
        type: Number,
    },
    direccion: {
        type: String
    },
    cuil:{
        type: Number
    },
    matafuegos: [matafuegoSchema]
})

module.exports = mongoose.model('Cliente', clienteSchema);


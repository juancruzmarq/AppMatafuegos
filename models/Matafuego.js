const mongoose = require('mongoose');

const matafuegoSchema = mongoose.Schema({
    nroInterno: {
        type: Number,
        required: true,
    },
    codigo: {
        type: String,
    },
    fechaCarga: Date,
    
})

module.exports = mongoose.model('Matafuego', matafuegoSchema);


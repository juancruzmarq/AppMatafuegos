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
    clienteID: mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model('Matafuego', matafuegoSchema);


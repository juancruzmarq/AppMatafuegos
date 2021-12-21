const mongoose = require('mongoose');

const dbConexion = async()=>{
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cdd6b.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
    try{
        await mongoose.connect(uri)
        console.log('DB CONECTADA ===')
    }catch(error){
        console.log(error)
        throw new Error('Error bases de datos');
    }
}

module.exports = {
    dbConexion
}
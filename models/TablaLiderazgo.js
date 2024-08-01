const name = require('ejs');
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/TablaLiderazgo'


//Tabla de Liderazgo
let TablaLiderazgoSchema = new mongoose.Schema ({

    nombreUsuario:{type:String,required:true,unique:true},
    puntos:{type:Number,required:true},
    duelos:{type:Number,required:true}

},{versionKey:false})

let tablaLiderazgo = new mongoose.model('TablaLiderazgo', TablaLiderazgoSchema);

module.exports = tablaLiderazgo;
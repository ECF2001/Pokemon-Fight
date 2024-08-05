const name = require('ejs');
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/VictoriasYDerrotas'


let VictoriasYDerrotasSchema = new mongoose.Schema ({

    perfilUsuarioUrl:{type:String, required:true},
    perfilUsuario2Url:{type:String, required:true},
    nombreUsuario:{type:String,required:true,unique:true},
    nombreUsuario2:{type:String,required:true,unique:true},
    puntos:{type:Number,required:true},
    pokemonDerrotados:{type:Number,required:true}

},{versionKey:false})

let contraAmigos = new mongoose.model('contraAmigos', VictoriasYDerrotasSchema);

module.exports = contraAmigos;

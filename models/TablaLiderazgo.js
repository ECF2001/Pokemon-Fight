const name = require('ejs');
const mongoose = require('mongoose');

let TablaLiderazgoSchema = new mongoose.Schema ({

    perfilUsuarioUrl:{type:String, required:true},
    nombreUsuario:{type:String,required:true,unique:true},
    puntos:{type:Number,required:true},
    duelos:{type:Number,required:true},
    pokemonFotoUrl: {type:String, required:true}

},{versionKey:false})

let tablaLiderazgo = new mongoose.model('TablaLiderazgo', TablaLiderazgoSchema);

module.exports = tablaLiderazgo;
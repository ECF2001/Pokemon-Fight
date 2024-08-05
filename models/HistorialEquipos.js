const name = require('ejs');
const mongoose = require('mongoose');

let historialEquiposSchema = new mongoose.Schema ({

    nombreEquipo:{type:String,required:true},
    victorias:{type:Number,required:true},
    derrotas:{type:Number,required:true},
    pokemonFotoUrl: {type:String, required:true}

},{versionKey:false})

let historialEquipos = new mongoose.model('historialEquipos', historialEquiposSchema);

module.exports = historialEquipos;
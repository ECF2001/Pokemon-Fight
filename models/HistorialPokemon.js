const name = require('ejs');
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/HistorialPokemon'

let HistorialPokemonSchema = new mongoose.Schema ({

    pokemonFotoUrl: {type:String, required:true},
    pokemon:{type:String, required:true},
    victorias:{type:String, required:true},
    derrotas:{type:String, required:true},
    vecesUtilizado:{type:String, required:true},

},{versionKey:false})

let historialPokemon = new mongoose.model('HistorialPokemon', HistorialPokemonSchema);

module.exports = historialPokemon
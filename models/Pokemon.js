const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({

    idPokemon: { type: Number, required: true, unique: true },
    nombrePokemon: { type: String, required: true },
    imagen: { type: String, required: true },
    puntosVida: { type: Number },
    movimiento: { type: String },

}, { versionKey: false });

//indica el indentificador de esta tabla
PokemonSchema.index({ idPokemon: 1 }, { unique: true });

const Pokemon = new mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon; 
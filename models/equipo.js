const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
  nombreEquipo: { type: String, required: true, unique:true },
  listaPokemon:  {type: [String], default: [] },
  nombreUsuario: { type: String, required: true, ref: 'Usuario' },
});

let Equipo = mongoose.model('Equipo', equipoSchema);

module.exports = Equipo;
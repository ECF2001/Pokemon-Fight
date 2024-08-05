// const name = require('ejs');
const mongoose = require('mongoose');

const equiposSchema = new mongoose.Schema({
  group_name: { type: String, required: true },
  pokemon_names: [{ type: String }],
  username: { type: String, required: true },
});

let equipo = mongoose.model('equipos', equiposSchema);

module.exports = equipo;
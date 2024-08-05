const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://Emilio:Emic2001@pokemonfight.xxc5s22.mongodb.net/PokemonFight';

mongoose.connect(URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("BD CONECTADA"))
  .catch(err => console.log('Error al conectar con la base de datos:', err));

const esquemaEquipos = new mongoose.Schema({
  nombre_equipo: { type: String, required: true },
  nombres_pokemon: [{ type: String }],
  nombre_usuario: { type: String, required: true },
});

const equipos = mongoose.model('equipos', esquemaEquipos);

async function agregarEquipo(nombreEquipo, nombresPokemon, nombreUsuario) {
  try {
    const nuevoEquipo = new Equipos({
      nombre_equipo: nombreEquipo,
      nombres_pokemon: nombresPokemon,
      nombre_usuario: nombreUsuario,
    });

    await nuevoEquipo.save();
    console.log('Equipo guardado correctamente.');
  } catch (error) {
    console.error('Error al guardar el equipo:', error);
  }
}

module.exports = agregarEquipo;
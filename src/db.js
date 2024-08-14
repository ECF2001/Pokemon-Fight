const port = 3000

const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://Emilio:Emic2001@pokemonfight.xxc5s22.mongodb.net/PokemonFight';

const conectarBaseDeDatos = () => {
  mongoose.connect(DB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
    .then(() => console.log('DB CONECTADA'))
    .catch(err => console.log('Error al conectar con la base de datos:', err));
}


  
module.exports = {
  conectarBaseDeDatos,
  DB_URI
}
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/PokemonFight'

mongoose.connect(DB_URI, {})
    .then(db => console.log("DB CONECTADA"))
    .catch(err => console.log(err))


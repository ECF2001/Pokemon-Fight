const name = require('ejs');
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/TablaLiderazgo'

if (puntos === 0 || duelos === 0) {
    res.render('tablaLiderazgo', {message: 'Juega una partida para desbloquear tus estadísticas!'});
    return;
}


let TablaLiderazgoSchema = new mongoose.Schema ({

    perfilUsuarioUrl:{type:String, required:true},
    nombreUsuario:{type:String,required:true,unique:true},
    puntos:{type:Number,required:true},
    duelos:{type:Number,required:true},
    pokemonFotoUrl: {type:String, required:true}

},{versionKey:false})

let tablaLiderazgo = new mongoose.model('TablaLiderazgo', TablaLiderazgoSchema);

module.exports = tablaLiderazgo;
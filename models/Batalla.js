const mongoose = require('mongoose');

let BatallaSchema = new mongoose.Schema ({

    idBatalla: {type: mongoose.Schema.Types.ObjectId,default:new mongoose.Types.ObjectId(), required:true, unique:true},
    nombreUsuario1:{type:String, ref:'Usuario', required:true},
    nombreEquipo1:{type:String, ref:'Equipo', required:true},
    nombreUsuario2:{type:String, ref:'Usuario', required:true},
    nombreEquipo2:{type:String, ref:'Equipo', required:true},
    nombreUsuarioVencedor:{type:String},

},{versionKey:false})

let Batalla = new mongoose.model('Batalla', BatallaSchema);

module.exports = Batalla; 
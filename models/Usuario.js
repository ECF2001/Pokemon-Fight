const mongoose = require('mongoose');

let UsuarioSchema = new mongoose.Schema ({

    identificacion: {type:Number, required:true, unique:true},
    nombreUsuario:{type:String, required:true},
    primerApellido:{type:String, required:true},
    segundoApellido:{type:String, required:true},
    correo:{type:String, required:true, unique:true},
    contrasena: {type:String, required:true},
    amigos:{type:String, required:true},
    equipos:{type:String, required:true},
    victorias:{type:Number, required:true},
    derrotas:{type:Number, required:true},
    fotoPerfil:{type:String, required:true}

},{versionKey:false})

let Usuario = new mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario
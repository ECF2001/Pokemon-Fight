const mongoose = require('mongoose');

let UsuarioSchema = new mongoose.Schema ({

    identificacion: {type:Number, required:true, unique:true},
    nombre: {type:String, required:true},
    nombreUsuario:{type:String, required:true, unique:true},
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

//indica el indentificador de esta tabla principal
UsuarioSchema.index({nombreUsuario: 1}, {unique: true});

let Usuario = new mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario; 
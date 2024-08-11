const mongoose = require('mongoose');


    const UsuarioSchema = new mongoose.Schema ({

    identificacion: {type:Number, required:true, unique:true},
    nombre: {type:String, required:true},
    nombreUsuario:{type:String, required:true, unique:true},
    primerApellido:{type:String, required:true},
    segundoApellido:{type:String, required:true},
    correo:{type:String, required:true, unique:true},
    contrasena: {type:String, required:true},
    amigos:[{type:String}],
    fotoPerfil:{type:String}

},{versionKey:false});

//indica el indentificador de esta tabla principal
UsuarioSchema.index({nombreUsuario: 1}, {unique: true});

const Usuario = new mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario; 
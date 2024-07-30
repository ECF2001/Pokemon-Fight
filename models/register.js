const name = require('ejs');
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/Registro'

mongoose.connect(DB_URI, {})
    .then(db => console.log("DB CONECTADA"))
    .catch(err => console.log(err))

let registerSchema = new mongoose.Schema ({

    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    segundoApellido:{type:String,required:true},
    nombreUsuario:{type:String,required:true},
    correoElectronico:{type:String,required:true},
    identificacion:{type:Integer,required:true},
    contrasena:{type:String,required:true}

},{versionKey:false})

let user = new mongoose.model('Usuarios', registerSchema);

module.exports = user;

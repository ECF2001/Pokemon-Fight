const Usuario = require('../models/Usuario');

const agregarRegistro = async (nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasena) => {
    try {
        const usuario = new Usuario({
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            nombreUsuario: nombreUsuario,
            correo: correo,
            identificacion: identificacion,
            contrasena: contrasena
        });

        const resultado = await usuario.save()
        console.log('El usuario se ha registrado correctamente.');
        return resultado;
    } catch (error) {
        console.error('Error al registrar el usuario', error);
    }

};


const validarUsuario = async (correo, contrasena) => {
    const usuario = await Usuario.findOne({ correo, contrasena });
    if (usuario) {

        const esValida = await (contrasena, usuario.contrasena)

        if(esValida){
        return '/'
    } else {
        return '/InicioSesion'
    
};
}
}


const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const cambiarContrasena = async (nombreUsuario, nuevaContrasena, confirmarContrasena) => {

    try {

         if (nuevaContrasena !== confirmarContrasena) {
              return '/CambiarContrasena';
         }

        const encriptarContrasena = await bcrypt.hash(confirmarContrasena, 10);
        const resultado = await Usuario.findOneAndUpdate(
            { nombreUsuario: nombreUsuario }, 
            { $set: { contrasena:nuevaContrasena } }

        );

        if (resultado) {
            return '/';
        } else {

            return '/CambiarContrasena';
        } 


    } catch (error) {
         console.error('Error al cambiar la contraseña:', error.message, error.stack);
        return '/CambiarContrasena?error=' + error.message;
    }
}


const obtenerFotos = async (listaNombreUsuario) => {
    const usuarios = await Usuario.find({
        nombreUsuario: { $in: listaNombreUsuario }
    }, 'nombreUsuario fotoPerfil');
    const fotos = {};
    usuarios.forEach(usuario => {
        fotos[usuario.nombreUsuario] = usuario.fotoPerfil;
    });
    return fotos;
};

const obtenerFotoPerfil = async (nombreUsuario) => {
    const usuario = await Usuario.findOne({
        nombreUsuario: nombreUsuario
    });
    if (usuario) {
        return usuario.fotoPerfil;
    } else {
        return '';
    }

};

module.exports = {
    agregarRegistro,
    obtenerFotos,
    validarUsuario,
    cambiarContrasena,
    obtenerFotoPerfil,
}

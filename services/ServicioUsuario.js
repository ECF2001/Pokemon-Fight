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
}

const obtenerFotos = async (listaNombreUsuario) => {
    const usuarios = await Usuario.find({
        nombreUsuario: { $in: listaNombreUsuario }
    }, 'nombreUsuario: fotoPerfil');
    const fotos = {};
    usuarios.forEach(usuario => {
        fotos[usuario.nombreUsuario] = usuario.fotoPerfil;
    });
    return fotos;
}


module.exports = {
    obtenerTablaLiderazgo,
    agregarRegistro,
    obtenerFotos
}


const Usuario = require('../models/Usuario');

const obtenerTablaLiderazgo = async () => {
    const usuarios = await Usuario.find()
        .sort({ victorias: -1 })
        .limit(6)
        .exec();

    return (usuarios || []);
}

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

module.exports = {
    obtenerTablaLiderazgo,
    agregarRegistro
}


const Usuario = require('../models/Usuario');

async function obtenerAmigos(nombreUsuario) {
    try {
        const usuario = await Usuario.find({ nombreUsuario: nombreUsuario }, 'amigos');

        if (!usuario) {
            console.log(`No se encontró un usuario con el nombre de usuario: ${nombreUsuario}`);
            return null;
        }

        return usuario[0].amigos;
    } catch (error) {
        console.error('Error al obtener la lista de amigos:', error);
        return null;
    }
}


async function agregarAmigo(nombreUsuario, nombreAmigo) {
    try {
        const usuario = await Usuario.findOne({ nombreUsuario: nombreUsuario });
        if (!usuario) {
            throw new Error(`El usuario ${nombreUsuario} no existe.`);
        }

        const amigo = await Usuario.findOne({ nombreUsuario: nombreAmigo });
        if (!amigo) {
            throw new Error(`El amigo ${nombreAmigo} no existe en la base de datos.`);
        }

        if (usuario.amigos.includes(nombreAmigo)) {
            throw new Error(`${nombreAmigo} ya es amigo de ${nombreUsuario}.`);
        }

        usuario.amigos.push(nombreAmigo);

        await usuario.save();

        console.log(`Amigo ${nombreAmigo} agregado correctamente a la lista de amigos de ${nombreUsuario}.`);
        return true;
    } catch (error) {
        console.error('Error agregando amigo:', error.message);
        return false;
    }
}


module.exports = {
    obtenerAmigos,
    agregarAmigo
};
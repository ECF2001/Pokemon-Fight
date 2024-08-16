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

module.exports = {
    obtenerAmigos
};
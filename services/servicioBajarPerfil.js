const Usuario = require('../models/Usuario'); // Importación correcta

async function buscarperfil(nombreUsuario) {
    try {
        // Buscar el primer usuario que coincide con el nombreUsuario
        const usuario = await Usuario.findOne({ nombreUsuario: nombreUsuario });

        // Si no se encuentra el usuario
        if (!usuario) {
            return `No se encontró el usuario ${nombreUsuario}.`;
        }

        // Devolver el usuario encontrado
        return usuario;
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        return 'Ocurrió un error al intentar obtener el perfil del usuario.';
    }
}

module.exports = {
    buscarperfil,
};

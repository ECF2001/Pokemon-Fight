const Batalla = require('../models/Batalla');

async function bajarBatalla(nombreUsuario) {
    try {
        // Buscar todas las batallas donde el usuario participa como nombreUsuario1 o nombreUsuario2
        const batallas = await Batalla.find({ 
            $or: [
                { nombreUsuario1: nombreUsuario }, 
                { nombreUsuario2: nombreUsuario }
            ]
        });

        // Si no se encuentran batallas
        if (batallas.length === 0) {
            return `No se encontraron batallas para el usuario ${nombreUsuario}.`;
        }

        // Devolver las batallas encontradas
        return batallas;
    } catch (error) {
        console.error('Error al obtener batallas:', error);
        return 'Ocurrió un error al intentar obtener las batallas.';
    }
}

module.exports = {
    bajarBatalla,
};
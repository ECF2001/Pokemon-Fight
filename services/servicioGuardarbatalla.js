const Equipo = require('../models/Equipo')
const Batalla = require('../models/Batalla');

async function agregarBatalla(idBatalla, nombreUsuario1, nombreEquipo1, nombreUsuario2, nombreEquipo2, nombreUsuarioVencedor) {
    try {
        const nuevobatalla = new Batalla({
            idBatalla: idBatalla,
            nombreUsuario1: nombreUsuario1,
            nombreEquipo1: nombreEquipo1,
            nombreUsuario2: nombreUsuario2,
            nombreEquipo2: nombreEquipo2,
            nombreUsuarioVencedor: nombreUsuarioVencedor,
        });

        await nuevobatalla.save();
        console.log('Guardado correctamente.');
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}

module.exports = {
    agregarBatalla,
};
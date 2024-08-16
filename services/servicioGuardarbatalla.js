const Batalla = require('../models/Batalla');

async function terminarBatalla(nombreUsuario1, nombreEquipo1, equipo1, nombreUsuario2, nombreEquipo2, equipo2, nombreUsuarioVencedor, historialDeMovimientos) {
    try {
        const nuevaBatalla = new Batalla({
            nombreUsuario1: nombreUsuario1,
            nombreEquipo1: nombreEquipo1,
            equipo1: equipo1,
            nombreUsuario2: nombreUsuario2,
            nombreEquipo2: nombreEquipo2,
            equipo2: equipo2,
            nombreUsuarioVencedor: nombreUsuarioVencedor,
            historialDeMovimientos: historialDeMovimientos
        });
        const batalla = await nuevaBatalla.save();
        console.log('Guardado correctamente.');
        return batalla;
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}

module.exports = {
    terminarBatalla,
};

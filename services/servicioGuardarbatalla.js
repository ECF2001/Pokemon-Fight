const Batalla = require('../models/Batalla');

async function agregarBatalla(idBatalla, Usuario1, Equipo1, Usuario2, Equipo2, UsuarioVencedor) {
    try {
        const nuevobatalla = new Batalla({
            idBatalla: idBatalla,
            nombreUsuario1: Usuario1,
            nombreEquipo1: Equipo1,
            nombreUsuario2: Usuario2,
            nombreEquipo2: Equipo2,
            nombreUsuarioVencedor: UsuarioVencedor,
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
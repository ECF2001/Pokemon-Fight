const mongoose = require('mongoose');
const Batalla = require('../models/Batalla');

async function terminarBatalla(idBatalla, nombreUsuario1, nombreEquipo1, nombreUsuario2, nombreEquipo2, nombreUsuarioVencedor) {
    try {
        // Convertir idBatalla a ObjectId si es necesario

    
        const idBatallaObjectId = mongoose.Types.ObjectId.isValid(idBatalla) ? mongoose.Types.ObjectId(idBatalla) : idBatalla;

        const nuevaBatalla = new Batalla({
            idBatalla: idBatallaObjectId,
            nombreUsuario1: nombreUsuario1,
            nombreEquipo1: nombreEquipo1,
            nombreUsuario2: nombreUsuario2,
            nombreEquipo2: nombreEquipo2,
            nombreUsuarioVencedor: nombreUsuarioVencedor,
        });

        await nuevaBatalla.save();
        console.log('Guardado correctamente.');
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}

module.exports = {
    terminarBatalla,
};

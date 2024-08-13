
const Equipo = require('../models/Equipo');

async function agregarEquipo(nombreEquipo, listaPokemon, nombreUsuario) {
    try {
        const count = await Equipo.countDocuments({ nombreUsuario: nombreUsuario });

        if (count >= 6) {
            console.log('El usuario ya tiene el número máximo de 6 equipos.');
            return; 
        }

        const nuevoEquipo = new Equipo({
            nombreEquipo: nombreEquipo,
            listaPokemon: listaPokemon,
            nombreUsuario: nombreUsuario,
        });

        await nuevoEquipo.save();
        console.log('Equipo guardado correctamente.');
    } catch (error) {
        console.error('Error al guardar el equipo:', error);
    }
}

async function obtenerEquipos(usuario) { // variable
    try {
      const consulta = { nombreUsuario: usuario };
      return await Equipo.find(consulta);
    } catch (error) {
      console.error('Error retrieving documents:', error);
    }
}


module.exports = {
    agregarEquipo,
    obtenerEquipos
}
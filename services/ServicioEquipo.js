

const Equipo = require('../models/Equipo')
async function agregarEquipo(nombreEquipo, listaPokemon, nombreUsuario) {
   
    try {
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
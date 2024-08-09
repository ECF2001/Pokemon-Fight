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

async function obtenerEquipo(nombreEquipo) {
    try {
        const equipo = await Equipo.findOne({ nombreEquipo: nombreEquipo });
        return equipo;
    } catch (error) {
        console.error('Error al obtener el equipo:', error);
        throw error;
    }
}

module.exports = {
    agregarEquipo,
    obtenerEquipo
}
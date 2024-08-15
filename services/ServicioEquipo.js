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

async function modificarEquipo(nombreEquipo, usuario, pokemonName) {
    try {
        const equipo = await Equipo.find({nombreEquipo: nombreEquipo, nombreUsuario: usuario});

        var equipoNuevo = await Equipo.updateOne(
            {nombreEquipo: nombreEquipo, nombreUsuario: usuario},
            {$pull: {listaPokemon:pokemonName}}
        );

        if (equipoNuevo.nModified === 0) {
            console.log('No se encontró el equipo o no hubo cambios en la lista de Pokémon.');
        } else {
            console.log('Lista de Pokémon actualizada exitosamente.');
        }
    } catch (error) {
        console.error('Error al actualizar el equipo:', error);
    }
}

async function borrarEquipo(nombreEquipo, usuario) {
    try {
        const resultado = await Equipo.deleteOne({
            nombreEquipo: nombreEquipo,
            nombreUsuario: usuario
        });

        if (resultado.deletedCount === 0) {
            console.log('No se encontró el equipo o ya fue eliminado.');
        } else {
            console.log(`El equipo "${nombreEquipo}" del usuario "${usuario}" fue eliminado exitosamente.`);
        }
    } catch (error) {
        console.error('Error al eliminar el equipo:', error);
    }
}

async function agregarPokemonEquipo(nombreEquipo, usuario, pokemonName){
    try {
        const equipo = await Equipo.find({nombreEquipo: nombreEquipo, nombreUsuario: usuario});

        var equipoNuevo = await Equipo.updateOne(
            {nombreEquipo: nombreEquipo, nombreUsuario: usuario},
            {$push: {listaPokemon: pokemonName}}
        );

        if (equipoNuevo.nModified === 0) {
            console.log('No se encontró el equipo o no hubo cambios en la lista de Pokémon.');
        } else {
            console.log('Lista de Pokémon actualizada exitosamente.');
        }
    } catch (error) {
        console.error('Error al actualizar el equipo:', error);
    }
}


module.exports = {
    agregarEquipo,
    obtenerEquipos,
    modificarEquipo,
    borrarEquipo,
    agregarPokemonEquipo
}
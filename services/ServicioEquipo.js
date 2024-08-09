const Equipo = require('../models/Equipo');

async function agregarEquipo(nombreEquipo, pokemon_names, usuario) {
   
    try {
        const newEquipo = new Equipo({
            group_name: nombreEquipo,
            pokemon_names: pokemon_names,
            username: usuario,
        });

        await newEquipo.save();
        console.log('Equipo guardado correctamente.');
    } catch (error) {
        console.error('Error al guardar el equipo:', error);
    }
}
module.exports = {
    agregarEquipo
}
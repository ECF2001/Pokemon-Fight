const Equipo = require('../models/Equipo');
const {obtenerVictoriasPorEquipo} = require('../services/ServicioBatalla');


const obtenerHistorialPokemon = async (nombreUsuario) => {
    const listaPokemonEquipo = await Equipo.aggregate([
        { $match: { nombreUsuario: nombreUsuario } },
        {
            $unwind: "$listaPokemon"
        },
        {
            $project: {
                _id: 0,
                nombreEquipo: 1,
                pokemon: "$listaPokemon"
            }
        }
    ]);
    const victoriasPorEquipo = obtenerVictoriasPorEquipo(nombreUsuario)
    const resultadosPorEquipo = {};
    victoriasPorEquipo.forEach(datos => {
        resultadosPorEquipo[datos.nombreEquipo] = {
            victorias: datos.victorias,
            derrotas: datos.derrotas
        }
    });
    listaPokemonEquipo.forEach(pokemonPorEquipo => {
        const victoriasYDerrotas = resultadosPorEquipo[pokemonPorEquipo.nombreEquipo];
        pokemonPorEquipo.victorias = victoriasYDerrotas.victorias;
        pokemonPorEquipo.derrotas = victoriasYDerrotas.derrotas;
    });
    const acumulado = {};
    listaPokemonEquipo.forEach(pokemonPorEquipo => {
        const pokemon = pokemonPorEquipo.pokemon
        if (!acumulado[pokemon]) {
            acumulado[pokemon] = {victorias: 0, derrotas: 0};
        }
        acumulado[pokemon].victorias += pokemonPorEquipo.victorias;
        acumulado[pokemon].derrotas += pokemonPorEquipo.derrotas;
    });
    return Object.keys(acumulado).map(pokemon => ({
        pokemon,
        victorias: acumulado[pokemon].victorias,
        derrotas: acumulado[pokemon].derrotas
      }));
}


module.exports = {
    obtenerHistorialPokemon
}
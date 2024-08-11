const Equipo = require('../models/Equipo');
const Batalla = require('../models/Batalla');


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
    const batallas = await Batalla.aggregate([
        {
            $match: {
                $or: [
                    { nombreUsuario1: nombreUsuario },
                    { nombreUsuario2: nombreUsuario }
                ]
            }
        },
        {
            $project: {
                _id: 0,
                nombreEquipo: {
                    $cond: {
                        if: { $eq: ["$nombreUsuario1", nombreUsuario] },
                        then: "$nombreEquipo1",
                        else: "$nombreEquipo2"
                    }
                },
                resultado: {
                    $cond: {
                        if: { $eq: ["$nombreUsuarioVencedor", nombreUsuario] },
                        then: "victoria",
                        else: "derrota"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$nombreEquipo",
                victorias: {
                    $sum: {
                        $cond: { if: { $eq: ["$resultado", "victoria"] }, then: 1, else: 0 }
                    }
                },
                derrotas: {
                    $sum: {
                        $cond: { if: { $eq: ["$resultado", "derrota"] }, then: 1, else: 0 }
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                nombreEquipo: "$_id",
                victorias: 1,
                derrotas: 1
            }
        }
    ]);
    const resultadosPorEquipo = {};
    batallas.forEach(batalla => {
        resultadosPorEquipo[batalla.nombreEquipo] = {
            victorias: batalla.victorias,
            derrotas: batalla.derrotas
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
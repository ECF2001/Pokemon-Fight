const Pokemon = require('../models/Pokemon');

const obtenerFotos = async (listaPokemon) => {
    const pokemons = await Pokemon.find({
        nombrePokemon: { $in: listaPokemon }
    }, 'nombrePokemon imagen');
    const fotos = {};
    pokemons.forEach(pokemon => {
        fotos[pokemon.nombrePokemon] = pokemon.imagen;
    });
    return fotos;
};
module.exports = {
    obtenerFotos
}
const Equipo = require('../models/Equipo');
const Batalla = require('../models/Batalla');
const {obtenerFotos} = require('../services/ServicioPokemon');


const obtenerHistorialEquipo = async (nombreUsuario) => {
    const equipos = await Equipo.find({nombreUsuario: nombreUsuario});
    const setPokemonCompleta = new Set ();
    equipos.forEach(equipo => {
        equipo.listaPokemon.forEach(pokemon => {
            setPokemonCompleta.add(pokemon)
        });
    });
    const fotos = obtenerFotos(Array.from(setPokemonCompleta));
    const resultado = [];
    equipos.forEach(equipo => {
        const datosEquipo = {nombreEquipo: equipo.nombreEquipo, listaPokemon: []};
        equipo.listaPokemon.forEach(pokemon => {
            const datosPokemon = {nombre: pokemon, foto: fotos[pokemon]};
            datosEquipo.listaPokemon.push(datosPokemon);
        });
        resultado.push(datosEquipo);
    });
    return resultado;
}
module.exports = {
    obtenerHistorialEquipo
}
const Equipo = require('../models/Equipo');
const {obtenerVictoriasPorEquipo} = require('../services/ServicioBatalla');
const {obtenerFotos} = require('../services/ServicioPokemon');


const obtenerHistorialEquipo = async (nombreUsuario) => {
    const equipos = await Equipo.find({nombreUsuario: nombreUsuario});
    const setPokemonCompleta = new Set ();
    equipos.forEach(equipo => {
        equipo.listaPokemon.forEach(pokemon => {
            setPokemonCompleta.add(pokemon)
        });
    });
    const victoriasPorEquipo = await obtenerVictoriasPorEquipo(nombreUsuario);
    const fotos = await obtenerFotos(Array.from(setPokemonCompleta));
    const resultado = [];
    console.log(fotos)
    equipos.forEach(equipo => {
        const victoriasYDerrotas = victoriasPorEquipo.find(dato => dato.nombreEquipo === equipo.nombreEquipo) || { victorias: 0, derrotas: 0};
        const datosEquipo = {nombreEquipo: equipo.nombreEquipo, listaPokemon: [], victorias: victoriasYDerrotas.victorias, derrotas: victoriasYDerrotas.derrotas};
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
const Batalla = require('../models/Batalla');
const Usuario = require('../models/Usuario');

const obtenerVictoriasYDerrotas = async (nombreUsuario) => {
    const usuario = await Usuario.findOne({nombreUsuario});
    console.log(usuario);
    const resultado = {
        victorias: [],
        derrotas:[]
    };
    if (!usuario) {
        return (resultado);
    }
    const listaAmigos = usuario.amigos;
    const batallas = await Batalla.find({
        $or: [
            {nombreUsuario1: usuario.nombreUsuario, nombreUsuario2: {$in: listaAmigos}},
            {nombreUsuario2: usuario.nombreUsuario, nombreUsuario1: {$in: listaAmigos}},
        ]
    });
    batallas.forEach(batalla => {
        const datosBatalla = {
            usuario1: {
                foto: "",
                nombreUsuario: batalla.nombreUsuario1,
                equipo: batalla.nombreEquipo1
            },
            usuario2: {
                foto: "",
                nombreUsuario: batalla.nombreUsuario2,
                equipo: batalla.nombreEquipo2
            }
        }
        if (batalla.nombreUsuarioVencedor === nombreUsuario) {
            resultado.victorias.push(datosBatalla);
        } else {
            resultado.derrotas.push(datosBatalla);
        }
    });
    return resultado
}
module.exports = {
    obtenerVictoriasYDerrotas
}
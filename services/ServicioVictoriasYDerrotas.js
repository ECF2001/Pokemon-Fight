const Batalla = require('../models/Batalla');
const Usuario = require('../models/Usuario');
const {obtenerFotos} = require('./ServicioUsuario');

const obtenerVictoriasYDerrotas = async (nombreUsuario) => {
    const usuario = await Usuario.findOne({ nombreUsuario });
    const resultado = {
        nombreUsuarioVencedor: [],
        victorias: [],
        derrotas: []
    };
    if (!usuario) {
        return (resultado);
    }
    const listaAmigos = usuario.amigos;
    const batallas = await Batalla.find({
        $or: [
            { nombreUsuario1: usuario.nombreUsuario, nombreUsuario2: { $in: listaAmigos } },
            { nombreUsuario2: usuario.nombreUsuario, nombreUsuario1: { $in: listaAmigos } },
        ]
    });
    const usuarios = new Set();
    batallas.forEach(batalla => {
        usuarios.add(batalla.nombreUsuario1);
        usuarios.add(batalla.nombreUsuario2);
    })
    const listaNombreUsuario = Array.from(usuarios);
    const fotos = await obtenerFotos(listaNombreUsuario);
    batallas.forEach(batalla => {
        const datosBatalla = {
            usuario1: {
                foto: fotos[batalla.nombreUsuario1],
                nombreUsuario: batalla.nombreUsuario1,
                equipo: batalla.nombreEquipo1
            },
            usuario2: {
                foto: fotos[batalla.nombreUsuario2],
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
    return resultado;
}
module.exports = {
    obtenerVictoriasYDerrotas
}
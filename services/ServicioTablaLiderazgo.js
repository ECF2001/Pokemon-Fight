const Usuario = require('../models/Usuario');
const TablaLiderazgo = require('../dto/TablaLiderazgo');
const DatosUsuarioFila = require('../dto/DatosUsuarioFila');

const obtenerTablaLiderazgo = async () => {
    const usuarios = await Usuario.find()
        .sort({ victorias: -1 })
        .limit(6)
        .exec();

    const datos = /*await Promise.all(*/usuarios.map(/*async*/ usuario => {
        const fotoPokemon = null;
        return new DatosUsuarioFila(usuario.identificacion, usuario.nombreUsuario, usuario.fotoPerfil, usuario.victorias, fotoPokemon)

    })/*)*/

    return (datos || []);
}
module.exports = obtenerTablaLiderazgo
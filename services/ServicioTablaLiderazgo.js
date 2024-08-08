const Usuario = require('../models/Usuario');
const TablaLiderazgo = require('../dto/TablaLiderazgo');
const DatosUsuarioFila = require('../dto/DatosUsuarioFila');

const obtenerTablaLiderazgo = async () => {
    const usuarios = await Usuario.find()
        .sort({ victorias: -1 })
        .limit(6)
        .exec();

    return (usuarios || []);
}
module.exports = obtenerTablaLiderazgo
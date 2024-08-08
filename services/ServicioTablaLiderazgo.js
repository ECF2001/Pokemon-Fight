const Usuario = require('../models/Usuario');

const obtenerTablaLiderazgo = async () => {
    const usuarios = await Usuario.find()
        .sort({ victorias: -1 })
        .limit(6)
        .exec();

    return (usuarios || []);
}
module.exports = obtenerTablaLiderazgo
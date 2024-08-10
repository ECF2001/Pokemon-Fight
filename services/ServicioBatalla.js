const Batalla = require('../models/Batalla');
const {obtenerFotos} = require('./ServicioUsuario');

const obtenerTablaLiderazgo = async () => {
    const lideres = await Batalla.aggregate([
        {
            $group: {
                _id: "$nombreUsuarioVencedor",
                victorias: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                nombreUsuario: "$_id",
                victorias: 1
            }
        },
        {
            $sort: { victorias: -1 }
        }
    ]);
    const listaNombreUsuario = lideres.map( lider => lider.nombreUsuario);
    const fotos = await obtenerFotos(listaNombreUsuario);
    lideres.forEach(lider => lider.foto = fotos[lider.nombreUsuario]);

    return (lideres || []);
}
module.exports = {
    obtenerTablaLiderazgo
}
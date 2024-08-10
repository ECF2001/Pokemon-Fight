const Batalla = require('../models/Batalla');

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
    ])
    return (lideres || []);
}
module.exports = {
    obtenerTablaLiderazgo
}
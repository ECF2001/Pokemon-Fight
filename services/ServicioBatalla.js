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
const obtenerVictoriasPorEquipo = async (nombreUsuario) => {
    const victoriasPorEquipo = await Batalla.aggregate([
        {
            $match: {
                $or: [
                    { nombreUsuario1: nombreUsuario },
                    { nombreUsuario2: nombreUsuario }
                ]
            }
        },
        {
            $project: {
                _id: 0,
                nombreEquipo: {
                    $cond: {
                        if: { $eq: ["$nombreUsuario1", nombreUsuario] },
                        then: "$nombreEquipo1",
                        else: "$nombreEquipo2"
                    }
                },
                resultado: {
                    $cond: {
                        if: { $eq: ["$nombreUsuarioVencedor", nombreUsuario] },
                        then: "victoria",
                        else: "derrota"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$nombreEquipo",
                victorias: {
                    $sum: {
                        $cond: { if: { $eq: ["$resultado", "victoria"] }, then: 1, else: 0 }
                    }
                },
                derrotas: {
                    $sum: {
                        $cond: { if: { $eq: ["$resultado", "derrota"] }, then: 1, else: 0 }
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                nombreEquipo: "$_id",
                victorias: 1,
                derrotas: 1
            }
        }
    ]);
    return victoriasPorEquipo;
};
module.exports = {
    obtenerTablaLiderazgo,
    obtenerVictoriasPorEquipo
}
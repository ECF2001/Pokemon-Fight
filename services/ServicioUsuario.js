const Usuario = require('../models/Usuario');

const agregarRegistro = async (nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasena) => {
    try {
        const usuario = new Usuario({
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            nombreUsuario: nombreUsuario,
            correo: correo,
            identificacion: identificacion,
            contrasena: contrasena
        });

        const resultado = await usuario.save()
        console.log('El usuario se ha registrado correctamente.');
        return resultado;
    } catch (error) {
        console.error('Error al registrar el usuario', error);
    }

};


const validarUsuario = async (correo, contrasena) => {
    const usuario = await Usuario.findOne({ correo, contrasena });
    if (usuario) {
        return '/'
    } else {
        return '/inicioSesion?error=Clave%20invalida'
    }
};


const bcrypt = require ('bcrypt');
const {MongoClient} = require('mongodb');



const cambiarContrasena = async (correo, nuevaContrasena) => {

    const client = new MongoClient('mongodb+srv://Emilio:Emic2001@pokemonfight.xxc5s22.mongodb.net/PokemonFight')
    await client.connect();
    const db = client.db('PokemonFight');

    try{

        const encriptarContrasena = await bcrypt.hash(nuevaContrasena, 10); 

         const resultado = await Usuario.findOneandUpdate(

            {correo:correo},
            {$set:{contrasena: encriptarContrasena} }

         );

         await client.close(); 

         if (resultado) {
        return '/'
    } else {
        return '/inicioSesion?error=Clave%20invalida'
    }
       
    } catch (error) {
        console.error('Error al cambiar la contrasena', error);

        
    }
    }

const obtenerFotos = async (listaNombreUsuario) => {
    const usuarios = await Usuario.find({
        nombreUsuario: { $in: listaNombreUsuario }
    }, 'nombreUsuario fotoPerfil');
    const fotos = {};
    usuarios.forEach(usuario => {
        fotos[usuario.nombreUsuario] = usuario.fotoPerfil;
    });
    return fotos;
};


module.exports = {
    agregarRegistro,
    obtenerFotos,
    validarUsuario,
    cambiarContrasena
}


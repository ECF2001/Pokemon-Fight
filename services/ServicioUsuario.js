const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const {enviarContrasenaTemporal} = require('../services/ServicioCorreo');

const agregarRegistro = async (nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasena) => {
    try {
        const nuevaContrasenaEncriptada = await bcrypt.hash(contrasena, 10);
        const usuario = new Usuario({
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            nombreUsuario: nombreUsuario,
            correo: correo,
            identificacion: identificacion,
            contrasena: nuevaContrasenaEncriptada
        });

        const resultado = await usuario.save()
        console.log('El usuario se ha registrado correctamente.');
        return resultado;
    } catch (error) {
        console.error('Error al registrar el usuario', error);
    }

};


const validarUsuario = async (correo, contrasena) => {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        throw new Error("Correo o contraseña inválida");
    }

    if (usuario.intentosLogin >= 3) {
        throw new Error("Usuario bloqueado, debe recuperar contraseña");
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
        if (!usuario.intentosLogin) {
            usuario.intentosLogin = 0;
        }
        usuario.intentosLogin = usuario.intentosLogin + 1;
        usuario.save();
        throw new Error("Correo o contraseña inválida");
    }
    usuario.intentosLogin = 0;
    usuario.save();
    return usuario;
};

const buscarUsuario = async (correo) => {
    return await Usuario.findOne({ correo });
}



const cambiarContrasena = async (nombreUsuario, nuevaContrasena, confirmarContrasena) => {

    try {

        if (nuevaContrasena !== confirmarContrasena) {
            return '/CambiarContrasena?error=Contraseña%20no%20coincide';
        }

        const nuevaContrasenaEncriptada = await bcrypt.hash(nuevaContrasena, 10);
        const resultado = await Usuario.findOneAndUpdate(
            { nombreUsuario: nombreUsuario },
            { $set: { contrasena: nuevaContrasenaEncriptada } }

        );

        if (resultado) {
            return '/CambiarPerfil?msg=Contraseña%20actualizada';
        } else {

            return '/CambiarContrasena?error=Contraseña%20no%20pudo%20ser%20cambiada';
        }
    } catch (error) {
        return '/CambiarContrasena?error=' + error.message;
    }
};

const generarContrasenaTemporal = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contrasenaTemporal = '';
    for (let i = 0; i < 8; i++) {
        contrasenaTemporal += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contrasenaTemporal;
};

const generarOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

const recuperarContrasena = async (correo) => {
    const contrasenaTemporal = generarContrasenaTemporal();
    const nuevaContrasenaEncriptada = await bcrypt.hash(contrasenaTemporal, 10);
    const usuario = await Usuario.findOneAndUpdate(
        { correo: correo },
        { contrasena: nuevaContrasenaEncriptada, intentosLogin : 0 },
        { new: true }
    );
    if (usuario) {
        enviarContrasenaTemporal(usuario.correo, usuario.nombre, contrasenaTemporal);
        return true;
    } else {
        return false;
    }};


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

const obtenerFotoPerfil = async (nombreUsuario) => {
    const usuario = await Usuario.findOne({
        nombreUsuario: nombreUsuario
    });
    if (usuario) {
        return usuario.fotoPerfil;
    } else {
        return '';
    }

};

module.exports = {
    agregarRegistro,
    obtenerFotos,
    validarUsuario,
    cambiarContrasena,
    obtenerFotoPerfil,
    generarContrasenaTemporal,
    recuperarContrasena,
    generarOTP,
    buscarUsuario
}

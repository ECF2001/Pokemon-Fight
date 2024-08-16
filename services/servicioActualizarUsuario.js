const Usuario = require('../models/Usuario'); // Asegúrate de que la ruta al modelo sea correcta

async function actualizarUsuario(nombreUsuario, correo, nombre, primerApellido, segundoApellido, fotoPerfil) {
    try {
        // Busca al usuario por su nombre de usuario
        const usuario = await Usuario.findOne({ nombreUsuario: nombreUsuario });
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Actualiza los campos del usuario
        usuario.correo = correo;
        usuario.nombre = nombre;
        usuario.primerApellido = primerApellido;
        usuario.segundoApellido = segundoApellido;
        usuario.fotoPerfil = fotoPerfil;
        
        // Guarda los cambios en la base de datos
        await usuario.save();

        return { success: true, message: 'Usuario actualizado correctamente' };
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        return { success: false, message: 'No se pudo actualizar el usuario' };
    }
}

module.exports = { actualizarUsuario };

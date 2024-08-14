
const authMiddleWare = (request, response, next) => {
    if (request.session && request.session.nombreUsuario) {
        next();
    } else {
        response.redirect('/InicioSesion');
    }
}


module.exports  = {
    authMiddleWare
}
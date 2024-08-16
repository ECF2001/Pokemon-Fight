const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { conectarBaseDeDatos, DB_URI } = require('./db');
const { authMiddleWare } = require('./authMiddleWare')

const app = express();
conectarBaseDeDatos();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Archivos Static (CSS,IMG,JS)
app.use(express.static(path.join(__dirname, 'public')));

//Session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore({
        uri: DB_URI,
        collection: "sesiones",
    }),
    cookie: {
        secure: false
    }
}));


//Inicializar servidor
app.listen(3000, () => {
    console.log("Se conecto al puerto");
});


app.get('/', authMiddleWare, (req, res) => {
    res.render("PaginaPrincipal.html");
});

app.get('/BatallaPokemon', authMiddleWare, (req, res) => {
    res.render("batalla_pokemon.html");
});

app.get('/CambiarPerfil', authMiddleWare, async (request, response) => {
    const { buscarUsuarioPorNombreUsuario } = require('../services/ServicioUsuario');
    const usuario = await buscarUsuarioPorNombreUsuario(request.session.nombreUsuario);
    const { error } = request.query;
    response.render("Cambiar_perfil", { usuario, error });
});

app.get('/CambiarContrasena', authMiddleWare, (request, response) => {
    const { error } = request.query;
    response.render("cambiarContraseña", { error });
});

app.get('/ElegirEquipo', authMiddleWare, (req, res) => {
    res.render("elegirEquipo.html");
});

app.get('/EquipoPokemon', authMiddleWare, (req, res) => {
    res.render("EquipoPokemon.html");
});

app.get('/GenerarReportes', authMiddleWare, (req, res) => {
    res.render("GenerarReportes.html");
});


app.get('/HistorialEquipos', authMiddleWare, async function (request, response) {
    const { obtenerHistorialEquipo } = require('../services/ServicioHistorialEquipos');
    const nombreUsuario = request.session.nombreUsuario;
    const datos = await obtenerHistorialEquipo(nombreUsuario);
    response.render("historial_Equipos", { datos });
});

app.get('/HistorialPartidas', authMiddleWare, (req, res) => {
    res.render("Historial_partidas.html");
});

app.get('/HistorialPokemon', authMiddleWare, async function (request, response) {
    const { obtenerHistorialPokemon } = require('../services/ServicioHistorialPokemon');
    const nombreUsuario = request.session.nombreUsuario;
    const datos = await obtenerHistorialPokemon(nombreUsuario);
    response.render("historialPokemon", { datos });
});

app.get('/InicioSesion', (request, response) => {
    if (request.session && request.session.nombreUsuario) {
        response.redirect('/');
    } else {
        const { error } = request.query;
        response.render("inicioSesion", { error });
    }
});

app.get('/JugarUnaPartida', authMiddleWare, (req, res) => {
    res.render("jugar_una_partida.html");
});

app.get('/ListaPokemon', authMiddleWare, (req, res) => {
    res.render("Lista_pokemon.html");
});

app.get('/NuevoEquipo', authMiddleWare, (req, res) => {
    res.render("NuevoEquipo.html");
});

app.get('/LandingPageEquipo', (req, res) => {
    res.render("page_equipo.html");
});

app.get('/LandingPageProducto', (req, res) => {
    res.render("paginabase.html");
});

app.get('/Registro', (req, res) => {
    res.render("Registro.html");
});

app.get('/ContrasenaTemporal', (request, response) => {
    response.render("contrasenaTemporal.html");
});

app.get('/RecuperarContrasena', (request, response) => {
    const { error, correo } = request.query;
    response.render("recuperarContrasena", { error, correo });
});

app.get('/VerificacionDosPasos', (request, response) => {
    const { error, msg } = request.query;
    response.render("verificacionDosPasos", { error, msg });
});

app.get('/ReenviarCodigo', async (request,response) => {
    const { enviarOTP } = require('../services/ServicioCorreo');
    const { buscarUsuario } = require('../services/ServicioUsuario');
    try {
        const usuario = await buscarUsuario(request.session.correo);
        await enviarOTP(usuario.correo, usuario.nombre, request.session.otp);
        response.redirect('/VerificacionDosPasos?msg=' + encodeURIComponent("Código de verificación reenviado"))
    } catch (error) {
        response.redirect('/VerificacionDosPasos?error=' + encodeURIComponent(error));
    }
   
})

//Tabla de liderazgo GET
app.get("/TablaLiderazgo", authMiddleWare, async function (request, response) {
    const { obtenerTablaLiderazgo } = require('../services/ServicioBatalla');
    const nombreUsuario = request.session.nombreUsuario;
    const datos = await obtenerTablaLiderazgo();
    response.render('TablaLiderazgo', { datos });
});

//Victorias y Derrotas GET
app.get('/VictoriasYDerrotas', authMiddleWare, async function (request, response) {
    const { obtenerVictoriasYDerrotas } = require('../services/ServicioVictoriasYDerrotas');
    const nombreUsuario = request.session.nombreUsuario;
    const datos = await obtenerVictoriasYDerrotas(nombreUsuario);
    response.render('victorias_derrotas', { datos });
});

app.get('/Batalla', authMiddleWare, (req, res) => {
    res.render("batalla.html");
});

//Cerrar Sesion GET
app.get('/CerrarSesion', (request, response) => {
    request.session.destroy((error) => {
        if (error) {
            return response.status(500).send('No se pudo cerrar la sesión')
        }
        response.clearCookie('connect.sid');
        response.redirect('/LandingPageProducto');
    });
});

//Ver Amigos GET
app.get('/verAmigos', async function (request, response) {
    const { obtenerAmigos } = require('../services/servicioAmigos');
    const { obtenerFotos } = require('../services/ServicioUsuario');


    try {
        const resultado = await obtenerAmigos('nimo23'); //['sunny77', ...]

         } catch (error) {
        console.error('Error:', error);
         }

        const nombreUsuario = request.session.nombreUsuario;
    try {
        const resultado = await obtenerAmigos(nombreUsuario);
        
        const promesasFotos = resultado.map(async amigo => {
            return await obtenerFotos(amigo);
        });

        const amigos = await Promise.all(promesasFotos);

        response.send(amigos);
    } catch (error) {
        console.error('Error al obtener las fotos de los amigos:', error);
        response.status(500).send('Error al obtener las fotos de los amigos');
    }
});




// Nuevo Equipo POST
app.post('/guardarEquipo', authMiddleWare, async function (request, response) {
    const { agregarEquipo } = require('../services/ServicioEquipo');
    const { nombreEquipo, listaPokemon } = request.body;
    const nombreUsuario = request.session.nombreUsuario;
    const resultado = await agregarEquipo(nombreEquipo, listaPokemon, nombreUsuario);
    response.send(resultado);
});


app.get('/obtenerEquipos', authMiddleWare, async function (request, response) {
    const { obtenerEquipos } = require('../services/ServicioEquipo');
    const nombreUsuario = request.session.nombreUsuario;
    const resultado = await obtenerEquipos(nombreUsuario);
    response.send(resultado);
});

app.post('/modificarEquipo', authMiddleWare, async function (request, response) {
    const { modificarEquipo } = require('../services/ServicioEquipo');
    const nombreUsuario = request.session.nombreUsuario;
    const { equipo, pokemon } = request.body;
    const resultado = await modificarEquipo(equipo, nombreUsuario, pokemon);
    response.send(resultado);
});

app.post('/agregarPokemonEquipo', authMiddleWare, async function (request, response) {
    const { agregarPokemonEquipo } = require('../services/ServicioEquipo');
    const nombreUsuario = request.session.nombreUsuario;
    const { equipo, pokemon } = request.body;
    const resultado = await agregarPokemonEquipo(equipo, nombreUsuario, pokemon);
    response.send(resultado);
});

app.delete('/borrarEquipo', authMiddleWare, async function (request, response) {
    const { borrarEquipo } = require('../services/ServicioEquipo');
    const nombreUsuario = request.session.nombreUsuario;
    const { equipo} = request.body;
    const resultado = await borrarEquipo(equipo, nombreUsuario);
    response.send(resultado);
});


//Registro POST 
app.post('/Registro', async function (request, response) {
    const { agregarRegistro } = require('../services/ServicioUsuario');
    const { enviarContrasenaTemporal } = require('../services/ServicioCorreo');
    const { nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion } = request.body;
    const { generarContrasenaTemporal } = require('../services/ServicioUsuario');
    const contrasenaTemporal = generarContrasenaTemporal();
    const resultado = await agregarRegistro(nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasenaTemporal);
    console.log(resultado);
    if (resultado) {
        enviarContrasenaTemporal(correo, nombre, contrasenaTemporal);
        response.redirect('/ContrasenaTemporal');
    } else {
        //TODO: notificar error
        response.redirect('/Registro');
    }
});


//Inicio sesion POST
app.post('/InicioSesion', async function (request, response) {
    const { validarUsuario, generarOTP } = require('../services/ServicioUsuario');
    const { enviarOTP } = require('../services/ServicioCorreo');
    try {       
        const { correo, contrasena } = request.body;
        const usuario = await validarUsuario(correo, contrasena);
        const otp = generarOTP();
        request.session.otp = otp;
        request.session.correo = usuario.correo;
        await enviarOTP(usuario.correo, usuario.nombre, otp);
        response.redirect('/VerificacionDosPasos');
    } catch (error) {
        response.redirect('/InicioSesion?error=' + encodeURIComponent(error));    
    }
});


//Guardar Batalla POST
app.post('/guardarbatalla', authMiddleWare, async function (request, response) {
    const { terminarBatalla } = require('../services/servicioGuardarbatalla');
    const nombreUsuario1 = request.session.nombreUsuario;
    const { idBatalla, Equipo1, Usuario2, Equipo2, UsuarioVencedor } = request.body;
    const resultado = await terminarBatalla(idBatalla, nombreUsuario1, Equipo1, Usuario2, Equipo2, UsuarioVencedor);
    response.send(resultado);
});


//Cambiar contrasena POST
app.post('/CambiarContrasena', authMiddleWare, async function (request, response) {
    const nombreUsuario = request.session.nombreUsuario;
    const { cambiarContrasena } = require('../services/ServicioUsuario');
    const { nuevaContrasena, confirmarContrasena } = request.body;
    const redireccion = await cambiarContrasena(nombreUsuario, nuevaContrasena, confirmarContrasena);
    response.redirect(redireccion);
});
app.get('/BajarBatalla', async function (request, response) {
    const { bajarBatalla } = require('../services/servicioBajarBatalla');
    const nombreUsuario1 = request.session.nombreUsuario;
    const resultado = await bajarBatalla(nombreUsuario1);
    response.send(resultado);
});



//Recuperar contrasena POST
app.post('/RecuperarContrasena', async function (request, response) {
    const { recuperarContrasena } = require('../services/ServicioUsuario');
    const correo = request.body.correo;
    const contrasenaRecuperada = await recuperarContrasena(correo);
    if (contrasenaRecuperada) {
        response.redirect('/ContrasenaTemporal')
    } else {
        response.redirect('/RecuperarContrasena?error=%20no%20se%20pudo%20recuperar%20contraseña&correo=' + correo)
    }
});


app.post('/ActualizarUsuario', authMiddleWare, async function (request, response) {
    const { actualizarUsuario } = require('../services/servicioActualizarUsuario');
    const nombreUsuario = request.session.nombreUsuario;
    const { correo, nombre, primerApellido, segundoApellido, fotoPerfil } = request.body;
    const resultado = await actualizarUsuario(nombreUsuario, correo, nombre, primerApellido, segundoApellido, fotoPerfil);
    response.send(resultado);
});

//Verificacion dos pasos POST
app.post('/VerificacionDosPasos', async function (request, response) {
    const { buscarUsuario } = require('../services/ServicioUsuario');
    const codigo = request.body.codigo;
    if (codigo === request.session.otp) {
        const usuario = await buscarUsuario(request.session.correo);
        if (usuario) {
            delete request.session.otp;
            delete request.session.correo;
            request.session.nombreUsuario = usuario.nombreUsuario;
            response.redirect('/')
        } else {
            response.redirect('/VerificacionDosPasos?error=Correo%20incorrecto');
        }
    } else {
        response.redirect('/VerificacionDosPasos?error=Código%20incorrecto');
    }
});

app.get('/FotoPerfil', authMiddleWare, async (request, response) => {
    try {
        const { buscarUsuarioPorNombreUsuario } = require('../services/ServicioUsuario');
        const usuario = await buscarUsuarioPorNombreUsuario(request.session.nombreUsuario);
        const imagen = path.join(__dirname, 'public', usuario.fotoPerfil);
        response.sendFile(imagen);
    } catch (error) {
        console.log(error);
        const imagen = path.join(__dirname, 'public/fotos_perfil/0_0.png');
        response.sendFile(imagen);
    }
});
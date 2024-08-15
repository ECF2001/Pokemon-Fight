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

// Sesion
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

app.get('/CambiarPerfil', authMiddleWare, (req, res) => {
    res.render("Cambiar_perfil.html");
});

app.get('/CambiarContrasena', authMiddleWare, (req, res) => {
    res.render("cambiarContraseña.html");
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
    const { obtenerFotoPerfil } = require('../services/ServicioUsuario');
    const nombreUsuario = request.session.nombreUsuario;
    const fotoPerfil = await obtenerFotoPerfil(nombreUsuario);
    const datos = await obtenerHistorialEquipo(nombreUsuario);
    response.render("historial_Equipos", { datos, fotoPerfil });
});

app.get('/HistorialPartidas', authMiddleWare, (req, res) => {
    res.render("Historial_partidas.html");
});

app.get('/HistorialPokemon', authMiddleWare, async function (request, response) {
    const { obtenerHistorialPokemon } = require('../services/ServicioHistorialPokemon');
    const { obtenerFotoPerfil } = require('../services/ServicioUsuario');
    const nombreUsuario = request.session.nombreUsuario;
    const fotoPerfil = await obtenerFotoPerfil(nombreUsuario);
    const datos = await obtenerHistorialPokemon(nombreUsuario);
    response.render("historialPokemon", { datos, fotoPerfil });
});

app.get('/InicioSesion', (request, response) => {
    if (request.session && request.session.nombreUsuario) {
        response.redirect('/');
    } else {
        response.render("inicioSesion.html");
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

app.get('/RecuperarContrasena', (request,response) => {
    const {error, correo} = request.query;
    response.render("recuperarContrasena", {error, correo});
});


//Tabla de liderazgo GET
app.get("/TablaLiderazgo", authMiddleWare, async function (request, response) {
    const { obtenerTablaLiderazgo } = require('../services/ServicioBatalla');
    const { obtenerFotoPerfil } = require('../services/ServicioUsuario');
    const nombreUsuario = request.session.nombreUsuario;
    const fotoPerfil = await obtenerFotoPerfil(nombreUsuario);
    const datos = await obtenerTablaLiderazgo();
    response.render('TablaLiderazgo', { datos, fotoPerfil });
});

//Victorias y Derrotas GET
app.get('/VictoriasYDerrotas',  authMiddleWare, async function (request, response) {
    const { obtenerVictoriasYDerrotas } = require('../services/ServicioVictoriasYDerrotas');
    const { obtenerFotoPerfil } = require('../services/ServicioUsuario');
    const nombreUsuario = request.session.nombreUsuario;
    const fotoPerfil = await obtenerFotoPerfil(nombreUsuario);
    const datos = await obtenerVictoriasYDerrotas(nombreUsuario);
    response.render('victorias_derrotas', { datos, fotoPerfil });
});

app.get('/Batalla', authMiddleWare, (req, res) => {
    res.render("batalla.html");
});

//Cerrar Sesion GET
app.get('/CerrarSesion', (request, response)=> {
    request.session.destroy((error)=> {
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
        
        const promesasFotos = resultado.map(async amigo => {
            return await obtenerFotos(amigo);
        });

        const amigos = await Promise.all(promesasFotos); 

        //console.log(amigos); //[ { sunny76: '/fotos_perfil/3_2.png' }, { home4: 'stick.jpg' } ]
        response.send(amigos);
    } catch (error) {
        console.error('Error al obtener las fotos de los amigos:', error);
        response.status(500).send('Error al obtener las fotos de los amigos');
    }
});

// Nuevo Equipo POST
app.post('/guardarEquipo', authMiddleWare, async function (request, response) {
    const { agregarEquipo } = require('../services/ServicioEquipo');
    const { nombreEquipo, listaPokemon, nombreUsuario } = request.body;
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
    // Obtener nombre de usuario actual
    const { equipo, usuario, pokemon } = request.body;
    const resultado = await modificarEquipo(equipo, usuario, pokemon);
    response.send(resultado);
});

app.post('/agregarPokemonEquipo', authMiddleWare, async function (request, response) {
    const { agregarPokemonEquipo } = require('../services/ServicioEquipo');
    // Obtener nombre de usuario actual
    const { equipo, usuario, pokemon } = request.body;
    const resultado = await agregarPokemonEquipo(equipo, usuario, pokemon);
    response.send(resultado);
});

app.delete('/borrarEquipo', authMiddleWare, async function (request, response) {
    const { borrarEquipo } = require('../services/ServicioEquipo');
    // Obtener nombre de usuario actual
    const { equipo, usuario } = request.body;
    const resultado = await borrarEquipo(equipo, usuario);
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
    const { validarUsuario } = require('../services/ServicioUsuario');
    const { correo, contrasena } = request.body;
    const usuario = await validarUsuario(correo, contrasena);
    if (usuario) {
        request.session.nombreUsuario = usuario.nombreUsuario;
        response.redirect('/');
    } else {
        response.redirect('/InicioSesion');
    }
});


//Guardar Batalla POST
app.post('/guardarbatalla', authMiddleWare ,async function (request, response) {
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
app.post('/RecuperarContrasena', async function (request,response) {
    const { recuperarContrasena } = require('../services/ServicioUsuario');
    const correo = request.body.correo;
    const contrasenaRecuperada  = await recuperarContrasena(correo);
    if (contrasenaRecuperada) {
        response.redirect('/ContrasenaTemporal')
    } else {
        response.redirect('/RecuperarContrasena?error=%20no%20se%20pudo%20recuperar%20contraseña&correo=' + correo)
    }
});

app.get('/BajarUsuario', async function (request, response) {
    const { buscarperfil } = require('../services/servicioBajarPerfil');
    const nombreUsuario1 = request.session.nombreUsuario;
    const resultado = await buscarperfil(nombreUsuario1);
    response.send(resultado);
});
app.post('/ActualizarUsuario', authMiddleWare ,async function (request, response) {
    const { actualizarUsuario } = require('../services/servicioActualizarUsuario');
    const nombreUsuario = request.session.nombreUsuario;
    const {correo, nombre, primerApellido, segundoApellido } = request.body;
    const resultado = await actualizarUsuario(nombreUsuario, correo, nombre, primerApellido, segundoApellido);
    response.send(resultado);
});


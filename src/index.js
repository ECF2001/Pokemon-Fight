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

app.get('/BatallaPokemon', (req, res) => {
    res.render("batalla_pokemon.html");
});

app.get('/CambiarPerfil', (req, res) => {
    res.render("Cambiar_perfil.html");
});

app.get('/CambiarContrasena', (req, res) => {
    console.log('get');
    res.render("cambiarContraseña.html");
});

app.get('/ElegirEquipo', (req, res) => {
    res.render("elegirEquipo.html");
});

app.get('/EquipoPokemon', (req, res) => {
    res.render("EquipoPokemon.html");
});

app.get('/GenerarReportes', (req, res) => {
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

app.get('/HistorialPartidas', (req, res) => {
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

app.get('/InicioSesion', (req, res) => {
    res.render("inicioSesion.html");
});

app.get('/JugarUnaPartida', (req, res) => {
    res.render("jugar_una_partida.html");
});

app.get('/ListaPokemon', (req, res) => {
    res.render("Lista_pokemon.html");
});

app.get('/NuevoEquipo', (req, res) => {
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



app.get('/InicioSesion', (req, res) => {
    req.session.isAuth = true;
})


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

app.get('/Batalla', (req, res) => {
    res.render("batalla.html");
});



// Nuevo Equipo POST
app.post('/guardarEquipo', async function (request, response) {
    const { agregarEquipo } = require('../services/ServicioEquipo');
    const { nombreEquipo, listaPokemon, nombreUsuario } = request.body;
    const resultado = await agregarEquipo(nombreEquipo, listaPokemon, nombreUsuario);
    response.send(resultado);
});


app.get('/obtenerEquipos', async function (request, response) {
    const { obtenerEquipos } = require('../services/ServicioEquipo');
    // Obtener nombre de usuario actual   
    const resultado = await obtenerEquipos('nimo23');
    response.send(resultado);
});

app.post('/modificarEquipo', async function (request, response) {
    const { modificarEquipo } = require('../services/ServicioEquipo');
    // Obtener nombre de usuario actual
    const { equipo, usuario, pokemon } = request.body;
    const resultado = await modificarEquipo(equipo, usuario, pokemon);
    response.send(resultado);
});

app.post('/agregarPokemonEquipo', async function (request, response) {
    const { agregarPokemonEquipo } = require('../services/ServicioEquipo');
    // Obtener nombre de usuario actual
    const { equipo, usuario, pokemon } = request.body;
    const resultado = await agregarPokemonEquipo(equipo, usuario, pokemon);
    response.send(resultado);
});

app.delete('/borrarEquipo', async function (request, response) {
    const { borrarEquipo } = require('../services/ServicioEquipo');
    // Obtener nombre de usuario actual
    const { equipo, usuario } = request.body;
    const resultado = await borrarEquipo(equipo, usuario);
    response.send(resultado);
});


//Registro POST 
app.post('/Registro', async function (request, response) {
    const { agregarRegistro } = require('../services/ServicioUsuario');
    const { nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasena } = request.body;
    const resultado = await agregarRegistro(nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasena);
    response.redirect('/');

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
        response.redirect('/inicioSesion?error=Clave%20invalida');
    }
});


//Guardar Batalla POST
app.post('/guardarbatalla', async function (request, response) {
    const { terminarBatalla } = require('../services/servicioGuardarbatalla');
    const { idBatalla, Usuario1, Equipo1, Usuario2, Equipo2, UsuarioVencedor } = request.body;
    const resultado = await terminarBatalla(idBatalla, Usuario1, Equipo1, Usuario2, Equipo2, UsuarioVencedor);
    response.send(resultado);
});


//Cambiar contrasena POST
app.post('/CambiarContrasena', async function (request, response){
    const nombreUsuario = 'ssolano15';
});
app.post('/CambiarContrasena', async function (request, response) {
    const nombreUsuario = 'sunny76';

    console.log(request.cookies);
    const { cambiarContrasena } = require('../services/ServicioUsuario');
    const { nuevaContrasena, confirmarContrasena } = request.body;
    const redireccion = await cambiarContrasena(nombreUsuario, nuevaContrasena, confirmarContrasena);
    response.redirect(redireccion);
});

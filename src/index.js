const express = require('express');

const db = require('./db');

const bodyParser = require('body-parser');

const app = express();

const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Archivos Static (CSS,IMG,JS)
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar servidor

app.listen(3000, () => {
    console.log("Se conecto al puerto");
});


app.get('/', (req, res) => {
    res.render("PaginaPrincipal.html");
});

app.get('/BatallaPokemon', (req, res) => {
    res.render("batalla_pokemon.html");
});

app.get('/CambiarPerfil', (req, res) => {
    res.render("Cambiar_perfil.html");
});

app.get('/CambiarContrasena', (req, res) => {
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


app.get('/HistorialEquipos', (req, res) => {
    res.render("historial_Equipos.html");
});

app.get('/HistorialPartidas', (req, res) => {
    res.render("Historial_partidas.html");
});

app.get('/HistorialPokemon', (req, res) => {
    res.render("historialPokemon.html");
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

//Tabla de liderazgo GET
app.get("/TablaLiderazgo", async function (request, response) {
    const { obtenerTablaLiderazgo } = require('../services/ServicioUsuario');
    const datos = await obtenerTablaLiderazgo();
    console.log(datos)
    response.render('TablaLiderazgo', { datos });
});

//Victorias y Derrotas GET
app.get('/VictoriasYDerrotas', async function (request, response) {
    const datos = victoriasYDerrotasDatos();
    console.log(datos)
    response.render('victorias_derrotas', { datos });
});



//POST

app.post('/addCategory', (req, res) => {
    let nombre = "Steph";

    if (nombre == req.body.colorName) {
        res.redirect('/');
    }
    console.log("No es igual");
    res.redirect('/Contactenos');
});

//POST INCIO DE SESION
app.post('/formularioInicio', (req, res) => {
    let correo = "ejemplo123@gmail.com";
    if (correo == req.body.correoInicio) {
        res.redirect('PaginaPrincipal');
    }
    console.log("No es igual");
    res.redirect('/inicioSesion');
});


// Nuevo Equipo POST
app.post('/save-team', async function (request, response) {
    const {agregarEquipo} = require('../services/ServicioEquipo');
    const { teamName, team, username } = request.body;
    const resultado = await agregarEquipo(teamName, team.map(item => item.name), username);
    response.send(resultado);
});


//Registro POST 
app.post('/Registro', async function (request, response) {
    const { agregarRegistro } = require('../services/ServicioUsuario');
    const { nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasena } = request.body;
    const resultado = await agregarRegistro(nombre, nombreUsuario, primerApellido, segundoApellido, correo, identificacion, contrasena);
    response.send(resultado);
});

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
    response.render('TablaLiderazgo',  {datos} );
});

//Victorias y Derrotas GET
app.get('/VictoriasYDerrotas', (req, res) => {
    res.render("victorias_derrotas.html");
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
const equipo = require('../models/equipo');
async function addEquipo(nombreEquipo, pokemon_names, usuario) {
    try {
        const newEquipo = new equipo({
            group_name: nombreEquipo,
            pokemon_names: pokemon_names,
            username: usuario,
        });

        await newEquipo.save();
        console.log('Equipo guardado correctamente.');
    } catch (error) {
        console.error('Error al guardar el equipo:', error);
    }
}


app.post('/save-team', (req, res) => {
    const { teamName, team, username } = req.body;
    addEquipo(teamName, team.map(item => item.name), username);
});


//Registro post 

const Usuario = require('../models/Usuario')
async function addRegistro(userName, primerA, segundoA, email, id, contra) {
    try{
        const addRegistro = new Usuario({
            nombre: userName,
            primerApellido: primerA,
            segundoApellido: segundoA,
            nombreUsuario: userName, 
            correo: email,
            identificacion: id,
            contraseña: contra    
        });

        await addRegistro.save()
         console.log('El usuario se ha registrado correctamente.');
    } catch (error) {
        console.error('Error al registrar el usuario', error);
    }
}
    app.post('/Registro', (req, res) => {
    const { nombre, primerApellido, segundoApellido, nombreUsuario, correo, identificacion, contraseña } = req.body;
    addRegistro(nombre, primerApellido,segundoApellido,nombreUsuario,correo,identificacion,contraseña);
});
addRegistro()   
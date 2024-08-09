const port = 3000

const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://Emilio:Emic2001@pokemonfight.xxc5s22.mongodb.net/PokemonFight';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('DB CONECTADA'))
  .catch(err => console.log('Error al conectar con la base de datos:', err));

//const Equipo = require('../models/Equipo')
/*
app.use(bodyParser.json());

app.post('/save-team', async (req, res) => {
  const { teamName, team, username } = req.body;

  if (!teamName || !team || team.length !== 6 || !username) {
    return res.status(400).send('Datos inválidos');
  }

  try {
    const newTeam = new equipos({
      group_name: teamName,
      pokemon_names: team.map(pokemon => pokemon.name),
      username: username,
    });

    await newTeam.save();
    res.status(200).send('Equipo guardado exitosamente');
  } catch (error) {
    console.error('Error guardando el equipo:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});*/

async function addEquipo(nombreEquipo, pokemon_names, usuario) {
  try {
    const newEquipo = new Equipo({
      nombreEquipo: nombreEquipo,
      listaPokemon: pokemon_names,
      nombreUsuario: usuario,
    });

    await newEquipo.save();
    console.log('Equipo guardado correctamente.');
  } catch (error) {
    console.error('Error al guardar el equipo:', error);
  }
}

// Llamamos a la función para agregar el equipo
addEquipo('Bomboclat', ['Pikcahu', 'aaa'], 'Emilio');


//Datos de Prueba de la Tabla de liderazgo
const tablaLiderazgoDatos = () => {
  const datos = [
    {
    identificacion: '4615614',
    nombreUsuario: 'nimo23',
    foto: 'pikachu.jpg',
    victorias: '6'
  },
  {
    identificacion: '984852',
    nombreUsuario: 'sunny76',
    foto: 'mep.jpg',
    victorias: '58'
  },
  {
    identificacion: '8715124',
    nombreUsuario: 'home4',
    foto: 'stick.jpg',
    victorias: '1'
  }
  ]
  return datos;
}


//Datos de Prueba de Victorias y Derrotas contra los amigos
const victoriasYDerrotasDatos = () => {
  const datos = {
    victorias:[
    {
    usuario1: {
    foto: 'foto1',
    nombreUsuario: 'nimo23',
    equipo: 'estrellas'
    },
    usuario2: {
    foto: 'foto2',
    nombreUsuario: 'sunny76',
    equipo: 'optou'
    }
  }],
  derrotas: [
  {
    usuario1: {
    foto: 'foto1',
    nombreUsuario: 'cadet4',
    equipo: 'euns'
    },
    usuario2: {
    foto: 'foto2',
    nombreUsuario: 'authuser',
    equipo: 'midwe'
    }
  }
  ]}
  return datos;
}
module.exports = {
  victoriasYDerrotasDatos,
  tablaLiderazgoDatos
}


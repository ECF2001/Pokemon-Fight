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

/*async function addEquipo(nombreEquipo, pokemon_names, usuario) {
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
addEquipo('Bomboclat', ['Pikcahu', 'aaa'], 'Emilio');*/


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


const Batalla = require('../models/Batalla');
const usuarios = ['sunny76', 'home4', 'nimo23'];
const equiposPorUsuario = {
  sunny76: ['teamA', 'teamB', 'teamC'],
  home4: ['teamD', 'teamE', 'teamF'],
  nimo23: ['teamG', 'teamH', 'teamI']
};

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generarDatosPruebaBatalla() {
  const batallas = [];

  for (let i = 0; i < 10; i++) {
    const nombreUsuario1 = getRandomElement(usuarios);
    let nombreUsuario2 = getRandomElement(usuarios);

    // Asegurarse de que nombreUsuario1 y nombreUsuario2 sean distintos
    while (nombreUsuario1 === nombreUsuario2) {
      nombreUsuario2 = getRandomElement(usuarios);
    }

    const nombreEquipo1 = getRandomElement(equiposPorUsuario[nombreUsuario1]);
    const nombreEquipo2 = getRandomElement(equiposPorUsuario[nombreUsuario2]);
    const nombreUsuarioVencedor = getRandomElement([nombreUsuario1, nombreUsuario2]);


    batallas.push({
      idBatalla:new mongoose.Types.ObjectId(),
      nombreUsuario1,
      nombreEquipo1,
      nombreUsuario2,
      nombreEquipo2,
      nombreUsuarioVencedor
    });
  }

  Batalla.insertMany(batallas)
    .then(docs => {
      console.log('Batallas insertadas:', docs);
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error al insertar batallas:', err);
      mongoose.connection.close();
    });
  }



module.exports = {
  victoriasYDerrotasDatos,
  tablaLiderazgoDatos,
  generarDatosPruebaBatalla
}


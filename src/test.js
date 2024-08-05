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

const equiposSchema = new mongoose.Schema({
  group_name: { type: String, required: true },
  pokemon_names: [{ type: String }],
  username: { type: String, required: true },
});

const equipo = mongoose.model('equipos', equiposSchema);
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
  
  // Llamamos a la función para agregar el equipo
  addEquipo('Bomboclat', ['Pikcahu', 'aaa'], 'Emilio');
  


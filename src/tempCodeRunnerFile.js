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
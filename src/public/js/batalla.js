let indexPokemon1 = 0;
let indexPokemon2 = 0;
let pokemon1Vivo = true;
let pokemon2Vivo = true;
let ataqueEnCurso = false; 
let ataqueSeleccionado1 = null;
let ataqueSeleccionado2 = null;
let ataquesPokemon1 = [];
let ataquesPokemon2 = [];
let turno = usuario1;
let historialDeMovimientos = [];


// Definir los nombres de los Pokémon en cada equipo
const nombresEquipo1 = equipo1.slice();
const nombresEquipo2 = equipo2.slice();


function log(msg) {
  historialDeMovimientos.push(msg);
  console.log(msg);
  const nuevoTexto = document.createElement('div');
  nuevoTexto.textContent = msg;
}

function cambiarTurno() {
  const ataques1 = document.getElementById('ataques-1');
  const ataques2 = document.getElementById('ataques-2');
  if (turno === usuario1) {
    turno = usuario2;
    ataques1.classList.remove("activo");
    ataques1.classList.add("inactivo");
    ataques2.classList.remove("inactivo");
    ataques2.classList.add("activo");
  } else {
    turno = usuario1;
    ataques1.classList.remove("inactivo");
    ataques1.classList.add("activo");
    ataques2.classList.remove("activo");
    ataques2.classList.add("inactivo");
  }
}

// Función para capitalizar nombres
function capitalizar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Obtener datos del Pokémon usando su nombre
async function fetchPokemonPorNombre(nombre) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    log(`Error al obtener datos de ${nombre}:` + error);
  }
}

// Cargar equipos Pokémon usando los nombres definidos
async function cargarPokemones() {
  // Obtener datos de los Pokémon del equipo 1
  equipo1 = await Promise.all(nombresEquipo1.map(nombre => fetchPokemonPorNombre(nombre)));

  // Obtener datos de los Pokémon del equipo 2
  equipo2 = await Promise.all(nombresEquipo2.map(nombre => fetchPokemonPorNombre(nombre)));

  // Asignar HP inicial
  equipo1.forEach(pokemon => pokemon.hp = pokemon.stats[0].base_stat);
  equipo2.forEach(pokemon => pokemon.hp = pokemon.stats[0].base_stat);

  equipo1.forEach(pokemon => pokemon.nombreCompleto = nombreEquipo1 + " - " + pokemon.name);
  equipo2.forEach(pokemon => pokemon.nombreCompleto = nombreEquipo2 + " - " + pokemon.name);

  // Inicializar los Pokémon y ataques
  actualizarInterfazPokemon(equipo1[indexPokemon1], 'pokemon1');
  actualizarInterfazPokemon(equipo2[indexPokemon2], 'pokemon2');

  ataquesPokemon1 = await generarAtaques(equipo1[indexPokemon1]);
  ataquesPokemon2 = await generarAtaques(equipo2[indexPokemon2]);

  actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
  actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");

  // Restablecer el estado de ataque
  ataqueSeleccionado1 = null;
  ataqueSeleccionado2 = null;
  pokemon1Vivo = true;
  pokemon2Vivo = true;
  ataqueEnCurso = false;
  log(equipo1[indexPokemon1].nombreCompleto + ` entra a la batalla. HP restante: ${equipo1[indexPokemon1].hp}`);
  log(equipo2[indexPokemon2].nombreCompleto + ` entra a la batalla. HP restante: ${equipo2[indexPokemon2].hp}`);
}

// Obtener y filtrar ataques
const obtenerAtaques = async (pokemon) => {
  const movesPokemon = [];
  let moveList = pokemon.moves;
  let moveCount = 0;

  while (movesPokemon.length < 4 && moveCount < moveList.length) {
    const indice = Math.floor(Math.random() * moveList.length);
    movesPokemon.push(moveList[indice]);
    moveCount++;
  }

  const promesas = movesPokemon.map(ataque => fetch(ataque.move.url));
  const respuestas = await Promise.all(promesas);
  
  return await Promise.all(respuestas.map(respuesta => respuesta.json()));
};

const generarAtaques = async (pokemon) => {
  let ataques = await obtenerAtaques(pokemon);
  const ataquesConPoder = ataques.filter(ataque => ataque.power !== null && ataque.power !== undefined);

  while (ataquesConPoder.length < 4) {
    const nuevosAtaques = await obtenerAtaques(pokemon);
    ataquesConPoder.push(...nuevosAtaques.filter(ataque => ataque.power !== null && ataque.power !== undefined));
    ataquesConPoder.splice(4);
  }

  if (ataquesConPoder.length > 4) {
    ataquesConPoder.sort(() => 0.5 - Math.random()).slice(0, 4);
  }

  return ataquesConPoder;
};

// Actualizar contenedores de ataques
const actualizarContenedoresAtaques = (ataques, contenedorId) => {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = ataques.map(ataque =>
    `<button class="boton-ataque" ${!pokemon1Vivo && contenedorId === "ataques-1" ? 'disabled' : ''} ${!pokemon2Vivo && contenedorId === "ataques-2" ? 'disabled' : ''} onclick="seleccionarAtaque(${ataque.power}, '${contenedorId === 'ataques-1' ? 'pokemon2' : 'pokemon1'}', '${ataque.name}')">${capitalizar(ataque.name)} (${ataque.power})</button>`
  ).join('');
};

// Selección de ataque
const seleccionarAtaque = (dano, receptor, nombreAtaque) => {
  if (ataqueEnCurso) return;
  const nombrePokemonEmisor = receptor === 'pokemon1' ? equipo2[indexPokemon2].nombreCompleto : equipo1[indexPokemon1].nombreCompleto;
  if (receptor === 'pokemon2') {
    if (!pokemon1Vivo) {
      log(`${nombrePokemonEmisor} está muerto y no puede atacar.`);
      return;
    }
    ataqueSeleccionado1 = dano;
    log(`${nombrePokemonEmisor} ataca por ${dano} con ${nombreAtaque}`);
  } else {
    if (!pokemon2Vivo) {
      log(`${nombrePokemonEmisor} está muerto y no puede atacar.`);
      return;
    }
    ataqueSeleccionado2 = dano;
    log(`${nombrePokemonEmisor} ataca por ${dano} con ${nombreAtaque}`);
  }

  atacar();
  cambiarTurno();
};

// Realizar ataques
const atacar = () => {
  if (ataqueEnCurso) return;

  ataqueEnCurso = true;

  if (turno === usuario1) {
    if (pokemon1Vivo && pokemon2Vivo) {
      aplicarDano(ataqueSeleccionado1, 'pokemon2');
    }
  } else {
    if (pokemon1Vivo && pokemon2Vivo) {
      aplicarDano(ataqueSeleccionado2, 'pokemon1');
    }
  }
  setTimeout(() => {
    ataqueSeleccionado1 = null;
    ataqueSeleccionado2 = null;
    ataqueEnCurso = false;
    actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
    actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");
  }, 500);
};

// Aplicar daño y verificar cambio de Pokémon
function aplicarDano(dano, receptor) {
  const equipo = receptor === "pokemon1" ? equipo1 : equipo2;
  const indexActual = receptor === "pokemon1" ? indexPokemon1 : indexPokemon2;

  equipo[indexActual].hp -= dano;
  if (equipo[indexActual].hp < 0) equipo[indexActual].hp = 0;

  log(`${equipo[indexActual].nombreCompleto} recibe ${dano} daño. HP restante: ${equipo[indexActual].hp}`);

  const nombrePokemon1 = equipo1[indexPokemon1].nombreCompleto;
  const nombrePokemon2 = equipo2[indexPokemon2].nombreCompleto;
  
  const imagenReceptor = document.getElementById(`imagen-${receptor}`);
  imagenReceptor.classList.add("dano");
  setTimeout(() => {
    imagenReceptor.classList.remove("dano");
    if (equipo[indexActual].hp === 0) {
      imagenReceptor.classList.add("muerto");
      if (receptor === "pokemon1") {
        pokemon1Vivo = false;
        log(nombrePokemon1 + " está muerto.");
        cambiarPokemon("pokemon1");
      } else {
        pokemon2Vivo = false;
        log(nombrePokemon2 + " está muerto.");
        cambiarPokemon("pokemon2");
      }
      actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
      actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");
    }
  }, 500);
  
  actualizarHP(receptor);
}

// Actualizar HP en la interfaz
function actualizarHP(pokemon) {
  const equipo = pokemon === "pokemon1" ? equipo1 : equipo2;
  const indexActual = pokemon === "pokemon1" ? indexPokemon1 : indexPokemon2;
  const hpElemento = document.getElementById(`vida-${pokemon}`);
  const hpLabel = document.getElementById(`label-hp${pokemon === "pokemon1" ? "1" : "2"}`);
  
  hpElemento.value = equipo[indexActual].hp;
  hpElemento.max = equipo[indexActual].stats[0].base_stat;
  hpLabel.innerHTML = `${equipo[indexActual].hp}/${equipo[indexActual].stats[0].base_stat}`;
}

// Cambiar al siguiente Pokémon en el equipo
async function cambiarPokemon(id) {
  const equipo = id === 'pokemon1' ? equipo1 : equipo2;
  const indexActual = id === 'pokemon1' ? indexPokemon1 : indexPokemon2;
  const contenedorId = id === 'pokemon1' ? 'ataques-1' : 'ataques-2';
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  if (indexActual + 1 < equipo.length) {
    if (id === 'pokemon1') {
      indexPokemon1++;
      pokemon1Vivo = true;
    } else {
      indexPokemon2++;
      pokemon2Vivo = true;
    }
    actualizarInterfazPokemon(equipo[indexActual + 1], id);
    log(equipo[indexActual + 1].nombreCompleto + " entra a la batalla." + `HP restante: ${equipo[indexActual + 1].hp}`);

    const nuevosAtaques = id === 'pokemon1'
      ? await generarAtaques(equipo[indexPokemon1])
      : await generarAtaques(equipo[indexPokemon2]);

    actualizarContenedoresAtaques(nuevosAtaques, id === 'pokemon1' ? "ataques-1" : "ataques-2");
  } else {
    if (id === 'pokemon1') {
      pokemon1Vivo = false;
      log( nombreEquipo1 + " ha perdido todos los Pokémon.");
    } else {
      pokemon2Vivo = false;
      log(nombreEquipo2 + " ha perdido todos los Pokémon.");
    }

    terminarBatalla()
  }
}

// Terminar la batalla y guardar los datos

async function terminarBatalla() {

nombreUsuarioVencedor = pokemon1Vivo ? usuario1 : usuario2


  try {
    const response = await fetch('http://localhost:3000/GuardarBatalla', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreUsuario1: usuario1,
        nombreEquipo1: nombreEquipo1,
        equipo1: nombresEquipo1,
        nombreUsuario2: usuario2,
        nombreEquipo2: nombreEquipo2, 
        equipo2: nombresEquipo2,
        nombreUsuarioVencedor: nombreUsuarioVencedor,
        historialDeMovimientos: historialDeMovimientos
      })
    });

    if (response.ok) {
      confirm('El usuario vencedor es: ' + nombreUsuarioVencedor);
      window.location.href = '/';
    } else {
      const errorData = await response.json();
      console.error('Error en la respuesta:', errorData);
      alert('Error al guardar');
    }
  } catch (error) {
    console.error('Error enviando solicitud:', error);
    alert('Error enviando solicitud'); 
  }
}





// Actualizar interfaz con nuevo Pokémon
function actualizarInterfazPokemon(pokemon, contenedor) {
  document.getElementById(`imagen-${contenedor}`).src = pokemon.sprites.front_default;
  document.getElementById(`nombre-${contenedor}`).innerText = capitalizar(pokemon.name);
  document.getElementById(`vida-${contenedor}`).value = pokemon.hp;
  document.getElementById(`vida-${contenedor}`).max = pokemon.stats[0].base_stat;
  document.getElementById(`label-hp${contenedor === "pokemon1" ? "1" : "2"}`).innerText = `${pokemon.hp}/${pokemon.stats[0].base_stat}`;
}


// Cargar los equipos Pokémon al iniciar
if (typeof window !== 'undefined') {
  window.onload = cargarPokemones;
}
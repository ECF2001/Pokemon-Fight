let listaPokemon, pokemon1, pokemon2;
let ataquesPokemon1 = [];
let ataquesPokemon2 = [];
let ataqueEnCurso = false;
let ataqueSeleccionado1 = null;
let ataqueSeleccionado2 = null;
let pokemon1Vivo = true;
let pokemon2Vivo = true;
let equipo1 = [];
let equipo2 = [];
let indexPokemon1 = 0;
let indexPokemon2 = 0;

// Función para capitalizar nombres
function capitalizar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Cargar lista de Pokémon
async function fetchListaPokemon() {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6&offset=0");
    const resultado = await respuesta.json();
    listaPokemon = resultado.results;

    // Selecciona dos Pokémon aleatorios para iniciar la batalla
    const randomIndex1 = Math.floor(Math.random() * listaPokemon.length);
    const randomIndex2 = Math.floor(Math.random() * listaPokemon.length);

    await cargarPokemones(listaPokemon[randomIndex1].url, listaPokemon[randomIndex2].url);
  } catch (error) {
    console.error(error);
  }
}

// Obtener datos del Pokémon
async function fetchPokemon(url) {
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error(error);
  }
}

// Cargar equipos Pokémon con 6 Pokémon cada uno
async function cargarPokemones(urlPokemon1, urlPokemon2) {
  equipo1 = await Promise.all([...Array(6)].map(async () => {
    const randomIndex = Math.floor(Math.random() * listaPokemon.length);
    return await fetchPokemon(listaPokemon[randomIndex].url);
  }));

  equipo2 = await Promise.all([...Array(6)].map(async () => {
    const randomIndex = Math.floor(Math.random() * listaPokemon.length);
    return await fetchPokemon(listaPokemon[randomIndex].url);
  }));

  // Asignar HP inicial
  equipo1.forEach(pokemon => pokemon.hp = pokemon.stats[0].base_stat);
  equipo2.forEach(pokemon => pokemon.hp = pokemon.stats[0].base_stat);

  actualizarInterfazPokemon(equipo1[0], 'pokemon1');
  actualizarInterfazPokemon(equipo2[0], 'pokemon2');

  ataquesPokemon1 = await generarAtaques(equipo1[0]);
  ataquesPokemon2 = await generarAtaques(equipo2[0]);

  actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
  actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");

  ataqueSeleccionado1 = null;
  ataqueSeleccionado2 = null;
  pokemon1Vivo = true;
  pokemon2Vivo = true;
  ataqueEnCurso = false;
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
    `<button class="boton-ataque" ${!pokemon1Vivo && contenedorId === "ataques-1" ? 'disabled' : ''} ${!pokemon2Vivo && contenedorId === "ataques-2" ? 'disabled' : ''} onclick="seleccionarAtaque(${ataque.power}, '${contenedorId === 'ataques-1' ? 'pokemon2' : 'pokemon1'}')">${capitalizar(ataque.name)}</button>`
  ).join('');
};

// Selección de ataque
const seleccionarAtaque = (dano, receptor) => {
  if (ataqueEnCurso) return;

  if (receptor === 'pokemon2') {
    if (!pokemon1Vivo) {
      console.log("Pokémon 1 está muerto y no puede atacar.");
      return;
    }
    ataqueSeleccionado1 = dano;
    console.log(`Ataque seleccionado para Pokémon 1: ${dano}`);
  } else {
    if (!pokemon2Vivo) {
      console.log("Pokémon 2 está muerto y no puede atacar.");
      return;
    }
    ataqueSeleccionado2 = dano;
    console.log(`Ataque seleccionado para Pokémon 2: ${dano}`);
  }

  if (ataqueSeleccionado1 !== null && ataqueSeleccionado2 !== null) {
    atacar();
  }
};

// Realizar ataques
const atacar = () => {
  if (ataqueEnCurso) return;

  ataqueEnCurso = true;
  
  console.log(`Preparando ataques: Pokémon 1 con daño ${ataqueSeleccionado1} y Pokémon 2 con daño ${ataqueSeleccionado2}`);
  
  setTimeout(() => {
    if (pokemon2Vivo) aplicarDano(ataqueSeleccionado1, 'pokemon2');
    setTimeout(() => {
      if (pokemon1Vivo) aplicarDano(ataqueSeleccionado2, 'pokemon1');
      setTimeout(() => {
        ataqueSeleccionado1 = null;
        ataqueSeleccionado2 = null;
        ataqueEnCurso = false;
        actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
        actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");
      }, 500);
    }, 500);
  }, 500);
};

// Aplicar daño y verificar cambio de Pokémon
function aplicarDano(dano, receptor) {
  const equipo = receptor === "pokemon1" ? equipo1 : equipo2;
  const indexActual = receptor === "pokemon1" ? indexPokemon1 : indexPokemon2;

  equipo[indexActual].hp -= dano;
  if (equipo[indexActual].hp < 0) equipo[indexActual].hp = 0;

  console.log(`Aplicando daño ${dano} a ${equipo[indexActual].name}. HP restante: ${equipo[indexActual].hp}`);
  
  const imagenReceptor = document.getElementById(`imagen-${receptor}`);
  imagenReceptor.classList.add("dano");
  setTimeout(() => {
    imagenReceptor.classList.remove("dano");
    if (equipo[indexActual].hp === 0) {
      imagenReceptor.classList.add("muerto");
      if (receptor === "pokemon1") {
        pokemon1Vivo = false;
        console.log("Pokémon 1 está muerto.");
        cambiarPokemon("pokemon1");
      } else {
        pokemon2Vivo = false;
        console.log("Pokémon 2 está muerto.");
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

  if (indexActual + 1 < equipo.length) {
    if (id === 'pokemon1') {
      indexPokemon1++;
      pokemon1Vivo = true;
    } else {
      indexPokemon2++;
      pokemon2Vivo = true;
    }
    actualizarInterfazPokemon(equipo[indexActual + 1], id);

    const nuevosAtaques = id === 'pokemon1' 
      ? await generarAtaques(equipo[indexPokemon1]) 
      : await generarAtaques(equipo[indexPokemon2]);

    actualizarContenedoresAtaques(nuevosAtaques, id === 'pokemon1' ? 'ataques-1' : 'ataques-2');
  } else {
    verificarFinDeBatalla();
  }
}
// Verificar si todos los Pokémon de un equipo han sido derrotados
function verificarFinDeBatalla() {
  const equipo1Derrotado = equipo1.every(pokemon => pokemon.hp === 0);
  const equipo2Derrotado = equipo2.every(pokemon => pokemon.hp === 0);

  if (equipo1Derrotado || equipo2Derrotado) {
    finalizarBatalla(equipo1Derrotado ? 'Equipo 2' : 'Equipo 1');
  }
}
// Finalizar la batalla
function finalizarBatalla(ganador) {
  console.log(`La batalla ha terminado. ${ganador} ha ganado.`);
  const botonesAtaque = document.querySelectorAll('.boton-ataque');
  botonesAtaque.forEach(boton => boton.disabled = true);

  const mensajeFinal = document.createElement("p");
  mensajeFinal.innerHTML = `La batalla ha terminado. ${ganador} ha ganado.`;
  mensajeFinal.style.textAlign = "center";
  mensajeFinal.style.fontSize = "24px";
  mensajeFinal.style.color = "#3b4cca";
  document.body.appendChild(mensajeFinal);
}

// Actualizar la interfaz con el Pokémon seleccionado
function actualizarInterfazPokemon(pokemon, id) {
  document.getElementById(`nombre-${id}`).innerHTML = capitalizar(pokemon.name);
  document.getElementById(`imagen-${id}`).src = pokemon.sprites.front_default;
  document.getElementById(`vida-${id}`).max = pokemon.stats[0].base_stat;
  document.getElementById(`vida-${id}`).value = pokemon.hp;
  document.getElementById(`label-hp${id === "pokemon1" ? "1" : "2"}`).innerHTML = `${pokemon.hp}/${pokemon.stats[0].base_stat}`;
}

// Inicialización automática de la batalla
window.onload = function () {
  fetchListaPokemon();
};

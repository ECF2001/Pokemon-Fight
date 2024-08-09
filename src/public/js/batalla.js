let listaPokemon, pokemon1, pokemon2;
let ataquesPokemon1 = [];
let ataquesPokemon2 = [];
let ataqueEnCurso = false;
let ataqueSeleccionado1 = null;
let ataqueSeleccionado2 = null;
let pokemon1Vivo = true;
let pokemon2Vivo = true;

// Devolver un string con la primera letra mayúscula
function capitalizar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchListaPokemon() {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const resultado = await respuesta.json();
    listaPokemon = resultado.results;

    const select1 = document.getElementById("pokemon1");
    const select2 = document.getElementById("pokemon2");

    select1.innerHTML = listaPokemon.map(pokemon => `<option value='${pokemon.url}'>${capitalizar(pokemon.name)}</option>`);
    select2.innerHTML = listaPokemon.map(pokemon => `<option value='${pokemon.url}'>${capitalizar(pokemon.name)}</option>`);
  } catch (error) {
    console.error(error);
  }
}

async function fetchPokemon(url) {
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error(error);
  }
}

const cargarPokemones = async () => {
  const select1 = document.getElementById("pokemon1");
  const select2 = document.getElementById("pokemon2");

  const pokemonSeleccionado1 = select1.options[select1.selectedIndex].value;
  const pokemonSeleccionado2 = select2.options[select2.selectedIndex].value;

  pokemon1 = await fetchPokemon(pokemonSeleccionado1);
  pokemon1.hp = pokemon1.stats[0].base_stat;
  pokemon2 = await fetchPokemon(pokemonSeleccionado2);
  pokemon2.hp = pokemon2.stats[0].base_stat;

  const imagenPokemon1 = document.getElementById("imagen-pokemon1");
  imagenPokemon1.src = pokemon1.sprites.back_default;
  const imagenPokemon2 = document.getElementById("imagen-pokemon2");
  imagenPokemon2.src = pokemon2.sprites.front_default;

  const nombrePokemon1 = document.getElementById("nombre-pokemon1");
  nombrePokemon1.innerHTML = capitalizar(pokemon1.name);
  const nombrePokemon2 = document.getElementById("nombre-pokemon2");
  nombrePokemon2.innerHTML = capitalizar(pokemon2.name);

  const hpPokemon1 = document.getElementById("vida-pokemon1");
  hpPokemon1.value = pokemon1.hp;
  hpPokemon1.max = pokemon1.stats[0].base_stat;
  const hpLabelPokemon1 = document.getElementById("label-hp1");
  hpLabelPokemon1.innerHTML = `${pokemon1.hp}/${pokemon1.stats[0].base_stat}`;

  const hpPokemon2 = document.getElementById("vida-pokemon2");
  hpPokemon2.value = pokemon2.hp;
  hpPokemon2.max = pokemon2.stats[0].base_stat;
  const hpLabelPokemon2 = document.getElementById("label-hp2");
  hpLabelPokemon2.innerHTML = `${pokemon2.hp}/${pokemon2.stats[0].base_stat}`;

  ataquesPokemon1 = await generarAtaques(pokemon1);
  ataquesPokemon2 = await generarAtaques(pokemon2);

  actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
  actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");

  // Reiniciar las selecciones de ataques
  ataqueSeleccionado1 = null;
  ataqueSeleccionado2 = null;
  pokemon1Vivo = true;
  pokemon2Vivo = true;
  ataqueEnCurso = false;
};

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

  // Filtrar ataques con poder
  const ataquesConPoder = ataques.filter(ataque => ataque.power !== null && ataque.power !== undefined);

  // Si no hay suficientes ataques con poder, seguir buscando más
  while (ataquesConPoder.length < 4) {
    const nuevosAtaques = await obtenerAtaques(pokemon);
    ataquesConPoder.push(...nuevosAtaques.filter(ataque => ataque.power !== null && ataque.power !== undefined));
    ataquesConPoder.splice(4); // Limitar a 4 ataques con poder
  }

  // Si hay más de 4 ataques con poder, seleccionar aleatoriamente 4
  if (ataquesConPoder.length > 4) {
    ataquesConPoder.sort(() => 0.5 - Math.random()).slice(0, 4);
  }

  return ataquesConPoder;
};

const actualizarContenedoresAtaques = (ataques, contenedorId) => {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = ataques.map(ataque =>
    `<button class="boton-ataque" ${!pokemon1Vivo && contenedorId === "ataques-1" ? 'disabled' : ''} ${!pokemon2Vivo && contenedorId === "ataques-2" ? 'disabled' : ''} onclick="seleccionarAtaque(${ataque.power}, '${contenedorId === 'ataques-1' ? 'pokemon2' : 'pokemon1'}')">${capitalizar(ataque.name)}</button>`
  ).join('');
};

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

  // Verificar si ambos ataques están seleccionados
  if (ataqueSeleccionado1 !== null && ataqueSeleccionado2 !== null) {
    atacar();
  }
};

const atacar = () => {
  if (ataqueEnCurso) return;

  ataqueEnCurso = true;
  
  console.log(`Preparando ataques: Pokémon 1 con daño ${ataqueSeleccionado1} y Pokémon 2 con daño ${ataqueSeleccionado2}`);
  
  // Ejecutar los ataques con un pequeño retraso
  setTimeout(() => {
    if (pokemon2Vivo) aplicarDano(ataqueSeleccionado1, 'pokemon2');
    setTimeout(() => {
      if (pokemon1Vivo) aplicarDano(ataqueSeleccionado2, 'pokemon1');
      setTimeout(() => {
        // Restablecer selección de ataques
        ataqueSeleccionado1 = null;
        ataqueSeleccionado2 = null;
        actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
        actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");
      }, 500); // Retraso para el segundo ataque
    }, 500);
  }, 500);
};

function aplicarDano(dano, receptor) {
  const pokemonReceptor = receptor === "pokemon1" ? pokemon1 : pokemon2;

  pokemonReceptor.hp -= dano;
  if (pokemonReceptor.hp < 0) pokemonReceptor.hp = 0;

  console.log(`Aplicando daño ${dano} a ${pokemonReceptor.name}. HP restante: ${pokemonReceptor.hp}`);
  
  const imagenReceptor = document.getElementById(`imagen-${receptor}`);
  imagenReceptor.classList.add("dano");
  setTimeout(() => {
    imagenReceptor.classList.remove("dano");
    if (pokemonReceptor.hp === 0) {
      imagenReceptor.classList.add("muerto");
      if (receptor === "pokemon1") {
        pokemon1Vivo = false;
        console.log("Pokémon 1 está muerto.");
      } else {
        pokemon2Vivo = false;
        console.log("Pokémon 2 está muerto.");
      }
      // Deshabilitar ataques si un Pokémon está muerto
      actualizarContenedoresAtaques(ataquesPokemon1, "ataques-1");
      actualizarContenedoresAtaques(ataquesPokemon2, "ataques-2");
    }
  }, 500);
  
  // Actualizar HP en la interfaz
  actualizarHP(receptor);
}

function actualizarHP(pokemon) {
  const hpPokemon = pokemon === "pokemon1" ? pokemon1 : pokemon2;
  const hpElemento = document.getElementById(`vida-${pokemon}`);
  const hpLabel = document.getElementById(`label-hp${pokemon === "pokemon1" ? "1" : "2"}`);
  
  hpElemento.value = hpPokemon.hp;
  hpElemento.max = hpPokemon.stats[0].base_stat;
  hpLabel.innerHTML = `${hpPokemon.hp}/${hpPokemon.stats[0].base_stat}`;
}

window.onload = function () {
  fetchListaPokemon();
};

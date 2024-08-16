//let equipo1 = ['bulbasaur'];
//let equipo2 = ['squirtle'];
let usuario1 = "usuario1";
let usuario2 = "usuario2";
let nombreEquipo1="1";
let nombreEquipo2="1"

let indexPokemon1 = 0;
let indexPokemon2 = 0;
let pokemon1Vivo = true;
let pokemon2Vivo = true;
let ataqueEnCurso = false; 
let ataqueSeleccionado1 = null;
let ataqueSeleccionado2 = null;
let ataquesPokemon1 = [];
let ataquesPokemon2 = [];

// Definir los nombres de los Pokémon en cada equipo
const nombresEquipo1 = equipo1;
const nombresEquipo2 = equipo2;

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
    console.error(`Error al obtener datos de ${nombre}:`, error);
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
    if (pokemon1Vivo && pokemon2Vivo) {
      aplicarDano(ataqueSeleccionado1, 'pokemon2');
    }
    setTimeout(() => {
      if (pokemon1Vivo && pokemon2Vivo) {
        aplicarDano(ataqueSeleccionado2, 'pokemon1');
      }
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

    actualizarContenedoresAtaques(nuevosAtaques, id === 'pokemon1' ? "ataques-1" : "ataques-2");
  } else {
    if (id === 'pokemon1') {
      pokemon1Vivo = false;
      console.log("Equipo 1 ha perdido todos los Pokémon.");
    } else {
      pokemon2Vivo = false;
      console.log("Equipo 2 ha perdido todos los Pokémon.");
    }

    terminarBatalla()
  }
}

// Terminar la batalla y guardar los datos

async function terminarBatalla() {
let idBatalla = 1


nombreUsuarioVencedor = pokemon1Vivo ? usuario1 : usuario2


  try {
    const response = await fetch('http://localhost:3000/guardarbatalla', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idBatalla: 2, 
        Usuario1: usuario1,
        Equipo1: nombreEquipo1,
        Usuario2: usuario2,
        Equipo2: nombreEquipo2, 
        UsuarioVencedor: nombreUsuarioVencedor,
      })
    });

    if (response.ok) {
      alert('Guardado exitosamente');
      window.location.href = 'http://localhost:3000/';
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
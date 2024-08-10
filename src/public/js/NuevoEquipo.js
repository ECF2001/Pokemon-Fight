const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1012';
const cuerpo = document.getElementById('cuerpo');
var pokemonsSelecionadosContainer = document.getElementById('contenedor-pokemon-seleccionado');
const salvarEquipoButton = document.getElementById('salvar-equipo');
let nombreEquipoInput = document.getElementById('nombre-equipo');
let nombreUsuarioInput = document.getElementById('nombre-usuario');

let pokemonsSelecionados = [];

async function getlista() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const lista = data.results;

    lista.forEach((pokemon, index) => {
      const tr = document.createElement('tr');
      
      const numero = document.createElement('td');
      numero.textContent = index + 1;

      const nombre = document.createElement('td');
      nombre.textContent = pokemon.name;
      nombre.classList.add('clickable');
      nombre.onclick = () => escogerPokemon(pokemon.name, index + 1);

      const imagen = document.createElement('td');
      const img = document.createElement('img');
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
      imagen.appendChild(img);

      tr.appendChild(numero);
      tr.appendChild(nombre);
      tr.appendChild(imagen);

      cuerpo.appendChild(tr);
    });

    rows = document.querySelectorAll('tbody tr');
    totalPaginas = Math.ceil(rows.length / rowsPerPage);
    displayRows(paginaActual);
    setupPagination();

  } catch (error) {
    console.error('Error obteniendo lista Pokémon:', error);
  }
}

function escogerPokemon(nombrePokemon, pokemonId) {
  if (pokemonsSelecionados.length < 6) {
    if (!pokemonsSelecionados.some(pokemon => pokemon.name === nombrePokemon)) {
      pokemonsSelecionados.push({ name: nombrePokemon, id: pokemonId });
      updatepokemonsSelecionadosList();
    } else {
      alert('Este Pokémon ya está en el equipo');
    }
  } else {
    alert('Solo puede seleccionar 6 Pokémon');
  }
}

function updatepokemonsSelecionadosList() {
  pokemonsSelecionadosContainer.innerHTML = '';
  pokemonsSelecionados.forEach(pokemon => {
    const div = document.createElement('div');
    div.classList.add('selected-pokemon');

    const img = document.createElement('img');
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    div.appendChild(img);

    const nombre = document.createElement('p');
    nombre.innerText = pokemon.name;
    div.appendChild(nombre);

    pokemonsSelecionadosContainer.appendChild(div);
  });
}

async function saveTeam() {
  const nombreEquipo = document.getElementById('nombreEquipo').value.trim();
  const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
  
  if (nombreEquipo === '' || nombreUsuario === '') {
    alert('Por favor, ingrese el nombre del equipo y del usuario');
    return;
  }

  const listaP = pokemonsSelecionados.map(item => item.name);

  if (pokemonsSelecionados.length === 6) {
    try {
      const response = await fetch('http://localhost:3000/guardarEquipo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombreEquipo: nombreEquipo,
          listaPokemon: listaP,
          nombreUsuario: nombreUsuario,
        })
      });

      if (response.ok) {
        alert(`Equipo "${nombreEquipo}" guardado exitosamente`);
      } else {
        alert('Error guardando el equipo');
      }
    } catch (error) {
      console.error('Error enviando solicitud:', error);
      alert('Error enviando solicitud');
    }
  } else {
    alert('Por favor seleccione 6 Pokémon');
  }
}

salvarEquipoButton.onclick = saveTeam;


let paginaActual = 1;
const rowsPerPage = 10;
let totalPaginas;
let rows;

function displayRows(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  rows.forEach((row, index) => {
    row.style.display = (index >= start && index < end) ? '' : 'none';
  });
}

function setupPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const createButton = (text, page, isCurrent = false) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'pagination-button';
    if (isCurrent) {
      button.classList.add('current');
    }
    button.onclick = () => {
      paginaActual = page;
      displayRows(paginaActual);
      setupPagination();
    };
    return button;
  };

  if (paginaActual > 1) {
    pagination.appendChild(createButton('Anterior', paginaActual - 1));
  }

  for (let i = 1; i <= totalPaginas; i++) {
    if (i === paginaActual || i === 1 || i === totalPaginas || (i >= paginaActual - 2 && i <= paginaActual + 2)) {
      pagination.appendChild(createButton(i, i, i === paginaActual));
    } else if (i === paginaActual - 3 || i === paginaActual + 3) {
      pagination.appendChild(document.createTextNode('...'));
    }
  }

  if (paginaActual < totalPaginas) {
    pagination.appendChild(createButton('Siguiente', paginaActual + 1));
  }
}

getlista();
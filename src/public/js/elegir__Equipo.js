let equipoSeleccionado = null;
let equipoActual = 0;

// Consultar equipos
async function consultarEquipos() {
    try {
        const response = await fetch('http://localhost:3000/obtenerEquipos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const equipos = await response.json();
            generarCajasEquipos(equipos);

            // Iniciar carrusel
            carrousel();
        } else {
            alert('Error obteniendo equipos');
        }
    } catch (error) {
        alert('Error enviando solicitud');
    }
}

// Obtener imagen del Pokémon
async function obtenerImagenPokemon(pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (response.ok) {
            const data = await response.json();
            return data.sprites.front_default;
        } else {
            return '';
        }
    } catch (error) {
        return '';
    }
}

// Generar las cajas de equipos y configurar botones
async function generarCajasEquipos(equipos) {
    const contenedorEquipos = document.getElementById('contenedorEquipos');
    contenedorEquipos.innerHTML = '';

    equipos.forEach(async (equipo, i) => {
        const caja = document.createElement('div');
        caja.classList.add('caja');
        caja.id = `equipo_${i + 1}`;
        
        // Ocultar todas las cajas excepto la primera (para el carrusel)
        caja.style.display = 'none';

        const titulo = document.createElement('h2');
        titulo.textContent = equipo.nombreEquipo;
        caja.appendChild(titulo);

        const tabla = document.createElement('table');
        for (let j = 0; j < 3; j++) {
            const fila = document.createElement('tr');
            for (let k = 0; k < 2; k++) {
                const celda = document.createElement('td');
                const imagenPokemon = document.createElement('img');
                imagenPokemon.classList.add('imagen_Personajes');
                const pokemonIndex = j * 2 + k;
                if (pokemonIndex < equipo.listaPokemon.length) {
                    const pokemon = equipo.listaPokemon[pokemonIndex];
                    const imageUrl = await obtenerImagenPokemon(pokemon);
                    imagenPokemon.src = imageUrl;
                    imagenPokemon.alt = pokemon;
                }
                celda.appendChild(imagenPokemon);
                fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }
        caja.appendChild(tabla);

        const botonElegir = document.createElement('button');
        botonElegir.textContent = 'Elegir este equipo';
        caja.appendChild(botonElegir);

        // Evento "Elegir este equipo"
        botonElegir.addEventListener('click', function () {
            seleccionarEquipo(equipo, caja);
        });

        const botonBatalla = document.createElement('a');
        botonBatalla.href = "/BatallaPokemon";
        const botonIniciarBatalla = document.createElement('button');
        botonIniciarBatalla.textContent = 'Iniciar Batalla';
        botonBatalla.appendChild(botonIniciarBatalla);
        caja.appendChild(botonBatalla);

        contenedorEquipos.appendChild(caja);
    });
}

// Carrusel para rotar entre equipos
function carrousel() {
    const equipos = document.querySelectorAll('.caja');
    if (equipos.length === 0) return;

    // Ocultar todos los equipos
    equipos.forEach((equipo) => {
        equipo.style.display = 'none';
    });

    // Mostrar el equipo actual
    equipos[equipoActual].style.display = 'block';

    // Actualizar el índice para el siguiente equipo
    equipoActual = (equipoActual + 1) % equipos.length;

    
}

// Función para seleccionar equipo
function seleccionarEquipo(equipo, contenedor) {
    document.querySelectorAll('.caja').forEach(caja => {
        caja.classList.remove('seleccionado');
    });

    contenedor.classList.add('seleccionado');

    // Añadir la clase "seleccionado" al contenedor general de equipos
    document.getElementById('contenedorEquipos').classList.add('seleccionado');

    // Guardar el equipo seleccionado
    equipoSeleccionado = equipo;
}

document.addEventListener('DOMContentLoaded', function () {
    consultarEquipos();
});






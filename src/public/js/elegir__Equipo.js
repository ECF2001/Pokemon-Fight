let equipoSeleccionadoUsuario = null;
let equipoSeleccionadoAmigo = null;
let equipoActualUsuario = 0;
let equipoActualAmigo = 0;

// Consultar equipos del usuario
async function consultarEquiposUsuario() {
    try {
        const response = await fetch('http://localhost:3000/obtenerEquipos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const equiposUsuario = await response.json();
            generarCajasEquipos(equiposUsuario, 'contenedorEquiposUsuario', 'usuario');
            carrousel('usuario');
        } else {
            alert('Error obteniendo equipos del usuario');
        }
    } catch (error) {
        console.error('Error enviando solicitud:', error);
        alert('Error enviando solicitud');
    }
}

// Consultar equipos de amigos
async function consultarEquiposAmigos() {
    try {
        const response = await fetch('http://localhost:3000/obtenerEquipos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const equiposAmigos = await response.json();
            generarCajasEquipos(equiposAmigos, 'contenedorEquiposAmigos', 'amigo');
            carrousel('amigo');
        } else {
            alert('Error obteniendo equipos de amigos');
        }
    } catch (error) {
        console.error('Error enviando solicitud:', error);
        alert('Error enviando solicitud');
    }
}

// Generar las cajas de equipos y configurar botones
async function generarCajasEquipos(equipos, contenedorId, tipo) {
    const contenedorEquipos = document.getElementById(contenedorId);
    contenedorEquipos.innerHTML = '';

    for (let i = 0; i < equipos.length; i++) {
        const equipo = equipos[i];
        const caja = document.createElement('div');
        caja.classList.add('caja');
        caja.id = `equipo_${tipo}_${i + 1}`;

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
        botonElegir.classList.add('boton_general');
        botonElegir.textContent = 'Elegir este equipo';
        caja.appendChild(botonElegir);

        botonElegir.addEventListener('click', function () {
            seleccionarEquipo(equipo, caja, tipo);
        });

        const botonBatalla = document.createElement('a');
        botonBatalla.href = "/BatallaPokemon";
        const botonIniciarBatalla = document.createElement('button');
        botonIniciarBatalla.classList.add('boton_general');
        botonIniciarBatalla.textContent = 'Iniciar batalla';
        botonBatalla.appendChild(botonIniciarBatalla);
        caja.appendChild(botonBatalla);

        contenedorEquipos.appendChild(caja);
    }
}

// Carrusel para rotar entre equipos
function carrousel(tipo) {
    const contenedorId = tipo === 'usuario' ? 'contenedorEquiposUsuario' : 'contenedorEquiposAmigos';
    const equipos = document.querySelectorAll(`#${contenedorId} .caja`);
    if (equipos.length === 0) return;

    let equipoActual = tipo === 'usuario' ? equipoActualUsuario : equipoActualAmigo;
   
    equipos.forEach((equipo) => {
        equipo.style.display = 'none';
    });

    equipos[equipoActual].style.display = 'block';

    equipoActual = (equipoActual + 1) % equipos.length;

    if (tipo === 'usuario') {
        equipoActualUsuario = equipoActual;
    } else {
        equipoActualAmigo = equipoActual;
    }
}

// Función para seleccionar equipo
function seleccionarEquipo(equipo, contenedor, tipo) {
    const contenedorId = tipo === 'usuario' ? 'contenedorEquiposUsuario' : 'contenedorEquiposAmigos';
    document.querySelectorAll(`#${contenedorId} .caja`).forEach(caja => {
        caja.classList.remove('seleccionado');
    });

    contenedor.classList.add('seleccionado');

    if (tipo === 'usuario') {
        equipoSeleccionadoUsuario = equipo;
    } else {
        equipoSeleccionadoAmigo = equipo;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    consultarEquiposUsuario();
    consultarEquiposAmigos();
});





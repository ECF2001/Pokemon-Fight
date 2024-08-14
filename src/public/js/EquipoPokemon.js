async function consultarEquipos() {
    try {
        const response = await fetch('http://localhost:3000/obtenerEquipos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });

        if (response.ok) {
            const equipos = await response.json();
            await llenarTabla(equipos);
        } else {
            alert('Error obteniendo equipos');
        }
    } catch (error) {
        console.error('Error enviando solicitud:', error);
        alert('Error enviando solicitud');
    }
}

async function obtenerImagenPokemon(pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (response.ok) {
            const data = await response.json();
            return data.sprites.front_default || '';
        } else {
            console.error(`Error fetching image for ${pokemon}`);
            return '';
        }
    } catch (error) {
        console.error(`Error fetching image for ${pokemon}:`, error);
        return '';
    }
}

async function llenarTabla(equipos) {
    const tableBody = document.querySelector('#tablaEquipos tbody');
    tableBody.innerHTML = '';

    for (const equipo of equipos) {
        const row = document.createElement('tr');
        row.classList.add('decoracionTabla');

        const nombreEquipoCell = document.createElement('td');
        nombreEquipoCell.innerHTML = `<strong>${equipo.nombreEquipo}`;
        row.appendChild(nombreEquipoCell);

        for (const pokemon of equipo.listaPokemon) {
            const pokemonCell = document.createElement('td');
            const imageUrl = await obtenerImagenPokemon(pokemon);
            pokemonCell.innerHTML = `
                <img src="${imageUrl}" alt="${pokemon}">
                <button class="btn-delete" data-equipo="${equipo.nombreEquipo}" data-index="${pokemon}">
                    <i class='bx bx-trash'></i>
                </button>
            `;
            // agregue boton borrar
            row.appendChild(pokemonCell);
        }

        for (let i = equipo.listaPokemon.length; i < 6; i++) {
            const emptyCell = document.createElement('td');
            emptyCell.innerHTML = `<strong>Vacio`;
            row.appendChild(emptyCell);
        }

        tableBody.appendChild(row);
    }

    fileSeleccionadaListener();
    agregarListenersEliminar();
}

function agregarListenersEliminar() {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', async function () {
            const nombreEquipo = this.dataset.equipo;
            const pokemon = this.dataset.index;

            try {
                const response = await fetch('http://localhost:3000/modificarEquipo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        equipo: nombreEquipo,
                        usuario: 'nimo23',
                        pokemon: pokemon
                    })
                });

                if (response.ok) {
                    //alert(`Equipo "${nombreEquipo}" modificado exitosamente`);
                    location.reload();
                } else {
                    alert('Error modificando el equipo');
                }
            } catch (error) {
                console.error('Error enviando solicitud:', error);
                alert('Error enviando solicitud');
            }

        });
    });
}

function fileSeleccionadaListener() {
    const filas = document.querySelectorAll('.decoracionTabla');

    filas.forEach(function (fila) {
        fila.addEventListener('click', function () {
            filas.forEach(function (f) {
                f.classList.remove('seleccionada');
            });

            fila.classList.add('seleccionada');
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    consultarEquipos();
});

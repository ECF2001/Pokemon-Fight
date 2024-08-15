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
        nombreEquipoCell.innerHTML = `<strong>${equipo.nombreEquipo}<br><br>
            <button class="btn-delete-team" data-equipo="${equipo.nombreEquipo}">
                <i class='bx bx-trash'></i>
            </button>
        `;
        row.appendChild(nombreEquipoCell);

        for (const pokemon of equipo.listaPokemon) {
            const pokemonCell = document.createElement('td');
            const imageUrl = await obtenerImagenPokemon(pokemon);
            pokemonCell.innerHTML = `
                <img src="${imageUrl}" alt="${pokemon}"><br>
                <button class="btn-delete" data-equipo="${equipo.nombreEquipo}" data-index="${pokemon}">
                    <i class='bx bx-trash'></i>
                </button>
            `;
            row.appendChild(pokemonCell);
        }

        for (let i = equipo.listaPokemon.length; i < 6; i++) {
            const emptyCell = document.createElement('td');
            emptyCell.innerHTML = `
                <button class="btn-add" data-equipo="${equipo.nombreEquipo}">
                    <i class='bx bx-plus'></i>
                </button>`;
            row.appendChild(emptyCell);
        }

        tableBody.appendChild(row);
    }

    agregarPokemonListener();
    eliminarPokemonListener();
    borrarEquipoListener();
}

async function seleccionarPokemon(i, nombreEquipo) {
    console.log('Indice Pokemon Clickeado' + i);
    console.log(nombreEquipo);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    pokemon = data.species.name;

    try {
        const response = await fetch('http://localhost:3000/agregarPokemonEquipo', {
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
            location.reload();
        } else {
            alert('Error agregando pokemon');
        }
    } catch (error) {
        console.error('Error enviando solicitud:', error);
        alert('Error enviando solicitud');
    }

    const ventanaPokemon = document.getElementById('ventanaPokemon');
    ventanaPokemon.style.display = 'none';

}

function agregarPokemonListener() {
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', function () {
            const ventanaPokemon = document.getElementById('ventanaPokemon');
            const nombreEquipo = this.dataset.equipo;
            ventanaPokemon.style.display = 'block';
            ventanaPokemon.innerHTML = '';

            for (let i = 0; i < 1012; i++) {
                const img = document.createElement('img');
                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;
                img.alt = `Pokemon ${i+1}`;
                img.dataset.equipo = nombreEquipo;
                img.onclick = seleccionarPokemon.bind(null, i+1, nombreEquipo);
                ventanaPokemon.appendChild(img);
            }
        });
    });
}

function eliminarPokemonListener() {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', async function () {
            const nombreEquipo = this.dataset.equipo;
            const pokemon = this.dataset.index; //Nombre pokemon, no indice

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

function borrarEquipoListener() {
    document.querySelectorAll('.btn-delete-team').forEach(button => {
        button.addEventListener('click', async function () {
            const nombreEquipo = this.dataset.equipo;

            try {
                const response = await fetch('http://localhost:3000/borrarEquipo', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        equipo: nombreEquipo,
                        usuario: 'nimo23'
                    })
                });

                if (response.ok) {
                    location.reload();
                } else {
                    alert('Error borrando el equipo');
                }
            } catch (error) {
                console.error('Error enviando solicitud:', error);
                alert('Error enviando solicitud');
            }

        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    consultarEquipos();
});

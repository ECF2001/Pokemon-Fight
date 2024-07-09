document.addEventListener('DOMContentLoaded', () => {
    const jugadores = [
        {nombre: 'Jugador1', puntos: 100, duelosGanados: 10, pokemon: 'Pikachu.png'},
        {nombre: 'Jugador2', puntos: 90, duelosGanados: 9, pokemon: 'Charizard.png'},
    ];

    const tableBody = document.querySelector('#tabla_liderazgo tbody');
    const formAgregarJugador = document.getElementById('formAgregarJugador');

    function actualizarTabla() {
        tableBody.innerHTML = '';

        jugadores.forEach(jugador => {
            const row = document.createElement('tr');

            row.innerHTML =  `
            <td>
                <div class="caja_Usuario">
                    <img class="imagen_Personajes" src="${jugador.pokemon}">
                    ${jugador.nombre}
                </div>
            </td>
            <td>
                <p>Puntos: ${jugador.puntos}</p>
                <p>Duelos ganados: ${jugador.duelosGanados}</p>
            </td>
            <td>
                <img class="imagen_PersonajesUtilizado" src="${jugador.pokemon}">
            </td>
        `;

        tableBody.appendChild(row);
        });
    }

    formAgregarJugador.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Formulario enviado');

        const nombre = document.getElementById('nombre').value;
        const puntos = parseInt(document.getElementById('puntos').value);
        const duelosGanados = parseInt(document.getElementById('duelosGanados').value);
        const pokemon = document.getElementById('pokemon').value;

        console.log({nombre, puntos, duelosGanados, pokemon});

        jugadores.push({nombre, puntos, duelosGanados, pokemon});

        actualizarTabla();

        formAgregarJugador.reset();
    });

    actualizarTabla();
});
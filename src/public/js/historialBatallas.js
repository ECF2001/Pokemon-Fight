document.addEventListener('DOMContentLoaded', async function() {
    async function consultarEquipos() {
        try {
            const response = await fetch('http://localhost:3000/BajarBatalla', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                return await response.json(); 
            } else {
                alert('Error obteniendo equipos');
            }
        } catch (error) {
            console.error('Error enviando solicitud:', error);
            alert('No se encontraron batallas');
        }
    }

    const batallas = await consultarEquipos();
    const contenedorPartidas = document.getElementById('contenedorPartidas');

    if (!contenedorPartidas) {
        console.error('No se encontró el contenedor con ID contenedorPartidas');
        return;
    }

    batallas.forEach(batalla => {
        const divPartida = document.createElement('div');
        divPartida.classList.add('partida');

        const jugador1 = document.createElement('div');
        jugador1.classList.add('player');
        const nombre1 = document.createElement('p');
        nombre1.textContent = batalla.nombreUsuario1;

        const resultado = document.createElement('div');
        resultado.classList.add('resultado');
        const resultadoTexto = document.createElement('p');
        resultadoTexto.textContent = `El ganador es ${batalla.nombreUsuarioVencedor}`;

        const jugador2 = document.createElement('div');
        jugador2.classList.add('player');
        const nombre2 = document.createElement('p');
        nombre2.textContent = batalla.nombreUsuario2;

        jugador1.appendChild(nombre1);
        resultado.appendChild(resultadoTexto);
        jugador2.appendChild(nombre2);

        divPartida.appendChild(jugador1);
        divPartida.appendChild(resultado);
        divPartida.appendChild(jugador2);

        contenedorPartidas.appendChild(divPartida);
    });
});

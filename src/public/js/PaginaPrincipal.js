async function obtenerAmigos() {
    try {
        const response = await fetch('http://localhost:3000/verAmigos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });

        if (response.ok) {
            const amigos = await response.json();
            console.log(amigos)
            actualizarListaAmigos(amigos);
        } else {
            alert('Error obteniendo Amigos');
        }
    } catch (error) {
        console.error('Error enviando solicitud:', error);
        alert('Error enviando solicitud');
    }
    
}

function actualizarListaAmigos(amigos) {
    const tabla = document.querySelector('.listaAmigos table');
    
    tabla.innerHTML = `
       
    `;
    
    amigos.forEach(amigo => {
        // `Object.keys(amigo)[0]` obtiene la clave del objeto, que es el nombre del amigo
        const nombreAmigo = Object.keys(amigo)[0];
        const fotoPerfil = amigo[nombreAmigo];
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img class="imagen_Personajes" src="${fotoPerfil || '/fotos_perfil/0_0.png'}" alt="${nombreAmigo}"></td>
            <td>${nombreAmigo}</td>
        `;
        
        tabla.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const agregarAmigoBtn = document.getElementById('agregarAmigo_BTN');

    agregarAmigoBtn.addEventListener('click', async function () {
        const nombreAmigo = document.getElementById('agregarAmigo').value;

        if (nombreAmigo.trim() === '') {
            alert('Por favor, ingresa un nombre de usuario válido.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/agregarAmigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombreAmigo })
            });

            if (response.ok) {
                const resultado = await response.json();
                location.reload();
            } else {
                alert('Error al agregar amigo');
            }
        } catch (error) {
            console.error('Error enviando solicitud:', error);
            alert('Error al enviar solicitud');
        }
    });
});





document.addEventListener('DOMContentLoaded', function () {
    obtenerAmigos();
});




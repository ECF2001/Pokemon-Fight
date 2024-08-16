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
            alert('Error obteniendo equipos');
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
            <td><img class="imagen_Personajes" src="${fotoPerfil}" alt="${nombreAmigo}"></td>
            <td>${nombreAmigo}</td>
        `;
        
        tabla.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    obtenerAmigos();
});

// Ventana modal
const  modal = document.getElementById("ventanaModal");
// Botón que abre el modal
const boton = document.getElementById("abrirModal");
// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("cerrar")[0];
// Cuando el usuario hace clic en el botón, se abre la ventana
boton.addEventListener("click",function() {
  modal.style.display = "block";
});
// Si el usuario hace clic en la x, la ventana se cierra
span.addEventListener("click",function() {
  modal.style.display = "none";
});
// Si el usuario hace clic fuera de la ventana, se cierra.
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
async function consultarEquiposusuario() {
    try {
      const response = await fetch('http://localhost:3000/obtenerEquiposusuario', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const equipos = await response.json();
        agregarEquiposALista(equipos);
      } else {
        alert('Error obteniendo equipos');
      }
    } catch (error) {
      alert('Error enviando solicitud');
    }
  }
  
  function agregarEquiposALista(equipos) {
    const lista1 = document.getElementById('lista1');
    equipos.forEach((equipo) => {
      const option = document.createElement('option');
      option.value = equipo.nombreEquipo;
      option.text = equipo.nombreEquipo;
      lista1.appendChild(option);
    });
  }
  
  async function consultarAmigos() {
    try {
      const response = await fetch('http://localhost:3000/verAmigos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const amigos = await response.json();
        agregarAmigosALista(amigos);
      } else {
        alert('Error obteniendo amigos');
      }
    } catch (error) {
      alert('Error enviando solicitud');
    }
  }
  
  function agregarAmigosALista(amigos) {
    const lista1 = document.getElementById('lista2');
    amigos.forEach((amigo) => {
      for (const propiedad in amigo) {
        const option = document.createElement('option');
        option.value = propiedad;
        option.text = propiedad;
        lista1.appendChild(option);
      }
    });
  }
document.getElementById('lista2').addEventListener('change', buscarEquiposAmigo);

async function buscarEquiposAmigo() {
    const lista2 = document.getElementById('lista2');
    const amigoSeleccionado = lista2.options[lista2.selectedIndex].value;
  
    try {
      const response = await fetch(`http://localhost:3000/obtenerEquiposAmigo?amigo=${amigoSeleccionado}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const equipos = await response.json();
        agregarEquiposALista3(equipos);
      } else {
        alert('Error obteniendo equipos');
      }
    } catch (error) {
      alert('Error enviando solicitud');
    }
  }
  

  function agregarEquiposALista3(equipos) {
    const lista3 = document.getElementById('lista3');
    equipos.forEach((equipo) => {
      const option = document.createElement('option');
      option.value = equipo.nombreEquipo;
      option.text = equipo.nombreEquipo;
      lista3.appendChild(option);
    });
  }

  
  consultarAmigos();
  consultarEquiposusuario();




document.addEventListener('DOMContentLoaded', function() {
    const enviarButton = document.querySelector('input[type="submit"]');
    enviarButton.addEventListener('click', guardarValores);
  
    function guardarValores(event) {
      event.preventDefault(); 
  
      const lista1 = document.getElementById('lista1');
      const lista2 = document.getElementById('lista2');
      const lista3 = document.getElementById('lista3');
  
      const valorLista1 = lista1.options[lista1.selectedIndex].value;
      const valorLista2 = lista2.options[lista2.selectedIndex].value;
      const valorLista3 = lista3.options[lista3.selectedIndex].value;
  

      let amigoSeleccionado = valorLista2;
      let equipoUsuarioSeleccionado = valorLista1;
      let equipoAmigoSeleccionado = valorLista3;

      console.log(amigoSeleccionado, equipoUsuarioSeleccionado, equipoAmigoSeleccionado);
    }
  });
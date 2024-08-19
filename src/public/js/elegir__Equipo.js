
function filtrarEquipo2() {
  const nombreUsuario2 = document.getElementById('nombreUsuario2').value;
  document.getElementById('nombreEquipo2').value = "";
  const opcionesEquipos = document.getElementById('nombreEquipo2').options;
  for (let i = 0; i < opcionesEquipos.length; i++) {
    const opcion = opcionesEquipos[i];
    if (opcion.getAttribute("data-amigo") === nombreUsuario2) {
      opcion.style.display = 'block';
    } else {
      opcion.style.display = 'none';
    }
  }
};

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombreEquipo1 = document.getElementById('nombreEquipo1').value;
  const nombreUsuario2 = document.getElementById('nombreUsuario2').value;
  const nombreEquipo2 = document.getElementById('nombreEquipo2').value;

  if (nombreEquipo1 != "" && nombreUsuario2 != "" && nombreEquipo2 != "") {

    document.getElementById("mensaje").style.display = 'none';
    formulario.submit();
  } else {
    document.getElementById("mensaje").style.display = 'block';
  }
});
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    nombre: /^[a-zA-Z0-9\_\-]{4,16}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    segundoapellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    nombre_usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    identificacion: /^\d{7,14}$/,
    contraseña: /^[a-zA-Z0-9\_\-]{4,16}$/
}

const campos = {
    nombre: false,
    apellido: false,
    segundoapellido: false,
    nombre_usuario: false,
    correo: false,
    identificacion: false,
    contraseña: false
}

const validarFomulario = (e) => {
    switch (e.target.id) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido");
            break;
        case "segundoapellido":
            validarCampo(expresiones.segundoapellido, e.target, "segundoapellido");

            break;
        case "nombre_usuario":
            validarCampo(expresiones.nombre_usuario, e.target, "nombre_usuario");
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
        case "identificacion":
            validarCampo(expresiones.identificacion, e.target, "identificacion");
            break;
            case "contraseña":
             validarCampo(expresiones.contraseña, e.target, "contraseña");
            break;    
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__general-incorrecto");// cambia la clase para asignar el color
        document.getElementById(`grupo__${campo}`).classList.add("formulario__general-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-exclamation-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-xmark");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add("formulario__general-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__general-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-exclamation-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-xmark"); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFomulario);
    input.addEventListener("blur", validarFomulario);
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (campos.nombre && campos.apellido && campos.segundoapellido && campos.nombre_usuario && campos.correo && campos.identificacion && campos.contraseña) {

        document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

        formulario.submit();
    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});





const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
     contrasena: /^[a-zA-Z0-9\_\-]{4,16}$/
}

const campos = {
    correo: false, 
    contrasena: false
}

const validarFormulario = (e) => {
        switch (e.target.id){
            case "correo":
                validarCampo(expresiones.correo, e.target, "correo");
                break; 
            case "contrasena":
                validarCampo(expresiones.contrasena, e.target, "contrasena");
                break; 
    }
}

const validarCampo =  (expresion, input, campo) => {
     if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__general-incorrecto");
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
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);

});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (campos.correo && campos.contrasena) {

        document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito");

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

        formulario.submit();
    } else {
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito");
    }
});
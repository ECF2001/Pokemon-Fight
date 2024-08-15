const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    nuevaContrasena: /^[a-zA-Z0-9\_\-]{8,16}$/,
     confirmarContrasena: /^[a-zA-Z0-9\_\-]{8,16}$/
}

const campos = {
    nuevaContrasena: false, 
    confirmarContrasena: false
}

const validarFormulario = (e) => {
        switch (e.target.id){
            case "nuevaContrasena":
                validarCampo(expresiones.nuevaContrasena, e.target, "nuevaContrasena");
                break; 
            case "confirmarContrasena":
                validarCampo(expresiones.confirmarContrasena, e.target, "confirmarContrasena");
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
    
    if (campos.nuevaContrasena && campos.confirmarContrasena) {
        console.log('enviado formulario')

        document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-activo");

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

         formulario.submit();
    } else {
        console.log('no enviado')
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito");
    }
});

function cambiarVisibilidad() {
    const nuevaContrasena = document.getElementById("nuevaContrasena");
    const confirmarContrasena = document.getElementById("confirmarContrasena");
    if (nuevaContrasena.type === "password") {
        nuevaContrasena.type = "text";
        confirmarContrasena.type = "text";
    } else {
        nuevaContrasena.type = "password";
        confirmarContrasena.type = "password";
    }
};
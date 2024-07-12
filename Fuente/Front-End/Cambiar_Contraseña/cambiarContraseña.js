const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
     contraseña: /^[a-zA-Z0-9\_\-]{8,16}$/,
     contraseña2: /^[a-zA-Z0-9\_\-]{8,16}$/
}

const campos = {
    contraseña: false, 
    contraseña2: false
}

const validarFormulario = (e) => {
        switch (e.target.id){
            case "contraseña":
                validarCampo(expresiones.contraseña, e.target, "contraseña");
                break; 
            case "contraseña2":
                validarCampo(expresiones.contraseña2, e.target, "contraseña2");
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
    
    if (campos.contraseña && campos.contraseña2) {

        document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-activo");

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

        setTimeout(() => {
            document.querySelectorAll(".formulario__general--correcto").forEach((icono) => {
                icono.classList.remove("formulario__general--correcto");
            });

           location.reload();
        }, 4000);
   
    } else {
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito");
    }
});
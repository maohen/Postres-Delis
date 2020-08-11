let menu = document.querySelector(".desaparece");
let nav = document.getElementById("nav");
let logotipo = document.getElementById("logo");
let cambio = false;
let nombres = document.getElementById("name");
let telefono = document.getElementById("tel");
let email = document.getElementById("email");
let btnEnviar = document.getElementById("btn-enviar");


menu.addEventListener("click", () => {

    if (cambio === false) {
        nav.style.display = "block";
        // logotipo.style.backgroundColor="#f1eadd";
        cambio = true
    } else {
        nav.style.display = "none";
        
        cambio = false;
    }
})



document.addEventListener("DOMContentLoaded", inicio);
email.addEventListener("change", validarCampo);
nombres.addEventListener("blur", validarCampo);
telefono.addEventListener("blur", validarCampo);
btnEnviar.addEventListener("click", enviarForm);

function inicio() {
    btnEnviar.disabled = true;
}



function validarCampo() {

    cambiarColor(this);
    if (this === email)
        if (email.value.indexOf("@") === -1) {
            email.style.borderBottom = "solid red";
        }
    

    if (email.value !== "" && nombres.value !== "" && telefono.value !== "") {
        if (email.value.indexOf("@") != -1){
            btnEnviar.disabled = false;
            btnEnviar.style.backgroundColor="#e4b261";
            btnEnviar.style.cursor="pointer";
        }
        else
            btnEnviar.disabled = true;
    } else {
        btnEnviar.disabled = true;
    }
}

function cambiarColor(campo) {
    if (campo.value === "") {
        campo.style.borderBottom = "solid red";
    } else {
        campo.style.borderBottom = "solid #f7b140 1px";
    }
}
txtNombre = document.getElementById("txtNombre");
txtEmail = document.getElementById("txtEmail");
txtDireccion = document.getElementById("txtDireccion");
txtTelefono = document.getElementById("txtTelefono");
txtCuil = document.getElementById("txtCuil");
errorMessageEmail = document.getElementById("error-message-email");
errorMessageTelefono = document.getElementById("error-message-telefono");
errorMessageCuil = document.getElementById("error-message-cuil");


const getToken = () => {
    token = localStorage.getItem("auth-token");
    if(token == undefined || token == null || token == ""){
        window.location.replace("http://127.0.0.1:5500/interfaces/html/loginScreen.html");
    };
}

const destroyToken = () => {
    setTimeout(() => {
        token = localStorage.setItem("auth-token", "");
        getToken();
    }, 300000);
}

const guardarCliente = () => {

    nombre = txtNombre.value;
    email = txtEmail.value;
    telefono = txtTelefono.value;
    direccion = txtDireccion.value;
    cuil = txtCuil.value;

    if(validateEmail(email) && validateNumber(cuil) && validateNumber(telefono) ){
        let settings = {
            "url": "http://localhost:8000/api/cliente/",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
              "name": nombre,
              "email": email,
              "telefono": telefono,
              "direccion": direccion,
              "cuil": cuil
            }
        };
          
        $.ajax(settings).done(function (response) {
            console.log(response);
        });

        alert("Cliente cargado correctamente")
        limpiarFormulario()
        
    } else if(!validateEmail(email) && !validateNumber(telefono) && !validateNumber(cuil)){

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");

    } else if(!validateEmail(email) && !validateNumber(telefono)){

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");

    } else if(!validateEmail(email) && !validateNumber(cuil)){

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");

    } else if(!validateNumber(telefono) && !validateNumber(cuil)){

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");
    } else if(!validateEmail(email)){

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");
        
    } else if(!validateNumber(telefono)){

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");

    
    } else if(!validateNumber(cuil)){

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");
    
    }

    
    
    
    
    

}

const validateEmail = (email) =>{
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const limpiarFormulario = () => {
    txtNombre.value = "";
    txtEmail.value = "";
    txtDireccion.value = "";
    txtTelefono.value = "";
    txtCuil.value = "";
    $('.errMsgEmail').removeClass("d-flex").addClass("d-none");
    $('.errMsgTelefono').removeClass("d-flex").addClass("d-none");
    $('.errMsgCuil').removeClass("d-flex").addClass("d-none");
}
    
const validateNumber = (value) => {
    if(isNaN(value)){
        return false;
    } else {
        return true;
    }
}

const redirigirAClientesScreen = () =>{
    window.location.replace("http://127.0.0.1:5500/interfaces/html/clientesScreen.html")
}

getToken();
destroyToken();
document.getElementById("btnClientes").addEventListener('click', ()=>{redirigirAClientesScreen()});


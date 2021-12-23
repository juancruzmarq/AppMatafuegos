const init = () => {
    getToken();
    destroyToken();
    pintarClientes();
}

const getToken = () => {
    token = localStorage.getItem("auth-token");
    if (token == undefined || token == null || token == "") {
        window.location.replace("http://127.0.0.1:5500/interfaces/html/loginScreen.html");
    };
}

const destroyToken = () => {
    setTimeout(() => {
        token = localStorage.setItem("auth-token", "");
        getToken();
    }, 300000);
}

const getClientes = async () => {
    let settings = {
        "url": "http://localhost:8000/api/cliente/",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": "pululeando@gmail.com",
            "password": "porbobi"
        }),
    };

    let result;

    try {
        result = await $.ajax(settings);
        return result.clientes;

    } catch (error) {
        console.error(error);
    }
}

const getClienteEspecifico = async (id) => {
    let cliente;
    let settings = {
        "url": `http://localhost:8000/api/cliente/buscar/${id}`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "auth-token": localStorage.getItem('auth-token'),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    await $.ajax(settings).done(function (response) {
        cliente = response.cliente;
    });

    return cliente;

}

const pintarClientes = async () => {

    let html = ``;
    document.getElementById("table-box").innerHTML = `
    <div class="spinner-border" role="status">
     <span class="sr-only">Loading...</span>
    </div>
    `;
    let clientes = await getClientes();

    clientes.forEach(cliente => {
        html +=
            `<tr>
            <th scope="row">${cliente.name}</th>
            <td class="buttons-row">
                <button class="btn btn-danger btn-sm mr-1"><i class="fas fa-fire"></i></button>
                <button class="btn btn-success btn-sm ml-1" data-toggle="modal"
                data-target="#clienteModal" onclick="pintarClienteEspecifico('${cliente._id}')"><i class="fas fa-eye"></i></button>
            </td>
        </tr>
        `;
    });

    let plantilla = `<div class="col-sm-12 main-section">
                        <div class="modal-content">
                            <div class="col-12 mt-4">
                                <table class="table table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Cargar Matafuego / Ver Cliente</th>
                                        </tr>
                                    </thead>
                                    <tbody id="table-body">
                                        ${html}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>`;

    document.getElementById("table-box").innerHTML = plantilla;

}

const pintarClienteEspecifico = async (id) => {
    const modal = document.getElementById("data-modal");
    const modalFotter = document.getElementById("cliente-modal-footer");

    modal.innerHTML = `<div class="spinner-border" role="status">
                                                          <span class="sr-only">Loading...</span>
                                                       </div>`;
    const cliente = await getClienteEspecifico(id);

    let html = `
    <ul class="list-group">
        <li class="list-group-item">${cliente.name}</li>
        <li class="list-group-item">${cliente.email}</li>
        <li class="list-group-item">${cliente.telefono}</li>
        <li class="list-group-item">${cliente.direccion}</li>
        <li class="list-group-item">${cliente.cuil}</li>
    </ul>
    `;

    modal.innerHTML = html;
    modalFotter.innerHTML = `
    <button type="button" id="btnEditar" data-toggle="modal"
    data-target="#editarClienteModal" onclick="pintarModalEditarCliente('${id}')" class="btn btn-warning"><i class="fas fa-edit"></i> Editar </button>

    <button type="button" id="btnEliminar" data-toggle="modal"
        data-target="#eliminarCliente" onclick="confirmarEliminacionCliente('${id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Eliminar </button>
    `

}

const confirmarEliminacionCliente = (id) => {
    const modalFooterConfirmacion = document.getElementById("cliente-modal-footer-confirmacion")
    modalFooterConfirmacion.innerHTML = `
    <button type="button" id="btnCancelarEliminacion" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
    <button type="button" id="btnConfirmarEliminacion" onclick="eliminarCliente('${id}')" class="btn btn-success"><i class="fas fa-check"></i> Confirmar </button>`
}

const eliminarCliente = async (id) => {
    let settings = {
        "url": `http://localhost:8000/api/cliente/eliminar/${id}`,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };

    await $.ajax(settings).done(function (response) {
        console.log(response);
    });

    alert("Cliente eliminado exitosamente");
    window.location.reload();


}

const actualizarCliente = async (id) => {



    nombre = document.getElementById("txtNombre").value;
    email = document.getElementById("txtEmail").value;
    telefono = document.getElementById("txtTelefono").value;
    direccion = document.getElementById("txtDireccion").value;
    cuil = document.getElementById("txtCuil").value;
    errorMessageEmail = document.getElementById("error-message-email");
    errorMessageTelefono = document.getElementById("error-message-telefono");
    errorMessageCuil = document.getElementById("error-message-cuil");   

    if (validateEmail(email) && validateNumber(cuil) && validateNumber(telefono)) {
        let settings = {
            "url": `http://localhost:8000/api/cliente/actualizar/${id}`,
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "name": nombre,
                "email": email,
                "telefono": telefono,
                "direccion": direccion,
                "cuil": cuil
            }),
        };

        $.ajax(settings).done(function (response) {
            alert("Cliente actualizado correctamente");
            window.location.reload();
        });


    } else if (!validateEmail(email) && !validateNumber(telefono) && !validateNumber(cuil)) {

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");

    } else if (!validateEmail(email) && !validateNumber(telefono)) {

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");

    } else if (!validateEmail(email) && !validateNumber(cuil)) {

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");

    } else if (!validateNumber(telefono) && !validateNumber(cuil)) {

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");
    } else if (!validateEmail(email)) {

        errorMessageEmail.innerHTML = "Formato email incorrecto";
        $('.errMsgEmail').removeClass("d-none").addClass("d-flex");

    } else if (!validateNumber(telefono)) {

        errorMessageTelefono.innerHTML = "Formato telefono incorrecto, sólo números.";
        $('.errMsgTelefono').removeClass("d-none").addClass("d-flex");


    } else if (!validateNumber(cuil)) {

        errorMessageCuil.innerHTML = "Formato cuil incorrecto sólo números.";
        $('.errMsgCuil').removeClass("d-none").addClass("d-flex");

    }





}

const pintarModalEditarCliente = async (id) => {
    const cliente = await getClienteEspecifico(id);
    const editarClienteModal = document.getElementById('editar-cliente-modal');
    const editarClienteModalFooter = document.getElementById('editar-cliente-modal-footer');
    plantillaBody =
        `
    <form>
        <div class="form-group">
            <label for="txtNombre">Nombre</label>
            <input type="text" class="form-control" value="${cliente.name}" id="txtNombre" placeholder="Ingrese nombre...">
        </div>
        <div class="form-group">
          <label for="txtEmail">Email</label>
          <input type="email" class="form-control" value="${cliente.email}" id="txtEmail"  placeholder="Ingrese email...">
          <span id="error-message-email" class="alert alert-danger d-none errMsgEmail w-100 text-center mt-2" style="margin-bottom: -10px;"></span>
        </div>
        <div class="form-group">
          <label for="txtTelefono">Teléfono</label>
          <input type="text" class="form-control" id="txtTelefono" value="${cliente.telefono}" placeholder="Ingrese teléfono...">
          <span id="error-message-telefono" class="alert alert-danger d-none errMsgTelefono w-100 text-center mt-2" style="margin-bottom: -10px;"></span>
        </div>
        <div class="form-group">
          <label for="txtDireccion">Direccion</label>
          <input type="text" class="form-control" id="txtDireccion" value="${cliente.direccion}" placeholder="Ingrese dirección...">
        </div>
        <div class="form-group">
          <label for="txtCuil">Cuil</label>
          <input type="text" class="form-control" id="txtCuil" value="${cliente.cuil}" placeholder="Ingrese cuil...">
          <span id="error-message-cuil" class="alert alert-danger d-none errMsgCuil w-100 text-center mt-2" style="margin-bottom: -10px;"></span>
        </div>
    </form>
    
    `

    plantillaFooter = `
    
    <button type="button" id="btnCancelarCliente" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
    <button type="button" id="btnGuardarCliente" onclick="actualizarCliente('${cliente._id}')" class="btn btn-success">Actualizar</button>
    
    `;

    editarClienteModal.innerHTML = plantillaBody;
    editarClienteModalFooter.innerHTML = plantillaFooter;
}

const validateEmail = (email) => {
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
    if (isNaN(value)) {
        return false;
    } else {
        return true;
    }
}



init();
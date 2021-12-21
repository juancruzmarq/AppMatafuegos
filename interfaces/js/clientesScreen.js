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
    let settings = {
        "url": "http://localhost:8000/api/cliente/buscar",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data":  JSON.stringify({
            "_id": id
        })
    };
    let result;
    
    try {
        result = await $.ajax(settings);  
        console.log(result)
        return result;
        
    } catch (error) {
        console.error(error);
    }

    
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
                <button class="btn btn-success btn-sm ml-1" data-target="#clienteModal" onclick="verCliente('${cliente._id}')"><i class="fas fa-eye"></i></button>
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


const verCliente = (id) => {


    // let html = ``;
    // document.getElementById("data-modal").innerHTML = html;
    console.log(id);
}

getToken();
destroyToken();
pintarClientes();
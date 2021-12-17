document.querySelector("#submit-button").addEventListener('click', (e)=>{
    e.preventDefault();
    email = document.querySelector("#email").value;
    password = document.querySelector("#password").value;
    
    $.ajax({
        // la URL para la petición
        url : 'http://localhost:8000/api/user/login',
     
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : { 
            "email": email,
            "password": password
        },
     
        // especifica si será una petición POST o GET
        type : 'POST',
     
        // el tipo de información que se espera de respuesta
        dataType : 'json',
     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(json) {
            const token = json.data.token;
            
            var settings = {
                "url": "http://localhost:8000/api/admin/",
                "method": "GET",
                "timeout": 0,
                "headers": {
                  "auth-token": token,
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                  "email": email,
                  "password": password
                }) 
            };
              
            $.ajax(settings).done(function (response) {
                localStorage.setItem("auth-token", token);
                const url = response.data.route
                window.location.replace(`http://127.0.0.1:5500/${url}`)
            });
            
        },
     
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto jqXHR (extensión de XMLHttpRequest), un texto con el estatus
        // de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) {
            document.querySelector("#error-message").innerHTML = "Usuario o contraseña erróneos, intente nuevamente";
            $('.d-none').removeClass("d-none").addClass("d-flex");

        }
     
    
    });
    
})
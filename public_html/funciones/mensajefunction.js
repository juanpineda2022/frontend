/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */
function getAllElementos() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Message/all",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",

        success: function (mensaje) {
            console.log(mensaje);
            let mj = mensaje;
            $("#tablaMensajes tbody").empty();
            for (i = 0; i < mj.length; i++) {
                console.log(mj[i])
                if (mj[i].client === null && mj[i].motorbike === null) {
                    var info = $("<tr><td style='display:none'>" + mj[i].idMessage + "</td><td>" + mj[i].messageText + "</td><td>Sin registros</td><td>Sin registros</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + mj[i].idMessage + ")'>Eliminar</button></td></tr>");
                    $("#tablaMensajes").append(info);
                } else if (mj[i].client === null) {
                    var motos = [mj[i].motorbike.name];
                    var info = $("<tr><td style='display:none'>" + mj[i].idMessage + "</td><td>" + mj[i].messageText + "</td><td>"+motos+"</td><td>Sin registros</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + mj[i].idMessage + ")'>Eliminar</button></td></tr>");
                    $("#tablaMensajes").append(info);
                } else if(mj[i].motorbike === null){
                    var clientes = [mj[i].client.name];
                    var info = $("<tr><td style='display:none'>" + mj[i].idMessage + "</td><td>" + mj[i].messageText + "</td><td>Sin registros</td><td>"+clientes+"</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + mj[i].idMessage + ")'>Eliminar</button></td></tr>");
                    $("#tablaMensajes").append(info);
                }else{
                    var motos = [mj[i].motorbike.name];
                    var clientes = [mj[i].client.name];
                    var info = $("<tr><td style='display:none'>" + mj[i].idMessage + "</td><td>" + mj[i].messageText + "</td><td>"+motos+"</td><td>"+clientes+"</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger'  onclick='deleteElementos(" + mj[i].idMessage + ")'>Eliminar</button></td></tr>");
                    $("#tablaMensajes").append(info);
                }
            }
        },
        error: function (xhr, status) {
            alert("ha sucedido un error");
        }
    });
}

function traerInformacionMoto() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Motorbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaM) {
            console.log(respuestaM);
            pintarRespuestaMoto(respuestaM);
        }
    });
}

$(document).ready(function (){
    traerInformacionMoto();
});

function pintarRespuestaMoto(respuestaM) {
    var lista = document.getElementById("motoMj");
    for (i = 0; i < respuestaM.length; i++) {
        lista.innerHTML += `<option value="${respuestaM[i].id}">${respuestaM[i].name}</option>`;
    }
    console.log(lista);
}

function traerInformacionClient() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaC) {
            console.log(respuestaC);
            pintarRespuestaClient(respuestaC);
        }
    });
}

$(document).ready(function (){
    traerInformacionClient();
});

function pintarRespuestaClient(respuestaC) {
    var lista = document.getElementById("clientMj");
    for (i = 0; i < respuestaC.length; i++) {
        lista.innerHTML += `<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(lista);
}

function saveElementos() {
    if ($("#messageTextMj").val().length === 0 || ($("#motoMj").val().length === 0 || $("#motoMj").val() === "Seleccionar motocicleta") || ($("#clientMj").val().length === 0 || $("#clientMj").val() === "Seleccionar cliente")  )  {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo guardar correctamente!',
            text: 'Todos los campos son obligatorios',
        });
    } else {

        let messageTxt = $("#messageTextMj").val();
        let clientMje = {idClient:document.getElementById("clientMj").value};
        let motoMje = {id:document.getElementById("motoMj").value};
        
        let data = {
            messageText: messageTxt,
            client: clientMje,
            motorbike: motoMje
        };
        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);
        $.ajax({
            url: "http://129.80.40.230:8081/api/Message/save",
            type: "POST",
            data: dataToSend,
            //dataType: "JSON",
            contentType: 'application/json',
            success: function (exito) {
                console.log(exito);
            },
            error: function (jqXHR, textStatus) {
                //
            },
            complete: function () {
                $("#messageTextMj").val("");
                getAllElementos();
            }
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se guardó exitosamente',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function pintarForm() {
    var table = document.getElementById("tablaMensajes"), rIndex;

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            console.log(rIndex);
            document.getElementById("idMessage").value = this.cells[0].innerHTML;
            document.getElementById("messageTextMj1").value = this.cells[1].innerHTML;
            document.getElementById("motoMj1").value = this.cells[2].innerHTML;
            document.getElementById("clientMj1").value = this.cells[3].innerHTML;
        }
    }

}

function updateElementos() {

    if ($("#messageTextMj1").val().length === 0 ) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo actualizar correctamente!',
            text: 'Todos los campos son obligatorios',
        });
    } else {

        let idM = $("#idMessage").val();
        let messageM = $("#messageTextMj1").val();
        let data = {
            idMessage: idM,
            messageText: messageM,
        };
        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);
        $.ajax({
            url: "http://129.80.40.230:8081/api/Message/update",
            type: "PUT",
            data: dataToSend,
            //dataType: "JSON",
            contentType: 'application/json',
            success: function (exito) {
                console.log(exito);
            },
            error: function (xhr, status) {
                alert('ha sucedido un error');
            },
            complete: function () {
                console.log("se ha actualizado")
                $("#messageTextMj1").val("");
                getAllElementos();
            }
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu mensaje se actualizó exitosamente',
            showConfirmButton: false,
            timer: 1500
        });

    }

}


function deleteElementos(idMj) {

    Swal.fire({
        title: '¿Estás seguro?',
        text: "No se podrán recuperar los datos!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = {
                idMessage: idMj
            };
            let dataToSend = JSON.stringify(data);
            console.log(dataToSend);

            $.ajax({
                url: "http://129.80.40.230:8081/api/Message/" + idMj,
                type: "DELETE",
                data: dataToSend,
                dataType: "JSON",
                contentType: 'application/json',
                success: function (exito) {
                    console.log(exito);
                    $("#idMj").val("");
                },
                error: function (xhr, status) {
                    aSwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: '¡No se pudo eliminar el Mensaje!',
                    });
                },
                complete: function () {
                    getAllElementos();
                }
            });
            Swal.fire(
                    '!Eliminado!',
                    'El mensaje ha sido eliminado',
                    'success'
                    )
        }
    })
}



/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

function getAllElementos() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Motorbike/all",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",

        success: function (motocicleta) {
            console.log(motocicleta);
            let mt = motocicleta;
            $("#tablaMotocicletas tbody").empty();
            for (i = 0; i < mt.length; i++) {
                console.log(mt[i])
                if (mt[i].messages.length === 0 && mt[i].reservations.length === 0) {
                    var info = $("<tr><td style='display:none'>" + mt[i].id + "</td><td>" + mt[i].name + "</td><td>" + mt[i].brand + "</td><td>" + mt[i].year + "</td><td>" + mt[i].description + "</td><td>Sin registros</td><td>Sin registros</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + mt[i].id + ")'>Eliminar</button></td></tr>");
                    console.log(mt[i].messages.length)
                    console.log(mt[i].reservations.length)
                    $("#tablaMotocicletas").append(info);
                } else if (mt[i].messages.length === 0) {
                    var reservas = [];
                    var reserva;
                    for (j = 0; j < mt[i].reservations.length; j++) {
                        let reservas1 = mt[i].reservations[j];
                        reserva = {};
                        reserva = reservas1.idReservation;
                        reservas.push(reserva);
                        console.log(mt[i].reservations[j].idReservation);
                    }
                    var info = $("<tr><td style='display:none'>" + mt[i].id + "</td><td>" + mt[i].name + "</td><td>" + mt[i].brand + "</td><td>" + mt[i].year + "</td><td>" + mt[i].description + "</td><td>Sin registros</td><td>" + reservas + "</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + mt[i].id + ")'>Eliminar</button></td></tr>");

                    $("#tablaMotocicletas").append(info);
                } else if (mt[i].reservations.length === 0) {
                    var mensajes = [];
                    var mensaje;
                    for (j = 0; j < mt[i].messages.length; j++) {
                        let mensajes1 = mt[i].messages[j];
                        mensaje = {};
                        mensaje = mensajes1.messageText;
                        mensajes.push(mensaje);
                        console.log(mt[i].messages[j].messageText);
                    }
                    var info = $("<tr><td style='display:none'>" + mt[i].id + "</td><td>" + mt[i].name + "</td><td>" + mt[i].brand + "</td><td>" + mt[i].year + "</td><td>" + mt[i].description + "</td><td>" + mensajes + "</td><td>Sin registros</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + mt[i].id + ")'>Eliminar</button></td></tr>");
                    $("#tablaMotocicletas").append(info);
                } else {
                    var reservas = [];
                    var reserva;
                    var mensajes = [];
                    var mensaje;
                    for (j = 0; j < mt[i].reservations.length; j++) {
                        let reservas1 = mt[i].reservations[j];
                        reserva = {};
                        reserva = reservas1.idReservation;
                        reservas.push(reserva);
                        console.log(mt[i].reservations[j].idReservation);
                    }
                    for (j = 0; j < mt[i].messages.length; j++) {
                        let mensajes1 = mt[i].messages[j];
                        mensaje = {};
                        mensaje = mensajes1.messageText;
                        mensajes.push(mensaje);
                        console.log(mt[i].messages[j].messageText);
                    }
                    var info = $("<tr><td style='display:none'>" + mt[i].id + "</td><td>" + mt[i].name + "</td><td>" + mt[i].brand + "</td><td>" + mt[i].year + "</td><td>" + mt[i].description + "</td><td>" + mensajes + "</td><td>" + reservas + "</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + mt[i].id + ")'>Eliminar</button></td></tr>");
                    $("#tablaMotocicletas").append(info);
                }

            }
        },
        error: function (xhr, status) {
            alert("ha sucedido un error");
        }
    });
}

function traerInformacionCategory() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaC) {
            console.log(respuestaC);
            pintarRespuestaCategory(respuestaC);
        }
    });
}

$(document).ready(function (){
    traerInformacionCategory();
});

function pintarRespuestaCategory(respuestaC) {
    var lista = document.getElementById("categoryCt");
    for (i = 0; i < respuestaC.length; i++) {
        lista.innerHTML += `<option value="${respuestaC[i].id}">${respuestaC[i].name}</option>`;
    }
    console.log(lista);
}

function saveElementos() {

    if (($("#nameMt").val().length === 0) || ($("#brandMt").val().length === 0) || ($("#yearMt").val().length === 0) || ($("#descriptionMt").val().length === 0)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡La motocicleta no pudo ser guardada!',
            text: 'Todos los campos son obligatorios',
        });

    } else {

        let nameM = $("#nameMt").val();
        let brandM = $("#brandMt").val();
        let yearM = $("#yearMt").val();
        let descriptionM = $("#descriptionMt").val();
        let categoryM = {id: document.getElementById("categoryCt").value};

        let data = {
            name: nameM,
            brand: brandM,
            year: yearM,
            description: descriptionM,
            category: categoryM
        };

        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);

        $.ajax({
            url: "http://129.80.40.230:8081/api/Motorbike/save",
            type: "POST",
            data: dataToSend,
            //dataType: "JSON",
            contentType: "application/json",

            success: function (exito) {
            },
            error: function (jqXHR, textStatus) {
                if (jqXHR.status == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: '¡La motocicleta no pudo ser guardada!',
                        text: 'Debe seleccionar una categoría',
                    });
                }
                //alert('ha sucedido un error');
            },
            complete: function () {
                $('#nameMt').val("");
                $('#brandMt').val("");
                $('#yearMt').val("");
                $("#descriptionMt").val("");
                getAllElementos();
            }
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La motocicleta se ha guardado exitosamente',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function pintarForm() {
    var table = document.getElementById("tablaMotocicletas"), rIndex;

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            console.log(rIndex);
            document.getElementById("idM").value = this.cells[0].innerHTML;
            document.getElementById("nameM").value = this.cells[1].innerHTML;
            document.getElementById("brandM").value = this.cells[2].innerHTML;
            document.getElementById("yearM").value = this.cells[3].innerHTML;
            document.getElementById("descriptionM").value = this.cells[4].innerHTML;
        }
    }

}

function updateElementos() {

    if (($("#nameM").val().length === 0) || ($("#brandM").val().length === 0) || ($("#yearM").val().length === 0) || ($("#descriptionM").val().length === 0)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡La motocicleta no pudo ser actualizada!',
            text: 'Todos los campos son obligatorios',
        });
    } else {
        let idM = $("#idM").val();
        let nameM = $("#nameM").val();
        let brandM = $("#brandM").val();
        let yearM = $("#yearM").val();
        let descriptionM = $("#descriptionM").val();
        let categoryM = {id: document.getElementById("categoryCt").value};

        let data = {
            id: idM,
            name: nameM,
            brand: brandM,
            year: yearM,
            description: descriptionM
        };

        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);

        $.ajax({
            url: "http://129.80.40.230:8081/api/Motorbike/update",
            type: "PUT",
            data: dataToSend,
            //dataType: "JSON",
            contentType: 'application/json',

            success: function () {

            },
            error: function () {

            },
            complete: function () {
                $('#nameMt').val("");
                $('#brandMt').val("");
                $('#yearMt').val("");
                $("#descriptionMt").val("");
                getAllElementos();
            }
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La motocicleta se ha actualizó exitosamente',
            showConfirmButton: false,
            timer: 1500
        });

    }





}

function deleteElementos(idMt) {
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
                id: iMCt
            };

            let dataToSend = JSON.stringify(data);
            console.log(dataToSend);

            $.ajax({
                url: "http://129.80.40.230:8081/api/Motorbike/" + idMt,
                type: "DELETE",
                data: dataToSend,
                dataType: "JSON",
                contentType: 'application/json',

                success: function (exito) {
                    console.log(exito);
                    $("#idCt").val("");

                },
                error: function (xhr, status) {
                    alert('ha sucedido un error');
                },
                complete: function () {
                    getAllElementos();
                }
            });
            Swal.fire(
                    '!Eliminado!',
                    'La motocicleta ha sido eliminada',
                    'success'
                    )
        }
    })

}


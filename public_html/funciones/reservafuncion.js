/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

$(function () {
            $("#txtFrom").datepicker({
                numberOfMonths: 2,
                onSelect: function (selected) {
                    var dt = new Date(selected);
                    dt.setDate(dt.getDate() + 1);
                    $("#txtTo").datepicker("option", "minDate", dt);
                }
            });
            $("#txtTo").datepicker({
                numberOfMonths: 2,
                onSelect: function (selected) {
                    var dt = new Date(selected);
                    dt.setDate(dt.getDate() - 1);
                    $("#txtFrom").datepicker("option", "maxDate", dt);
                }
            });
        });

//$(function () {
//  $('#startDate1').datepicker();
//  $('#devolutionDate1').datepicker('show');
//});

//    var date = new Date();
//    date.setDate(date.getDate());
//
//    $('#startDate1').datepicker({
//        startDate: date
//    });

//    var date2 = new Date();
//    date.setDate(date2.getDate());
//
//    $('#devolutionDate1').datepicker({
//        startDate: date
//    });
//
//}

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

$(document).ready(function () {
    traerInformacionMoto();
});

function pintarRespuestaMoto(respuestaM) {
    var lista = document.getElementById("motoRv1");
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

$(document).ready(function () {
    traerInformacionClient();
});

function pintarRespuestaClient(respuestaC) {
    var lista = document.getElementById("clienteRv1");
    for (i = 0; i < respuestaC.length; i++) {
        lista.innerHTML += `<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(lista);
}

function getAllElementos() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Reservation/all",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",

        success: function (reserva) {
            console.log(reserva);
            let rv = reserva;
            $("#tablaReservas tbody").empty();
            for (i = 0; i < rv.length; i++) {
                console.log(rv[i])
                var motos = [rv[i].motorbike.name];
                var clientes = [rv[i].client.name];
                var info = $("<tr><td style='display:none'>" + rv[i].idReservation + "</td><td>" + rv[i].startDate.substring(0, 10) + "</td><td>" + rv[i].devolutionDate.substring(0, 10) + "</td><td>" + rv[i].status + "</td><td>" + motos + "</td><td>" + clientes + "</td><td>" + rv[i].score + "</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger'  onclick='deleteElementos(" + rv[i].idReservation + ")'>Eliminar</button></td></tr>");
                $("#tablaReservas").append(info);
            }
        },
        error: function (xhr, status) {
            alert("ha sucedido un error");
        }
    });
}

function saveElementos() {
    if (($("#startDate1").val().length === 0) || ($("#devolutionDate1").val().length === 0) || ($("#motoRv1").val().length === 0 || $("#motoRv1").val() === "Seleccionar motocicleta") || ($("#clienteRv1").val().length === 0 || $("#clienteRv1").val() === "Seleccionar cliente") || ($("#estadoRv1").val().length === 0 || $("#estadoRv1").val() === "Seleccionar estado")) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo guardar correctamente!',
            text: 'Todos los campos son obligatorios',
        });
    } else if ($("#startDate1").val() < $("#devolutionDate1").val()) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo guardar correctamente!',
            text: 'La fecha de inicio de la reserva debe ser anterior a la de devolución',
        });
    } else if ($("#devolutionDate1").val() <= $("#startDate1").val()) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo guardar correctamente!',
            text: 'La fecha de inicio de la reserva debe ser anterior a la de devolución',
        });
    } else {
        let sD1 = $("#startDate1").val = Date.now();
        let dD1 = $("#devolutionDate1").val();
        let status1 = $("#estadoRv1").val();
        let clientR1 = {idClient: document.getElementById("clienteRv1").value};
        let motoR1 = {id: document.getElementById("motoRv1").value};

        let data = {
            startDate: sD1,
            devolutionDate: dD1,
            status: status1,
            client: clientR1,
            motorbike: motoR1
        };
        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);
        $.ajax({
            url: "http://129.80.40.230:8081/api/Reservation/save",
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
                $("#startDate1").val("");
                $("#devolutionDate1").val("");
                getAllElementos();
            }
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se guardó exitosamente',
            text: '¡Felicidades!. No olvides pasar por nuestras oficinas para hacer efectivo el alquiler',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function pintarForm() {
    var table = document.getElementById("tablaReservas"), rIndex;

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            console.log(rIndex);
            document.getElementById("idReserva").value = this.cells[0].innerHTML;
            document.getElementById("startDateR2").value = this.cells[1].innerHTML;
            document.getElementById("devolutionDate2").value = this.cells[2].innerHTML;
            document.getElementById("estadoRv2").value = this.cells[3].innerHTML;
            document.getElementById("motoR2").value = this.cells[4].innerHTML;
            document.getElementById("clienteR2").value = this.cells[5].innerHTML;
        }
    }

}

function updateElementos() {
    if (($("#startDateR2").val().length === 0) || ($("#devolutionDate2").val().length === 0) || ($("#estadoRv2").val().length === 0 || $("#estadoRv2").val() === "Seleccionar estado")) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo actualizar correctamente!',
            text: 'Todos los campos son obligatorios',
        });
    } else if ($("#devolutionDate2").val() <= $("#startDateR2").val()) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo guardar correctamente!',
            text: 'La fecha de inicio de la reserva debe ser anterior a la de devolución',
        });
    } else {
        let sD2 = $("#startDateR2").val = Date.now();
        let dD2 = $("#devolutionDate2").val();
        let status2 = $("#estadoRv2").val();

        let data = {
            startDate: sD2,
            devolutionDate: dD2,
            status: status2,
        };
        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);
        $.ajax({
            url: "http://129.80.40.230:8081/api/Reservation/update",
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
                $("#startDateR2").val("");
                $("#devolutionDate2").val("");
                getAllElementos();
            }
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se actualizó exitosamente',
            text: '¡Felicidades!. No olvides pasar por nuestras oficinas para hacer efectivo el alquiler',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function deleteElementos(idRv) {

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
                idReservation: idRv
            };
            let dataToSend = JSON.stringify(data);
            console.log(dataToSend);

            $.ajax({
                url: "http://129.80.40.230:8081/api/Reservation/" + idRv,
                type: "DELETE",
                data: dataToSend,
                dataType: "JSON",
                contentType: 'application/json',
                success: function (exito) {
                    console.log(exito);
                    $("#idReserva").val("");
                },
                error: function (xhr, status) {
                    aSwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: '¡No se pudo eliminar la Reserva!',
                    });
                },
                complete: function () {
                    getAllElementos();
                }
            });
            Swal.fire(
                    '!Eliminado!',
                    'La reserva ha sido eliminada',
                    'success'
                    )
        }
    })
}
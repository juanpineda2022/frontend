/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

function getAllElementos() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Client/all",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",
        success: function (cliente) {
            console.log(cliente);
            let cl = cliente;
            $("#tablaClientes tbody").empty();
            for (i = 0; i < cl.length; i++) {
                console.log(cl[i])
                if (cl[i].messages.length === 0 && cl[i].reservations.length === 0) {
                    var info = $("<tr><td style='display:none'>" + cl[i].idClient + "</td><td>" + cl[i].name + "</td><td>" + cl[i].age + "</td><td>" + cl[i].email + "</td><td style='display:none'>" + cl[i].password + "</td><td>Sin registros</td><td>Sin registros</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + cl[i].idClient + ")'>Eliminar</button></td></tr>");
                    console.log(cl[i].messages.length)
                    console.log(cl[i].reservations.length)
                    $("#tablaClientes").append(info);
                } else if (cl[i].messages.length === 0) {
                    var reservas = [];
                    var reserva;
                    for (j = 0; j < cl[i].reservations.length; j++) {
                        let reservas1 = cl[i].reservations[j];
                        reserva = {};
                        reserva = reservas1.idReservation;
                        reservas.push(reserva);
                        console.log(cl[i].reservations[j].idReservation);
                    }
                    var info = $("<tr><td style='display:none'>" + cl[i].idClient + "</td><td>" + cl[i].name + "</td><td>" + cl[i].age + "</td><td>" + cl[i].email + "</td><td style='display:none'>" + cl[i].password + "</td><td>Sin registros</td><td>" + reservas + "</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + cl[i].idClient + ")'>Eliminar</button></td></tr>");
                    $("#tablaClientes").append(info);
                } else if (cl[i].reservations.length === 0) {
                    var mensajes = [];
                    var mensaje;
                    for (j = 0; j < cl[i].messages.length; j++) {
                        let mensajes1 = cl[i].messages[j];
                        mensaje = {};
                        mensaje = mensajes1.messageText;
                        mensajes.push(mensaje);
                        console.log(cl[i].messages[j].messageText);
                    }
                    var info = $("<tr><td style='display:none'>" + cl[i].idClient + "</td><td>" + cl[i].name + "</td><td>" + cl[i].age + "</td><td>" + cl[i].email + "</td><td style='display:none'>" + cl[i].password + "</td><td>" + mensajes + "</td><td>Sin registros</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + cl[i].idClient + ")'>Eliminar</button></td></tr>");
                    $("#tablaClientes").append(info);
                } else {
                    var reservas = [];
                    var reserva;
                    var mensajes = [];
                    var mensaje;
                    for (j = 0; j < cl[i].reservations.length; j++) {
                        let reservas1 = cl[i].reservations[j];
                        reserva = {};
                        reserva = reservas1.idReservation;
                        reservas.push(reserva);
                        console.log(cl[i].reservations[j].idReservation);
                    }
                    for (j = 0; j < cl[i].messages.length; j++) {
                        let mensajes1 = cl[i].messages[j];
                        mensaje = {};
                        mensaje = mensajes1.messageText;
                        mensajes.push(mensaje);
                        console.log(cl[i].messages[j].messageText);
                    }
                    var info = $("<tr><td style='display:none'>" + cl[i].idClient + "</td><td>" + cl[i].name + "</td><td>" + cl[i].age + "</td><td>" + cl[i].email + "</td><td style='display:none'>" + cl[i].password + "</td><td>" + mensajes + "</td><td>" + reservas + "</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button></td><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + cl[i].idClient + ")'>Eliminar</button></td></tr>");
                    $("#tablaClientes").append(info);
                }

            }
        },
        error: function (xhr, status) {
            alert("ha sucedido un error");
        }
    });
}

function confirmPassword() {
    var password = document.getElementById("passwordClt1"), confirm_password = document.getElementById("passwordClt2");
    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Las contraseña no coincide");
            return false;
        } else {
            confirm_password.setCustomValidity('');
            return true;
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
}

function saveElementos() {
    if (($("#nameClt").val().length === 0) || ($("#emailClt").val().length === 0) || ($("#passwordClt1").val().length === 0) || ($("#passwordClt2").val().length === 0) || ($("#ageClt").val().length === 0)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo registrar correctamente!',
            text: 'Todos los campos son obligatorios',
        });
    } else if (confirmPassword() === false) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo registrar correctamente!',
            text: 'La contraseña no coincide',
        });
    } else {

        let nameC = $("#nameClt").val();
        let ageC = getAge();
        let emailC = $("#emailClt").val();
        let passwordC = $("#passwordClt1").val();
        let data = {
            name: nameC,
            age: ageC,
            email: emailC,
            password: passwordC,
        };
        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);
        $.ajax({
            url: "http://129.80.40.230:8081/api/Client/save",
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
                $("#idClt").val("");
                $("#nameClt").val("");
                $("#ageClt").val("");
                $("#emailClt").val("");
                $("#passwordCltl").val("");
                getAllElementos();
            }
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Te has registrado correctamente',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function pintarForm() {
    var table = document.getElementById("tablaClientes"), rIndex;

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            console.log(rIndex);
            document.getElementById("idC").value = this.cells[0].innerHTML;
            document.getElementById("nameC").value = this.cells[1].innerHTML;
            document.getElementById("ageC").value = this.cells[2].innerHTML;
            document.getElementById("emailC").value = this.cells[3].innerHTML;
            document.getElementById("passwordC1").value = this.cells[4].innerHTML;
        }
    }

}

function updateElementos() {

    if (($("#nameC").val().length === 0) || ($("#emailC").val().length === 0) || ($("#passwordC1").val().length === 0) || ($("#passwordC2").val().length === 0) || ($("#ageC").val().length === 0)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo actualizar correctamente!',
            text: 'Todos los campos son obligatorios',
        });
//    } else if (confirmPassword() === false) {
//        Swal.fire({
//            icon: 'error',
//            title: 'Error',
//            text: '¡No se pudo actualizar correctamente!',
//            text: 'La contraseña no coincide',
//        });
    } else {

        let idC = $("#idC").val();
        let nameC = $("#nameC").val();
        let ageCl = getAge2();
        let emailC = $("#emailC").val();
        let passwordC = $("#passwordC1").val();
        let data = {
            idClient: idC,
            name: nameC,
            email: emailC,
            password: passwordC,
            age: ageCl

        };
        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);
        $.ajax({
            url: "http://129.80.40.230:8081/api/Client/update",
            type: "PUT",
            data: dataToSend,
            //dataType: "JSON",
            contentType: 'application/json',
            success: function (exito) {
                console.log(exito);
            },
            error: function (xhr, status) {
                //alert('ha sucedido un error');
            },
            complete: function () {
                console.log("se ha actualizado")
                $("#idC").val("");
                $("#nameC").val("");
                $("#ageC").val("");
                $("#emailC").val("");
                $("#passwordC1").val("");
                $("#passwordC2").val("");
                getAllElementos();
            }
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu información se actualizó exitosamente',
            showConfirmButton: false,
            timer: 1500
        });

    }



}

function deleteElementos(idCl) {

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
                idClient: idCl
            };
            let dataToSend = JSON.stringify(data);
            console.log(dataToSend);

            $.ajax({
                url: "http://129.80.40.230:8081/api/Client/" + idCl,
                type: "DELETE",
                data: dataToSend,
                dataType: "JSON",
                contentType: 'application/json',
                success: function (exito) {
                    console.log(exito);
                    $("#idCl").val("");
                },
                error: function (xhr, status) {
                    aSwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: '¡No se pudo eliminar al Cliente!',
                        text: 'Se encuentra en estado activo de reserva',
                    });
                },
                complete: function () {
                    getAllElementos();
                }
            });
            Swal.fire(
                    '!Eliminado!',
                    'El cliente ha sido eliminado',
                    'success'
                    )
        }
    })
}

function getAge(age)
{
    var userAge = document.getElementById("ageClt").value;
    var fecha = new Date(userAge);
    var month_diff = Date.now() - fecha.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    console.log(age);
    return age;
}

function getAge2(age)
{
    var userAge = document.getElementById("ageC").value;
    var fecha = new Date(userAge);
    var month_diff = Date.now() - fecha.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    console.log(age);
    return age;
}

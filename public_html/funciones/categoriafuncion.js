/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

function getAllElementos() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Category/all",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",

        success: function (categoria) {
            //console.log(categoria);
            let ct = categoria;
            $("#tablaCategorias tbody").empty();
            for (i = 0; i < ct.length; i++) {
                //console.log(ct[i])
                if (ct[i].motorbikes.length === 0) {
                    var info = $("<tr><td style='display:none'>" + ct[i].id + "</td><td>" + ct[i].name + "</td><td>" + ct[i].description + "</td><td>Sin registros</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + ct[i].id + ")'>Eliminar</button></td></tr>");
                    //console.log(ct[i].motorbikes.length)
                    $("#tablaCategorias").append(info);
                } else {
                    var motos = [];
                    var moto;
                    for (j = 0; j < ct[i].motorbikes.length; j++) {
                        let motocicletas = ct[i].motorbikes[j];
                        moto = {};
                        moto = motocicletas.name;
                        motos.push(moto);
                        //console.log(ct[i].motorbikes[j].name);

                    }
                    var info = $("<tr><td style='display:none'>" + ct[i].id + "</td><td>" + ct[i].name + "</td><td>" + ct[i].description + "</td><td>"+motos+"</td><td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalAct' onclick='pintarForm()'>Actualizar</button><td><button type='button' class='btn btn-danger' onclick='deleteElementos(" + ct[i].id + ")'>Eliminar</button></td></tr>");
                    $("#tablaCategorias").append(info);

                }

            }
        }
    });
}

function saveElementos() {

    let nameCtg = $("#nameCt").val();
    let descriptionCtg = $("#descriptionCt").val();

    let data = {
        name: nameCtg,
        description: descriptionCtg
    };

    let dataToSend = JSON.stringify(data);
    //console.log(dataToSend);

    $.ajax({
        url: "http://129.80.40.230:8081/api/Category/save",
        type: "POST",
        data: dataToSend,
        //dataType: "JSON",
        contentType: "application/json",

        success: function (exito) {
            if (($("#nameCt").val().length === 0) || ($("#descriptionCt").val().length === 0)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: '¡La categoría no pudo ser guardada!',
                    text: 'Todos los campos son obligatorios',
                });
            } else if (($("#nameCt").val().length > 0) || ($("#descriptionCt").val().length > 0)) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'La categoría se ha guardado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        error: function () {
            alert("error");
//            if (jqXHR.status === 0) {
//                alert('Not connect: Verify Network.');
//            } else if (jqXHR.status == 404) {
//                alert('Requested page not found [404]');
//            } else if (jqXHR.status == 500) {
//                alert('Internal Server Error [500].');
//            } else if (textStatus === 'parsererror') {
//                alert('Requested JSON parse failed.');
//            } else if (textStatus === 'timeout') {
//                alert('Time out error.');
//            } else if (textStatus === 'abort') {
//                alert('Ajax request aborted.');
//            } else {
//                alert('Uncaught Error: ' + jqXHR.responseText);
//            };
//            console.log(jqXHR);
        },
        complete: function () {
            $('#nameCt').val("");
            $("#descriptionCt").val("");
            getAllElementos();
        }
    });
}

function pintarForm() {
    var table = document.getElementById("tablaCategorias"), rIndex;

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            console.log(rIndex);
            document.getElementById("idC").value = this.cells[0].innerHTML;
            document.getElementById("nameC").value = this.cells[1].innerHTML;
            document.getElementById("descriptionC").value = this.cells[2].innerHTML;
        }
    }

}

function updateElementos() {
    let idCtg = $("#idC").val();
    let nameCtg = $("#nameC").val();
    let descriptionCtg = $("#descriptionC").val();

    let data = {
        id: idCtg,
        name: nameCtg,
        description: descriptionCtg
    };

    let dataToSend = JSON.stringify(data);
    //console.log(dataToSend);

    $.ajax({
        url: "http://129.80.40.230:8081/api/Category/update",
        type: "PUT",
        data: dataToSend,
        //dataType: "JSON",
        contentType: 'application/json',

        success: function (exito) {
            if (($("#nameC").val().length === 0) || ($("#descriptionC").val().length === 0)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: '¡La categoría no pudo ser actualizada!',
                    text: 'Todos los campos son obligatorios',
                });
            } else if (($("#nameC").val().length > 0) || ($("#descriptionC").val().length > 0)) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'La categoría se ha actualizó correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        error: function (xhr, status) {

            //alert('ha sucedido un error');
        },
        complete: function () {
            $('#nameC').val("");
            $("#descriptionC").val("");
            getAllElementos();
        }
    });
}

function deleteElementos(idCt) {
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
                id: idCt
            };

            let dataToSend = JSON.stringify(data);
            console.log(dataToSend);

            $.ajax({
                url: "http://129.80.40.230:8081/api/Category/" + idCt,
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
                    'La categoría ha sido eliminada',
                    'success'
                    )
        }
    })

}


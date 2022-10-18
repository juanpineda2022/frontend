/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

//Funcion para traer la informacion del reporte por status
function getReporteStatus() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (reportstatus) {
            console.log(reportstatus);
            var info = $("<tr><td>" + reportstatus.completed + "</td><td>" + reportstatus.cancelled + "</td></tr>");
            $("#reporteS").append(info);
        }
    });
}

//Funcion para traer la informacion del reporte entre fechas
function getReporteFechas() {
    var inicialDate = document.getElementById("startDate").value;
    var finalDate = document.getElementById("devolutionDate").value;

    $.ajax({
        url: "http://129.80.40.230:8081/api/Reservation/report-dates/" + inicialDate + "/" + finalDate,
        type: "GET",
        datatype: "JSON",
        success: function (reportF) {
            console.log(reportF);
            let rf = reportF;
            for (i = 0; i < rf.length; i++) {
                var info = $("<tr><td>" + rf[i].startDate.substring(0, 10) + "</td><td>" + rf[i].devolutionDate.substring(0, 10) + "</td><td>" + rf[i].status + "</td><td>" + rf[i].client.name + "</td></tr>");
                $("#reporteFc").append(info);
            }

        }
    });
}
//Funcion para traer la informacion del reporte entre clientes
function getReporteTopClientes() {
    $.ajax({
        url: "http://129.80.40.230:8081/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (reportTC) {
            console.log(reportTC);
            let tc = reportTC;
            for (i = 0; i < tc.length; i++) {
                var info = $("<tr><td>" + tc[i].total + "</td><td>" + tc[i].client.name + "</td><td>" + tc[i].client.age + "</td><td>" + tc[i].client.email + "</td></tr>");
                $("#reporteTC").append(info);
            }
        }
    });
}

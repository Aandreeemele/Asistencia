import { registrarAlumnos } from "./registraralumnos.js";
import { maestroGuia } from "./maestroGuia.js";
import { showUniforme } from "./uniforme.js";
import { showObservaciones } from "./observaciones.js";

function showopciones() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <div class="panel-container4">
            <button id="Volvxr">←</button>
            <button id="Siguientx1">→</button>
            <div class="TitulodelDocente">Nombre Apellido</div>
            <div class="Enero">𝙴𝚗𝚎𝚛𝚘
                <button id="SCalendario">→</button>
                <div class="Semana1">𝚂𝚎𝚖𝚊𝚗𝚊 1
                    <div class="S1"></div>
                    <div class="S2"></div>
                    <div class="S3"></div>
                    <div class="S4"></div>
                    <div class="S5"></div>
                </div>
                <div class="Semana2">𝚂𝚎𝚖𝚊𝚗𝚊 2
                    <div class="S01"></div>
                    <div class="S02"></div>
                    <div class="S03"></div>
                    <div class="S04"></div>
                    <div class="S05"></div>
                </div>
                <div class="Semana3">𝚂𝚎𝚖𝚊𝚗𝚊 3
                    <div class="S001"></div>
                    <div class="S002"></div>
                    <div class="S003"></div>
                    <div class="S004"></div>
                    <div class="S005"></div>
                </div>
                <div class="Semana4">𝚂𝚎𝚖𝚊𝚗𝚊 4
                    <div class="S0001"></div>
                    <div class="S0002"></div>
                    <div class="S0003"></div>
                    <div class="S0004"></div>
                    <div class="S0005"></div>
                </div>
            </div>

            <!-- Botones adicionales -->
            <div class="botonesExtras">
                <button id="btnUniforme">Uniforme Incompleto</button>
                <button id="btnReporte">Enviar Reporte</button>
                <button id="btnObservaciones">Observaciones</button>
                <button id="btnActualizar">Actualizar</button>
            </div>
        </div>
    `;

    document.getElementById("Volvxr").addEventListener("click", registrarAlumnos);
    document.getElementById("Siguientx1").addEventListener("click", maestroGuia);

    document.getElementById("btnUniforme").addEventListener("click", showUniforme);

    document.getElementById("btnReporte").addEventListener("click", () => {
        const destinatario = "aamelendez@scl.edu.gt";
        const asunto = encodeURIComponent("Reporte de Asistencia");
        const cuerpo = encodeURIComponent("Estimado encargado,\n\nAdjunto el reporte de asistencia del estudiante.\n\nSaludos cordiales.");
        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`;
        window.open(url, "_blank");
    });

    document.getElementById("btnObservaciones").addEventListener("click", showObservaciones);

    document.getElementById("btnActualizar").addEventListener("click", () => {
        alert("¡Actualizado correctamente!");
    });
}

export { showopciones };

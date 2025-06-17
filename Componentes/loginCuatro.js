import { showPanel } from "./loginPrimero.js";
import { showVentanaTres } from "./loginTres.js";
function showVentanaCuatro(){
    const root = document.getElementById("root");
    root.innerHTML= `
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

            <div class="Semana2">𝚂𝚎𝚖𝚊𝚗𝚊 2
            <div class="S01"></div>
            <div class="S02"></div>
            <div class="S03"></div>
            <div class="S04"></div>
            <div class="S05"></div>

            <div class="Semana3">𝚂𝚎𝚖𝚊𝚗𝚊 3
            <div class="S001"></div>
            <div class="S002"></div>
            <div class="S003"></div>
            <div class="S004"></div>
            <div class="S005"></div>

            <div class="Semana4">𝚂𝚎𝚖𝚊𝚗𝚊 4
            <div class="S0001"></div>
            <div class="S0002"></div>
            <div class="S0003"></div>
            <div class="S0004"></div>
            <div class="S0005"></div>

            <div class="Febrero">𝙵𝚎𝚋𝚛𝚎𝚛𝚘
            <button id="SCalendario1">→</button>
            <button id="SCalendario01">←</button>
            <div class="Semana01">𝚂𝚎𝚖𝚊𝚗𝚊 1
            <div class="S1"></div>
            <div class="S2"></div>
            <div class="S3"></div>
            <div class="S4"></div>
            <div class="S5"></div>

            <div class="Semana02">𝚂𝚎𝚖𝚊𝚗𝚊 2
            <div class="S01"></div>
            <div class="S02"></div>
            <div class="S03"></div>
            <div class="S04"></div>
            <div class="S05"></div>

            <div class="Semana03">𝚂𝚎𝚖𝚊𝚗𝚊 3
            <div class="S001"></div>
            <div class="S002"></div>
            <div class="S003"></div>
            <div class="S004"></div>
            <div class="S005"></div>

            <div class="Semana04">𝚂𝚎𝚖𝚊𝚗𝚊 4
            <div class="S0001"></div>
            <div class="S0002"></div>
            <div class="S0003"></div>
            <div class="S0004"></div>
            <div class="S0005"></div>
            </div>
            </div>
        </div>
    `;
    document.getElementById("Volvxr").addEventListener("click", showVentanaTres);
    document.getElementById("Siguientx1").addEventListener("click", showPanel);
}
showPanel();
showVentanaTres();
export { showVentanaCuatro };
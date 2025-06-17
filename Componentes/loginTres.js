import { showVentanaSecundaria } from "./loginSecundario.js";
import { showVentanaCuatro } from "./loginCuatro.js";
function showVentanaTres() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <div class="panel-container">
            <img src="fondo 3.svg" alt="" class="imgpanel">
            <img src="fondo 3.svg" alt="" class="imgpanel1">
            <button id="Volver">←</button>
            <button id="Siguiente1">→</button>
            <p class="Titulo0001"> 𝙼𝙰𝚁𝙲𝙰𝚁</p>
            <p class="Titulo0002"> 𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝙻 𝙳𝙾𝙲𝙴𝙽𝚃𝙴</p>
            <button id="agregarDiv">Agregar Docente</button>
            <div id="contenedorDivs"></div>
            <div id="confirmacionEliminar" class="modal" style="display:none;">
                <div class="modal-content">
                    <p>¿Estás seguro de eliminar el docente? Se perderán las informaciones.</p>
                    <button id="cancelarEliminar">Cancelar</button>
                    <button id="confirmarEliminar">Eliminar</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("Volver").addEventListener("click", showVentanaSecundaria);
    document.getElementById("Siguiente1").addEventListener("click", showVentanaCuatro);

    const contenedor = document.getElementById("contenedorDivs");
    const modal = document.getElementById("confirmacionEliminar");
    const cancelarBtn = document.getElementById("cancelarEliminar");
    const confirmarBtn = document.getElementById("confirmarEliminar");

    let docentes = JSON.parse(localStorage.getItem("docentes")) || [];
    let indexAEliminar = null;

    docentes.forEach((docente, index) => {
        agregarDiv(docente, index);
    });

    document.getElementById("agregarDiv").addEventListener("click", () => {
        const nuevoNombre = `Docente ${docentes.length + 1}`;
        docentes.push(nuevoNombre);
        localStorage.setItem("docentes", JSON.stringify(docentes));
        agregarDiv(nuevoNombre, docentes.length - 1);
    });

    function agregarDiv(nombre, index) {
        const div = document.createElement("div");
        div.className = "divsx";
        div.innerHTML = `
            <div class="docente-info">
                <span>${nombre}</span>
                <div class="botones-acciones">
                    <button class="info" data-index="${index}">📲</button>
                    <button class="eliminar" data-index="${index}">Elimnar</button>
                    <button id="Asistencia">✓</button>
            <button id="NoAsistencia">x</button>
                </div>
            </div>
            <div class="detalle-info" id="info-${index}" style="display: none;">
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Área:</strong> Matemáticas</p>
                <p><strong>Email:</strong> docente${index + 1}@ejemplo.com</p>
                <p><strong>Teléfono:</strong> 1456-0789${index}</p>
            </div>
        `;
        contenedor.appendChild(div);

        const btnEliminar = div.querySelector(".eliminar");
        const btnInfo = div.querySelector(".info");
        const infoDiv = div.querySelector(`#info-${index}`);

        btnEliminar.addEventListener("click", (e) => {
            indexAEliminar = parseInt(e.target.getAttribute("data-index"));
            modal.style.display = "block";
        });

        btnInfo.addEventListener("click", () => {
            if (infoDiv.style.display === "none") {
                infoDiv.style.display = "block";
                btnInfo.textContent = "Ocultar";
            } else {
                infoDiv.style.display = "none";
                btnInfo.textContent = "📲";
            }
        });
    }

    cancelarBtn.addEventListener("click", () => {
        modal.style.display = "none";
        indexAEliminar = null;
    });

    confirmarBtn.addEventListener("click", () => {
        if (indexAEliminar !== null) {
            docentes.splice(indexAEliminar, 1);
            localStorage.setItem("docentes", JSON.stringify(docentes));
            showVentanaTres();
        }
    });
}
showVentanaSecundaria();
showVentanaCuatro();
export {  showVentanaTres };
import { showVentanaSecundaria } from "./loginSecundario.js";
import { showVentanaCuatro } from "./loginCuatro.js";

function showVentanaTres() {
    const root = document.getElementById("root");
    root.innerHTML = getTemplateHTML();

    const btnVolver = document.getElementById("btnVolver");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const btnAgregarDocente = document.getElementById("btnAgregarDocente");

    const contenedor = document.getElementById("contenedorDocentes");
    const modal = document.getElementById("modalEliminar");
    const btnCancelar = document.getElementById("btnCancelarEliminar");
    const btnConfirmar = document.getElementById("btnConfirmarEliminar");

    let docentes = cargarDocentes();
    let indexAEliminar = null;

    docentes.forEach((nombre, index) => crearElementoDocente(nombre, index, contenedor, docentes, modal, setIndexEliminar));

    btnVolver.addEventListener("click", showVentanaSecundaria);
    btnSiguiente.addEventListener("click", showVentanaCuatro);

    btnAgregarDocente.addEventListener("click", () => {
        const nuevoNombre = `Docente ${docentes.length + 1}`;
        docentes.push(nuevoNombre);
        guardarDocentes(docentes);
        crearElementoDocente(nuevoNombre, docentes.length - 1, contenedor, docentes, modal, setIndexEliminar);
    });

    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
        indexAEliminar = null;
    });

    btnConfirmar.addEventListener("click", () => {
        if (indexAEliminar !== null) {
            docentes.splice(indexAEliminar, 1);
            guardarDocentes(docentes);
            showVentanaTres(); // <--- CORREGIDO: recarga la vista correctamente
        }
    });

    function setIndexEliminar(index) {
        indexAEliminar = index;
    }
}

function getTemplateHTML() {
    return `
        <div class="panxxlcontainer">
            <img src="fondo 3.svg" alt="" class="imgpanel">
            <button id="btnVolver">←</button>
            <button id="btnSiguiente">→</button>
            <p class="titPrincipal">𝙼𝙰𝚁𝙲𝙰𝚁</p>
            <p class="subtitulo">𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝙻 𝙳𝙾𝙲𝙴𝙽𝚃𝙴</p>
            <button id="btnAgregarDocente">Agregar Docente</button>
            <div id="contenedorDocentes"></div>
            <div id="modalEliminar" class="modal" style="display:none;">
                <div class="modal-content">
                    <p>¿Estás seguro de eliminar el docente? Se perderán las informaciones.</p>
                    <button id="btnCancelarEliminar">Cancelar</button>
                    <button id="btnConfirmarEliminar">Eliminar</button>
                </div>
            </div>
        </div>
    `;
}

function crearElementoDocente(nombre, index, contenedor, docentes, modal, setIndexEliminar) {
    const div = document.createElement("div");
    div.className = "docente-card";
    div.innerHTML = `
        <div class="docente-info">
            <span>${nombre}</span>
            <div class="acciones-docente">
                <button class="btn-info" data-index="${index}">📲</button>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                <button class="btn-asistio">✓</button>
                <button class="btn-no-asistio">x</button>
            </div>
        </div>
        <div class="detalle-docente" id="info-${index}" style="display: none;">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Área:</strong> Matemáticas</p>
            <p><strong>Email:</strong> docente${index + 1}@ejemplo.com</p>
            <p><strong>Teléfono:</strong> 1456-0789${index}</p>
        </div>
    `;
    contenedor.appendChild(div);

    const btnEliminar = div.querySelector(".btn-eliminar");
    const btnInfo = div.querySelector(".btn-info");
    const detalle = div.querySelector(`#info-${index}`);

    btnEliminar.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        setIndexEliminar(idx);
        modal.style.display = "block";
    });

    btnInfo.addEventListener("click", () => {
        if (detalle.style.display === "none") {
            detalle.style.display = "block";
            btnInfo.textContent = "Ocultar";
        } else {
            detalle.style.display = "none";
            btnInfo.textContent = "📲";
        }
    });
}

function cargarDocentes() {
    return JSON.parse(localStorage.getItem("docentes")) || [];
}

function guardarDocentes(docentes) {
    localStorage.setItem("docentes", JSON.stringify(docentes));
}

export { showVentanaTres };

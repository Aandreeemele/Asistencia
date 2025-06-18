import { zz7 } from "./graficaAsistencia.js";
import { showopciones } from "./opciones.js";

function registrarAlumnos() {
    const root = document.getElementById("root");
    root.innerHTML = getTemplateHTML();

    const btnVolver = document.getElementById("btnVolver");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const btnAgregarAlumno = document.getElementById("btnAgregarAlumno");

    const contenedor = document.getElementById("contenedorAlumnos");
    const modal = document.getElementById("modalEliminar");
    const btnCancelar = document.getElementById("btnCancelarEliminar");
    const btnConfirmar = document.getElementById("btnConfirmarEliminar");

    let alumnos = cargarAlumnos();
    let indexAEliminar = null;

    alumnos.forEach((nombre, index) => {
        crearElementoAlumno(nombre, index, contenedor, alumnos, modal, setIndexEliminar);
    });

    // ✅ Estos botones funcionan correctamente si zz7 y showopciones están bien importados
    btnVolver?.addEventListener("click", zz7);
    btnSiguiente?.addEventListener("click", showopciones);

    btnAgregarAlumno?.addEventListener("click", () => {
        const nuevoNombre = `Alumno ${alumnos.length + 1}`;
        alumnos.push(nuevoNombre);
        guardarAlumnos(alumnos);
        crearElementoAlumno(nuevoNombre, alumnos.length - 1, contenedor, alumnos, modal, setIndexEliminar);
    });

    btnCancelar?.addEventListener("click", () => {
        modal.style.display = "none";
        indexAEliminar = null;
    });

    btnConfirmar?.addEventListener("click", () => {
        if (indexAEliminar !== null) {
            alumnos.splice(indexAEliminar, 1);
            guardarAlumnos(alumnos);
            registrarAlumnos(); // 👈 Recarga la vista actual con la lista actualizada
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
            <p class="subtitulo">𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝙻 𝙰𝙻𝚄𝙼𝙽𝙾</p>
            <button id="btnAgregarAlumno">Agregar Alumno</button>
            <div id="contenedorAlumnos"></div>
            <div id="modalEliminar" class="modal" style="display:none;">
                <div class="modal-content">
                    <p>¿Estás seguro de eliminar el alumno? Se perderán las informaciones.</p>
                    <button id="btnCancelarEliminar">Cancelar</button>
                    <button id="btnConfirmarEliminar">Eliminar</button>
                </div>
            </div>
        </div>
    `;
}

function crearElementoAlumno(nombre, index, contenedor, alumnos, modal, setIndexEliminar) {
    const div = document.createElement("div");
    div.className = "alumno-card";
    div.innerHTML = `
        <div class="alumno-info">
            <span>${nombre}</span>
            <div class="acciones-alumno">
                <button class="btn-info" data-index="${index}">📲</button>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                <button class="btn-asistio">✓</button>
                <button class="btn-no-asistio">x</button>
            </div>
        </div>
        <div class="detalle-alumno" id="info-${index}" style="display: none;">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Grado:</strong> 3º Básico</p>
            <p><strong>Email:</strong> alumno${index + 1}@ejemplo.com</p>
            <p><strong>Teléfono:</strong> 555-010${index}</p>
        </div>
    `;
    contenedor.appendChild(div);

    const btnEliminar = div.querySelector(".btn-eliminar");
    const btnInfo = div.querySelector(".btn-info");
    const detalle = div.querySelector(`#info-${index}`);

    btnEliminar?.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        setIndexEliminar(idx);
        modal.style.display = "block";
    });

    btnInfo?.addEventListener("click", () => {
        const isHidden = detalle.style.display === "none";
        detalle.style.display = isHidden ? "block" : "none";
        btnInfo.textContent = isHidden ? "Ocultar" : "📲";
    });
}

function cargarAlumnos() {
    return JSON.parse(localStorage.getItem("alumnos")) || [];
}

function guardarAlumnos(alumnos) {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

export { registrarAlumnos };

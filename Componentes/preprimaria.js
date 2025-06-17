import { showPanel } from "./loginPrimero.js";
function crearTarjetasDocentes(docentes = []) {
    return docentes.map((docente, index) => `
        <div class="card" data-index="${index}">
            <h3 class="nombre-docente" >${docente.nombre}</h3>
            <p class="descrip">${docente.descripcion}</p>
            <button class="eliminar-docente">Eliminar</button>
        </div>
    `).join('');
}

function showPrePrimaria() {
    const root = document.getElementById("root");
    let docentesGuardados = JSON.parse(localStorage.getItem("docentesPre")) || [
        {
            nombre: "Profesora Maria Pérez",
            descripcion: "Encargada de Prekínder"
        },
        {
            nombre: "Profesora Ana López",
            descripcion: "Encargada de Kínder"
        },
        {
            nombre: "Profesora Fernanda Ovalle",
            descripcion: "Encargada de Preparatoria"
        }
    ];

    function renderizarDocentes() {
        const listaDocentes = document.getElementById("listaDocentes");
        listaDocentes.innerHTML = crearTarjetasDocentes(docentesGuardados);

        // Agregar eventos de eliminación
        document.querySelectorAll(".eliminar-docente").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                if (confirm("¿Deseas eliminar este docente?")) {
                    docentesGuardados.splice(index, 1);
                    localStorage.setItem("docentesPre", JSON.stringify(docentesGuardados));
                    renderizarDocentes();
                }
            });
        });
    }

    root.innerHTML = `
        <div class="panel-container99">
            <img src="fondo 3.svg" alt="" class="imgfondo">
            <button id="Volver99">←</button>
            <button id="Siguiente99">→</button>
            <p class="Titulopre">𝙼𝙰𝙴𝚂𝚃𝚁𝙾𝚂</p>
            <p class="Titulopre1">𝙰𝚂𝙸𝙶𝙽𝙰𝙳𝙾𝚂</p>
            <div class="form-nuevo-docente">
                <input type="text" id="nombreDocente" placeholder="Nombre del docente">
                <input type="text" id="gradoDocente" placeholder="Grado o área asignada">
                <button id="agregarNuevoDocente">Agregar Docente</button>
            </div>

            <div id="listaDocentes"></div>
        </div>
    `;

    document.getElementById("Volver99").addEventListener("click", showPanel);
    const btnAgregar = document.getElementById("agregarNuevoDocente");

    btnAgregar.addEventListener("click", () => {
        const nombre = document.getElementById("nombreDocente").value.trim();
        const grado = document.getElementById("gradoDocente").value.trim();

        if (nombre === "" || grado === "") {
            alert("Por favor, completa ambos campos.");
            return;
        }

        const nuevoDocente = {
            nombre,
            descripcion: `Encargada de ${grado}`
        };

        docentesGuardados.push(nuevoDocente);
        localStorage.setItem("docentesPre", JSON.stringify(docentesGuardados));
        renderizarDocentes();

        document.getElementById("nombreDocente").value = "";
        document.getElementById("gradoDocente").value = "";
    });

    renderizarDocentes(); 
}

export { showPrePrimaria };

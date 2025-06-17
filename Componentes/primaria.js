import { showPanel } from "./loginPrimero.js";
function crearTarjetasPrimaria(docentes = []) {
    return docentes.map((docente, index) => `
        <div class="card" data-index="${index}">
            <h3 class="nombre-docente">${docente.nombre}</h3>
            <p class="descrip">${docente.descripcion}</p>
            <button class="eliminar-docente">Eliminar</button>
        </div>
    `).join('');
}

function showPrimaria() {
    const root = document.getElementById("root");
    let docentesPrimaria = JSON.parse(localStorage.getItem("docentesPrimaria")) || [
        {
            nombre: "Maestra Laura Gómez",
            descripcion: "Encargada de Primer Grado"
        },
        {
            nombre: "Maestro Julio Martínez",
            descripcion: "Encargado de Segundo Grado"
        },
        {
            nombre: "Maestra Karla Ramírez",
            descripcion: "Encargada de Tercer Grado"
        }
    ];

    function renderizarPrimaria() {
        const lista = document.getElementById("listaPrimaria");
        lista.innerHTML = crearTarjetasPrimaria(docentesPrimaria);

        document.querySelectorAll(".eliminar-docente").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                if (confirm("¿Deseas eliminar este docente?")) {
                    docentesPrimaria.splice(index, 1);
                    localStorage.setItem("docentesPrimaria", JSON.stringify(docentesPrimaria));
                    renderizarPrimaria();
                }
            });
        });
    }

    root.innerHTML = `
        <div class="panel-container99">
            <img src="fondo 3.svg" alt="" class="imgfondo">
            <button id="VolverPrimaria">←</button>
            <button id="SiguientePrimaria">→</button>
            <p class="Titulopre">𝙼𝙰𝙴𝚂𝚃𝚁𝙾𝚂</p>
            <p class="Titulopre1">𝙳𝙴 𝙿𝚁𝙸𝙼𝙰𝚁𝙸𝙰</p>
            <div class="form-nuevo-docente">
                <input type="text" id="nombrePrimaria" placeholder="Nombre del docente">
                <input type="text" id="gradoPrimaria" placeholder="Grado o área asignada">
                <button id="agregarDocentePrimaria">Agregar Docente</button>
            </div>

            <div id="listaPrimaria"></div>
        </div>
    `;

    document.getElementById("VolverPrimaria").addEventListener("click", showPanel);

    document.getElementById("agregarDocentePrimaria").addEventListener("click", () => {
        const nombre = document.getElementById("nombrePrimaria").value.trim();
        const grado = document.getElementById("gradoPrimaria").value.trim();

        if (nombre === "" || grado === "") {
            alert("Por favor, completa ambos campos.");
            return;
        }

        const nuevoDocente = {
            nombre,
            descripcion: `Encargado(a) de ${grado}`
        };

        docentesPrimaria.push(nuevoDocente);
        localStorage.setItem("docentesPrimaria", JSON.stringify(docentesPrimaria));
        renderizarPrimaria();

        document.getElementById("nombrePrimaria").value = "";
        document.getElementById("gradoPrimaria").value = "";
    });

    renderizarPrimaria();
}

export { showPrimaria };

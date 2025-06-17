import { showPanel } from "./loginPrimero.js";
import { showVentanaTres } from "./loginTres.js";

// 🔧 Función reutilizable para mostrar las proyecciones
function mostrarProyecciones() {
    const root = document.getElementById("root");
    root.innerHTML = ""; // limpia todo

    // Creo un contenedor para agregar todas las asistencias
    const contenedorAsistencia = document.createElement("div");
    contenedorAsistencia.id = "contenedor-asistencia";

    for (const [titulo, grados] of Object.entries(asistenciaGeneral)) {
        const vista = generarAsistencia(titulo, grados); // debe devolver un nodo DOM
        contenedorAsistencia.appendChild(vista);
    }

    root.appendChild(contenedorAsistencia);
}


// 🔘 Botón reutilizable
function crearBoton(id, texto, onClick) {
    const boton = document.createElement("button");
    boton.id = id;
    boton.textContent = texto;
    boton.addEventListener("click", onClick);
    return boton;
}

function crearDiv(clase, texto) {
    const div = document.createElement("div");
    div.className = clase;
    div.textContent = texto;
    return div;
}

// Cambio aquí: función renombrada a maestroGuia
function maestroGuia() {
    const root = document.getElementById("root");
    root.innerHTML = ""; 

    const contenedor = document.createElement("div");
    contenedor.className = "panexl-containxr";

    const img = document.createElement("img");
    img.src = "fondo 3.svg";
    img.alt = "";
    img.className = "imgx1";

    const titulo1 = document.createElement("p");
    titulo1.className = "Titulx001";
    titulo1.textContent = "𝙼𝙰𝙴𝚂𝚃𝚁𝙾";

    const titulo2 = document.createElement("p");
    titulo2.className = "Titulx0022";
    titulo2.textContent = "𝙶𝚄𝙸𝙰";

    const btnVolver = crearBoton("Volver999", "←", showPanel);

    // ✅ Nuevo botón para llamar mostrarProyecciones
    const btnProyecciones = crearBoton("Proyecciones01", "Proyecciones 📈", mostrarProyecciones);


    // 👉 También puedes usar mostrarProyecciones para otros botones
    const btnSiguiente = crearBoton("Siguiente999", "→", showVentanaTres);

    const divisiones = [
        ["ivcompu", "𝚅 𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚌𝚒ó𝚗"],
    ];

    contenedor.append(img, btnVolver, btnSiguiente, titulo1, titulo2);

    for (const [clase, texto] of divisiones) {
        contenedor.appendChild(crearDiv(clase, texto));
    }

    contenedor.appendChild(btnProyecciones);
    root.appendChild(contenedor);
}

// Para ejecutar inmediatamente showVentanaTres (no cambia)
showVentanaTres();

// Exportar con el nuevo nombre maestroGuia
export { maestroGuia };

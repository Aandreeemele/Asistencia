import { showPanel } from "./loginPrimero.js";
import { showopciones } from "./opciones.js";
// 🔧 Función reutilizable para mostrar las proyecciones
function mostrarProyecciones() {
    const root = document.getElementById("root");
    root.innerHTML = ""; // limpia todo
    for (const [titulo, grados] of Object.entries(proyeccionxs)) {
        generarVistaGrado(titulo, grados);
    }
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

function showVentanaSecundaria() {
    const root = document.getElementById("root");
    root.innerHTML = ""; 

    const contenedor = document.createElement("div");
    contenedor.className = "panexl-containxr";

    const img = document.createElement("img");
    img.src = "./assest/fondo 3.svg";
    img.alt = "";
    img.className = "imgx1";

    const titulo1 = document.createElement("p");
    titulo1.className = "Titulx001";
    titulo1.textContent = "𝙼𝙰𝙴𝚂𝚃𝚁𝙾𝚂";

    const titulo2 = document.createElement("p");
    titulo2.className = "Titulx002";
    titulo2.textContent = "𝙰𝚂𝙸𝙶𝙽𝙰𝙳𝙾𝚂";

    const btnVolver = crearBoton("Volver999", "←", showPanel);

    // ✅ Nuevo botón para llamar mostrarProyecciones
    const btnProyecciones = crearBoton("Proyecciones01", "Proyecciones 📈", mostrarProyecciones);

    // 👉 También puedes usar mostrarProyecciones para otros botones
    const btnSiguiente = crearBoton("Siguiente999", "→", showopciones);

    const divisiones = [
        ["ivcompu", "𝙸𝚅 𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚌𝚒ó𝚗"],
        ["ivdiseño", "𝙸𝚅 𝙳𝚒𝚜𝚎ñ𝚘 𝙶𝚛á𝚙𝚒𝚌𝚘"],
        ["ivbiolo", "𝙸𝚅 𝙱𝚒𝚘𝚕ó𝚐𝚒𝚌𝚊𝚜"],
        ["ivperito", "𝙸𝚅 𝙿𝚎𝚛𝚒𝚝𝚘 𝙲𝚘𝚗𝚝𝚊𝚍𝚘𝚛"],
        ["vcompu", "𝚅 𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚌𝚒ó𝚗"],
        ["vdiseño", "𝚅 𝙳𝚒𝚜𝚎ñ𝚘 𝙶𝚛á𝚙𝚒𝚌𝚘"],
        ["vbiolo", "𝚅 𝙱𝚒𝚘𝚕ó𝚐𝚒𝚌𝚊𝚜"],
        ["vperito", "𝚅 𝙿𝚎𝚛𝚒𝚝𝚘 𝙲𝚘𝚗𝚝𝚊𝚍𝚘𝚛"],
        ["viperito", "𝚅𝙸 𝙿𝚎𝚛𝚒𝚝𝚘 𝙲𝚘𝚗𝚝𝚊𝚍𝚘𝚛"]
    ];

    contenedor.append(img, btnVolver, btnSiguiente, titulo1, titulo2);

    for (const [clase, texto] of divisiones) {
        contenedor.appendChild(crearDiv(clase, texto));
    }

    contenedor.appendChild(btnProyecciones);
    root.appendChild(contenedor);
}

// Para ejecutar inmediatamente showVentanaTres
showopciones();

// Exportar ventana secundaria
export { showVentanaSecundaria };

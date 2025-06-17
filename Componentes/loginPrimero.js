import { showVentanaSecundaria } from "./loginSecundario.js";
import { showLogin } from "./login.js";
import { showPrePrimaria } from "./preprimaria.js";
import { showPrimaria } from "./primaria.js";
import { showBasicos } from "./basicos.js";
import { showDiver } from "./diversificado.js";
import { datosGrados, generarVistaGrado } from "./proyecciones.js"; // <- Corrección

async function showPanel() {
    try {
        const response = await fetch("http://localhost:3000/grados");
        if (!response.ok) throw new Error("Error al obtener los grados");
        const grados = await response.json();
        console.log("Grados recibidos:", grados);

        const root = document.getElementById("root");
        if (!root) throw new Error("Elemento root no encontrado");

        root.innerHTML = `  
        <div class="panel-container">
            <img src="fondo 3.svg" alt="" class="imgpanel">
            <p class="Titulo01">𝙽𝚒𝚟𝚎𝚕𝚎𝚜</p>
            <p class="Titulo02">𝙰𝚌𝚊𝚍é𝚖𝚒𝚌𝚘𝚜</p>
            <button id="PrePrimaria">𝙿𝚛𝚎𝙿𝚛𝚒𝚖𝚊𝚛𝚒𝚊 </button>
            <button id="PrimariaMayor">𝙿𝚛𝚒𝚖𝚊𝚛𝚒𝚊 </button>
            <button id="Basicos">𝙱á𝚜𝚒𝚌𝚘𝚜</button>
            <button id="Bachilleratos">𝙱𝚊𝚌𝚑𝚒𝚕𝚕𝚎𝚛𝚊𝚝𝚘𝚜</button>
            <button id="Proyecciones">Proyecciones 📈</button>
            <button id="cerrar">Cerrar sesión</button>
            <button id="Siguiente">→</button>
        </div>`;

        document.getElementById("Siguiente").addEventListener("click", showVentanaSecundaria);
        document.getElementById("PrePrimaria").addEventListener("click", showPrePrimaria);
        document.getElementById("PrimariaMayor").addEventListener("click", showPrimaria);
        document.getElementById("Basicos").addEventListener("click", showBasicos);
        document.getElementById("Bachilleratos").addEventListener("click", showDiver);
        document.getElementById("Proyecciones").addEventListener("click", () => {
            const root = document.getElementById("root");
            root.innerHTML = ""; // limpia el contenido anterior
            for (const [titulo, grados] of Object.entries(datosGrados)) {
                generarVistaGrado(titulo, grados);
            }
        });

        document.getElementById("cerrar").addEventListener("click", () => {
            localStorage.removeItem("user");
            showLogin();
        });

    } catch (error) {
        console.error("Error en showPanel:", error);
    }
}

export { showPanel };

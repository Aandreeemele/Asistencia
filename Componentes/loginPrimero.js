import { showVentanaSecundaria } from "./loginSecundario.js";
import { showLogin } from "../login.js";
import { showPrePrimaria } from "./preprimaria.js";
import { showPrimaria } from "./primaria.js";
import { showBasicos } from "./basicos.js";
import { BASE_URL } from "../config.js";

const accionesNivel = {
  Preprimaria: showPrePrimaria,
  Primaria: showPrimaria,
  Basicos: showBasicos,
  Bachillerato: showVentanaSecundaria
};

// 🔹 Datos simulados para proyecciones
const datosGrados = {
  Bachillerato: ["IV Computación", "V Diseño", "VI Ciencias"],
  Basicos: ["Primero Básico", "Segundo Básico", "Tercero Básico"],
  Primaria: ["1ro", "2do", "3ro", "4to", "5to", "6to"],
  Preprimaria: ["Prekínder", "Kínder", "Preparatoria"]
};

// 🔹 Función para generar vista por grados
function generarVistaGrado(titulo, grados) {
  const seccion = document.createElement("section");
  seccion.className = "bloque-nivel";

  const h3 = document.createElement("h3");
  h3.textContent = titulo;
  seccion.appendChild(h3);

  const lista = document.createElement("ul");
  grados.forEach(grado => {
    const item = document.createElement("li");
    item.textContent = grado;
    lista.appendChild(item);
  });

  seccion.appendChild(lista);
  document.getElementById("root").appendChild(seccion);
}

async function showPanel() {
  try {
    const response = await fetch(`${BASE_URL}/niveles`);
    if (!response.ok) throw new Error("Error al obtener niveles académicos");
    const niveles = await response.json();

    console.log("🎯 Niveles recibidos:", niveles);

    document.body.innerHTML = "";
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    root.style.border = "2px solid red";

    const panelContainer = document.createElement("div");
    panelContainer.className = "panel-container";

    const imagen = document.createElement("img");
    imagen.src = "./assets/fondo 3.svg";
    imagen.className = "imgpanel";

    const titulo1 = document.createElement("p");
    titulo1.className = "Titulo01";
    titulo1.textContent = "𝙽𝚒𝚟𝚎𝚕𝚎𝚜";

    const titulo2 = document.createElement("p");
    titulo2.className = "Titulo02";
    titulo2.textContent = "𝙰𝚌𝚊𝚍é𝚖𝚒𝚌𝚘𝚜";

    panelContainer.appendChild(imagen);
    panelContainer.appendChild(titulo1);
    panelContainer.appendChild(titulo2);

    // Botones por nivel
    niveles.forEach(({ nivel }) => {
      console.log("🟢 Creando botón para:", nivel);

      const btn = document.createElement("button");
      btn.textContent = nivel;
      btn.className = "boton-nivel";

      btn.style.padding = "10px";
      btn.style.margin = "10px";
      btn.style.fontSize = "16px";
      btn.style.backgroundColor = "#4CAF50";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.borderRadius = "5px";
      btn.style.cursor = "pointer";

      btn.addEventListener("click", () => {
        const accion = accionesNivel[nivel];
        if (accion) {
          accion();
        } else {
          alert(`No hay vista definida para el nivel: ${nivel}`);
        }
      });

      panelContainer.appendChild(btn);
      console.log("✅ Botón agregado para:", nivel);
    });

    // 🔹 Botón Proyecciones funcional
    const btnProy = document.createElement("button");
    btnProy.textContent = "";
    btnProy.className = "boton-nivel";
    btnProy.style.marginTop = "20px";

    btnProy.addEventListener("click", () => {
      root.innerHTML = "";
      for (const [titulo, grados] of Object.entries(datosGrados)) {
        generarVistaGrado(titulo, grados);
      }
    });

    panelContainer.appendChild(btnProy);

    // Botón cerrar sesión
    const btnCerrar = document.createElement("button");
    btnCerrar.textContent = "Cerrar sesión";
    btnCerrar.className = "boton-nivel";
    btnCerrar.style.marginTop = "20px";

    btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("user");
      showLogin();
    });

    panelContainer.appendChild(btnCerrar);

    // Botón siguiente
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "→";
    btnSiguiente.className = "boton-nivel";

    btnSiguiente.addEventListener("click", showVentanaSecundaria);
    panelContainer.appendChild(btnSiguiente);

    root.appendChild(panelContainer);
    console.log("🧩 panelContainer agregado al DOM");

  } catch (error) {
    console.error("❌ Error en showPanel:", error);
  }
}

export { showPanel };

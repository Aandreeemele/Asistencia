import { maestroGuia } from "./maestroGuia.js";
import { showopciones } from "./opciones.js";

async function mostrarTablaAsistencias() {
  const root = document.getElementById("root");
  root.innerHTML = ""; // Limpiar todo antes de mostrar

  const titulo = document.createElement("h2");
  titulo.id = "titulo-resumen-asistencia";
  titulo.textContent = "𝚁𝚎𝚜𝚞𝚖𝚎𝚗 𝙰𝚜𝚒𝚜𝚝𝚎𝚗𝚌𝚒𝚊";
  titulo.style.textAlign = "center";
  root.appendChild(titulo);

  const tablaContainer = document.createElement("div");
  tablaContainer.id = "tablaAsistenciasContainer";

  const wrapper = document.createElement("div");
  wrapper.style.maxWidth = "400px";
  wrapper.style.overflowX = "auto";
  wrapper.style.border = "1px solid #ccc";
  wrapper.style.borderRadius = "8px";
  wrapper.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  wrapper.style.margin = "0 auto";
  wrapper.style.background = "white";

  try {
    const res = await fetch("https://asistent.proyectoscl.space/alumnos");
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const alumnos = await res.json();

    if (!alumnos.length) {
      tablaContainer.textContent = "No hay alumnos registrados.";
      root.appendChild(tablaContainer);
      return;
    }

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.fontSize = "12px";
    table.style.fontFamily = "Arial";

    const headerRow = document.createElement("tr");
    const headers = ["#", "Nombre", "A", "T", "F", "Último", "Hora"];
    headers.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      th.style.background = "#6200ea";
      th.style.color = "white";
      th.style.padding = "4px";
      th.style.border = "1px solid #ddd";
      th.style.fontWeight = "bold";
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    alumnos.forEach((a, i) => {
      const tr = document.createElement("tr");
      const celdas = [
        i + 1,
        a.nombre,
        a.conteo_asistio || 0,
        a.conteo_tarde || 0,
        a.conteo_noasistio || 0,
        a.asistencia || "-",
        a.asistencia_hora
          ? new Date(a.asistencia_hora).toLocaleTimeString("es-GT", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",
      ];

      celdas.forEach((texto, idx) => {
        const td = document.createElement("td");
        td.textContent = texto;
        td.style.padding = "4px";
        td.style.border = "1px solid #ddd";
        td.style.textAlign = "center";
        td.style.backgroundColor = i % 2 === 0 ? "#f9f9f9" : "white";

        if (idx === 5) {
          const estado = texto.toLowerCase();
          if (estado === "asistio") td.style.color = "green";
          else if (estado === "tarde") td.style.color = "orange";
          else if (estado === "noasistio") td.style.color = "red";
        }

        tr.appendChild(td);
      });

      table.appendChild(tr);
    });

    wrapper.appendChild(table);
    tablaContainer.appendChild(wrapper);
    root.appendChild(tablaContainer);

    // Botones navegación
    const navBotones = document.createElement("div");

    const btnVolver = document.createElement("button");
    btnVolver.id = "btn-regresar-asistencia";
    btnVolver.textContent = "← Regresar";
    navBotones.appendChild(btnVolver);

    const btnSiguiente = document.createElement("button");
    btnSiguiente.id = "btn-siguiente-asistencia";
    btnSiguiente.textContent = "Siguiente →";
    navBotones.appendChild(btnSiguiente);

    root.appendChild(navBotones);

    // Event listeners, solo si existen botones (creados aquí mismo)
    btnVolver.addEventListener("click", () => {
      console.log("← Botón Regresar presionado");
      showopciones();
    });

    btnSiguiente.addEventListener("click", () => {
      console.log("→ Botón Siguiente presionado");
      root.innerHTML = "";
      maestroGuia();
    });

  } catch (error) {
    console.error("❌ Error al cargar asistencias:", error);
    tablaContainer.textContent = "Error al cargar asistencias.";
    root.appendChild(tablaContainer);
  }
}

export { mostrarTablaAsistencias };

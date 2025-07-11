import { maestroGuia } from "./maestroGuia.js";
import { registrarAlumnos } from "./registraralumnos.js";

// Datos de ejemplo
const b5q = {
  "V Computacion": [100, 50, 100, 100, 100, 50, 100, 50, 10,
                    100, 100, 100, 100, 100, 50, 100, 100, 100]
};

// Función para definir color según porcentaje
function c7a(x) {
  if (x >= 75) return "#5fa14f";
  if (x >= 25) return "#e59527";
  return "#d61712";
}

// Genera la barra con porcentaje y color
function g1y(p) {
  const color = c7a(p);
  return `
    <div class="m7r">
      <div class="i1t">👤</div>
      <div class="b7l">
        <div class="w3e" style="width:${p}%; background:${color};"></div>
      </div>
      <div class="p5s" style="color:${color};">${p}%</div>
    </div>
  `;
}

// Genera el bloque con título y barras
function y8p(t, l) {
  let html = `<h3 class="v9x">${t}</h3>`;
  l.forEach(v => {
    html += g1y(v);
  });
  return html;
}

// Función principal para mostrar contenido
function zz7() {
  const root = document.getElementById("root");

  // Crear un contenedor padre
  const contenedor = document.createElement("div");
  contenedor.id = "contenedor-pdf";
  contenedor.style.maxWidth = "400px";
  contenedor.style.margin = "auto";
  contenedor.style.padding = "10px";
  contenedor.style.border = "1px solid #ccc";
  contenedor.style.borderRadius = "8px";
  contenedor.style.background = "#f9f9f9";

  let html = `<h2 class="k0a" style="text-align:center;">Asistencia general</h2>`;

  Object.entries(b5q).forEach(([t, l]) => {
    html += y8p(t, l);
  });

  contenedor.innerHTML = html;

  // Limpiar root y añadir el contenedor y el botón descargar
  root.innerHTML = "";
  root.appendChild(contenedor);

  const btnDescargar = document.createElement("button");
  btnDescargar.textContent = "Descargar resumen PDF";
  btnDescargar.style.display = "block";
  btnDescargar.style.margin = "10px auto";
  btnDescargar.style.padding = "10px 20px";
  btnDescargar.style.cursor = "pointer";

  btnDescargar.addEventListener("click", () => {
    if (typeof html2pdf === "undefined") {
      alert("Error: La librería html2pdf.js no está cargada");
      return;
    }
    html2pdf().from(contenedor).set({
      margin: 0.5,
      filename: 'resumen_asistencia.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  });

  root.appendChild(btnDescargar);

  // Botones de navegación
  const nav = document.createElement("div");
  nav.className = "nav-buttons";
  nav.style.textAlign = "center";
  nav.style.marginTop = "10px";

  const btnRegresarAsistencia = document.createElement("button");
  btnRegresarAsistencia.textContent = "←";
  btnRegresarAsistencia.className = "btn-regresar-asistencia";
  btnRegresarAsistencia.style.borderRadius = "6px";
  btnRegresarAsistencia.style.cursor = "pointer";
  btnRegresarAsistencia.addEventListener("click", maestroGuia);

  const btnSiguienteAsistencia = document.createElement("button");
  btnSiguienteAsistencia.textContent = "→";
  btnSiguienteAsistencia.className = "btn-siguiente-asistencia";
  btnSiguienteAsistencia.style.borderRadius = "6px";
  btnSiguienteAsistencia.style.cursor = "pointer";
  btnSiguienteAsistencia.addEventListener("click", registrarAlumnos);

  nav.appendChild(btnRegresarAsistencia);
  nav.appendChild(btnSiguienteAsistencia);

  root.appendChild(nav);
}

export { b5q, zz7 };

import { maestroGuia } from "./maestroGuia.js";
import { registrarAlumnos } from "./registraralumnos.js";

const b5q = {
  "V Computacion": [100, 50, 100, 100, 100, 50, 100, 50, 10,
                    100, 100, 100, 100, 100, 50, 100, 100, 100]
};

function c7a(x) {
  if (x >= 75) return "#5fa14f";
  if (x >= 25) return "#e59527";
  return "#d61712";
}

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

function y8p(t, l) {
  let html = `<h3 class="v9x">${t}</h3>`;
  l.forEach(v => {
    html += g1y(v);
  });
  return html;
}

function zz7() {
  const root = document.getElementById("root");
  let html = `
    <h2 class="k0a">Asistencia general</h2>
  `;

  Object.entries(b5q).forEach(([t, l]) => {
    html += y8p(t, l);
  });

  html += `
    <button class="btn-z9x" onclick="alert('Aquí iría la lógica para descargar el resumen 😜')">Descargar resumen</button>
    <div class="nav-buttons">
      <button id="Vlvxr999">←</button>
      <button id="Siguixntx99">→</button>
    </div>
  `;

  root.innerHTML = html;

  // ✅ Agregar los listeners después de insertar el HTML
  document.getElementById("Vlvxr999").addEventListener("click", maestroGuia);
  document.getElementById("Siguixntx99").addEventListener("click", registrarAlumnos);
}

export { b5q, zz7 };

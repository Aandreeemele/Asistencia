import { showopciones } from "./opciones.js";
import { showVentanaTres } from "./loginTres.js";
import { zz7 } from "./graficaAsistencia.js"; // ✅ Importar función, no objeto

// ... tu código de asistenciaGeneral, generarAsistencia, mostrarProyecciones

function maestroGuia() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="panexl-containxr">
      <img src="fondo 3.svg" alt="" class="imgx1">
      <button id="Volver999">←</button>
      <button id="Siguiente999">→</button>
      <p class="Titulx001">𝙼𝙰𝙴𝚂𝚃𝚁𝙾</p>
      <p class="Titulx0022">𝙶𝚄𝙸𝙰</p>
      <div class="ivcompu">𝚅 𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚌𝚒ó𝚗</div>
      <button id="Proyecciones01">Proyecciones 📈</button>
    </div>
  `;

  document.getElementById("Volver999").addEventListener("click", showopciones);
  document.getElementById("Siguiente999").addEventListener("click", zz7); // ✅ Corrección
  document.getElementById("Proyecciones01").addEventListener("click", mostrarProyecciones);
}

showVentanaTres();
export { maestroGuia };

import { showLogin } from "../login.js";
import { showUniforme } from "./uniforme.js";
import { mostrarPanelAcademico } from "./otrosNiveles.js";
function crearMenu() {
  const contenedor = document.createElement("div");
  contenedor.id = "menuDesplegable";
  contenedor.className = "contenxdorPrincipal";

  const menuContent = document.createElement("div");
  menuContent.className = "menu-content";

  const titulo1 = document.createElement("p");
  titulo1.className = "wq0";
  titulo1.textContent = "𝙲𝚘𝚕𝚎𝚐𝚒𝚘 𝙶𝚎𝚗𝚎𝚛𝚊𝚕";

  const titulo2 = document.createElement("p");
  titulo2.className = "wq1";
  titulo2.textContent = "𝙼𝚎𝚗ú";

  const btnReporte = crearBoton("btnReporte", "Reporte");
  const btnUniforme = crearBoton("btnUniforme", "Uniforme");
  const btnProye = crearBoton("btnProye", "proyecciones");
  const btnOtrosNivels = crearBoton("btnOtrosNiveles", "Otros Niveles");
  const btnCerrarS = crearBoton("btnCerrarS", "Cerra Seción");

  // Evento para cerrar sesión
  btnCerrarS.addEventListener("click", () => {
    const menu = document.getElementById("menuDesplegable");
    if (menu) menu.remove();
    showLogin();
  });

  // Evento para mostrar Uniforme
  btnUniforme.addEventListener("click", () => {
    showUniforme();
  });

  // Evento para otros niveles
  btnOtrosNivels.addEventListener("click", () =>{
    mostrarPanelAcademico();
  });

  // Evento para enviar correo desde Gmail
  btnReporte.addEventListener("click", () => {
    const destinatario = "aamelendez@scl.edu.gt";
    const asunto = encodeURIComponent("Reporte Colegio General");
    const cuerpo = encodeURIComponent("Colegio General le informa sobre el reporte, generado desde la plataforma del colegio.");

    // Abrir Gmail en una nueva pestaña
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`, '_blank');

    // Simular volver a la app después de unos segundos
    setTimeout(() => {
      alert("Gracias por enviar tu reporte.");
      const menu = document.getElementById("menuDesplegable");
      if (menu) menu.remove();
      document.body.appendChild(crearMenu());
    }, 4000);
  });

  menuContent.append(titulo1, titulo2, btnReporte, btnUniforme, btnProye, btnOtrosNivels, btnCerrarS);
  contenedor.appendChild(menuContent);

  return contenedor;
}

function crearBoton(id, texto) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = texto;
  return btn;
}

export { crearMenu };

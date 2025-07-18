import { showLogin } from "../login.js";
import { showUniforme } from "./uniforme.js";
import { mostrarPanelAcademico } from "./otrosNiveles.js";
import { mostrarGraficas } from "./graficas.js";

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
  const btnProye = crearBoton("btnProye", "Proyecciones");
  const btnOtrosNiveles = crearBoton("btnOtrosNiveles", "Otros Niveles");
  const btnCorreo = crearBoton("btnCorreo", "Enviar Correo");
  const btnCerrarS = crearBoton("btnCerrarS", "Cerrar Sesión");

  function cerrarMenu() {
    const menu = document.getElementById("menuDesplegable");
    if (menu) menu.remove();
    document.removeEventListener("click", clickFueraDelMenu);
  }

  function clickFueraDelMenu(event) {
    const menu = document.getElementById("menuDesplegable");
    if (menu && !menu.contains(event.target)) {
      cerrarMenu();
    }
  }

  setTimeout(() => {
    document.addEventListener("click", clickFueraDelMenu);
  }, 0);

  btnCerrarS.addEventListener("click", () => {
    cerrarMenu();
    showLogin();
  });

  btnProye.addEventListener("click", () => {
    cerrarMenu();
    mostrarGraficas();
  });

  btnCorreo.addEventListener("click", () => {
    cerrarMenu();
    const destinatario = "aamelendez@scl.edu.gt";
    const asunto = encodeURIComponent("𝙲𝚘𝚕𝚎𝚐𝚒𝚘 𝙶𝚎𝚗𝚎𝚛𝚊𝚕");
    const cuerpo = encodeURIComponent(
      `Estimado padre de familia,\n\nEnvió información del comportamiento de su hijo(a)\n\nGracias.`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`, "_blank");

    setTimeout(() => {
      alert("Redactando correo en Gmail...");
    }, 1500);
  });

  btnUniforme.addEventListener("click", () => {
    cerrarMenu();
    showUniforme();
  });

  btnOtrosNiveles.addEventListener("click", () => {
    cerrarMenu();
    mostrarPanelAcademico();
  });

  btnReporte.addEventListener("click", () => {
    cerrarMenu();

    const destinatario = "aamelendez@scl.edu.gt";
    const asunto = encodeURIComponent("Reporte Colegio General");
    const cuerpo = encodeURIComponent("Colegio General le informa sobre el reporte, generado desde la plataforma del colegio.");

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`, '_blank');

    setTimeout(() => {
      alert("Gracias por enviar tu reporte.");
    }, 4000);
  });

  menuContent.append(titulo1, titulo2, btnReporte, btnUniforme, btnProye, btnCorreo, btnOtrosNiveles, btnCerrarS);
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

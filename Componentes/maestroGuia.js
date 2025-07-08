import { mostrarTablaAsistencias } from "./resumenAsistencia.js";
import { showLogin } from "../login.js";
import { zz7 } from "./graficaAsistencia.js";

function maestroGuia() {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  } else {
    root.innerHTML = "";
  }

  const container = document.createElement("div");
  container.className = "panexl-containxr";

  const fondo = document.createElement("img");
  fondo.src = "./assets/fondo 3.svg";
  fondo.alt = "";
  fondo.className = "imgx1";

  const titulo1 = document.createElement("p");
  titulo1.className = "Titulx001";
  titulo1.textContent = "𝙼𝙰𝙴𝚂𝚃𝚁𝙾";

  const titulo2 = document.createElement("p");
  titulo2.className = "Titulx0022";
  titulo2.textContent = "𝙶𝚄𝙸𝙰";

  const btnVolver = crearBoton("Volver999", "←", mostrarTablaAsistencias);
  const btnSiguiente = crearBoton("Siguiente999", "→", zz7);

  const btnCerrar = crearBoton("cerrar100", "Cerrar Sesión", () => {
    localStorage.removeItem("user");
    root.innerHTML = "";
    showLogin();
  });

  const compuDiv = document.createElement("div");
  compuDiv.className = "ivcompu";
  compuDiv.textContent = "𝚅 𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚌𝚒ó𝚗";

  container.appendChild(fondo);
  container.appendChild(btnVolver);
  container.appendChild(btnSiguiente);
  container.appendChild(titulo1);
  container.appendChild(titulo2);
  container.appendChild(compuDiv);
  container.appendChild(btnCerrar);

  root.appendChild(container);
}

function crearBoton(id, texto, onClick) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = texto;
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

export { maestroGuia };

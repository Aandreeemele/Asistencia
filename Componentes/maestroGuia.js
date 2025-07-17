import { crearMenu } from "./menu.js";
import { registrarAlumnos } from "./registraralumnos.js";

function maestroGuia(correoDelMaestro, gradoAsignado) {
  console.log("gradoAsignado recibido:", gradoAsignado);
  
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

  const btnMenu = crearBoton("btnMenu", "☰", () => {
    const menuExistente = document.getElementById("menuDesplegable");

    if (menuExistente) {
      menuExistente.remove();
      document.removeEventListener("click", handleOutsideClick);
    } else {
      const menu = crearMenu();
      document.body.appendChild(menu);

      setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
      }, 50);
    }

    function handleOutsideClick(e) {
      const menu = document.getElementById("menuDesplegable");
      const esClickDentroDelMenu = menu && menu.contains(e.target);
      const esClickEnBotonMenu = btnMenu.contains(e.target);

      if (!esClickDentroDelMenu && !esClickEnBotonMenu) {
        document.removeEventListener("click", handleOutsideClick);
      }
    }
  });

  // Validar que gradoAsignado sea cadena no vacía
  const textoGrado = gradoAsignado && gradoAsignado.trim() !== "" 
    ? gradoAsignado 
    : "Sin grado asignado";

  console.log("textoGrado:", textoGrado);

  const compuDiv = document.createElement("div");
  compuDiv.className = "ivcompu";
  compuDiv.textContent = textoGrado;

  compuDiv.addEventListener("click", () => {
    root.innerHTML = "";
    registrarAlumnos();
  });

  container.appendChild(fondo);
  container.appendChild(btnMenu);
  container.appendChild(titulo1);
  container.appendChild(titulo2);
  container.appendChild(compuDiv);
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

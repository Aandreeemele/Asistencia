import { registrarAlumnos } from "./registraralumnos.js";
import { crearMenu } from "./menu.js";
import { showPanel } from "./loginPrimero.js";

function cordiPanel(correoDelCordi, areaAsignada) {
  const app = document.getElementById("app") || document.body;
  app.innerHTML = "";
  console.log("areaAsignada recibido:", areaAsignada);

  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  } else {
    root.innerHTML = "";
  }

  const container = document.createElement("div");
  container.className = "cordi-container";

  const fondo = document.createElement("img");
  fondo.src = "./assets/fondo 3.svg";
  fondo.alt = "";
  fondo.className = "cordi-img";

  const titulo1 = document.createElement("p");
  titulo1.className = "cordi-titulo1";
  titulo1.textContent = "𝙲𝙾𝙾𝚁𝙳𝙸𝙽𝙰𝙳𝙾𝚁";

  const titulo2 = document.createElement("p");
  titulo2.className = "cordi-titulo2";
  titulo2.textContent = "";

  const btnMenu = crearBoton("btnMenuCordi", "☰", () => {
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
        menu?.remove();
      }
    }
  });

  const textoArea = areaAsignada && areaAsignada.trim() !== ""
    ? areaAsignada
    : "𝙱𝚊𝚌𝚑𝚒𝚕𝚕𝚎𝚛𝚊𝚝𝚘 ";

  const areaDiv = document.createElement("div");
  areaDiv.className = "cordi-area";
  areaDiv.textContent = textoArea;

  areaDiv.addEventListener("click", () => {
    root.innerHTML = "";
    registrarAlumnos();
  });

  // NUEVO BOTÓN: MAESTROS
  const maestrosDiv = document.createElement("div");
maestrosDiv.className = "cordi-area";
maestrosDiv.textContent = "𝙼𝙰𝙴𝚂𝚃𝚁𝙾𝚂";

maestrosDiv.addEventListener("click", showPanel); // ✅ Esto es correcto



  // Agregar elementos al contenedor
  container.appendChild(fondo);
  container.appendChild(btnMenu);
  container.appendChild(titulo1);
  container.appendChild(titulo2);
  container.appendChild(areaDiv);
  container.appendChild(maestrosDiv); // <-- Se añade debajo del de Bachillerato
  root.appendChild(container);
}

function crearBoton(id, texto, onClick) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = texto;
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

export { cordiPanel };

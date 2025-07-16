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
  const btnCerrarS = crearBoton("btnCerrarS", "Cerra Seción");

  menuContent.append(titulo1, titulo2, btnReporte, btnUniforme, btnProye, btnCerrarS);
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

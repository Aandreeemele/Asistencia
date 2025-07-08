import { showopciones } from "./opciones.js";

function showObservaciones() {
  // Limpiar pantalla
  document.body.innerHTML = "";

  // Crear raíz
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  // Crear título
  const titulo = document.createElement("h2");
  titulo.textContent = "Pantalla de observaciones";

  // Crear botón volver
  const botonVolver = document.createElement("button");
  botonVolver.id = "Volvxr";
  botonVolver.textContent = "←";
  botonVolver.addEventListener("click", showopciones);

  // Añadir elementos al root
  root.appendChild(titulo);
  root.appendChild(botonVolver);
}

export { showObservaciones };

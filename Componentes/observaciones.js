import { showopciones } from "./opciones.js";
function showObservaciones() {
    const root = document.getElementById("root");
    root.innerHTML = `
    <h2>Pantalla de observaciones</h2>
    <button id="Volvxr">←</button>
    `;
    document.getElementById("Volvxr").addEventListener("click", showopciones);
}

export { showObservaciones };

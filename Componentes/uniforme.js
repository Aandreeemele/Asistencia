import { showopciones } from "./opciones.js";

function showUniforme() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const volverBtn = document.createElement("button");
  volverBtn.textContent = "←";
  volverBtn.id = "Volvxr";
  volverBtn.className = "volver-btn";
  volverBtn.onclick = showopciones;
  root.appendChild(volverBtn);

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modalUniforme";

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" id="cerrarModalBtn">&times;</span>
      <h3>Tipo de uniforme</h3>

      <div class="uniform-img">
        <img src="Sin título-2 1.svg" alt="Uniforme completo">
      </div>

      <div class="button-group">
        <button id="registrarBtn" class="boton">Registrar</button>
        <button id="mostrarBtn" class="boton">Enviar correo</button>
      </div>

      <div id="opcionesCorreo" class="opciones-correo" style="display:none;">
        <p>Selecciona la prenda faltante:</p>
        <ul>
          <li>Chumpa</li>
          <li>Polo</li>
          <li>Pantalón</li>
          <li>Zapatos</li>
          <li>Chumpa de física</li>
          <li>Playera/Blusa</li>
          <li>Pants</li>
          <li>Tenis</li>
        </ul>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("cerrarModalBtn").onclick = () => {
    document.body.removeChild(modal);
  };

  document.getElementById("registrarBtn").onclick = () => {
    alert("Uniforme registrado correctamente.");
  };

  document.getElementById("mostrarBtn").onclick = () => {
    document.getElementById("opcionesCorreo").style.display = "block";
  };

  document.querySelectorAll("#opcionesCorreo li").forEach((li) => {
    li.onclick = () => {
      const prenda = li.textContent;
      esperarEmailJSYEnviar(prenda);
    };
  });

  function esperarEmailJSYEnviar(prenda) {
    if (window.emailjsReady && window.emailjs) {
      enviarCorreo(prenda);
    } else {
      console.log("⏳ EmailJS no listo, intentando en 500ms...");
      setTimeout(() => esperarEmailJSYEnviar(prenda), 500);
    }
  }

  function enviarCorreo(prenda) {
    console.log("➡️ Enviando correo con EmailJS...");

    const templateParams = {
      nombre: "Estudiante",
      tiempo: new Date().toLocaleString(),
      mensaje: `Buenas, hace falta: ${prenda}`,
    };

    emailjs.send("servicio_qx3yxbt", "plantilla_zm365pk", templateParams)
      .then(() => alert("✅ Correo enviado correctamente."))
      .catch(err => alert("❌ Error al enviar correo: " + JSON.stringify(err)));
  }
}

export { showUniforme };

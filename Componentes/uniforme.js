import { showopciones } from "./opciones.js";

function showUniforme() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Botón volver
  const volverBtn = document.createElement("button");
  volverBtn.textContent = "←";
  volverBtn.id = "Volvxr";
  volverBtn.className = "volver-btn";
  volverBtn.onclick = showopciones;
  root.appendChild(volverBtn);

  // Crear modal principal
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modalUniforme";

  // Contenido modal
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // Botón cerrar modal (X)
  const cerrarModalBtn = document.createElement("span");
  cerrarModalBtn.className = "close";
  cerrarModalBtn.id = "cerrarModalBtn";
  cerrarModalBtn.innerHTML = "&times;";
  modalContent.appendChild(cerrarModalBtn);

  // Título modal
  const titulo = document.createElement("h3");
  titulo.textContent = "Tipo de uniforme";
  modalContent.appendChild(titulo);

  // Imagen uniforme
  const divImg = document.createElement("div");
  divImg.className = "uniform-img";
  const img = document.createElement("img");
  img.src = "./assets/Sin título-2 1.svg";
  img.alt = "Uniforme completo";
  divImg.appendChild(img);
  modalContent.appendChild(divImg);

  // Grupo botones Registrar y Enviar correo
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";

  const btnRegistrar = document.createElement("button");
  btnRegistrar.id = "registrarBtn";
  btnRegistrar.className = "boton";
  btnRegistrar.textContent = "Registrar";

  const btnMostrar = document.createElement("button");
  btnMostrar.id = "mostrarBtn";
  btnMostrar.className = "boton";
  btnMostrar.textContent = "Enviar correo";

  buttonGroup.append(btnRegistrar, btnMostrar);
  modalContent.appendChild(buttonGroup);

  // Opciones correo (oculto inicialmente)
  const opcionesCorreo = document.createElement("div");
  opcionesCorreo.id = "opcionesCorreo";
  opcionesCorreo.className = "opciones-correo";
  opcionesCorreo.style.display = "none";

  const pOpciones = document.createElement("p");
  pOpciones.textContent = "Selecciona la prenda faltante:";
  opcionesCorreo.appendChild(pOpciones);

  const ulOpciones = document.createElement("ul");
  const prendas = [
    "Chumpa", "Polo", "Pantalón", "Zapatos", "Chumpa de física", 
    "Playera/Blusa", "Pants", "Tenis"
  ];
  prendas.forEach(prenda => {
    const li = document.createElement("li");
    li.textContent = prenda;
    li.style.cursor = "pointer";
    ulOpciones.appendChild(li);

    li.onclick = () => {
      esperarEmailJSYEnviar(prenda);
    };
  });
  opcionesCorreo.appendChild(ulOpciones);

  modalContent.appendChild(opcionesCorreo);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Eventos
  cerrarModalBtn.onclick = () => {
    document.body.removeChild(modal);
  };

  btnRegistrar.onclick = () => {
    alert("Uniforme registrado correctamente.");
  };

  btnMostrar.onclick = () => {
    opcionesCorreo.style.display = "block";
  };

  // Funciones para envío con EmailJS
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

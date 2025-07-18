import { showopciones } from "./opciones.js";
import { maestroGuia } from "./maestroGuia.js";

function showUniforme() {
  const root = document.createElement("div");
  root.id = "root";

  // Botón regresar
  const btnVolver = document.createElement("button");
  btnVolver.innerText = "← Regresar";
  btnVolver.id = "btn-regresar";
  btnVolver.onclick =  maestroGuia;
  root.appendChild(btnVolver);

  // Título
  const titulo = document.createElement("h2");
  titulo.innerText = "Uniformes Colegio General:";
  root.appendChild(titulo);

  // Tabla de imágenes
  const tabla = document.createElement("table");
  const fila = document.createElement("tr");

  const imagenes = [
    { src: "./assets/nomanches1.svg", nombre: "Uniforme de Física" },
    { src: "./assets/Sintítulo-21.svg", nombre: "Uniforme de Diario" },
  ];

  imagenes.forEach((imgData) => {
    const celda = document.createElement("td");

    const img = document.createElement("img");
    img.src = imgData.src;
    img.className = "img-a";
    img.alt = imgData.nombre;

    const etiqueta = document.createElement("p");
    etiqueta.innerText = imgData.nombre;

    celda.appendChild(img);
    celda.appendChild(etiqueta);
    fila.appendChild(celda);
  });

  tabla.appendChild(fila);
  root.appendChild(tabla);

  // Subtítulo
  const subtitulo = document.createElement("h3");
  subtitulo.innerText = "Selecciona los componentes faltantes:";
  root.appendChild(subtitulo);

  const componentes = [
    "Camisa",
    "Pantalón",
    "Zapatos",
    "Chumpa",
    "Playera de Educación Física",
    "Pants de Educación Física",
    "Calcetas/Calcetines",
    "Tenis",
    "Corte de cabello",
  ];

  const contenedorChecks = document.createElement("div");
  contenedorChecks.id = "componentes-lista";

  const checkboxes = [];

  componentes.forEach((nombre) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = nombre;
    checkboxes.push(checkbox);

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(nombre));
    contenedorChecks.appendChild(label);
  });

  root.appendChild(contenedorChecks);

  // Botón enviar correo
  const boton = document.createElement("button");
  boton.innerText = "Enviar correo";
  boton.id = "btn-enviar";

  boton.onclick = () => {
    const seleccionados = checkboxes
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    if (seleccionados.length === 0) {
      alert("Por favor selecciona al menos un componente faltante.");
      return;
    }

    const asunto = encodeURIComponent("Uniforme escolar Colegio General");
    const cuerpo = encodeURIComponent(
      `Colegio General, le informa que el alumno ha faltado con los siguientes componentes del uniforme:\n\n${seleccionados.join("\n")}\n\nGracias, bendiciones.`
    );
    const destinatario = "aamelendez@scl.edu.gt";

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`;
  };

  root.appendChild(boton);

  // Reemplazar contenido del body
  document.body.innerHTML = "";
  document.body.appendChild(root);
}

export { showUniforme };
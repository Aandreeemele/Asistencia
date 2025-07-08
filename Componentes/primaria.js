import { showPanel } from "./loginPrimero.js";

function showPrimaria() {
  // Limpiar el body y crear contenedor raíz
  document.body.innerHTML = "";
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  // Cargar docentes desde localStorage o usar valores por defecto
  let docentesPrimaria = JSON.parse(localStorage.getItem("docentesPrimaria")) || [
    { nombre: "Maestra Laura Gómez", descripcion: "Encargada de Primer Grado" },
    { nombre: "Maestro Julio Martínez", descripcion: "Encargado de Segundo Grado" },
    { nombre: "Maestra Karla Ramírez", descripcion: "Encargada de Tercer Grado" },
  ];

  // Crear elementos principales
  const contenedor = crearElemento("div", "panel-container99");
  const imgFondo = crearElemento("img", "imgfondo");
  imgFondo.src = "./assets/fondo 3.svg";
  imgFondo.alt = "";

  const btnVolver = crearBoton("VolverPrimaria", "←", showPanel);
  const btnSiguiente = crearBoton("SiguientePrimaria", "→", () => alert("Siguiente..."));

  const titulo = crearElemento("p", "Titulopre", "𝙼𝙰𝙴𝚂𝚃𝚁𝙾𝚂");
  const subtitulo = crearElemento("p", "Titulopre1", "𝙳𝙴 𝙿𝚁𝙸𝙼𝙰𝚁𝙸𝙰");

  const form = crearElemento("div", "form-nuevo-docente");
  const inputNombre = crearInput("nombrePrimaria", "Nombre del docente");
  const inputGrado = crearInput("gradoPrimaria", "Grado o área asignada");

  const btnAgregar = crearBoton("agregarDocentePrimaria", "Agregar Docente", () => {
    const nombre = inputNombre.value.trim();
    const grado = inputGrado.value.trim();

    if (!nombre || !grado) return alert("Por favor, completa ambos campos.");

    docentesPrimaria.push({
      nombre,
      descripcion: `Encargado(a) de ${grado}`
    });

    localStorage.setItem("docentesPrimaria", JSON.stringify(docentesPrimaria));
    inputNombre.value = "";
    inputGrado.value = "";
    renderizarDocentes();
  });

  const listaDocentes = crearElemento("div", "listaPrimaria");
  form.append(inputNombre, inputGrado, btnAgregar);

  // Agregar todo al contenedor y al root
  contenedor.append(imgFondo, btnVolver, btnSiguiente, titulo, subtitulo, form, listaDocentes);
  root.appendChild(contenedor);

  // Función para renderizar docentes
  function renderizarDocentes() {
    listaDocentes.innerHTML = "";

    docentesPrimaria.forEach((docente, index) => {
      const card = crearElemento("div", "card");
      card.dataset.index = index;

      const nombreEl = crearElemento("h3", "nombre-docente", docente.nombre);
      const descripEl = crearElemento("p", "descrip", docente.descripcion);
      const btnEliminar = crearBoton("btnEliminar" + index, "Eliminar", () => {
        if (confirm("¿Deseas eliminar este docente?")) {
          docentesPrimaria.splice(index, 1);
          localStorage.setItem("docentesPrimaria", JSON.stringify(docentesPrimaria));
          renderizarDocentes();
        }
      });

      card.append(nombreEl, descripEl, btnEliminar);
      listaDocentes.appendChild(card);
    });
  }

  renderizarDocentes();
}

// Funciones auxiliares reutilizables
function crearElemento(etiqueta, clase = "", texto = "") {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

function crearBoton(id, texto, onClick) {
  const boton = crearElemento("button", "", texto);
  boton.id = id;
  boton.addEventListener("click", onClick);
  return boton;
}

function crearInput(id, placeholder) {
  const input = document.createElement("input");
  input.id = id;
  input.placeholder = placeholder;
  return input;
}

export { showPrimaria };

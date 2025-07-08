import { showPanel } from "./loginPrimero.js";

function crearTarjetasDocentes(docentes, contenedor, actualizar) {
  contenedor.innerHTML = "";
  docentes.forEach((docente, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    const nombre = document.createElement("h3");
    nombre.className = "nombre-docente";
    nombre.textContent = docente.nombre;

    const descripcion = document.createElement("p");
    descripcion.className = "descrip";
    descripcion.textContent = docente.descripcion;

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "eliminar-docente";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      if (confirm("¿Deseas eliminar este docente?")) {
        docentes.splice(index, 1);
        localStorage.setItem("docentesPre", JSON.stringify(docentes));
        actualizar();
      }
    });

    card.appendChild(nombre);
    card.appendChild(descripcion);
    card.appendChild(btnEliminar);
    contenedor.appendChild(card);
  });
}

function showPrePrimaria() {
  document.body.innerHTML = "";
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  let docentesGuardados = JSON.parse(localStorage.getItem("docentesPre")) || [
    {
      nombre: "Profesora Maria Pérez",
      descripcion: "Encargada de Prekínder"
    },
    {
      nombre: "Profesora Ana López",
      descripcion: "Encargada de Kínder"
    },
    {
      nombre: "Profesora Fernanda Ovalle",
      descripcion: "Encargada de Preparatoria"
    }
  ];

  const contenedor = document.createElement("div");
  contenedor.className = "panel-container99";

  const imgFondo = document.createElement("img");
  imgFondo.src = "./assets/fondo 3.svg";
  imgFondo.alt = "";
  imgFondo.className = "imgfondo";

  const btnVolver = crearBoton("Volver99", "←", showPanel);
  const btnSiguiente = crearBoton("Siguiente99", "→", () => alert("Siguiente..."));

  const titulo = document.createElement("p");
  titulo.className = "Titulopre";
  titulo.textContent = "𝙼𝙰𝙴𝚂𝚃𝚁𝙾𝚂";

  const subtitulo = document.createElement("p");
  subtitulo.className = "Titulopre1";
  subtitulo.textContent = "𝙰𝚂𝙸𝙶𝙽𝙰𝙳𝙾𝚂";

  const formNuevo = document.createElement("div");
  formNuevo.className = "form-nuevo-docente";

  const inputNombre = document.createElement("input");
  inputNombre.id = "nombreDocente";
  inputNombre.placeholder = "Nombre del docente";

  const inputGrado = document.createElement("input");
  inputGrado.id = "gradoDocente";
  inputGrado.placeholder = "Grado o área asignada";

  const btnAgregar = crearBoton("agregarNuevoDocentx", "Agregar Docente", () => {
    const nombre = inputNombre.value.trim();
    const grado = inputGrado.value.trim();

    if (!nombre || !grado) {
      alert("Por favor, completa ambos campos.");
      return;
    }

    const nuevoDocente = {
      nombre,
      descripcion: `Encargada de ${grado}`
    };

    docentesGuardados.push(nuevoDocente);
    localStorage.setItem("docentesPre", JSON.stringify(docentesGuardados));
    renderizarDocentes();
    inputNombre.value = "";
    inputGrado.value = "";
  });

  const listaDocentes = document.createElement("div");
  listaDocentes.id = "listaDocentes";

  function renderizarDocentes() {
    crearTarjetasDocentes(docentesGuardados, listaDocentes, renderizarDocentes);
  }

  formNuevo.appendChild(inputNombre);
  formNuevo.appendChild(inputGrado);
  formNuevo.appendChild(btnAgregar);

  contenedor.appendChild(imgFondo);
  contenedor.appendChild(btnVolver);
  contenedor.appendChild(btnSiguiente);
  contenedor.appendChild(titulo);
  contenedor.appendChild(subtitulo);
  contenedor.appendChild(formNuevo);
  contenedor.appendChild(listaDocentes);
  root.appendChild(contenedor);

  renderizarDocentes();
}

function crearBoton(id, texto, onClick) {
  const boton = document.createElement("button");
  boton.id = id;
  boton.textContent = texto;
  boton.addEventListener("click", onClick);
  return boton;
}

export { showPrePrimaria };

import { BASE_URL } from "../config.js";
import { crearContenedorPrincipal } from "./contenedorPrincipal.js";
import { showopciones } from "./opciones.js";
import { mostrarPanelAcademico } from "./otrosNiveles.js";

async function registrarAlumnos1(nivel) {
  const app = document.getElementById("app") || document.body;
  app.innerHTML = "";

  // Crear el contenedor base y añadirlo al DOM
  const contenedor = crearContenedorPrincipal();
  app.appendChild(contenedor);

  // Crear botones Volver y Siguiente
  const btnVolver = document.createElement("button");
  btnVolver.id = "btnVolver";
  btnVolver.textContent = "← Volver";
  contenedor.appendChild(btnVolver);

  const btnSiguiente = document.createElement("button");
  btnSiguiente.id = "btnSiguiente";
  btnSiguiente.textContent = "Siguiente →";
  contenedor.appendChild(btnSiguiente);

  // Espera mínima para que el HTML esté renderizado
  await new Promise((res) => setTimeout(res, 50));

  // Referencias a botones y contenedores internos
  const btnMarcarTodos = document.getElementById("btnMarcarTodos");
  const btnMarcarTodosAusentes = document.getElementById("btnMarcarTodosAusentes");
  const btnEnviarCorreos = document.getElementById("btnEnviarCorreos");
  const btnMarcarTarde = document.getElementById("btnMarcarTarde");
  const contenedorAlumnos = document.getElementById("contenedorAlumnos");
  const modal = document.getElementById("modalEliminar");
  const btnCancelar = document.getElementById("btnCancelarEliminar");
  const btnConfirmar = document.getElementById("btnConfirmarEliminar");
  const btnAgregar = document.getElementById("btnAgregarAlumno");

  let alumnos = await cargarAlumnosDesdeDB();
  let alumnoIdAEliminar = null;

  function crearElementoAlumno(alumno) {
    const card = document.createElement("div");
    card.className = "alumno-card";
    card.dataset.id = alumno.id;

    const nombre = document.createElement("p");
    nombre.textContent = alumno.nombre;
    card.appendChild(nombre);

    const btnAsistio = document.createElement("button");
    btnAsistio.textContent = "✓";
    btnAsistio.title = "Marcar como asistió";
    btnAsistio.className = "btn-asistio";
    btnAsistio.addEventListener("click", () =>
      marcarAsistencia(alumno.id, "asistio", btnAsistio, btnNoAsistio, btnEliminar)
    );
    card.appendChild(btnAsistio);

    const btnNoAsistio = document.createElement("button");
    btnNoAsistio.textContent = "✗";
    btnNoAsistio.title = "Marcar como no asistió";
    btnNoAsistio.className = "btn-no-asistio";
    btnNoAsistio.addEventListener("click", () =>
      marcarAsistencia(alumno.id, "noasistio", btnNoAsistio, btnAsistio, btnEliminar)
    );
    card.appendChild(btnNoAsistio);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.title = "Eliminar alumno";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.addEventListener("click", () => {
      modal.style.display = "block";
      alumnoIdAEliminar = alumno.id;
    });
    card.appendChild(btnEliminar);

    contenedorAlumnos.appendChild(card);
  }

  alumnos.forEach(crearElementoAlumno);

  // Listeners generales
  if (btnVolver) btnVolver.addEventListener("click", mostrarPanelAcademico); // o puedes redirigir a donde quieras
  if (btnSiguiente) btnSiguiente.addEventListener("click", mostrarPanelAcademico);
  if (btnMarcarTodos) btnMarcarTodos.addEventListener("click", () => marcarTodos("asistio"));
  if (btnMarcarTodosAusentes) btnMarcarTodosAusentes.addEventListener("click", () => marcarTodos("noasistio"));
  if (btnEnviarCorreos) btnEnviarCorreos.addEventListener("click", enviarCorreos);
  if (btnMarcarTarde) btnMarcarTarde.addEventListener("click", marcarLlegadaTarde);
  if (btnCancelar) btnCancelar.addEventListener("click", () => (modal.style.display = "none"));
  if (btnConfirmar) btnConfirmar.addEventListener("click", async () => {
    if (alumnoIdAEliminar !== null) {
      await eliminarAlumnoDB(alumnoIdAEliminar);
      modal.style.display = "none";
      alumnoIdAEliminar = null;
      registrarAlumnos1(nivel);
    }
  });
  if (btnAgregar) btnAgregar.addEventListener("click", agregarAlumno);

  // --- Funciones auxiliares ---

  function marcarAsistencia(id, estado, btnOn, btnOff1, btnOff2) {
    btnOn.style.backgroundColor = estado === "asistio" ? "green" : "red";
    if (btnOff1) btnOff1.style.backgroundColor = "";
    if (btnOff2) btnOff2.style.backgroundColor = "";
    guardarEstadoAsistencia(id, estado);
  }

  function marcarTodos(estado) {
    const botones = contenedorAlumnos.querySelectorAll(
      estado === "asistio" ? ".btn-asistio" : ".btn-no-asistio"
    );
    botones.forEach((btn) => btn.click());
  }

  function enviarCorreos() {
    const correos = alumnos.map((a) => a.correo).filter(Boolean);
    if (!correos.length) return alert("No hay correos disponibles.");
    alert(`Se enviarían correos a:\n\n${correos.join(", ")}`);
  }

  function marcarLlegadaTarde() {
    alert("Haz clic en ✓ del alumno que llegó tarde.");
    contenedorAlumnos.querySelectorAll(".btn-asistio").forEach((btn) => {
      const handler = () => {
        marcarAsistencia(btn.closest(".alumno-card").dataset.id, "tarde", btn, null, null);
        btn.removeEventListener("click", handler);
      };
      btn.addEventListener("click", handler);
    });
  }

  async function agregarAlumno() {
    const nombre = prompt("Nombre del alumno:");
    if (!nombre) return alert("El nombre es obligatorio.");
    const grado = prompt("Grado del alumno:");
    if (!grado) return alert("El grado es obligatorio.");
    const correo = prompt("Correo (opcional):") || "";
    const telefono = prompt("Teléfono (opcional):") || "";
    try {
      const res = await fetch(`${BASE_URL}/alumnos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, grado, correo, telefono }),
      });
      if (!res.ok) throw new Error();
      registrarAlumnos1(nivel);
    } catch {
      alert("Error al agregar alumno.");
    }
  }
}

async function guardarEstadoAsistencia(id, estado) {
  try {
    await fetch(`${BASE_URL}/alumnos/${id}/asistencia`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    localStorage.setItem(
      `asistencia-${id}`,
      JSON.stringify({ estado, expira: Date.now() + 12 * 60 * 60 * 1000 })
    );
  } catch {
    alert("No se pudo actualizar asistencia.");
  }
}

async function cargarAlumnosDesdeDB() {
  try {
    const res = await fetch(`${BASE_URL}/alumnos`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return [];
  }
}

async function eliminarAlumnoDB(id) {
  try {
    await fetch(`${BASE_URL}/alumnos/${id}`, { method: "DELETE" });
  } catch {
    console.error("Error al eliminar alumno");
  }
}

export { registrarAlumnos1 };

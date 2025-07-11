import { zz7 } from "./graficaAsistencia.js";
import { showopciones } from "./opciones.js";
import { mostrarTablaAsistencias } from "./resumenAsistencia.js";
import { BASE_URL } from "../config.js";
import { crearContenedorPrincipal } from "./contenedorPrincipal.js";

async function registrarAlumnos() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const contenedor = crearContenedorPrincipal();
  root.appendChild(contenedor);

  // Espera a que los botones existan en el DOM
  await new Promise(resolve => setTimeout(resolve, 50));

  const btnVolver = document.getElementById("btnVolver");
  const btnSiguiente = document.getElementById("btnSiguiente");
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

  function crearElementoAlumno(alumno, contenedorAlumnos, modal, setIdEliminar) {
    const card = document.createElement("div");
    card.className = "alumno-card";
    card.dataset.id = alumno.id;

    const nombre = document.createElement("p");
    nombre.textContent = alumno.nombre;
    card.appendChild(nombre);

    const btnAsistio = document.createElement("button");
    btnAsistio.className = "btn-asistio";
    btnAsistio.textContent = "✓";
    btnAsistio.title = "Marcar como asistió";
    btnAsistio.addEventListener("click", () => {
      btnAsistio.style.backgroundColor = "green";
      btnNoAsistio.style.backgroundColor = "";
      btnEliminar.style.backgroundColor = "";
      guardarEstadoAsistencia(alumno.id, "asistio");
    });
    card.appendChild(btnAsistio);

    const btnNoAsistio = document.createElement("button");
    btnNoAsistio.className = "btn-no-asistio";
    btnNoAsistio.textContent = "✗";
    btnNoAsistio.title = "Marcar como no asistió";
    btnNoAsistio.addEventListener("click", () => {
      btnNoAsistio.style.backgroundColor = "red";
      btnAsistio.style.backgroundColor = "";
      btnEliminar.style.backgroundColor = "";
      guardarEstadoAsistencia(alumno.id, "noasistio");
    });
    card.appendChild(btnNoAsistio);

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.title = "Eliminar alumno";
    btnEliminar.addEventListener("click", () => {
      modal.style.display = "block";
      setIdEliminar(alumno.id);
    });
    card.appendChild(btnEliminar);

    contenedorAlumnos.appendChild(card);
  }

  alumnos.forEach((alumno) => {
    crearElementoAlumno(alumno, contenedorAlumnos, modal, setIdEliminar);
  });

  if (btnVolver) btnVolver.addEventListener("click", zz7);
  if (btnSiguiente) btnSiguiente.addEventListener("click", showopciones);
  if (btnCancelar) btnCancelar.addEventListener("click", () => {
    modal.style.display = "none";
    alumnoIdAEliminar = null;
  });

  if (btnConfirmar) btnConfirmar.addEventListener("click", async () => {
    if (alumnoIdAEliminar !== null) {
      await eliminarAlumnoDB(alumnoIdAEliminar);
      modal.style.display = "none";
      alumnoIdAEliminar = null;
      registrarAlumnos(); // Refresca
    }
  });

  if (btnAgregar) btnAgregar.addEventListener("click", async () => {
    const nombre = prompt("Nombre del alumno:");
    if (!nombre) return alert("El nombre es obligatorio.");
    const grado = prompt("Grado del alumno:");
    if (!grado) return alert("El grado es obligatorio.");
    const correo = prompt("Correo del alumno (opcional):") || "";
    const telefono = prompt("Teléfono del alumno (opcional):") || "";

    try {
      const res = await fetch(`${BASE_URL}/alumnos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, grado, correo, telefono }),
      });

      if (!res.ok) throw new Error("Error al agregar el alumno");

      registrarAlumnos();
    } catch (error) {
      console.error("❌ Error al agregar alumno:", error);
      alert("No se pudo agregar el alumno.");
    }
  });

  if (btnMarcarTodos) btnMarcarTodos.addEventListener("click", () => {
    const allBtnAsistio = contenedorAlumnos.querySelectorAll(".btn-asistio");
    const allBtnNoAsistio = contenedorAlumnos.querySelectorAll(".btn-no-asistio");
    allBtnAsistio.forEach((btn) => (btn.style.backgroundColor = "green"));
    allBtnNoAsistio.forEach((btn) => (btn.style.backgroundColor = ""));
    alumnos.forEach((a) => guardarEstadoAsistencia(a.id, "asistio"));
  });

  if (btnMarcarTodosAusentes) btnMarcarTodosAusentes.addEventListener("click", () => {
    const allBtnNoAsistio = contenedorAlumnos.querySelectorAll(".btn-no-asistio");
    const allBtnAsistio = contenedorAlumnos.querySelectorAll(".btn-asistio");
    allBtnNoAsistio.forEach((btn) => (btn.style.backgroundColor = "red"));
    allBtnAsistio.forEach((btn) => (btn.style.backgroundColor = ""));
    alumnos.forEach((a) => guardarEstadoAsistencia(a.id, "noasistio"));
  });

  if (btnEnviarCorreos) btnEnviarCorreos.addEventListener("click", () => {
    const correos = alumnos.map((a) => a.correo).filter((c) => c);
    if (correos.length === 0) return alert("No hay correos disponibles para enviar.");
    alert(`Se enviarían correos a:\n\n${correos.join(", ")}`);
  });

  if (btnMarcarTarde) btnMarcarTarde.addEventListener("click", () => {
    alert("Selecciona al alumno que llegó tarde haciendo click en su botón ✓");
    const allBtnAsistio = contenedorAlumnos.querySelectorAll(".btn-asistio");
    allBtnAsistio.forEach((btn) => {
      const handler = () => {
        allBtnAsistio.forEach((b) => {
          const idB = b.closest(".alumno-card").dataset.id;
          if (b !== btn) {
            b.style.backgroundColor = "green";
            guardarEstadoAsistencia(idB, "asistio");
          }
        });
        btn.style.backgroundColor = "orange";
        const idAlumno = btn.closest(".alumno-card").dataset.id;
        guardarEstadoAsistencia(idAlumno, "tarde");
        allBtnAsistio.forEach((b) => b.removeEventListener("click", handler));
        alert("Alumno marcado como llegó tarde.");
      };
      btn.addEventListener("click", handler);
    });
  });

  function setIdEliminar(id) {
    alumnoIdAEliminar = id;
  }
}

async function guardarEstadoAsistencia(idAlumno, estado) {
  try {
    const response = await fetch(`${BASE_URL}/alumnos/${idAlumno}/asistencia`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    if (!response.ok) throw new Error("No se pudo actualizar asistencia");
    const tiempoExpira = Date.now() + 12 * 60 * 60 * 1000;
    const estadoAsistencia = { estado, expira: tiempoExpira };
    localStorage.setItem(`asistencia-${idAlumno}`, JSON.stringify(estadoAsistencia));
    mostrarTablaAsistencias();
  } catch (error) {
    console.error("❌ Error al guardar asistencia:", error);
    alert("Error al guardar asistencia. Intenta de nuevo.");
  }
}

async function cargarAlumnosDesdeDB() {
  try {
    const response = await fetch(`${BASE_URL}/alumnos`);
    if (!response.ok) throw new Error("No se pudo cargar alumnos");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al cargar alumnos:", error);
    return [];
  }
}

async function eliminarAlumnoDB(id) {
  try {
    const res = await fetch(`${BASE_URL}/alumnos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("No se pudo eliminar el alumno");
  } catch (error) {
    console.error("❌ Error al eliminar alumno:", error);
  }
}

export { registrarAlumnos };

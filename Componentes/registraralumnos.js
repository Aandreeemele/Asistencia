import { zz7 } from "./graficaAsistencia.js";
import { showopciones } from "./opciones.js";
import { mostrarTablaAsistencias } from "./resumenAsistencia.js";


async function registrarAlumnos() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const contenedor = crearContenedorPrincipal();
  root.appendChild(contenedor);

  const btnVolver = document.getElementById("btnVolver");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnMarcarTodos = document.getElementById("btnMarcarTodos");
  const btnEnviarCorreos = document.getElementById("btnEnviarCorreos");
  const btnMarcarTarde = document.getElementById("btnMarcarTarde");
  const contenedorAlumnos = document.getElementById("contenedorAlumnos");
  const modal = document.getElementById("modalEliminar");
  const btnCancelar = document.getElementById("btnCancelarEliminar");
  const btnConfirmar = document.getElementById("btnConfirmarEliminar");
  const btnAgregar = document.getElementById("btnAgregarAlumno");

  let alumnos = await cargarAlumnosDesdeDB();
  let alumnoIdAEliminar = null;
  let btnAsistioTarde = null;

  alumnos.forEach((alumno) => {
    crearElementoAlumno(alumno, contenedorAlumnos, modal, setIdEliminar);
  });

  btnVolver?.addEventListener("click", zz7);
  btnSiguiente?.addEventListener("click", showopciones);

  btnCancelar?.addEventListener("click", () => {
    modal.style.display = "none";
    alumnoIdAEliminar = null;
  });

  btnConfirmar?.addEventListener("click", async () => {
    if (alumnoIdAEliminar !== null) {
      await eliminarAlumnoDB(alumnoIdAEliminar);
      modal.style.display = "none";
      alumnoIdAEliminar = null;
      registrarAlumnos(); // recargar vista
    }
  });

  btnAgregar?.addEventListener("click", async () => {
    const nombre = prompt("Nombre del alumno:");
    if (!nombre) return alert("El nombre es obligatorio.");

    const grado = prompt("Grado del alumno:");
    if (!grado) return alert("El grado es obligatorio.");

    const correo = prompt("Correo del alumno (opcional):") || "";
    const telefono = prompt("Teléfono del alumno (opcional):") || "";

    try {
      const res = await fetch("http://localhost:8000/alumnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, grado, correo, telefono }),
      });

      if (!res.ok) throw new Error("Error al agregar el alumno");

      registrarAlumnos(); // recargar lista
    } catch (error) {
      console.error("❌ Error al agregar alumno:", error);
      alert("No se pudo agregar el alumno.");
    }
  });

  // Botón: Marcar todos como asistieron
  btnMarcarTodos?.addEventListener("click", () => {
    const allBtnAsistio = contenedorAlumnos.querySelectorAll(".btn-asistio");
    const allBtnNoAsistio = contenedorAlumnos.querySelectorAll(".btn-no-asistio");
    allBtnAsistio.forEach((btn) => (btn.style.backgroundColor = "green"));
    allBtnNoAsistio.forEach((btn) => (btn.style.backgroundColor = ""));
    alumnos.forEach((a) => guardarEstadoAsistencia(a.id, "asistio"));
  });

  // Botón: Marcar todos como ausentes
  btnMarcarTodosAusentes?.addEventListener("click", () => {
  const allBtnNoAsistio = contenedorAlumnos.querySelectorAll(".btn-no-asistio");
  const allBtnAsistio = contenedorAlumnos.querySelectorAll(".btn-asistio");
  allBtnNoAsistio.forEach((btn) => (btn.style.backgroundColor = "red"));
  allBtnAsistio.forEach((btn) => (btn.style.backgroundColor = ""));
  alumnos.forEach((a) => guardarEstadoAsistencia(a.id, "noasistio"));
  });


  // Botón: Enviar correos a todos (simulado con alert)
  btnEnviarCorreos?.addEventListener("click", () => {
    const correos = alumnos.map((a) => a.correo).filter((c) => c);
    if (correos.length === 0) return alert("No hay correos disponibles para enviar.");
    alert(`Se enviarían correos a:\n\n${correos.join(", ")}`);
    // Aquí integrar tu lógica real para envío de mails si tienes backend SMTP o API
  });

  // Botón: Marcar alumno que llegó tarde (seleccionar)
  btnMarcarTarde?.addEventListener("click", () => {
    alert("Selecciona al alumno que llegó tarde haciendo click en su botón ✓");

    // Añadir listener temporal a los botones "✓" para marcar tarde
    const allBtnAsistio = contenedorAlumnos.querySelectorAll(".btn-asistio");
    allBtnAsistio.forEach((btn) => {
      const handler = () => {
        // Remover cualquier otro marcado tarde
        allBtnAsistio.forEach((b) => {
          if (b !== btn) b.style.backgroundColor = "green";
        });
        btn.style.backgroundColor = "orange"; // Marca que llegó tarde

        // Guardar estado asistencia "tarde"
        const idAlumno = btn.closest(".alumno-card").dataset.id;
        guardarEstadoAsistencia(idAlumno, "tarde");

        // Remover listeners para evitar múltiples marcas
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

function crearContenedorPrincipal() {
  const contenedor = document.createElement("div");
  contenedor.className = "panxxlcontainer";

  const img = document.createElement("img");
  img.src = "./assets/fondo 3.svg";
  img.alt = "";
  img.className = "imgpanel";

  const btnVolver = crearBoton("btnVolver", "←");
  const btnSiguiente = crearBoton("btnSiguiente", "→");
  const btnMarcarTodos = crearBoton("btnMarcarTodos", "Marcar todos asistieron");
  const btnMarcarTodosAusentes = crearBoton("btnMarcarTodosAusentes", "Marcar todos ausentes"); // ✅ CORRECTO
  const btnEnviarCorreos = crearBoton("btnEnviarCorreos", "Enviar correos a todos");
  const btnMarcarTarde = crearBoton("btnMarcarTarde", "Marcar alumno tarde");

  const titulo1 = crearElemento("p", "titPrincipal", "𝙼𝙰𝚁𝙲𝙰𝚁");
  const titulo2 = crearElemento("p", "subtitulo", " 𝙰𝙻𝚄𝙼𝙽𝙾");
  const btnAgregar = crearBoton("btnAgregarAlumno", "Agregar Alumno");

  const contenedorAlumnos = document.createElement("div");
  contenedorAlumnos.id = "contenedorAlumnos";

  const modal = crearModalEliminar();

  contenedor.append(
    img,
    btnVolver,
    btnSiguiente,
    btnMarcarTodos,
    btnMarcarTodosAusentes,
    btnEnviarCorreos,
    btnMarcarTarde,
    titulo1,
    titulo2,
    btnAgregar,
    contenedorAlumnos,
    modal
  );

  return contenedor;
}



function crearModalEliminar() {
  const modal = document.createElement("div");
  modal.id = "modalEliminar";
  modal.className = "modal";
  modal.style.display = "none";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const p = document.createElement("p");
  p.textContent = "¿Estás seguro de eliminar el alumno? Se perderán las informaciones.";

  const btnCancelar = crearBoton("btnCancelarEliminar", "Cancelar");
  const btnConfirmar = crearBoton("btnConfirmarEliminar", "Eliminar");

  modalContent.append(p, btnCancelar, btnConfirmar);
  modal.appendChild(modalContent);

  return modal;
}

function crearElementoAlumno(alumno, contenedor, modal, setIdEliminar) {
  const { nombre, grado, correo, telefono, id } = alumno;

  const div = document.createElement("div");
  div.className = "alumno-card";
  div.dataset.id = id; // necesario para identificar al alumno

  const infoDiv = document.createElement("div");
  infoDiv.className = "alumno-info";

  const spanNombre = document.createElement("span");
  spanNombre.textContent = nombre;

  const acciones = document.createElement("div");
  acciones.className = "acciones-alumno";

  const btnInfo = crearBoton(null, "📲");
  btnInfo.className = "btn-info";

  const btnEliminar = crearBoton(null, "Eliminar");
  btnEliminar.className = "btn-eliminar";

  const btnAsistio = crearBoton(null, "✓");
  btnAsistio.className = "btn-asistio";

  const btnNoAsistio = crearBoton(null, "x");
  btnNoAsistio.className = "btn-no-asistio";

  // Restaurar estado previo desde localStorage
  const estadoGuardado = JSON.parse(localStorage.getItem(`asistencia-${id}`));
  if (estadoGuardado && Date.now() < estadoGuardado.expira) {
    if (estadoGuardado.estado === "asistio") {
      btnAsistio.style.backgroundColor = "green";
      btnNoAsistio.style.backgroundColor = "";
    } else if (estadoGuardado.estado === "noasistio") {
      btnNoAsistio.style.backgroundColor = "red";
      btnAsistio.style.backgroundColor = "";
    } else if (estadoGuardado.estado === "tarde") {
      btnAsistio.style.backgroundColor = "orange";
      btnNoAsistio.style.backgroundColor = "";
    }
  }

  // Eventos para marcar asistencia
  btnAsistio.addEventListener("click", () => {
    btnAsistio.style.backgroundColor = "green";
    btnNoAsistio.style.backgroundColor = "";
    guardarEstadoAsistencia(id, "asistio");
  });

  btnNoAsistio.addEventListener("click", () => {
    btnNoAsistio.style.backgroundColor = "red";
    btnAsistio.style.backgroundColor = "";
    guardarEstadoAsistencia(id, "noasistio");
  });

  // Evento para botón Info
  btnInfo.addEventListener("click", () => {
    alert("Se envió reporte por ausencia.");
  });

  // Botón Eliminar
  btnEliminar.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const contraseñaGuardada = user?.contraseña;

    if (!contraseñaGuardada) {
      alert("⚠️ No hay sesión activa o faltan datos para validar.");
      return;
    }

    const contraseñaIngresada = prompt("🔒 Ingrese su contraseña para confirmar la eliminación del alumno:");

    if (contraseñaIngresada !== contraseñaGuardada) {
      alert("❌ Contraseña incorrecta. No se eliminó el alumno.");
      return;
    }

    setIdEliminar(id);
    modal.style.display = "block";
  });

  acciones.append(btnInfo, btnEliminar, btnAsistio, btnNoAsistio);
  infoDiv.append(spanNombre, acciones);

  const detalle = document.createElement("div");
  detalle.className = "detalle-alumno";
  detalle.innerHTML = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Grado:</strong> ${grado}</p>
    <p><strong>Email:</strong> ${correo}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
  `;

  div.append(infoDiv, detalle);
  contenedor.appendChild(div);
}

function crearBoton(id, texto) {
  const btn = document.createElement("button");
  if (id) btn.id = id;
  btn.textContent = texto;
  return btn;
}

function crearElemento(tag, clase = "", texto = "") {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

async function guardarEstadoAsistencia(idAlumno, estado) {
  try {
    const response = await fetch(`http://localhost:8000/alumnos/${idAlumno}/asistencia`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar asistencia");
    }

    // Guardar también localmente
    const tiempoExpira = Date.now() + 12 * 60 * 60 * 1000; // 12 horas
    const estadoAsistencia = {
      estado: estado,
      expira: tiempoExpira,
    };
    localStorage.setItem(`asistencia-${idAlumno}`, JSON.stringify(estadoAsistencia));

    // 🔁 Mostrar el resumen actualizado
    mostrarTablaAsistencias();

  } catch (error) {
    console.error("❌ Error al guardar asistencia:", error);
    alert("Error al guardar asistencia. Intenta de nuevo.");
  }
}



async function cargarAlumnosDesdeDB() {
  try {
    const response = await fetch("http://localhost:8000/alumnos");
    if (!response.ok) throw new Error("No se pudo cargar alumnos");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al cargar alumnos:", error);
    return [];
  }
}

async function eliminarAlumnoDB(id) {
  try {
    const res = await fetch(`http://localhost:8000/alumnos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("No se pudo eliminar el alumno");
  } catch (error) {
    console.error("❌ Error al eliminar alumno:", error);
  }
}

export { registrarAlumnos };

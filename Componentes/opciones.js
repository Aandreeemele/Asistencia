import { registrarAlumnos } from "./registraralumnos.js";
import { mostrarTablaAsistencias } from "./resumenAsistencia.js";
import { BASE_URL } from "../config.js";

const STORAGE_KEY = "alumnosAsistencias";

let alumnos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {
    nombre: "𝙹𝚘𝚜𝚜𝚞𝚎 𝙵𝚞𝚎𝚗𝚝𝚎𝚜",
    profesor: "Jossue Fuentes",
    asistenciasPorMes: {
      Enero: { conteo_asistio: 20, conteo_tarde: 0, conteo_noasistio: 1 },
      Febrero: { conteo_asistio: 15, conteo_tarde: 1, conteo_noasistio: 0 },
      Marzo: { conteo_asistio: 18, conteo_tarde: 0, conteo_noasistio: 2 },
      Abril: { conteo_asistio: 20, conteo_tarde: 0, conteo_noasistio: 1 },
      Mayo: { conteo_asistio: 15, conteo_tarde: 1, conteo_noasistio: 0 },
      Junio: { conteo_asistio: 18, conteo_tarde: 0, conteo_noasistio: 2 },
    }
  }
];

function guardarCambios() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos));
}

function showopciones() {
  document.body.innerHTML = "";
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  const contenedor = document.createElement("div");
  contenedor.className = "panel-container4";

  const tituloDocente = document.createElement("div");
  tituloDocente.className = "TitulodelDocente";
  tituloDocente.textContent = "𝙹𝚘𝚜𝚜𝚞𝚎 𝙵𝚞𝚎𝚗𝚝𝚎𝚜";

  const contenedorMeses = document.createElement("div");
  contenedorMeses.className = "contenedorMeses";

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  function mostrarCalendario() {
    contenedorMeses.innerHTML = "";
    meses.forEach((mes, index) => {
      const divMes = document.createElement("div");
      divMes.className = "mes";
      divMes.textContent = mes;
      divMes.style.cursor = "pointer";
      divMes.addEventListener("click", () => mostrarDetalleMes(index));
      contenedorMeses.appendChild(divMes);
    });
  }

  function asegurarDatosMes(alumno, mes) {
    if (!alumno.asistenciasPorMes) alumno.asistenciasPorMes = {};
    if (!alumno.asistenciasPorMes[mes]) {
      alumno.asistenciasPorMes[mes] = {
        conteo_asistio: 0,
        conteo_tarde: 0,
        conteo_noasistio: 0
      };
    }
  }

  function mostrarTabla(alumnosFiltrados, mesNombre) {
    contenedorMeses.innerHTML = "";

    const añoActual = new Date().getFullYear();

    const tituloMes = document.createElement("h3");
    tituloMes.textContent = `Asistencias para ${mesNombre} ${añoActual}`;
    tituloMes.style.textAlign = "center";
    tituloMes.style.marginBottom = "1rem";

    const btnRegresar = document.createElement("button");
    btnRegresar.textContent = "← Volver a Meses";
    btnRegresar.style.marginBottom = "1rem";
    btnRegresar.addEventListener("click", mostrarCalendario);

    contenedorMeses.appendChild(btnRegresar);
    contenedorMeses.appendChild(tituloMes);

    const tabla = document.createElement("table");
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    ["#", "Nombre", "Asistió", "Tarde", "Faltó"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.border = "1px solid #ddd";
      th.style.padding = "6px";
      th.style.backgroundColor = "#6200ea";
      th.style.color = "white";
      th.style.textAlign = "center";
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    alumnosFiltrados.forEach((alumno, index) => {
      asegurarDatosMes(alumno, mesNombre);
      const datos = [
        index + 1,
        alumno.nombre,
        alumno.asistenciasPorMes[mesNombre].conteo_asistio,
        alumno.asistenciasPorMes[mesNombre].conteo_tarde,
        alumno.asistenciasPorMes[mesNombre].conteo_noasistio
      ];

      const tr = document.createElement("tr");
      datos.forEach(dato => {
        const td = document.createElement("td");
        td.textContent = dato;
        td.style.border = "1px solid #ddd";
        td.style.padding = "6px";
        td.style.textAlign = "center";
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);
    contenedorMeses.appendChild(tabla);

    const btnActualizar = crearBoton("btnActualizar", "Actualizar", () => {
      alumnosFiltrados.forEach(alumno => {
        asegurarDatosMes(alumno, mesNombre);
        alumno.asistenciasPorMes[mesNombre].conteo_asistio++;
      });
      guardarCambios();
      alert("¡Asistencia actualizada!");
      mostrarTabla(alumnosFiltrados, mesNombre);
    });

    const botonesExtras = document.createElement("div");
    botonesExtras.className = "botonesExtras";
    botonesExtras.appendChild(btnActualizar);

    contenedorMeses.appendChild(botonesExtras);
  }

  function mostrarDetalleMes(mesIndex) {
    const mesNombre = meses[mesIndex];
    const profesorFiltro = "Jossue Fuentes";

    const alumnosFiltrados = alumnos.filter(a =>
      a.profesor.toLowerCase().trim() === profesorFiltro.toLowerCase().trim()
    );

    mostrarTabla(alumnosFiltrados, mesNombre);
  }

  mostrarCalendario();

  const mesActual = new Date().getMonth();
  mostrarDetalleMes(mesActual);

  const btnVolver = crearBoton("Volvxr", "←𝚅𝚘𝚕𝚟𝚎𝚛", registrarAlumnos, "btn-volver");
  const btnSiguiente = crearBoton("Siguientx1", "𝚂𝚒𝚐𝚞𝚒𝚎𝚗𝚝𝚎→", mostrarTablaAsistencias, "btn-siguiente");

  const botonesExtrasGlobal = document.createElement("div");
  botonesExtrasGlobal.className = "botonesExtras";
  botonesExtrasGlobal.appendChild(btnVolver);
  botonesExtrasGlobal.appendChild(btnSiguiente);

  contenedor.appendChild(botonesExtrasGlobal);
  contenedor.appendChild(tituloDocente);
  contenedor.appendChild(contenedorMeses);

  root.appendChild(contenedor);
}

function crearBoton(id, texto, onClick, claseExtra = "") {
  const boton = document.createElement("button");
  boton.id = id;
  boton.textContent = texto;
  if (claseExtra) boton.className = claseExtra;
  boton.addEventListener("click", onClick);
  return boton;
}

export { showopciones };

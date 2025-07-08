import { registrarAlumnos } from "./registraralumnos.js";
import { showUniforme } from "./uniforme.js";
import { showObservaciones } from "./observaciones.js";
import { mostrarTablaAsistencias } from "./resumenAsistencia.js";

function showopciones() {
  document.body.innerHTML = "";
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  const contenedor = document.createElement("div");
  contenedor.className = "panel-container4";

  const btnVolvxr = crearBoton("Volvxr", "←", registrarAlumnos, "btn-volver");
  const btnSiguxxnte = crearBoton("Siguientx1", "→", mostrarTablaAsistencias, "btn-siguiente");


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

  // Estado global para asistencia { "mes-año": { dia: estado } }
  let asistencia = cargarAsistencia();

  meses.forEach((mes, index) => {
    const divMes = document.createElement("div");
    divMes.className = "mes";
    
    const tituloMes = document.createElement("strong");
    tituloMes.textContent = mes;
    divMes.appendChild(tituloMes);

    // Crear calendario del mes actual (asumiendo año actual)
    const añoActual = new Date().getFullYear();
    const diasMes = new Date(añoActual, index + 1, 0).getDate();
    const primerDiaSemana = new Date(añoActual, index, 1).getDay(); // 0-dom ... 6-sab
    const offset = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1; // lunes=0 para offset

    // Grid para días de la semana
    const gridDiasSemana = document.createElement("div");
    gridDiasSemana.className = "dias-semana";
    ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].forEach(d => {
      const dDiv = document.createElement("div");
      dDiv.textContent = d;
      gridDiasSemana.appendChild(dDiv);
    });
    divMes.appendChild(gridDiasSemana);

    // Grid días mes
    const gridDias = document.createElement("div");
    gridDias.className = "dias-calendario";

    // Celdas vacías antes del primer día
    for (let i = 0; i < offset; i++) {
      const vacio = document.createElement("div");
      vacio.className = "dia vacio";
      gridDias.appendChild(vacio);
    }

    // Celdas con días del mes
    for (let dia = 1; dia <= diasMes; dia++) {
      const diaDiv = document.createElement("div");
      diaDiv.className = "dia";

      const numero = document.createElement("span");
      numero.className = "numero-dia";
      numero.textContent = dia;
      diaDiv.appendChild(numero);

      const marcador = document.createElement("div");
      marcador.className = "marcador";

      // Leer estado guardado para el día
      const keyMes = `${mes}-${añoActual}`;
      const estado = (asistencia[keyMes] && asistencia[keyMes][dia]) || "ninguno";
      if (estado !== "ninguno") marcador.classList.add(estado);

      diaDiv.appendChild(marcador);

      // Evento click para alternar estado
      diaDiv.addEventListener("click", () => {
        let currentEstado = (asistencia[keyMes] && asistencia[keyMes][dia]) || "ninguno";
        let nuevoEstado;
        if (currentEstado === "ninguno") nuevoEstado = "asistio";
        else if (currentEstado === "asistio") nuevoEstado = "falto";
        else nuevoEstado = "ninguno";

        if (!asistencia[keyMes]) asistencia[keyMes] = {};
        if (nuevoEstado === "ninguno") delete asistencia[keyMes][dia];
        else asistencia[keyMes][dia] = nuevoEstado;

        guardarAsistencia(asistencia);
        marcador.classList.remove("asistio", "falto");
        if (nuevoEstado !== "ninguno") marcador.classList.add(nuevoEstado);
      });

      gridDias.appendChild(diaDiv);
    }

    divMes.appendChild(gridDias);
    contenedorMeses.appendChild(divMes);
  });

  function crearBoton(id, texto, onClick, claseExtra = "") {
    const boton = document.createElement("button");
    boton.id = id;
    boton.textContent = texto;
    if (claseExtra) boton.className = claseExtra;
    boton.addEventListener("click", onClick);
    return boton;
  }
  
  
  const botonesExtras = document.createElement("div");
  botonesExtras.className = "botonesExtras";

  const btnUniforme = crearBoton("btnUniforme", "Uniforme Incompleto", showUniforme);

  const btnReporte = crearBoton("btnReporte", "Enviar Reporte", () => {
    const destinatario = "aamelendez@scl.edu.gt";
    const asunto = encodeURIComponent("Reporte de Asistencia");
    const cuerpo = encodeURIComponent("Estimado encargado,\n\nAdjunto el reporte de asistencia del estudiante.\n\nSaludos cordiales.");
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${asunto}&body=${cuerpo}`;
    window.open(url, "_blank");
  });

  const btnObservaciones = crearBoton("btnObservaciones", "Observaciones", showObservaciones);

  const btnActualizar = crearBoton("btnActualizar", "Actualizar", () => {
    alert("¡Actualizado correctamente!");
  });

  [btnUniforme, btnReporte, btnObservaciones, btnActualizar].forEach(btn => botonesExtras.appendChild(btn));

  contenedor.appendChild(btnVolvxr);
  contenedor.appendChild(btnSiguxxnte);
  contenedor.appendChild(tituloDocente);
  contenedor.appendChild(contenedorMeses);
  contenedor.appendChild(botonesExtras);
  root.appendChild(contenedor);
}
function guardarAsistencia(data) {
  localStorage.setItem("asistencia", JSON.stringify(data));
}

function cargarAsistencia() {
  const data = localStorage.getItem("asistencia");
  return data ? JSON.parse(data) : {};
}

export { showopciones };

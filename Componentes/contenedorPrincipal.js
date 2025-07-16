function crearContenedorPrincipal() {
  const contenedor = document.createElement("div");
  contenedor.className = "contenedorPrincipal";

  contenedor.innerHTML = `
    <button id="btnVolver">←</button>
    <h2 class="titPrincipal">𝚁𝚎𝚐𝚒𝚜𝚝𝚛𝚘 𝚍𝚎 𝙰𝚜𝚒𝚜𝚝𝚎𝚗𝚌𝚒𝚊</h2>
    <p class="subtitulo">Marca la asistencia de tus alumnos</p>
    <button id="btnSiguiente">→</button>
    <button id="btnAgregarAlumno">Agregar Alumno</button>
    <div id="contenedorAlumnos"></div>
    <button id="btnMarcarTodos">✓</button>
    <button id="btnMarcarTodosAusentes">✗</button>
    <button id="btnEnviarCorreos">@</button>
    <button id="btnMarcarTarde">⏰</button>
    <div id="modalEliminar" class="modal-content">
      <button id="btnCancelarEliminar">Cancelar</button>
      <button id="btnConfirmarEliminar">Eliminar</button>
    </div>
  `;

  return contenedor;
}
export { crearContenedorPrincipal };  
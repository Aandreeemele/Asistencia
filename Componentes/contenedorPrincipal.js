function crearContenedorPrincipal() {
  const contenedor = document.createElement("div");
  contenedor.className = "contenedorPrincipal";

  contenedor.innerHTML = `
    <button id="btnVolver">←𝚅𝚘𝚕𝚟𝚎𝚛</button>
    <h2 class="titPrincipal">𝚁𝚎𝚐𝚒𝚜𝚝𝚛𝚘 𝚍𝚎 𝙰𝚜𝚒𝚜𝚝𝚎𝚗𝚌𝚒𝚊</h2>
    <p class="subtitulo">Marca la asistencia de tus alumnos</p>
    <button id="btnSiguiente">𝚂𝚒𝚐𝚞𝚒𝚎𝚗𝚝𝚎→</button>
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
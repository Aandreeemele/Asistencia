function crearContenedorPrincipal() {
    const contenedor = document.createElement("div");
    contenedor.id = "contenedorPrincipal";
    contenedor.innerHTML = `
      <button id="btnVolver">Volver</button>
      <button id="btnSiguiente">Siguiente</button>
      <button id="btnMarcarTodos">✓ Todos</button>
      <button id="btnMarcarTodosAusentes">✗ Todos</button>
      <button id="btnEnviarCorreos">Enviar Correos</button>
      <button id="btnMarcarTarde">Marcar Tarde</button>
      <button id="btnAgregarAlumno">+ Alumno</button>
      <div id="contenedorAlumnos"></div>
      <div id="modalEliminar" style="display:none;">
        <p>¿Seguro que quieres eliminar?</p>
        <button id="btnCancelarEliminar">Cancelar</button>
        <button id="btnConfirmarEliminar">Confirmar</button>
      </div>
    `;
    return contenedor;
  }
export { crearContenedorPrincipal };  
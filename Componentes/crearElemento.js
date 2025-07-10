function crearElementoAlumno(alumno, contenedor, modal, setIdEliminar) {
    const card = document.createElement("div");
    card.className = "alumno-card";
    card.dataset.id = alumno.id;
  
    card.innerHTML = `
      <h4>${alumno.nombre}</h4>
      <p>Grado: ${alumno.grado}</p>
      <button class="btn-asistio">✓</button>
      <button class="btn-no-asistio">✗</button>
      <button class="btn-eliminar">Eliminar</button>
    `;
  
    // Botón eliminar
    const btnEliminar = card.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
      modal.style.display = "block";
      setIdEliminar(alumno.id);
    });
  
    contenedor.appendChild(card);
  }
  
  export { crearElementoAlumno };
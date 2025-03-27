async function alumnos() {
    const container = document.querySelector(".div-1");
    container.innerHTML = ""; 
    const listContainer = document.createElement("div");
    listContainer.className = "list-container";
    container.appendChild(listContainer);

    try {
        const response = await fetch("http://localhost:3000/alumnos");
        if (!response.ok) throw new Error("Error al obtener alumnos");
        const alumnos = await response.json();

        alumnos.forEach(alumno => {
            const alumnoDiv = document.createElement("div");
            alumnoDiv.className = "alumno";
            alumnoDiv.innerHTML = `
                <p class="p1"><strong>clave:</strong> ${alumno.id}</p>
                <p><strong>Nombre:<strong> ${alumno.nombre}</p>
                <p><strong>Asistencias:</strong> ${alumno.asistencia}</p>
                <p><strong>Grado:</strong> ${alumno.grado}</p>
            `;
            listContainer.appendChild(alumnoDiv);
        });

    } catch (error) {
        console.error("Error:", error);
        listContainer.innerHTML = `<p class="error">No se pudieron cargar los alumnos.</p>`;
    }
}


export { alumnos }
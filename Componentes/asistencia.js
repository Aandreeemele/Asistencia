async function asistencia() {
    const container = document.querySelector(".div-1");
    container.innerHTML = ""; 

    const listContainer = document.createElement("div");
    listContainer.className = "list-container";
    container.appendChild(listContainer);

    try {
        const response = await fetch("http://localhost:5000/asistencia");
        if (!response.ok) throw new Error("Error al obtener asistencias");
        const asistencias = await response.json();

        asistencias.forEach(asist => {
            const asistenciaDiv = document.createElement("div");
            asistenciaDiv.className = "asistencia";
            asistenciaDiv.innerHTML = `
                <p><strong>Fecha:</strong> ${asist.fecha}</p>
                <p><strong>Estado:</strong> ${asist.estado}</p>
            `;
            listContainer.appendChild(asistenciaDiv);
        });

    } catch (error) {
        console.error("Error:", error);
        listContainer.innerHTML = `<p class="error">No se pudieron cargar las asistencias.</p>`;
    }
}

export { asistencia };

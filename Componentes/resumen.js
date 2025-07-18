function mostrarReportesEnviados() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const contenedor = document.createElement("div");
    contenedor.className = "reporte-contenedor";
  
    const titulo = document.createElement("h2");
    titulo.textContent = "Reportes Enviados";
    titulo.className = "reporte-titulo";
  
    const tabla = document.createElement("table");
    tabla.className = "reporte-tabla";
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>#</th>
        <th>Fecha</th>
        <th>Motivo</th>
        <th>Estado</th>
      </tr>
    `;
  
    const tbody = document.createElement("tbody");
  
    // Datos simulados, puedes remplazarlos luego con datos reales
    const reportes = [
      { fecha: "16/07/2025", motivo: "Falta de materiales", estado: "Enviado" },
      { fecha: "17/07/2025", motivo: "Docente ausente", estado: "Pendiente" },
    ];
  
    reportes.forEach((reporte, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${reporte.fecha}</td>
        <td>${reporte.motivo}</td>
        <td>${reporte.estado}</td>
      `;
      tbody.appendChild(fila);
    });
  
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    contenedor.appendChild(titulo);
    contenedor.appendChild(tabla);
    root.appendChild(contenedor);
  }
  
  export { mostrarReportesEnviados };
  
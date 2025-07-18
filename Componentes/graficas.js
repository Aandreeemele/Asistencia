import { BASE_URL } from "../config.js";

async function mostrarGraficas() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const contenedor = document.createElement("div");
  contenedor.className = "proyecciones-contenedor";
  contenedor.id = "graficas-a-exportar"; // importante para capturar

  const titulo = document.createElement("h2");
  titulo.className = "proyecciones-titulo";
  titulo.textContent = "📊 Gráficas de Asistencia";
  contenedor.appendChild(titulo);

  // Botón regresar
  const btnRegresar = document.createElement("button");
  btnRegresar.textContent = "← Regresar";
  btnRegresar.className = "btn-regresar";
  btnRegresar.onclick = () => regresar();
  contenedor.appendChild(btnRegresar);

  const btnPDF = document.createElement("button");
  btnPDF.textContent = "📄 Descargar PDF";
  btnPDF.className = "boton-pdf";
  btnPDF.onclick = () => descargarPDF();
  contenedor.appendChild(btnPDF);

  try {
    const res = await fetch(`${BASE_URL}/alumnos`);
    if (!res.ok) throw new Error("No se pudo obtener datos de alumnos");
    const alumnos = await res.json();

    let totalA = 0, totalT = 0, totalF = 0;
    alumnos.forEach(a => {
      totalA += a.conteo_asistio || 0;
      totalT += a.conteo_tarde || 0;
      totalF += a.conteo_noasistio || 0;
    });

    const canvasTotal = document.createElement("canvas");
    canvasTotal.className = "grafica-total";
    contenedor.appendChild(canvasTotal);

    new Chart(canvasTotal, {
      type: "bar",
      data: {
        labels: ["Asistencias", "Tardes", "Faltas"],
        datasets: [{
          label: "Totales",
          data: [totalA, totalT, totalF],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Resumen Total" }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    alumnos.forEach((a, i) => {
      const contenedorAlumno = document.createElement("div");
      contenedorAlumno.className = "card-alumno";

      const titulo = document.createElement("h4");
      titulo.textContent = a.nombre;
      contenedorAlumno.appendChild(titulo);

      const canvas = document.createElement("canvas");
      canvas.id = `grafico-${i}`;
      contenedorAlumno.appendChild(canvas);
      contenedor.appendChild(contenedorAlumno);

      new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: ["Asistió", "Tarde", "No Asistió"],
          datasets: [{
            data: [
              a.conteo_asistio || 0,
              a.conteo_tarde || 0,
              a.conteo_noasistio || 0,
            ],
            backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            title: { display: false }
          }
        }
      });
    });

    root.appendChild(contenedor);
  } catch (error) {
    console.error("❌ Error al mostrar proyecciones:", error);
    root.textContent = "Error al mostrar gráficas.";
  }
}

async function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  const contenedor = document.getElementById("graficas-a-exportar");

  const canvas = await html2canvas(contenedor, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const imgProps = doc.getImageProperties(imgData);

  const imgWidth = pageWidth - 40; // márgenes
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  let position = 20;
  if (imgHeight < pageHeight) {
    doc.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight);
  } else {
    let y = 0;
    while (y < canvas.height) {
      const section = document.createElement("canvas");
      section.width = canvas.width;
      section.height = canvas.height / 2;
      const ctx = section.getContext("2d");
      ctx.drawImage(canvas, 0, y, canvas.width, canvas.height / 2, 0, 0, canvas.width, canvas.height / 2);
      const partImg = section.toDataURL("image/png");
      doc.addImage(partImg, "PNG", 20, 20, imgWidth, imgHeight / 2);
      y += canvas.height / 2;
      if (y < canvas.height) doc.addPage();
    }
  }

  doc.save("reporte_asistencia.pdf");
}

function regresar() {

  location.reload();
}

export { mostrarGraficas };

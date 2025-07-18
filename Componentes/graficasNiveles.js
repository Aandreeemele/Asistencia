// Función para descargar PDF (la misma para ambas funciones)
async function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const contenedor = document.getElementById("graficas-a-exportar");
  
    const canvas = await html2canvas(contenedor, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
  
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgProps = doc.getImageProperties(imgData);
    const imgWidth = pageWidth - 40;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
    doc.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    doc.save("graficas_niveles.pdf");
  }
  
  async function mostrarGraficasBachilleratos() {
    const app = document.getElementById("app") || document.body;
    app.innerHTML = "";
  
    const contenedor = document.createElement("div");
    contenedor.className = "graficas-niveles-contenedor";
    contenedor.id = "graficas-a-exportar";
  
    const titulo = document.createElement("h2");
    titulo.className = "titulo-principal";
    titulo.textContent = "📊 Gráficas por Grado de Bachillerato";
    contenedor.appendChild(titulo);
  
    const btnRegresar = document.createElement("button");
    btnRegresar.textContent = "← Regresar";
    btnRegresar.className = "btn-regresar";
    btnRegresar.onclick = () => location.reload();
    contenedor.appendChild(btnRegresar);
  
    const btnPDF = document.createElement("button");
    btnPDF.textContent = "📄 Descargar PDF";
    btnPDF.className = "boton-pdf";
    btnPDF.onclick = () => descargarPDF();
    contenedor.appendChild(btnPDF);
  
    const alumnos = [
      { nombre: "Andrea Pérez", grado: "IV Biologicas", conteo_asistio: 20, conteo_tarde: 1, conteo_noasistio: 2 },
      { nombre: "Carlos Gómez", grado: "IV Diseño", conteo_asistio: 18, conteo_tarde: 2, conteo_noasistio: 3 },
      { nombre: "Lucía Hernández", grado: "IV Computación", conteo_asistio: 19, conteo_tarde: 1, conteo_noasistio: 2 },
      { nombre: "Jorge Ríos", grado: "IV Perito", conteo_asistio: 21, conteo_tarde: 0, conteo_noasistio: 1 },
      { nombre: "María Duarte", grado: "V Biologicas", conteo_asistio: 20, conteo_tarde: 2, conteo_noasistio: 1 },
      { nombre: "Diego López", grado: "V Diseño", conteo_asistio: 19, conteo_tarde: 3, conteo_noasistio: 2 },
      { nombre: "Josuee Fuentes", grado: "V Computación", conteo_asistio: 18, conteo_tarde: 2, conteo_noasistio: 2 },
      { nombre: "Pablo Castillo", grado: "V Perito", conteo_asistio: 17, conteo_tarde: 4, conteo_noasistio: 3 }
    ];
  
    const grados = {
      "IV Biologicas": [],
      "IV Diseño": [],
      "IV Computación": [],
      "IV Perito": [],
      "V Biologicas": [],
      "V Diseño": [],
      "V Computación": [],
      "V Perito": []
    };
  
    alumnos.forEach(a => {
      if (grados[a.grado]) {
        grados[a.grado].push(a);
      }
    });
  
    for (const [grado, grupo] of Object.entries(grados)) {
      if (grupo.length === 0) continue;
  
      const contenedorGrado = document.createElement("div");
      contenedorGrado.className = "contenedor-nivel";
  
      const tituloGrado = document.createElement("h3");
      tituloGrado.textContent = `📘 ${grado}`;
      contenedorGrado.appendChild(tituloGrado);
  
      grupo.forEach((alumno, i) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "card-alumno";
  
        const nombre = document.createElement("h4");
        nombre.textContent = alumno.nombre;
        tarjeta.appendChild(nombre);
  
        const canvas = document.createElement("canvas");
        canvas.id = `grafico-${grado.replace(/\s+/g, '-')}-${i}`;
        tarjeta.appendChild(canvas);
        contenedorGrado.appendChild(tarjeta);
  
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: ["Asistió", "Tarde", "No Asistió"],
            datasets: [{
              data: [
                alumno.conteo_asistio || 0,
                alumno.conteo_tarde || 0,
                alumno.conteo_noasistio || 0
              ],
              backgroundColor: ["#4caf50", "#ff9800", "#f44336"]
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
  
      contenedor.appendChild(contenedorGrado);
    }
  
    app.appendChild(contenedor);
  }
  
  async function mostrarGraficasPorNivel() {
    const app = document.getElementById("app") || document.body;
    app.innerHTML = "";
  
    const contenedor = document.createElement("div");
    contenedor.className = "graficas-niveles-contenedor";
    contenedor.id = "graficas-a-exportar";
  
    const titulo = document.createElement("h2");
    titulo.className = "titulo-principal";
    titulo.textContent = "📊 Gráficas por Nivel Académico";
    contenedor.appendChild(titulo);
  
    const btnRegresar = document.createElement("button");
    btnRegresar.textContent = "← Regresar";
    btnRegresar.className = "btn-regresar";
    btnRegresar.onclick = () => location.reload();
    contenedor.appendChild(btnRegresar);
  
    const btnPDF = document.createElement("button");
    btnPDF.textContent = "📄 Descargar PDF";
    btnPDF.className = "boton-pdf";
    btnPDF.onclick = () => descargarPDF();
    contenedor.appendChild(btnPDF);
  
    const alumnos = [
      { nombre: "Sofía López", nivel: "Preprimaria", conteo_asistio: 20, conteo_tarde: 2, conteo_noasistio: 1 },
      { nombre: "Mateo Díaz", nivel: "Preprimaria", conteo_asistio: 18, conteo_tarde: 3, conteo_noasistio: 2 },
      { nombre: "Valentina Ruiz", nivel: "Primaria", conteo_asistio: 21, conteo_tarde: 1, conteo_noasistio: 0 },
      { nombre: "Emiliano Gómez", nivel: "Primaria", conteo_asistio: 19, conteo_tarde: 2, conteo_noasistio: 2 },
      { nombre: "Camila Torres", nivel: "Básicos", conteo_asistio: 17, conteo_tarde: 4, conteo_noasistio: 2 },
      { nombre: "Santiago Herrera", nivel: "Básicos", conteo_asistio: 20, conteo_tarde: 0, conteo_noasistio: 3 },
      { nombre: "Isabella Mendoza", nivel: "Bachilleratos", conteo_asistio: 22, conteo_tarde: 1, conteo_noasistio: 0 },
      { nombre: "Lucas Ramírez", nivel: "Bachilleratos", conteo_asistio: 18, conteo_tarde: 3, conteo_noasistio: 2 }
    ];
  
    const niveles = {
      "Preprimaria": [],
      "Primaria": [],
      "Básicos": [],
      "Bachilleratos": []
    };
  
    alumnos.forEach(a => {
      if (niveles[a.nivel]) {
        niveles[a.nivel].push(a);
      }
    });
  
    for (const [nivel, grupo] of Object.entries(niveles)) {
      if (grupo.length === 0) continue;
  
      const contenedorNivel = document.createElement("div");
      contenedorNivel.className = "contenedor-nivel";
  
      const tituloNivel = document.createElement("h3");
      tituloNivel.textContent = `📘 ${nivel}`;
      contenedorNivel.appendChild(tituloNivel);
  
      grupo.forEach((alumno, i) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "card-alumno";
  
        const nombre = document.createElement("h4");
        nombre.textContent = alumno.nombre;
        tarjeta.appendChild(nombre);
  
        const canvas = document.createElement("canvas");
        canvas.id = `grafico-${nivel}-${i}`;
        tarjeta.appendChild(canvas);
        contenedorNivel.appendChild(tarjeta);
  
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: ["Asistió", "Tarde", "No Asistió"],
            datasets: [{
              data: [
                alumno.conteo_asistio || 0,
                alumno.conteo_tarde || 0,
                alumno.conteo_noasistio || 0
              ],
              backgroundColor: ["#4caf50", "#ff9800", "#f44336"]
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
  
      contenedor.appendChild(contenedorNivel);
    }
  
    app.appendChild(contenedor);
  }
  
  export { mostrarGraficasPorNivel, mostrarGraficasBachilleratos };
  
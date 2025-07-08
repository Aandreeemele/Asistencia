function showVentanaCuatro() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  let mesActual = new Date().getMonth();
  const year = new Date().getFullYear();

  const asistenciaGuardada = JSON.parse(localStorage.getItem("asistenciaMes")) || {};

  function renderizarMes() {
    root.innerHTML = "";

    const contenedor = document.createElement("div");
    contenedor.style.maxWidth = "400px";
    contenedor.style.margin = "auto";
    contenedor.style.padding = "20px";
    contenedor.style.border = "1px solid #ccc";
    contenedor.style.borderRadius = "12px";
    contenedor.style.fontFamily = "sans-serif";

    const tituloMes = document.createElement("div");
    tituloMes.className = "tituloMes";
    tituloMes.textContent = `${meses[mesActual]} ${year}`;

    const controles = document.createElement("div");
    controles.className = "controlesMes";

    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "←";
    btnAnterior.onclick = () => {
      mesActual = (mesActual - 1 + 12) % 12;
      renderizarMes();
    };

    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "→";
    btnSiguiente.onclick = () => {
      mesActual = (mesActual + 1) % 12;
      renderizarMes();
    };

    controles.appendChild(btnAnterior);
    controles.appendChild(btnSiguiente);

    const grid = document.createElement("div");
    grid.className = "calendario-grid";

    const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];
    diasSemana.forEach(dia => {
      const celda = document.createElement("div");
      celda.textContent = dia;
      celda.style.fontWeight = "bold";
      grid.appendChild(celda);
    });

    const primerDia = new Date(year, mesActual, 1).getDay();
    const diasEnMes = new Date(year, mesActual + 1, 0).getDate();

    const claveMes = `${year}-${mesActual}`;
    if (!asistenciaGuardada[claveMes]) {
      asistenciaGuardada[claveMes] = {};
    }

    for (let i = 0; i < (primerDia === 0 ? 6 : primerDia - 1); i++) {
      const vacio = document.createElement("div");
      vacio.className = "dia vacio";
      grid.appendChild(vacio);
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const celda = document.createElement("div");
      celda.className = "dia";
      celda.textContent = dia;

      const estado = asistenciaGuardada[claveMes][dia];
      if (estado === "asistio") celda.classList.add("asistio");
      if (estado === "falto") celda.classList.add("falto");

      celda.onclick = () => {
        if (!asistenciaGuardada[claveMes][dia]) {
          asistenciaGuardada[claveMes][dia] = "asistio";
          celda.classList.add("asistio");
        } else if (asistenciaGuardada[claveMes][dia] === "asistio") {
          asistenciaGuardada[claveMes][dia] = "falto";
          celda.classList.remove("asistio");
          celda.classList.add("falto");
        } else {
          delete asistenciaGuardada[claveMes][dia];
          celda.classList.remove("falto");
        }

        localStorage.setItem("asistenciaMes", JSON.stringify(asistenciaGuardada));
      };

      grid.appendChild(celda);
    }

    contenedor.appendChild(tituloMes);
    contenedor.appendChild(controles);
    contenedor.appendChild(grid);
    root.appendChild(contenedor);
  }

  renderizarMes();
}

export { showVentanaCuatro };

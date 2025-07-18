import { registrarAlumnos1 } from "./registrarAlmunos1.js";
import { maestroGuia } from "./maestroGuia.js";
import { mostrarGraficasPorNivel } from "./graficasNiveles.js";
import { mostrarGraficasBachilleratos } from "./graficasNiveles.js";

function mostrarPanelAcademico() {
  const app = document.getElementById("app") || document.body;
  app.innerHTML = "";

  const contenedor = document.createElement("div");
  contenedor.id = "panelAcademico";

  const titulo = document.createElement("h2");
  titulo.textContent = "Niveles Académicos Bachillerato";
  contenedor.appendChild(titulo);

  const btnBachillerato = document.createElement("button");
  btnBachillerato.textContent = "Bachilleratos";
  contenedor.appendChild(btnBachillerato);

  const contenedorBachilleratos = document.createElement("div");
  contenedorBachilleratos.style.marginTop = "10px";
  contenedorBachilleratos.style.display = "none";
  contenedor.appendChild(contenedorBachilleratos);

  const bachilleratos = [
    "IV Biologicas",
    "IV Diseño",
    "IV Computación",
    "IV Perito",
    "V Biologicas",
    "V Diseño",
    "V Computación",
    "V Perito",
  ];

  bachilleratos.forEach((nivel) => {
    const btn = document.createElement("button");
    btn.textContent = nivel;
    btn.style.margin = "4px";
    btn.addEventListener("click", () => {
      registrarAlumnos1(nivel);
    });
    contenedorBachilleratos.appendChild(btn);
  });

  btnBachillerato.addEventListener("click", () => {
    contenedorBachilleratos.style.display =
      contenedorBachilleratos.style.display === "none" ? "block" : "none";
  });

const btnGraficaNivel = document.createElement("button");
btnGraficaNivel.className = "btn-Nivel";
btnGraficaNivel.textContent = "📊 Gráfica por Nivel"; // <--- FALTABA ESTO
btnGraficaNivel.addEventListener("click", mostrarGraficasPorNivel);
contenedor.appendChild(btnGraficaNivel);

const btnGraficaGrado = document.createElement("button");
btnGraficaGrado.className = "btn-Grados";
btnGraficaGrado.textContent = "📈 Gráfica por Grado"; // <-- Agregado
btnGraficaGrado.addEventListener("click", mostrarGraficasBachilleratos);


    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver";
    btnVolver.style.marginTop = "20px";
    btnVolver.style.display = "block";
    btnVolver.addEventListener("click", maestroGuia);
    contenedor.appendChild(btnVolver);

  contenedor.appendChild(btnGraficaGrado);

  app.appendChild(contenedor);
}

export { mostrarPanelAcademico };

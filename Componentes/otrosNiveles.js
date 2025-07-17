import { BASE_URL } from "../config.js";
import { registrarAlumnos } from "./registraralumnos.js";
import { showLogin } from "../login.js";

async function mostrarPanelAcademico() {
  try {
    const response = await fetch(`${BASE_URL}/niveles`);
    if (!response.ok) throw new Error("Error al obtener niveles académicos");
    const nivelesAcademicos = await response.json();

    document.body.innerHTML = "";
    const contenedorRaiz = document.createElement("div");
    contenedorRaiz.id = "contenedorRaiz";
    document.body.appendChild(contenedorRaiz);

    const imagen = document.createElement("img");
    imagen.src = "./assets/fondo 3.svg";
    imagen.className = "imgx1";

    const seccionPanel = document.createElement("div");
    seccionPanel.className = "contenedor-panel";

    const encabezadoPrincipal = document.createElement("p");
    encabezadoPrincipal.className = "titulo-principal";
    encabezadoPrincipal.textContent = "𝙽𝚒𝚟𝚎𝚕𝚎𝚜";

    seccionPanel.appendChild(encabezadoPrincipal);
    contenedorRaiz.appendChild(imagen)

    // Botones por cada nivel
    nivelesAcademicos.forEach(({ nivel }) => {
      const botonNivel = document.createElement("button");
      botonNivel.textContent = nivel;
      botonNivel.className = "btn-nivel";

      botonNivel.addEventListener("click", () => {
        mostrarBotonMaestrosPorNivel(nivel, contenedorRaiz);
      });

      seccionPanel.appendChild(botonNivel);
    });

    // Botón cerrar sesión
    const botonCerrarSesion = document.createElement("button");
    botonCerrarSesion.textContent = "Cerrar sesión";
    botonCerrarSesion.className = "btn-Cerrarr";
    botonCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("user");
      showLogin();
    });
    seccionPanel.appendChild(botonCerrarSesion);

    contenedorRaiz.appendChild(seccionPanel);
  } catch (error) {
    console.error("Error en mostrarPanelAcademico:", error);
  }
}

// Mostrar botón "Mostrar maestros" para un nivel dado
function mostrarBotonMaestrosPorNivel(nivel, contenedorRaiz) {
  contenedorRaiz.innerHTML = "";

  const divContenedor = document.createElement("div");
  divContenedor.className = "contenedor-maestros";

  const titulo = document.createElement("h2");
  titulo.textContent = `Nivel: ${nivel}`;
  divContenedor.appendChild(titulo);

  const btnMostrarMaestros = document.createElement("button");
  btnMostrarMaestros.textContent = "Mostrar maestros";
  btnMostrarMaestros.className = "btn-mostrar-maestros";

  btnMostrarMaestros.addEventListener("click", async () => {
    const maestros = await cargarMaestrosPorNivel(nivel);
    mostrarListaMaestros(maestros, divContenedor);
  });

  divContenedor.appendChild(btnMostrarMaestros);

  // Botón para regresar al panel niveles
  const btnVolver = document.createElement("button");
  btnVolver.textContent = "Volver a niveles";
  btnVolver.className = "btn-volver-niveles";
  btnVolver.addEventListener("click", mostrarPanelAcademico);
  divContenedor.appendChild(btnVolver);

  contenedorRaiz.appendChild(divContenedor);
}

// Cargar maestros desde API según nivel
async function cargarMaestrosPorNivel(nivel) {
  try {
    const res = await fetch(`${BASE_URL}/maestros?nivel=${encodeURIComponent(nivel)}`);
    if (!res.ok) throw new Error("Error al cargar maestros");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Mostrar lista de maestros con botón para mostrar alumnos
function mostrarListaMaestros(maestros, contenedor) {
  // Limpiar la lista anterior si existe
  const listaExistente = contenedor.querySelector(".lista-maestros");
  if (listaExistente) listaExistente.remove();

  const lista = document.createElement("div");
  lista.className = "lista-maestros";

  maestros.forEach((maestro) => {
    const divMaestro = document.createElement("div");
    divMaestro.className = "maestro-card";
    divMaestro.textContent = maestro.nombre;

    const btnVerAlumnos = document.createElement("button");
    btnVerAlumnos.textContent = "Ver alumnos";
    btnVerAlumnos.className = "btn-ver-alumnos";

    btnVerAlumnos.addEventListener("click", () => {
      mostrarAlumnosDeMaestro(maestro.id);
    });

    divMaestro.appendChild(btnVerAlumnos);
    lista.appendChild(divMaestro);
  });

  contenedor.appendChild(lista);
}

// Mostrar alumnos para tomar asistencia
async function mostrarAlumnosDeMaestro(idMaestro) {
  const root = document.getElementById("contenedorRaiz");
  root.innerHTML = "";

  // Pasamos el idMaestro para que registrarAlumnos filtre alumnos por maestro
  await registrarAlumnos(idMaestro);
}

export { mostrarPanelAcademico };

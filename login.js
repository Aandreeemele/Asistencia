import { showRecuperarContra } from "./Componentes/recuperarContra.js";
import { showPanel } from "./Componentes/loginPrimero.js"; 
import { maestroGuia } from "./Componentes/maestroGuia.js";
import { crearFormularioRegistroX } from "./Componentes/registro.js";
import { BASE_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);
    const correo = user?.correo;

    if (correo) {
      mostrarPanel(); 
      return;
    } else {
      localStorage.removeItem("user");
    }
  }

  showLogin();
  manejarBotonesNavegacion(); 
});

function showLogin() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const loginDiv = document.createElement("div");
  loginDiv.className = "login";

  const imgFondo = document.createElement("img");
  imgFondo.src = "./assets/fondo 3.svg";
  imgFondo.alt = "";
  imgFondo.className = "img00";
  loginDiv.appendChild(imgFondo);

  const divDise = document.createElement("div");
  divDise.className = "dise";
  divDise.textContent = "✓";
  loginDiv.appendChild(divDise);

  const pAsistencia = document.createElement("p");
  pAsistencia.className = "z10";
  pAsistencia.textContent = "𝙰𝚂𝙸𝚂𝚃𝙴𝙽𝙲𝙸𝙰";
  loginDiv.appendChild(pAsistencia);

  const pDocenteAlumno = document.createElement("p");
  pDocenteAlumno.className = "z11";
  pDocenteAlumno.textContent = "𝙳𝙾𝙲𝙴𝙽𝚃𝙴-𝙰𝙻𝚄𝙼𝙽𝙾";
  loginDiv.appendChild(pDocenteAlumno);

  const btnContraOlvido = document.createElement("button");
  btnContraOlvido.className = "contra-olvido";
  btnContraOlvido.textContent = "¿Olvidó su contraseña?";
  loginDiv.appendChild(btnContraOlvido);

  const imgGroup = document.createElement("img");
  imgGroup.src = "./assets/Group.svg";
  imgGroup.alt = "";
  imgGroup.className = "img02";
  loginDiv.appendChild(imgGroup);

  const form = document.createElement("form");
  form.id = "loginForm";

  const inputCorreo = document.createElement("input");
  inputCorreo.type = "email";
  inputCorreo.id = "correo";
  inputCorreo.placeholder = "Correo electrónico o usuario";
  inputCorreo.required = true;

  const inputContrasena = document.createElement("input");
  inputContrasena.type = "password";
  inputContrasena.id = "contrasena";
  inputContrasena.placeholder = "Contraseña";
  inputContrasena.required = true;

  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.textContent = "Iniciar sesión";

  form.append(inputCorreo, inputContrasena, btnSubmit);
  loginDiv.appendChild(form);

  const btnRegistrarse = document.createElement("button");
  btnRegistrarse.className = "regris";
  btnRegistrarse.textContent = "Registrarse";
  loginDiv.appendChild(btnRegistrarse);

  root.appendChild(loginDiv);

  // Eventos
  btnContraOlvido.addEventListener("click", () => {
    showRecuperarContra();
  });

  btnRegistrarse.addEventListener("click", () => {
    document.body.innerHTML = "";
    crearFormularioRegistroX();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = inputCorreo.value.trim();
    const contrasena = inputContrasena.value;

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena })
      });

      if (!res.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const usuario = await res.json();
      alert("Inicio de sesión exitoso");
      usuario.contraseña = contrasena;
      localStorage.setItem("user", JSON.stringify(usuario));

      mostrarPanel();

    } catch (error) {
      alert("Credenciales incorrectas o usuario no existe");
    }
  });
}

// Lógica para mostrar el panel según el rol
function mostrarPanel() {
  const user = JSON.parse(localStorage.getItem("user"));
  const rol = user?.rol;
  console.log("Rol del usuario:", rol);

  switch (rol) {
    case "coordinador":
      console.log("🟢 Mostrando panel para Coordinador");
      showPanel();
      break;

    case "maestro":
      console.log("🟡 Mostrando panel para Maestro");
      maestroGuia();
      break;

    case "admin":
      console.log("🔵 Mostrando panel para Admin");
      showPanel(); // Puedes reemplazar luego con panel de admin si tienes uno
      break;

    default:
      console.log("⚪ Usuario sin rol específico");
      showPanel();
      break;
  }
}

// Asignación de botones si están presentes en el DOM
function manejarBotonesNavegacion() {
  const btnVolver = document.getElementById("btnVolver");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAgregarAlumno = document.getElementById("btnAgregarAlumno");

  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      console.log("🔙 Botón VOLVER presionado");
      showLogin();
    });
  }

  if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
      console.log("➡️ Botón SIGUIENTE presionado");
      // Acción futura
    });
  }

  if (btnAgregarAlumno) {
    btnAgregarAlumno.addEventListener("click", () => {
      console.log("➕ Botón AGREGAR ALUMNO presionado");
      // Acción futura
    });
  }
}

export { showLogin };

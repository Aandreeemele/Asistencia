import { showVentanaTres } from "./loginTres.js";
import { showVentanaTresPartes } from "./loginTres1.js";
import { showVentanaCuatro } from "./loginCuatro.js";
import { showRecuperarContra } from "./recuperarContra.js";
import { showPanel } from "./loginPrimero.js"; 
import { showVentanaSecundaria } from "./loginSecundario.js";
import { maestroGuia } from "./maestroGuia.js";
// Usuarios válidos
const usuariosValidos = {
  "fuentes@cole.general.gt": "rm12345",
  "florcordi@cole.general.gt": "flor12345", // ← Este inicia con loginPrimero.js
  "administrador@general.gt": "adm12345"
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("user")) {
    mostrarPanel(); // ⬅ Usa nombre distinto a showPanel
  } else {
    showLogin();
  }
});

function showLogin() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="login">
      <img src="fondo 3.svg" alt="" class="img00">
      <div class="dise">✓</div>
      <p class="z10">𝙰𝚂𝙸𝚂𝚃𝙴𝙽𝙲𝙸𝙰</p>
      <p class="z11">𝙳𝙾𝙲𝙴𝙽𝚃𝙴-𝙰𝙻𝚄𝙼𝙽𝙾</p>
      <button class="contra-olvido">¿Olvidó su contraseña?</button>
      <img src="Group.svg" alt="" class="img02">
      <form id="loginForm">
        <input type="email" id="correo" placeholder="Correo electrónico o usuario" required />
        <input type="password" id="contrasena" placeholder="Contraseña" required />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  `;

  document.querySelector(".contra-olvido").addEventListener("click", () => {
    showRecuperarContra();
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    if (usuariosValidos[correo] && usuariosValidos[correo] === contrasena) {
      alert("Inicio de sesión exitoso");
      localStorage.setItem("user", JSON.stringify({ correo }));
      mostrarPanel(); // ⬅ Llama a la función correcta
    } else {
      alert("Credenciales incorrectas o usuario no existe");
    }
  });
}

// ⬇ Renombramos esta función para evitar conflicto
function mostrarPanel() {
    const user = JSON.parse(localStorage.getItem("user"));
    const correo = user?.correo;
  
    if (correo === "florcordi@cole.general.gt") { // ← corregido
      showPanel(); // función importada desde loginPrimero.js
    } else if (correo === "fuentes@cole.general.gt") {
      maestroGuia();
    } else if (correo === "administrador@general.gt") {
      showPanel();
    } else {
      showVentanaTres();
    }
  }
  

export { showLogin };

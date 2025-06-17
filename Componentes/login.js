
import { showVentanaTres } from "./loginTres.js";
import { showVentanaTresPartes } from "./loginTres1.js"
import { showVentanaCuatro } from "./loginCuatro.js";
import { showRecuperarContra } from "./recuperarContra.js";

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("user")) {
        showPanel();
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
  }
  
    

    document.getElementById("loginForm").addEventListener("submit", async () => {
        e.preventDefault();
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        
        let response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena }),
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            localStorage.setItem("user", JSON.stringify(data.user));
            showPanel();

        } else if (response.status === 403) {
            const nueva = prompt("Contraseña incorrecta. Ingresa tu nueva contraseña:");
            if (nueva) {
                const changeRes = await fetch("http://localhost:3000/cambiar-contrasena", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ correo, nuevaContrasena: nueva })
                });
                if (changeRes.ok) {
                    alert("Contraseña actualizada correctamente. Intenta iniciar sesión de nuevo.");
                } else {
                    alert("Error al actualizar la contraseña.");
                }
            } else {
                alert("Cambio de contraseña cancelado.");
            }

        } else {
            alert("Credenciales incorrectas o usuario no existe");
        }
    });


showVentanaSecundaria();
showVentanaTres();
showVentanaTres();
showVentanaTresPartes();
showVentanaCuatro();
export { showLogin };

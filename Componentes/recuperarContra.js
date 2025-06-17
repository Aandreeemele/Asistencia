import { showLogin } from "./login.js";

function showRecuperarContra() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <div class="recuperar">
            <h2>𝚁𝚎𝚌𝚞𝚙𝚎𝚛𝚊𝚛 𝙲𝚘𝚗𝚝𝚛𝚊𝚜𝚎ñ𝚊</h2>

            <!-- Fase 1 -->
            <div id="fase1">
                <p>Ingresa tu correo electrónico o usuario:</p>
                <input type="text" id="usuarioCorreo" placeholder="Correo o Usuario">
                <button id="enviarCodigo">Enviar código</button>
            </div>

            <img src="222 1.svg" alt="" class="imgrecu">

            <!-- Fase 2 -->
            <div id="fase2" style="display:none;">
                <p>Hemos enviado un código: <strong id="codigoGenerado"></strong></p>
                <input type="text" id="codigoIngresado" placeholder="Ingresa el código">
                <button id="verificarCodigo">Verificar</button>
            </div>

            <!-- Fase 3 -->
            <div id="fase3" style="display:none;">
                <p>Ingresa tu nueva contraseña:</p>
                <input type="password" id="nuevaContra" placeholder="Nueva contraseña">
                <input type="password" id="verificarContra" placeholder="Repetir contraseña">
                <button id="guardarContra">Guardar Contraseña</button>
            </div>
        </div>
    `;

    let codigoReal = "";

    // 👉 FASE 1: Enviar código
    document.getElementById("enviarCodigo").addEventListener("click", () => {
        const user = document.getElementById("usuarioCorreo").value.trim();
        if (!user) return alert("Ingresa un correo o usuario.");

        codigoReal = Math.floor(100000 + Math.random() * 900000).toString();
        document.getElementById("codigoGenerado").textContent = codigoReal;

        alert("Tu código es: " + codigoReal); // ✅ Mostrar alerta con el código

        document.getElementById("fase1").style.display = "none";
        document.getElementById("fase2").style.display = "block";
    });

    // 👉 FASE 2: Verificar código
    document.getElementById("verificarCodigo").addEventListener("click", () => {
        const codigoIngresado = document.getElementById("codigoIngresado").value.trim();

        if (codigoIngresado === codigoReal) {
            document.getElementById("fase2").style.display = "none";
            document.getElementById("fase3").style.display = "block";
        } else {
            alert("Código incorrecto.");
        }
    });

    // 👉 FASE 3: Guardar contraseña
    document.getElementById("guardarContra").addEventListener("click", async () => {
        const nueva = document.getElementById("nuevaContra").value.trim();
        const repetir = document.getElementById("verificarContra").value.trim();
        const user = document.getElementById("usuarioCorreo").value.trim();

        if (nueva !== repetir) return alert("Las contraseñas no coinciden.");
        if (nueva.length < 4) return alert("La contraseña debe tener al menos 4 caracteres.");

        try {
            const response = await fetch("http://localhost:3000/cambiar-contrasena", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: user, nuevaContrasena: nueva })
            });

            if (response.ok) {
                alert("Contraseña actualizada correctamente.");
                showLogin(); // ✅ Volver al login
            } else {
                alert("Error al actualizar la contraseña.");
            }
        } catch (err) {
            alert("Error de red al guardar contraseña.");
        }
    });
}

export { showRecuperarContra };

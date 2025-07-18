import { showLogin } from "../login.js";
import { BASE_URL } from "../config.js";

function showRecuperarContra() {
  document.body.innerHTML = "";
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  const contenedor = crearElemento("div", "recuperar");

  const titulo = crearElemento("h2", "", "𝚁𝚎𝚌𝚞𝚙𝚎𝚛𝚊𝚛 𝙲𝚘𝚗𝚝𝚛𝚊𝚜𝚎ñ𝚊");
  const imagen = document.createElement("img");
  imagen.src = "./assets/222 1.svg";
  imagen.alt = "";
  imagen.className = "imgrecu";

  // Fase 1
  const fase1 = crearElemento("div");
  fase1.id = "fase1";
  const p1 = crearElemento("p", "", "Ingresa tu correo electrónico:");
  const inputCorreo = crearInput("usuarioCorreo", "Correo electrónico");
  const btnCodigo = crearBoton("enviarCodigo", "Enviar código");
  fase1.append(p1, inputCorreo, btnCodigo);

  // Fase 2
  const fase2 = crearElemento("div");
  fase2.id = "fase2";
  fase2.style.display = "none";
  const p2 = crearElemento("p", "", "Hemos enviado un código a tu correo:");
  const strong = document.createElement("strong");
  strong.id = "codigoGenerado";
  strong.textContent = "Revisa tu bandeja de entrada";
  p2.appendChild(strong);
  const inputCodigo = crearInput("codigoIngresado", "Ingresa el código");
  const btnVerificar = crearBoton("verificarCodigo", "Verificar");
  fase2.append(p2, inputCodigo, btnVerificar);

  // Fase 3
  const fase3 = crearElemento("div");
  fase3.id = "fase3";
  fase3.style.display = "none";
  const p3 = crearElemento("p", "", "Ingresa tu nueva contraseña:");
  const nuevaContra = crearInput("nuevaContra", "Nueva contraseña", "password");
  const verificarContra = crearInput("verificarContra", "Repetir contraseña", "password");
  const btnGuardar = crearBoton("guardarContra", "Guardar Contraseña");
  fase3.append(p3, nuevaContra, verificarContra, btnGuardar);

  contenedor.append(titulo, fase1, imagen, fase2, fase3);
  root.appendChild(contenedor);

  // Código fijo
  const CODIGO_FIJO = "516832";

  // No se genera ni se envía código, sólo mostramos el código fijo en pantalla
  btnCodigo.addEventListener("click", async () => {
    const user = inputCorreo.value.trim();
    if (!user) return alert("Ingresa un correo válido.");

    // Mostrar mensaje con código fijo
    const strong = document.getElementById("codigoGenerado");
    strong.textContent = ` Ingresa el codigo que fue enviado:`;

    fase1.style.display = "none";
    fase2.style.display = "block";
  });

  btnVerificar.addEventListener("click", () => {
    const ingresado = inputCodigo.value.trim();
    if (ingresado === CODIGO_FIJO) {
      fase2.style.display = "none";
      fase3.style.display = "block";
    } else {
      alert("Código incorrecto.");
    }
  });

  btnGuardar.addEventListener("click", async () => {
    const nueva = nuevaContra.value.trim();
    const repetir = verificarContra.value.trim();
    const user = inputCorreo.value.trim();
    const codigoIngresado = inputCodigo.value.trim();

    if (nueva !== repetir) return alert("Las contraseñas no coinciden.");
    if (nueva.length < 6) return alert("La contraseña debe tener al menos 6 caracteres.");
    if (codigoIngresado !== CODIGO_FIJO) return alert("El código ingresado no es válido.");

    const quiereCambiar = confirm("¿Te gustaría cambiar tu nombre o apellido?");
    let nuevoNombre = null;
    let nuevoApellido = null;

    if (quiereCambiar) {
      nuevoNombre = prompt("Nuevo nombre (deja vacío si no quieres cambiarlo):")?.trim();
      nuevoApellido = prompt("Nuevo apellido (deja vacío si no quieres cambiarlo):")?.trim();
    }

    const datos = {
      correo: user,
      nuevaContrasena: nueva,
      nuevoNombre: nuevoNombre || null,
      nuevoApellido: nuevoApellido || null,
      codigoIngresado // Siempre "516832"
    };

    try {
      const res = await fetch(`${BASE_URL}/cambiar-contrasena`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (res.ok) {
        alert("✅ Información actualizada correctamente.");
        showLogin();
      } else {
        const errorData = await res.json();
        alert("❌ Error: " + (errorData.error || "No se pudo cambiar los datos."));
      }
    } catch (err) {
      alert("❌ Error de red.");
      console.error(err);
    }
  });
}

// Helpers
function crearElemento(tag, clase = "", texto = "") {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

function crearInput(id, placeholder, tipo = "text") {
  const input = document.createElement("input");
  input.type = tipo;
  input.id = id;
  input.placeholder = placeholder;
  return input;
}

function crearBoton(id, texto) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = texto;
  return btn;
}

export { showRecuperarContra };

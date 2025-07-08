import { showLogin } from "../login.js";
import { BASE_URL } from "../config.js";
export function crearFormularioRegistroX() {
  document.body.innerHTML = "";

  const rootDiv = document.createElement("div");
  rootDiv.id = "root";
  document.body.appendChild(rootDiv);

  const cajaFormZ9 = document.createElement("div");
  cajaFormZ9.className = "cuadroZ9";

  const tituloFormX7 = document.createElement("h2");
  tituloFormX7.className = "tituloX7";
  tituloFormX7.textContent = "Registro Formal";

  const mensajeXid = document.createElement("p");
  mensajeXid.className = "mensajeK5";

  const entradaMailT1 = document.createElement("input");
  entradaMailT1.type = "email";
  entradaMailT1.placeholder = "Por favor, ingresa tu correo electrónico";
  entradaMailT1.className = "campoJ3";
  entradaMailT1.style.display = "block";

  const entradaNomT1 = document.createElement("input");
  entradaNomT1.type = "text";
  entradaNomT1.placeholder = "Ahora, tu nombre completo";
  entradaNomT1.className = "campoJ3";
  entradaNomT1.style.display = "none";

  const entradaPassT1 = document.createElement("input");
  entradaPassT1.type = "password";
  entradaPassT1.placeholder = "Por último, crea una contraseña segura";
  entradaPassT1.className = "campoJ3";
  entradaPassT1.style.display = "none";

  const seleccionRol = document.createElement("select");
  seleccionRol.className = "campoJ3";
  seleccionRol.style.display = "none";
  const opcionDefault = new Option("Selecciona tu rol", "", true, true);
  opcionDefault.disabled = true;
  const opcionMaestro = new Option("Maestro", "maestro");
  const opcionCoordinador = new Option("Coordinador", "coordinador");
  seleccionRol.add(opcionDefault);
  seleccionRol.add(opcionMaestro);
  seleccionRol.add(opcionCoordinador);

  const botonSiguiente = document.createElement("button");
  botonSiguiente.className = "botonQ2";
  botonSiguiente.textContent = "Siguiente";

  cajaFormZ9.appendChild(tituloFormX7);
  cajaFormZ9.appendChild(entradaMailT1);
  cajaFormZ9.appendChild(entradaNomT1);
  cajaFormZ9.appendChild(entradaPassT1);
  cajaFormZ9.appendChild(seleccionRol);
  cajaFormZ9.appendChild(botonSiguiente);
  cajaFormZ9.appendChild(mensajeXid);

  rootDiv.appendChild(cajaFormZ9);

  let paso = 1;

  botonSiguiente.addEventListener("click", () => {
    mensajeXid.textContent = "";
    mensajeXid.style.color = "black";

    if (paso === 1) {
      const correo = entradaMailT1.value.trim();
      if (!correo || !correo.includes("@")) {
        mensajeXid.textContent = "Por favor, introduce un correo válido.";
        mensajeXid.style.color = "red";
        return;
      }
      entradaMailT1.style.display = "none";
      entradaNomT1.style.display = "block";
      paso++;
    } else if (paso === 2) {
      const nombre = entradaNomT1.value.trim();
      if (!nombre || nombre.length < 3) {
        mensajeXid.textContent = "Por favor, ingresa un nombre válido (mínimo 3 caracteres).";
        mensajeXid.style.color = "red";
        return;
      }
      entradaNomT1.style.display = "none";
      entradaPassT1.style.display = "block";
      paso++;
    } else if (paso === 3) {
      const clave = entradaPassT1.value;
      if (!clave || clave.length < 6) {
        mensajeXid.textContent = "La contraseña debe tener al menos 6 caracteres.";
        mensajeXid.style.color = "red";
        return;
      }
      entradaPassT1.style.display = "none";
      seleccionRol.style.display = "block";
      botonSiguiente.textContent = "Registrar";
      paso++;
    } else if (paso === 4) {
      const rol = seleccionRol.value;
      if (!rol) {
        mensajeXid.textContent = "Por favor, selecciona si eres maestro o coordinador.";
        mensajeXid.style.color = "red";
        return;
      }

      const objUsuarioX = {
        correox: entradaMailT1.value.trim(),
        nombrex: entradaNomT1.value.trim(),
        clavex: entradaPassT1.value,
        rolx: rol,
      };

      fetch(`${BASE_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objUsuarioX),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Registro fallido");
          return res.json();
        })
        .then(() => {
          mensajeXid.textContent = "✅ Usuario registrado correctamente";
          mensajeXid.style.color = "green";
          botonSiguiente.disabled = true;

          setTimeout(() => {
            rootDiv.innerHTML = "";
            showLogin();
          }, 1000);
        })
        .catch((err) => {
          mensajeXid.textContent = "❌ Ya existe un usuario con ese correo.";
          mensajeXid.style.color = "red";
          console.error(err);
        });
    }
  });
}

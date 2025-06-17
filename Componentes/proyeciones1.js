import { showVentanaSecundaria } from "./loginSecundario.js";
import { showVentanaTres } from "./loginTres.js";
const proyeccionxs = {
  "Bachilleratos": [
    { nombre: 'IV Computación', color: 'azul' },
    { nombre: 'IV Diseño Gráfico', color: 'naranja' },
    { nombre: 'IV Biológicas', color: 'verde' },
    { nombre: 'IV Perito Contador', color: 'morado' },
    { nombre: 'V Computación', color: 'azul' },
    { nombre: 'V Diseño Gráfico', color: 'naranja' },
    { nombre: 'V Biológicas', color: 'rojo' },
    { nombre: 'V Perito Contador', color: 'verde' },
    { nombre: 'VI Perito Contador', color: 'azul' },
  ],
};

function generarVistaGrado(nombreGrupo, listaGrados) {
  const seccion = document.createElement('section');
  seccion.className = 'bloque-grados';

  // 🔙 Botón Volver (al menú principal)
  const btnVolver = document.createElement('button');
  btnVolver.textContent = "←";
  btnVolver.className = "btn-volver";
  btnVolver.addEventListener("click", showVentanaSecundaria, () => {
    location.reload(); // puedes cambiar esto por showVentanaSecundaria() si lo prefieres
  });

  // 🔁 Botón Regresar (para ir atrás en pasos)
  const btnRegresar = document.createElement('button');
  btnRegresar.textContent = "→";
  btnRegresar.className = "btn-regresar";
  btnRegresar.addEventListener("click", showVentanaTres, () => {
    window.history.back(); // o cambiar por otra función si tienes controladores de navegación
  });

  const botonesContainer = document.createElement("div");
  botonesContainer.className = "botones-superiores";
  botonesContainer.appendChild(btnRegresar);
  botonesContainer.appendChild(btnVolver);
  seccion.appendChild(botonesContainer);

  const titulo = document.createElement('h2');
  titulo.textContent = nombreGrupo;
  titulo.className = 'titulo-grado';
  seccion.appendChild(titulo);

  const contenedor = document.createElement('div');
  contenedor.className = 'grid-grados';

  listaGrados.forEach(grado => {
    const tarjeta = document.createElement('div');
    tarjeta.className = `tarjeta ${grado.color}`;
    tarjeta.innerHTML = `
      <div class="icono">📈</div>
      <div class="nombre-grado">${grado.nombre}</div>
    `;

    tarjeta.addEventListener('click', () => {
      document.querySelectorAll('.tarjeta').forEach(t => t.classList.remove('activo'));
      tarjeta.classList.add('activo');
    });

    contenedor.appendChild(tarjeta);
  });

  seccion.appendChild(contenedor);
  document.body.appendChild(seccion);
}

export { proyeccionxs, generarVistaGrado };

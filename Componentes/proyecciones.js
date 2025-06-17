const datosGrados = {
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
    "Básicos": [
      { nombre: 'I Básico sección A', color: 'azul' },
      { nombre: 'I Básico sección B', color: 'naranja' },
      { nombre: 'II Básico sección A', color: 'verde' },
      { nombre: 'II Básico sección B', color: 'morado' },
      { nombre: 'III Básico sección A', color: 'rosado' },
      { nombre: 'III Básico sección B', color: 'verde' },
    ]
  };
  
  function generarVistaGrado(nombreGrupo, listaGrados) {
    const seccion = document.createElement('section');
    seccion.className = 'bloque-grados';
  
    const bton_regresarx1 = document.createElement('button')
    



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
  
  export { datosGrados, generarVistaGrado };
  
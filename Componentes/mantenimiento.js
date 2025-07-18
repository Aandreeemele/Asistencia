function crearMantenimiento() {
  const root = document.getElementById('root');
  root.innerHTML = ''; // Limpiar contenido anterior

  const contenedor = document.createElement('div');
  contenedor.className = 'mantenimiento';

  const titulo = document.createElement('h1');
  titulo.textContent = 'COLEGIO GENERAL APP';

  const subtitulo = document.createElement('p');
  subtitulo.textContent = 'Asistencia en mantenimiento';

  const engranajes = document.createElement('div');
  engranajes.className = 'engranajes';

  const engranaje1 = document.createElement('div');
  engranaje1.className = 'gear gear1';

  const engranaje2 = document.createElement('div');
  engranaje2.className = 'gear gear2';

  engranajes.appendChild(engranaje1);
  engranajes.appendChild(engranaje2);

  contenedor.appendChild(titulo);
  contenedor.appendChild(subtitulo);
  contenedor.appendChild(engranajes);

  root.appendChild(contenedor);
}

crearMantenimiento();
export { crearMantenimiento };

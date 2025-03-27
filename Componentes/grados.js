async function cargarAlumnos() {
    const response = await fetch('http://localhost:3000/alumnos');
    const alumnos = await response.json();
    
    const lista = document.getElementById('alumnosList');
    alumnos.forEach(alumno => {
      const li = document.createElement('li');
      li.textContent = alumno.nombre; 
      lista.appendChild(li);
    });
  }
  
  cargarAlumnos();
  
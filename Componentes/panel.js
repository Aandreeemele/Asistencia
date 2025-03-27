if (!localStorage.getItem('user')) {
    window.location.href = '/'; // Redirigir si no está autenticado
  }
  
  document.getElementById('alumnos').addEventListener('click', () => {
    window.location.href = '/alumnos';
  });
  
  document.getElementById('grados').addEventListener('click', () => {
    window.location.href = '/grados';
  });
  
  document.getElementById('maestros').addEventListener('click', () => {
    window.location.href = '/maestros';
  });
  
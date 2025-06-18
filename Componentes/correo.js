import emailjs from 'https://cdn.emailjs.com/dist/email.min.js';

emailjs.init('g8rLoZ85GUVaJ6xRk');

function showUniforme() {
  // ...tu código de la UI igual...

  document.querySelectorAll("#opcionesCorreo li").forEach((li) => {
    li.onclick = () => {
      const prenda = li.textContent;

      const templateParams = {
        to_email: 'aamelendez@scl.edu.gt',
        asunto: 'Falta de prenda de uniforme',
        mensaje: `Buenas, hace falta: ${prenda}`
      };

      emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
        .then(() => {
          alert('Correo enviado correctamente');
          document.body.removeChild(modal);
        }, (err) => {
          alert('Error al enviar correo: ' + JSON.stringify(err));
        });
    };
  });
}

export {}
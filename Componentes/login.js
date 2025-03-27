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
         <div class="panel-container">
        <div class="dise">Santa Catalina Laboure <br>
         <img src="image.svg" alt="" class="img00">
        </div>
            <h2>Login</h2>
            <form id="loginForm">
                <input type="email" id="correo" placeholder="Correo" required />
                <input type="password" id="contrasena" placeholder="Contraseña" required />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    `;

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena }),
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            localStorage.setItem("user", JSON.stringify(data.user));
            showPanel();
        } else {
            alert("Credenciales incorrectas");
        }
    });
}
function showPanel() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <div class="panel-container">
            <div class="dise">Santa Catalina Laboure <br>
                <p class="a1">Maestro(a): Maria Gomez</p>
                <img src="image.svg" alt="" class="img0">
            </div>
            <div id="menu">
                <button id="alumnos">Ver Alumnos</button>
                <button id="grados">Ver Grados</button>
                <button id="maestros">Ver Maestros</button>
                <button id="cerrar">Cerrar sesión</button>
                <button id="uniforme">Ver Uniforme</button>
                <button id="fecha">Ver Fecha</button>
            </div>
            <img src="image 4.svg" alt="" class="img1">
            <p class="x1">Clave: Nombre:</p>
            <div class="a2"><p class="x2">1</p><p class="x3"> Juan Perez</p> <div class="l1"></div><div class="l2"></div><div class="l3"></div></div>
            <div class="a3"><p class="x2">2</p><p class="x3"> Carlos Rodríguez</p><div class="l4"></div><div class="l5"></div><div class="l6"></div></div>
            <div class="a4"><p class="x2">3</p><p class="x3"> Ana Martínez</p><div class="l7"></div><div class="l8"></div><div class="l9"></div></div>
            <div class="a5"><p class="x2">4</p><p class="x3"> Luis Fernández</p><div class="l10"></div><div class="l11"></div><div class="l12"></div></div>
            <div class="a6"><p class="x2">5</p><p class="x3"> Sofía López</p><div class="l13"></div><div class="l14"></div><div class="l15"></div></div>
            <img src="image 3.svg" alt="" class="img2">
            <div class="c1">Ver</div>
            <div class="c2" id="enviar">Enviar</div>
        </div>
    `;

    setTimeout(() => {
        let elements = [];
        for (let i = 1; i <= 15; i++) {
            let el = document.querySelector(`.l${i}`);
            if (el) elements.push(el);
        }

        const colors = ["red", "yellow", "green"];

        elements.forEach(el => {
            el.addEventListener("click", function () {
                let currentColor = el.style.backgroundColor || "white"; 
                let nextIndex = (colors.indexOf(currentColor) + 1) % colors.length;
                el.style.backgroundColor = colors[nextIndex];
            });
        });

        const enviarBtn = document.getElementById("enviar");
        if (enviarBtn) {
            enviarBtn.addEventListener("click", function () {
                alert("Se ha actualizado la asistencia de Primero Primaria");
            });
        }

        // Agregar event listeners después de que la interfaz se ha cargado
        document.getElementById("alumnos").addEventListener("click", showAlumnos);
        document.getElementById("grados").addEventListener("click", showGrados);
        document.getElementById("maestros").addEventListener("click", showMaestros);
        document.getElementById("cerrar").addEventListener("click", () => {
            localStorage.removeItem("user");
            showLogin();
        });

    }, 100);
}


async function showAlumnos() {
    const root = document.getElementById("root");
    const response = await fetch("http://localhost:3000/alumnos");
    const alumnos = await response.json();
    
    let alumnosHtml = "<h3>Lista de Alumnos</h3><ul>";
    alumnos.forEach(alumno => {
        alumnosHtml += `
            <li class="Alum">
                <strong class="Alum0">Clave: ${alumno.id}</strong><br>
                <strong class="Alum0">Correo: ${alumno.correo}</strong><br>
                <strong class="Alum0">Asistencia: ${alumno.asistencia}</strong><br>
                <a class="Alum1" href="mailto:${alumno.correo}">Enviar correo</a>
            </li>
        `;
    });
    alumnosHtml += "</ul>";
    root.innerHTML = alumnosHtml;
}

async function showGrados() {
    const root = document.getElementById("root");
    const response = await fetch("http://localhost:3000/grados");
    const grados = await response.json();
    
    let gradosHtml = "<h3>Lista de Grados</h3><ul>";
    grados.forEach(grado => {
        gradosHtml += `<li class="sub">${grado.nombre_subgrado}</li>`;
    });
    gradosHtml += "</ul>";
    root.innerHTML = gradosHtml;
}

async function showMaestros() {
    const root = document.getElementById("root");
    const response = await fetch("http://localhost:3000/maestros");
    const maestros = await response.json();
    
    let maestrosHtml = "<h3>Lista de Maestros</h3><ul>";
    maestros.forEach(maestro => {
        maestrosHtml += `
            <li class="maes0">
                <strong class="maes">Correo: ${maestro.correo}</strong><br>
                <strong class="maes1">Nombre: ${maestro.nombre_maestro}</strong><br>
                <a class="maes2" href="mailto:${maestro.correo}">Enviar correo</a>
            </li>
        `;
    });
    maestrosHtml += "</ul>";
    root.innerHTML = maestrosHtml;
}

export { showLogin };

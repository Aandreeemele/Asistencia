import { showPanel } from "./loginPrimero.js";
import { showVentanaTres } from "./loginTres.js";

function showVentanaSecundaria() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <div class="panel-container">
            <img src="fondo 3.svg" alt="" class="imgx1">
            <button id="Volver999">←</button>
            <button id="Siguiente999">→</button>
            <p class="Titulo001"> 𝙼𝙰𝙴𝚂𝚃𝚁𝙾𝚂</p>
            <p class="Titulo002"> 𝙰𝚂𝙸𝙶𝙽𝙰𝙳𝙾𝚂</p>
            <div class="ivcompu">𝙸𝚅 𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚌𝚒ó𝚗</div>
            <div class="ivdiseño">𝙸𝚅 𝙳𝚒𝚜𝚎ñ𝚘 𝙶𝚛á𝚏𝚒𝚌𝚘</div>
            <div class="ivbiolo">𝙸𝚅 𝙱𝚒𝚘𝚕ó𝚐𝚒𝚌𝚊𝚜</div>
            <div class="ivperito">𝙸𝚅 𝙿𝚎𝚛𝚒𝚝𝚘 𝙲𝚘𝚗𝚝𝚊𝚍𝚘𝚛</div>
            <div class="vcompu">𝚅 𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚌𝚒ó𝚗</div>
            <div class="vdiseño">𝚅 𝙳𝚒𝚜𝚎ñ𝚘 𝙶𝚛á𝚏𝚒𝚌𝚘</div>
            <div class="vbiolo">𝚅 𝙱𝚒𝚘𝚕ó𝚐𝚒𝚌𝚊𝚜</div>
            <div class="vperito">𝚅 𝙿𝚎𝚛𝚒𝚝𝚘 𝙲𝚘𝚗𝚝𝚊𝚍𝚘𝚛</div>
            <div class="viperito">𝚅𝙸 𝙿𝚎𝚛𝚒𝚝𝚘 𝙲𝚘𝚗𝚝𝚊𝚍𝚘𝚛</div>
            <button id="Proyecciones01">Proyecciones 📈</button>
        </div>
    `;

    document.getElementById("Siguiente999").addEventListener("click", showVentanaSecundaria);
        document.getElementById("Volver999").addEventListener("click", showPanel);
 
}
showVentanaTres();
export { showVentanaSecundaria };
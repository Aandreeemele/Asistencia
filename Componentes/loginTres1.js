function showVentanaTresPartes(){
    root.innerHTML = `
    <div class="panel-container">
        <div id="confirmacionEliminar" class="modal" style="display:none;">
            <div class="modal-content">
                <p>¿Estás seguro de eliminar el docente? Se perderán las informaciones.</p>
                <button id="cancelarEliminar">Cancelar</button>
                <button id="confirmarEliminar">Eliminar</button>
            </div>
        </div>
    </div>
`;
}
export{ showVentanaTresPartes};
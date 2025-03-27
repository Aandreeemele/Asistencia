function header() {
    const container = document.createElement("div");
    container.id = "section";
    document.body.appendChild(container);

    const divNames = ["div-1", ];
    const divContents = [
        "",
        "Colegio SCL",
        "☰",
        "Asistencias 2025 📝"
    ];

    for (let i = 0; i < divNames.length; i++) {
        const div = document.createElement("div");
        div.className = divNames[i];
        div.textContent = divContents[i];
        container.appendChild(div);
    }
}

export { header }

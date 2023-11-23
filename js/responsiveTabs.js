// Cambiar la estructura de la tabla de las pestañas de las materias para obtener un diseño responsive

function responsiveTable() {
    // Eliminar el "tr.appendChild(th);" cuando el tamaño de la pantalla sea menor a 768px
    if (window.matchMedia("(max-width: 768px)").matches) {
        // Eliminar el "tr.appendChild(th);"
        const th = document.querySelector("th");
        th.remove();
    } else {
        // Agregar el "tr.appendChild(th);" cuando el tamaño de la pantalla sea mayor a 768px
        const th = document.createElement("th");
        th.innerHTML = "Materias";
        const tr = document.querySelector("tr");
        tr.appendChild(th);
    }
}

// Ejecutar la función cuando se carga la página
window.addEventListener('load', responsiveTable);
window.addEventListener('resize', responsiveTable);
// responsiveTable();
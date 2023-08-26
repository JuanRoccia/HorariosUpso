// Función para cargar datos de la API y renderizarlos en la tabla
function loadMaterias() {
    // URL de la API
    const apiUrl = 'tabla-horarios.json';

    // Hacer una solicitud GET a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#miTabla tbody');
            data.materias.forEach(materia => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a title="Ir a Materia" rel="noopener" href="${materia.link_moodle}" target="_blank">${materia.nombre}</a></td>
                    <td>${materia.lunes}</td>
                    <td>${materia.martes}</td>
                    <td>${materia.miercoles}</td>
                    <td>${materia.jueves}</td>
                    <td>${materia.viernes}</td>
                    <td>${materia.sabado}</td>
                    <td><a title="Ir al Perfil" href="${materia.link_profe}" target="_blank">${materia.profesor}</a></td>
                    <td>${materia.auxiliar}</td>
                    <td>${materia.observaciones}</td>
                    <td style="text-align: center;"><a title="Ir a Clases de Zoom" href="${materia.link_zoom}" target="_blank">Zoom</a></td>
                `;
                tableBody.appendChild(row);
            });
            // Llamar a loadTabs con data
            loadTabs(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

// Función para rellenar MATERIAS TABS con la API
// function loadTabs(data) {
//     const tabLinksContainer = document.querySelector('.tablinks-container');
//     const tabContentContainer = document.querySelector('.tabcontent-container');

//     data.materias.forEach((materia, index) => {
//         // Crear botón de tab para cada materia

//         const tabButton = document.createElement('button');
//         tabButton.className = 'tablinks';
//         tabButton.textContent = materia.nombre;
//         tabButton.setAttribute('data-short-name', materia.shortName); // Asume que tienes un campo shortName en tus datos
//         tabButton.setAttribute('data-long-name', materia.nombre);   // Asume que tienes un campo longName en tus datos
//         tabButton.onclick = function() {
//             openTab(index);
//         };
//         tabLinksContainer.appendChild(tabButton);

//         // Crear contenido de tab para cada materia
//         const tabContent = document.createElement('div');
//         tabContent.className = 'tabcontent';
//         tabContent.innerHTML = `
//             <h3>${materia.nombre}</h3>
//             <!-- Aquí puedes agregar más detalles de cada materia -->
//         `;
//         tabContentContainer.appendChild(tabContent);
//     });
// }

function loadTabs(data) {
    const tabLinksContainer = document.querySelector('.tablinks-container');
    const tabContentContainer = document.querySelector('.tabcontent-container'); // Este contenedor contendrá todos los contenidos de los tabs

    data.materias.forEach((materia, index) => {
        // Crear botón de tab para cada materia
        const tabButton = document.createElement('button');
        tabButton.className = 'tablinks';
        tabButton.textContent = materia.nombre;
        tabButton.setAttribute('data-short-name', materia.shortName); // Asume que tienes un campo shortName en tus datos
        tabButton.setAttribute('data-long-name', materia.nombre);   // Asume que tienes un campo longName en tus datos
        tabButton.onclick = function() {
            openTab(index);
        };
        tabLinksContainer.appendChild(tabButton);

        // Crear contenido de tab para cada materia
        const tabContent = document.createElement('div');
        tabContent.id = slugify(materia.nombre); // Asume que tienes una función slugify
        tabContent.className = 'tabcontent w3-padding-32 w3-container';
        
        const panel = document.createElement('div');
        panel.className = 'w3-panel';

        const materiaTitle = document.createElement('h3');
        materiaTitle.className = 'text-2xl font-bold pb-2';
        materiaTitle.textContent = materia.nombre;
        panel.appendChild(materiaTitle);

        const materiaDescription = document.createElement('p');
        materiaDescription.className = 'text-slate-400 text-lg mb-4';
        materiaDescription.textContent = materia.descripcion;
        panel.appendChild(materiaDescription);

        const aulaVirtualLink = document.createElement('a');
        aulaVirtualLink.className = 'link-style hover:text-sky-400';
        aulaVirtualLink.href = materia.link_moodle;
        aulaVirtualLink.target = '_blank';
        aulaVirtualLink.textContent = '👉 Aula virtual';
        panel.appendChild(aulaVirtualLink);

        tabContent.appendChild(panel);

        // Crear la tabla para cada materia
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';

        const table = document.createElement('table');
        table.id = 'miTabla';
        table.className = 'tabla2';

        // Aquí puedes agregar el thead y el tbody y llenarlos con los datos de materia.actividad_set.all
        // ...

        tableContainer.appendChild(table);
        tabContent.appendChild(tableContainer);

        tabContentContainer.appendChild(tabContent);
    });
}

function openTab(index) {
    const tabContents = document.querySelectorAll('.tabcontent');
    tabContents.forEach(tab => tab.style.display = 'none'); // Ocultar todos los contenidos
    tabContents[index].style.display = 'block'; // Mostrar el contenido seleccionado
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Reemplaza espacios por -
        .replace(/[^\w\-]+/g, '')       // Elimina todos los caracteres no válidos
        .replace(/\-\-+/g, '-')         // Reemplaza múltiples - por uno solo
        .replace(/^-+/, '')             // Trim - del inicio de la cadena
        .replace(/-+$/, '');            // Trim - del final de la cadena
}

// Llamar a las funciones cuando se carga la página
window.addEventListener('load', function() {
    loadMaterias();
    actualizarContenido();
});

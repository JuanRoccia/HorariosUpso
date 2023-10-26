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
                // Agregar clase de manera impar a los tr
                // const trs = document.querySelectorAll('#miTabla tbody tr');
                // trs.forEach((tr, index) => {
                //     if (index % 2 !== 0) {
                //         tr.classList.add('nth-child-even');
                //     }
                // });
            });
            // Llamar a loadTabs con data
            loadTabs(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

function loadTabs(data) {
    const tabLinksContainer = document.querySelector('.tablinks-container');
    const tabContentContainer = document.querySelector('.tabcontent-container');

    data.materias.forEach((materia, index) => {
        // Crear botón de tab para cada materia
        const tabButton = document.createElement('button');
        tabButton.className = 'tablinks';
        tabButton.textContent = materia.nombre;
        tabButton.onclick = function() {
            openTab(index);
        };
        tabLinksContainer.appendChild(tabButton);

        // Crear contenido de tab para cada materia
        const tabContent = document.createElement('div');
        tabContent.id = slugify(materia.nombre);
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

        const linksContainer = document.createElement('div');
        linksContainer.className = 'flex flex-col';
        panel.appendChild(linksContainer);

        // Crear el primer enlace y su div contenedor
        const aulaVirtualLink = document.createElement('a');
        aulaVirtualLink.className = 'link-style hover:text-sky-400 mb-2';
        aulaVirtualLink.href = materia.link_moodle;
        aulaVirtualLink.target = '_blank';
        aulaVirtualLink.textContent = 'Aula virtual';
        linksContainer.appendChild(aulaVirtualLink);

        // Crear el segundo enlace y su div contenedor
        const gruposLink = document.createElement('a');
        gruposLink.className = 'link-style hover:text-sky-400 mb-2';
        gruposLink.href = materia.link_grupos;
        gruposLink.target = '_blank';
        gruposLink.textContent = 'Grupos';
        linksContainer.appendChild(gruposLink);

        tabContent.appendChild(panel);

        // Crear la tabla para cada materia
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';

        const table = document.createElement('table');
        table.className = 'tabla2';

        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const trHead = document.createElement('tr');
        trHead.innerHTML = `
            <tr>
                <th></th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Checkbox</th>
                <th>Detalles</th>
            </tr>
        `;

        table.appendChild(thead);
        thead.appendChild(trHead);
       
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        tabContent.appendChild(tableContainer);

        tabContentContainer.appendChild(tabContent);

        // Filtrar las actividades que pertenecen a esta materia
        const actividadesMateria = data.actividades.filter(actividad => 
            actividad.materia.toLowerCase().includes(materia.nombre.toLowerCase())
        );

        // Agregar cada actividad a la tabla
        actividadesMateria.forEach(actividad => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.innerHTML = ` <th rowspan="2">${actividad.tipo}</th>`;
            tr.appendChild(th);

            const tdNombre = document.createElement('td');
            const aNombre = document.createElement('a');
            aNombre.href = actividad.link_moodle;
            aNombre.target = '_blank';
            aNombre.textContent = actividad.nombre;
            tdNombre.appendChild(aNombre);
            tr.appendChild(tdNombre);

            const tdFecha = document.createElement('td');
            tdFecha.textContent = actividad.fecha;
            tr.appendChild(tdFecha);

            const tdCheckbox = document.createElement('td');
            const inputCheckbox = document.createElement('input');
            inputCheckbox.type = 'checkbox';
            inputCheckbox.className = 'checkbox';
            inputCheckbox.checked = actividad.checkbox === 'checked';
            inputCheckbox.onclick = function() {
                actividad.checkbox = this.checked ? 'checked' : '';
                // actualizarContenido();
                localStorage.setItem('actividades', JSON.stringify(data.actividades));
            };
            tdCheckbox.appendChild(inputCheckbox);
            tr.appendChild(tdCheckbox);


            // const inputCheckbox = document.createElement('input');
            // inputCheckbox.type = 'checkbox';
            // inputCheckbox.className = 'checkbox';
            // inputCheckbox.checked = actividad.checked;
            // inputCheckbox.onclick = function() {
            //     actividad.checked = this.checked;
            //     localStorage.setItem('actividades', JSON.stringify(data.actividades));
            // };
            // tdCheckbox.appendChild(inputCheckbox);
            // tr.appendChild(tdCheckbox);

            
            const tdDetalles = document.createElement('td');
            const aDetalles = document.createElement('a');
            aDetalles.href = actividad.link_moodle;
            aDetalles.target = '_blank';
            aDetalles.textContent = actividad.detalles;
            tdDetalles.appendChild(aDetalles);
            tr.appendChild(tdDetalles);

            tbody.appendChild(tr);
        });
    });
}

function openTab(index) {
    const tabContents = document.querySelectorAll('.tabcontent');
    const tabButtons = document.querySelectorAll('.tablinks');

    tabContents.forEach(tab => tab.style.display = 'none'); // Ocultar todos los contenidos

    tabButtons.forEach(button => {
        button.classList.remove('active'); // Eliminar la clase 'active' de todos los botones
    });

    tabContents[index].style.display = 'block'; // Mostrar el contenido seleccionado
    tabButtons[index].classList.add('active'); // Agregar la clase 'active' al botón seleccionado
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
    // actualizarContenido();
});

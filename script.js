// <!--------- The To Do List Section y Aside  --------->
// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
var myNodelist = document.querySelectorAll("#myUL li");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('#myUL');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// TODO TABS
// function openCity(evt, cityName) {
//   // Declare all variables
//   var i, tabcontent, tablinks;

//   // Get all elements with class="tabcontent" and hide them
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }

//   // Get all elements with class="tablinks" and remove the class "active"
//   tablinks = document.getElementsByClassName("tablinks");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }

//   // Show the current tab, and add an "active" class to the button that opened the tab
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// // Renovar contenido del TabNav
// function actualizarContenido() {
//   // Obtengo el ancho de la ventana
//   const anchoVentana = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

//   // Obtengo el elemento que deseas modificar
//   const tab1 = document.getElementById('tabTitle1');
//   const tab2 = document.getElementById('tabTitle2');
//   const tab3 = document.getElementById('tabTitle3');
//   const tab4 = document.getElementById('tabTitle4');

//   // Si el ancho de la ventana es menor o igual a 500px, cambia el contenido
//   if (anchoVentana <= 500) {
//     tab1.textContent = 'FDW';
//     tab2.textContent = 'C#.Net';
//     tab3.textContent = 'Redes';
//     tab4.textContent = 'Inglés';
//   } else {
//     tab1.textContent = 'Fundamentos del Diseño Web';
//     tab2.textContent = 'Promgramación C#';
//     tab3.textContent = 'Redes y Comunicaciones';
//     tab4.textContent = 'Inglés Comercial';
//   }
// }

// function actualizarContenido() {
//   // Obtengo el ancho de la ventana
//   const anchoVentana = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

//   // Intenta obtener y actualizar cada elemento. Si el elemento no existe, simplemente continúa.
//   const tabs = ['tabTitle1', 'tabTitle2', 'tabTitle3', 'tabTitle4'];
//   const shortNames = ['FDW', 'C#.Net', 'Redes', 'Inglés'];
//   const longNames = ['Fundamentos del Diseño Web', 'Promgramación C#', 'Redes y Comunicaciones', 'Inglés Comercial'];

//   tabs.forEach((tabId, index) => {
//     const tab = document.getElementById(tabId);
//     if (tab) { // Verifica si el elemento existe
//       tab.textContent = anchoVentana <= 500 ? shortNames[index] : longNames[index];
//     }
//   });
// }

function actualizarContenido() {
  // Obtengo el ancho de la ventana
  const anchoVentana = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Obtengo todos los botones con clase "tablinks"
  const tablinks = document.getElementsByClassName("tablinks");

  // Itera sobre cada botón y actualiza su contenido
  for (let i = 0; i < tablinks.length; i++) {
    const tab = tablinks[i];
    if (anchoVentana <= 500) {
      tab.textContent = tab.getAttribute('data-short-name');
    } else {
      tab.textContent = tab.getAttribute('data-long-name');
    }
  }
}

// Llama a la función actualizarContenido cuando se carga la página
window.addEventListener('load', actualizarContenido);

// Llama a la función actualizarContenido cuando se cambia el tamaño de la ventana
window.addEventListener('resize', actualizarContenido);
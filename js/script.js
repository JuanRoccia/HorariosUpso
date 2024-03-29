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

// Implemetación de las funciones para manejar el inicio de sesión y registro
import { iniciarSesion, registrarse } from './auth.js';

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    iniciarSesion(email, password)
        .then(() => {
            alert('Inicio de sesión exitoso!');
            // Aquí puedes redirigir al usuario o cargar su información
        })
        .catch(error => {
            alert('Error al iniciar sesión: ' + error.message);
        });
}

function handleRegister() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    registrarse(email, password)
        .then(() => {
            alert('Registro exitoso!');
            // Aquí puedes redirigir al usuario o cargar su información
        })
        .catch(error => {
            alert('Error al registrarse: ' + error.message);
        });
}

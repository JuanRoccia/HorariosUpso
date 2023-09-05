// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGJ9dGv7SfkLLDrgZdzdKtB3XEO-NVZEE",
  authDomain: "proyecto-upso.firebaseapp.com",
  projectId: "proyecto-upso",
  storageBucket: "proyecto-upso.appspot.com",
  messagingSenderId: "807180650966",
  appId: "1:807180650966:web:30104887e5b478898abc77",
  measurementId: "G-WJL5KF06DD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Implemetacion BASE DE DATOS Firebase

// Obtiene una referencia a la base de datos de Firestore
const db = firebase.firestore();

// Función para guardar el progreso de una actividad
function guardarProgreso(usuarioId, actividadId, estado) {
db.collection('usuarios').doc(usuarioId).update({
    [`actividades.${actividadId}`]: estado
});
}

// Ejemplo de cómo llamar a la función para guardar el progreso
const usuarioId = 'ID_DEL_USUARIO'; // Debes obtener este ID al autenticar al usuario
const actividadId = 'ID_DE_LA_ACTIVIDAD'; // Puedes usar el nombre de la actividad como ID
const estado = true; // Estado de completado o no completado
guardarProgreso(usuarioId, actividadId, estado);



// Implementacion para el seguimiento de actividades

// Función para obtener el progreso de una actividad
function obtenerProgreso(usuarioId, actividadId) {
return db.collection('usuarios').doc(usuarioId).get()
    .then((doc) => {
    if (doc.exists) {
        const progreso = doc.data().actividades[actividadId];
        return progreso;
    } else {
        return null;
    }
    });
}

// Ejemplo de cómo llamar a la función para obtener el progreso
obtenerProgreso(usuarioId, actividadId)
.then((progreso) => {
    if (progreso === true) {
    // La actividad está completada
    } else if (progreso === false) {
    // La actividad no está completada
    } else {
    // No se encontró el progreso para la actividad
    }
});



// // Autenticar al usuario (ejemplo de autenticación por correo electrónico y contraseña)
// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Usuario autenticado, obtén su ID
//     const userId = userCredential.user.uid;

//     // Guardar el progreso del usuario (por ejemplo, actividad 1 completada)
//     guardarProgreso(userId, 'actividad1', true);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Función para guardar el progreso del usuario
// function guardarProgreso(userId, actividadId, estado) {
//   db.collection('usuarios').doc(userId).update({
//     [`actividades.${actividadId}`]: estado
//   });
// }

// // Recuperar y mostrar el progreso al cargar la página
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     const userId = user.uid;

//     // Obtener el progreso del usuario y mostrarlo en los checkboxes
//     obtenerProgreso(userId, 'actividad1').then((progreso) => {
//       if (progreso) {
//         // Marcar el checkbox correspondiente
//         document.getElementById('checkboxActividad1').checked = true;
//       }
//     });
//   }
// });

const auth = getAuth(app);
export { db, auth };
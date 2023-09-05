import { auth } from './firebase.js'; // Importa el objeto de autenticación desde firebase.js

// Función para iniciar sesión
export function iniciarSesion(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Función para registrarse
export function registrarse(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

// Función para cerrar sesión
export function cerrarSesion() {
    return auth.signOut();
}
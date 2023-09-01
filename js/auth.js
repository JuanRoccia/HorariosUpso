// Autenticar al usuario (ejemplo de autenticación por correo electrónico y contraseña)
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Usuario autenticado, obtén su ID
    const userId = userCredential.user.uid;

    // Guardar el progreso del usuario (por ejemplo, actividad 1 completada)
    guardarProgreso(userId, 'actividad1', true);
  })
  .catch((error) => {
    console.error(error);
  });

// Función para guardar el progreso del usuario
function guardarProgreso(userId, actividadId, estado) {
  db.collection('usuarios').doc(userId).update({
    [`actividades.${actividadId}`]: estado
  });
}

// Recuperar y mostrar el progreso al cargar la página
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;

    // Obtener el progreso del usuario y mostrarlo en los checkboxes
    obtenerProgreso(userId, 'actividad1').then((progreso) => {
      if (progreso) {
        // Marcar el checkbox correspondiente
        document.getElementById('checkboxActividad1').checked = true;
      }
    });
  }
});
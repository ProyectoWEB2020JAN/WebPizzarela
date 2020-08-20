// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC9pZKhBTD2A2ELydkw8IbfnKtdaiRvj8I",
  authDomain: "pizzarela-florencia.firebaseapp.com",
  databaseURL: "https://pizzarela-florencia.firebaseio.com",
  projectId: "pizzarela-florencia",
  storageBucket: "pizzarela-florencia.appspot.com",
  messagingSenderId: "956786996919",
  appId: "1:956786996919:web:c4933b8623389dca78bf32"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var storage = firebase.storage();
/* 
Para el registro de usuarios
*/
var userPassRegistro = document.getElementById('contraseña');
var userEmailRegistro = document.getElementById('correo');
var userNameRegistro = document.getElementById('usuario');
var userMovilRegistro = document.getElementById('celular');

function registrar() {
  firebase.auth().createUserWithEmailAndPassword(userEmailRegistro.value, userPassRegistro.value)
    .then((registroUsuario) => {

      db.collection("datosUsuarios").add({
        Nombre: userNameRegistro.value,
        Correo: userEmailRegistro.value,
        Celular: userMovilRegistro.value,
        uid: registroUsuario.user.uid
      })

      /* guardarDatosRegistro(user.uid) */
      /* window.location.href = "../index.html"; */
      console.log("El usuario se ha registrado");
      /* limpiarDatosRegistro(); */
    })
    .catch(function (error) {
      console.log("Error: ", error.message);
    });
}

function guardarDatosRegistro(id) {
  db.collection("datosUsuarios").add({
    Nombre: userNameRegistro.value,
    Correo: userEmailRegistro.value,
    Celular: userMovilRegistro,
    uid: id
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function limpiarDatosRegistro() {
  userNameRegistro.value = "";
  userPassRegistro.value = "";
  userEmailRegistro.value = "";
  userMovilRegistro.value = "";
}

/* para login de usuarios */

var userEmailLogin = document.getElementById('emailLogin');
var userPassLogin = document.getElementById('contraseñaLogin');

function logearse() {
  firebase.auth().signInWithEmailAndPassword(userEmailLogin.value, userPassLogin.value).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
function limpiarDatosLogin() {
  userEmailLogin.value = "";
  userPassLogin.value = "";
}

var administrar = document.getElementById('administrar');

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("usuario activo");
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
    } else {
      console.log("usuario inactivo");
      administrar.innerHTML = '<a class="nav-link" href="login.html">Iniciar Sesion<span class="sr-only">(current)</span></a>';
    }
  });
}

observador();
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
  firebase.auth().createUserWithEmailAndPassword(userEmailRegistro.value, userPassRegistro.value).then(function () {
    verificar();
    alert("le enviamos un correo para verificar su cuenta");
    console.log("se registro user");
    limpiarDatosRegistro();
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function actualizarDate() {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: userNameRegistro.value,
    phoneNumber: userMovilRegistro.value,
  }).then(function () {
    // Update successful.
  }).catch(function (error) {
    // An error happened.
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
  firebase.auth().signInWithEmailAndPassword(userEmailLogin.value, userPassLogin.value).then(function () {
    console.log("se ha logeado");
    limpiarDatosLogin();
    window.location.href = "index.html";
  }).catch(function (error) {
    console.log(error);
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function limpiarDatosLogin() {
  userEmailLogin.value = "";
  userPassLogin.value = "";
}

var administrar = document.getElementById('administrar');
var cerrarsesion = document.getElementById('cerrarsesion');

var email;

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("usuario activo");
      administrar.innerHTML = `<a class="nav-link" href="user-index.html">Administrar Cuenta<span class="sr-only">(current)</span></a>`;
      cerrarsesion.innerHTML = `<button type="button" class="btn btn-outline-primary" onclick="cerrarSesion()">Cerrar Sesion</button>`;
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      var phoneNumber = user.phoneNumber;
      console.log(user);

      localStorage.setItem('user', JSON.stringify(user.email))

    } else {
      console.log("usuario inactivo");
      administrar.innerHTML = `<a class="nav-link" href="login.html">Iniciar Sesion<span class="sr-only">(current)</span></a>`;
    }
  });
}

observador();

function cerrarSesion() {
  firebase.auth().signOut()
    .then(function () {
      console.log("sesion cerrada");
      window.location.href = "index.html";
    }).catch(function () {

    });
}

function verificar() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {
    console.log("correo enviado");
  }).catch(function (error) {
    console.log(error);
  });
}

/* FIRESTORE */
var listaUser = document.getElementById('lista');

function leerTodosPedidos(){
  listaUser.innerHTML = "";
    db.collection("pedidos")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              listaUser.innerHTML += `
                <tr>
                    <td>${doc.data().Correo}</td>
                    <td>${doc.data().precio}</td>
                    <td>@${doc.data().producto}</td>
                </tr>
                `;
            });
        })
        .catch(function (error) {
            console.log("Error : ", error);
        });
}





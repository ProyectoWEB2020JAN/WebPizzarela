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
var userNameRegistro = document.getElementById('usuario')
var userPassRegistro = document.getElementById('contraseña')
var userEmailRegistro = document.getElementById('correo')
var userMovilRegistro = document.getElementById('celular')

function registrarUsuario() {
  db.collection("usuarios").add({
    usuario: userNameRegistro.value,
    contraseña: userPassRegistro.value,
    correo: userEmailRegistro.value,
    celular: userMovilRegistro.value,
    rol: 2

  })
    .then((docRef) => {
      limpiarDatos() 
      console.log("Document written with ID: ", docRef.id);
      alert("REGISTRO EXITOSO BIENVENIDO A LA FAMILIA", docRef.Usuario)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Error en al Registrar", error)
    });
}

function limpiarDatos() {
  userNameRegistro.value = "";
  userPassRegistro.value = "";
  userEmailRegistro.value = "";
  userMovilRegistro.value = "";
}

function leerDatos() {
  listaUser.innerHTML = "";
  db.collection("usuarios")
      .get()
      .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              listaUser.innerHTML += `
              <tr>
                  <td>${doc.data().usuario}</td>
                  <td>${doc.data().celular}</td>
                  <td>@${doc.data().correo}</td>
              </tr>
              `;
          });
      })
      .catch(function (error) {
          console.log("Error : ", error);
      });
}


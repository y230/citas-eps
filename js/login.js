function IniciarSesion(){
    var user, pass;
    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;
    if(user == "administrador" && pass == "12345"){
      window.location= "../html/crud_diagnostico.html";
    }
    else{
      alert("Usted no es administrador")
    }
  }
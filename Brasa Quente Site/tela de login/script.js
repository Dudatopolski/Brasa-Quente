function login(event) {

    event.preventDefault();
  
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("senha-input").value;
  
    if (email === "juan23@gmail.com" && password === "3007") {
      alert("Login feito com sucesso!");
      
      window.location.href = "../tela inicial/index1.html";
    } else {
      alert("Credenciais erradas. Tente novamente.");
      
    }
  }
  
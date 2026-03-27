function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;

  // pegar usuários do localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // procurar usuário
  const usuarioValido = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (usuarioValido) {
    alert("Login feito com sucesso!");

    // opcional: salvar usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

    window.location.href = "../tela-inicial/index.html";
  } else {
    alert("Credenciais inválidas!");
  }
}
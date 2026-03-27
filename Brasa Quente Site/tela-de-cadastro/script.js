function cadastrar(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("password").value;

  // Validações básicas
  if (!nome || !email || !cpf || !senha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Valida CPF (remove máscara e verifica se tem 11 dígitos)
  const cpfNumeros = cpf.replace(/\D/g, '');
  if (cpfNumeros.length !== 11) {
    alert("Por favor, digite um CPF válido com 11 números!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioExiste = usuarios.find(u => u.email === email);

  if (usuarioExiste) {
    alert("Esse email já está cadastrado!");
    return;
  }

  const novoUsuario = {
    nome,
    email,
    cpf: cpfNumeros,
    senha
  };

  usuarios.push(novoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // 🔥 NOVO: Salva os dados do cadastro atual para mostrar na página de conclusão
  const cadastroAtual = {
    nome: nome,
    email: email,
    cpf: cpfNumeros
  };
  localStorage.setItem("cadastro_atual", JSON.stringify(cadastroAtual));

  // 🔥 ALTERADO: Redireciona para a página de cadastro concluído (com balões)
  window.location.href = "../cadastro-concluido/cadastro-concluido.html";
}
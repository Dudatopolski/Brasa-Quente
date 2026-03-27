// script.js - Animação de balões e redirecionamento

document.addEventListener('DOMContentLoaded', () => {
    // Recupera os dados do cadastro que foram salvos
    const cadastroAtual = localStorage.getItem('cadastro_atual');
    
    if (cadastroAtual) {
        const cadastro = JSON.parse(cadastroAtual);
        
        // Formata o CPF para exibição (máscara)
        const cpfFormatado = formatarCPF(cadastro.cpf);
        
        // Exibe as informações do cadastro na tela
        const infoCadastro = document.getElementById('infoCadastro');
        if (infoCadastro) {
            infoCadastro.innerHTML = `
                <div class="cadastro-info">
                    <p><strong>👤 Nome:</strong> ${cadastro.nome}</p>
                    <p><strong>📧 Email:</strong> ${cadastro.email}</p>
                    <p><strong>🆔 CPF:</strong> ${cpfFormatado}</p>
                </div>
            `;
        }
        
        // Limpa os dados do cadastro atual após usar (opcional)
        // localStorage.removeItem('cadastro_atual');
    } else {
        // Se não tiver dados, mostra uma mensagem padrão
        const infoCadastro = document.getElementById('infoCadastro');
        if (infoCadastro) {
            infoCadastro.innerHTML = `
                <div class="cadastro-info">
                    <p><strong>👤 Nome:</strong> Cliente Brasa Quente</p>
                    <p><strong>📧 Email:</strong> cadastro@email.com</p>
                </div>
            `;
        }
    }
    
    // Cria a animação de balões
    criarBaloes();
    
    // Redireciona para a tela inicial após 5 segundos
    setTimeout(() => {
        window.location.href = '../tela-inicial/index.html';
    }, 5000);
});

// Função para formatar CPF (000.000.000-00)
function formatarCPF(cpf) {
    if (!cpf) return 'Não informado';
    
    // Remove tudo que não é número
    const numeros = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (numeros.length === 11) {
        return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    return cpf; // Retorna o original se não for possível formatar
}

function criarBaloes() {
    const baloesContainer = document.getElementById('baloes-container');
    if (!baloesContainer) return;
    
    // Cores dos balões
    const cores = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
        '#ffeaa7', '#dfe6e9', '#ff9ff3', '#feca57', 
        '#ff6b6b', '#48dbfb', '#ff9ff3', '#54a0ff',
        '#f368e0', '#ff9f4a', '#5f27cd', '#00d2d3'
    ];
    
    // Número de balões
    const numBaloes = 35;
    
    for (let i = 0; i < numBaloes; i++) {
        setTimeout(() => {
            criarBalao(cores);
        }, i * 80);
    }
}

function criarBalao(cores) {
    const baloesContainer = document.getElementById('baloes-container');
    if (!baloesContainer) return;
    
    const balao = document.createElement('div');
    balao.className = 'balao';
    
    // Tamanho aleatório entre 30px e 100px
    const tamanho = Math.random() * 70 + 30;
    balao.style.width = `${tamanho}px`;
    balao.style.height = `${tamanho}px`;
    
    // Cor aleatória
    const cor = cores[Math.floor(Math.random() * cores.length)];
    balao.style.backgroundColor = cor;
    
    // Posição horizontal aleatória
    const posicaoEsquerda = Math.random() * 100;
    balao.style.left = `${posicaoEsquerda}%`;
    
    // Duração da animação
    const duracao = Math.random() * 4 + 2;
    balao.style.animationDuration = `${duracao}s`;
    
    // Atraso no início
    const atraso = Math.random() * 1.5;
    balao.style.animationDelay = `${atraso}s`;
    
    // Efeito de brilho
    balao.style.boxShadow = `0 5px 15px rgba(0,0,0,0.2), inset -5px -5px 10px rgba(0,0,0,0.1), inset 5px 5px 10px rgba(255,255,255,0.3)`;
    
    // Adiciona o fio do balão
    const fio = document.createElement('div');
    fio.className = 'fio';
    balao.appendChild(fio);
    
    // Adiciona brilho
    const brilho = document.createElement('div');
    brilho.className = 'brilho';
    balao.appendChild(brilho);
    
    baloesContainer.appendChild(balao);
    
    // Remove o balão após a animação
    setTimeout(() => {
        if (balao && balao.parentNode) {
            balao.remove();
        }
    }, duracao * 1000);
}
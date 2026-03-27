// script-concluido.js - Animação de balões e redirecionamento

document.addEventListener('DOMContentLoaded', () => {
    // Recupera os dados da reserva
    const reservaAtual = localStorage.getItem('reserva_atual');
    
    if (reservaAtual) {
        const reserva = JSON.parse(reservaAtual);
        
        // Exibe as informações da reserva na tela
        const infoReserva = document.getElementById('infoReserva');
        if (infoReserva) {
            infoReserva.innerHTML = `
                <div class="reserva-info">
                    <p><strong>📅 Data:</strong> ${reserva.dataFormatada}</p>
                    <p><strong>⏰ Horário:</strong> ${reserva.horario}</p>
                    <p><strong>👥 Pessoas:</strong> ${reserva.qtdPessoas}</p>
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

function criarBaloes() {
    const baloesContainer = document.getElementById('baloes-container');
    if (!baloesContainer) return;
    
    // Cores dos balões
    const cores = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
        '#ffeaa7', '#dfe6e9', '#ff9ff3', '#feca57', 
        '#ff6b6b', '#48dbfb', '#ff9ff3', '#54a0ff'
    ];
    
    // Número de balões
    const numBaloes = 30;
    
    for (let i = 0; i < numBaloes; i++) {
        setTimeout(() => {
            criarBalao(cores);
        }, i * 100); // Cria balões em sequência
    }
}

function criarBalao(cores) {
    const baloesContainer = document.getElementById('baloes-container');
    if (!baloesContainer) return;
    
    const balao = document.createElement('div');
    balao.className = 'balao';
    
    // Tamanho aleatório entre 40px e 120px
    const tamanho = Math.random() * 80 + 40;
    balao.style.width = `${tamanho}px`;
    balao.style.height = `${tamanho}px`;
    
    // Cor aleatória
    const cor = cores[Math.floor(Math.random() * cores.length)];
    balao.style.backgroundColor = cor;
    
    // Posição horizontal aleatória
    const posicaoEsquerda = Math.random() * 100;
    balao.style.left = `${posicaoEsquerda}%`;
    
    // Atraso na animação
    const duracao = Math.random() * 3 + 2; // 2-5 segundos
    balao.style.animationDuration = `${duracao}s`;
    
    // Atraso no início
    const atraso = Math.random() * 1;
    balao.style.animationDelay = `${atraso}s`;
    
    // Adiciona brilho
    balao.style.boxShadow = `0 5px 15px rgba(0,0,0,0.2), inset -5px -5px 10px rgba(0,0,0,0.1), inset 5px 5px 10px rgba(255,255,255,0.3)`;
    
    // Adiciona o fio do balão
    const fio = document.createElement('div');
    fio.className = 'fio';
    fio.style.backgroundColor = `rgba(0,0,0,0.3)`;
    balao.appendChild(fio);
    
    // Adiciona brilho extra
    const brilho = document.createElement('div');
    brilho.className = 'brilho';
    balao.appendChild(brilho);
    
    baloesContainer.appendChild(balao);
    
    // Remove o balão após a animação
    setTimeout(() => {
        if (balao && balao.parentNode) {
            balao.remove();
        }
    }, duracao * 3000);
}
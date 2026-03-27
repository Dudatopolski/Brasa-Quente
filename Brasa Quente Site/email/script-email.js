// script-email.js - Salva o email e redireciona para página de nova senha

// Função para mostrar mensagens de feedback
function showMessage(message, isError = true) {
    // Remove mensagem existente
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    const msgDiv = document.createElement('div');
    msgDiv.className = `form-message ${isError ? 'error' : 'success'}`;
    msgDiv.textContent = message;

    // Inserir mensagem após o formulário
    const form = document.querySelector('form');
    if (form) {
        form.insertAdjacentElement('afterend', msgDiv);
    }

    // Auto-remover após 3 segundos
    setTimeout(() => {
        msgDiv.remove();
    }, 3000);
}

// Função para salvar o email no localStorage
function saveEmail(email) {
    // Salva o email temporariamente para ser usado na próxima página
    const resetData = {
        resetEmail: email,
        timestamp: Date.now()
    };
    localStorage.setItem('passwordResetSession', JSON.stringify(resetData));
    console.log('Email salvo:', email);
}

// Função principal chamada pelo formulário
function enviarEmail(event) {
    event.preventDefault();
    
    const emailInput = document.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
        showMessage('Por favor, informe seu email.');
        return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor, informe um email válido.');
        return;
    }

    // Salva o email
    saveEmail(email);
    
    // Mostra mensagem de sucesso
    showMessage('Email salvo! Redirecionando...', false);
    
    // Redireciona para página de nova senha após 1 segundo
    setTimeout(() => {
        window.location.href = '../nova-senha/nova-senha.html';
    }, 1000);
}

// Adiciona estilos dinâmicos para as mensagens
function addStyles() {
    if (document.querySelector('#msg-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'msg-styles';
    style.textContent = `
        .form-message {
            margin-top: 1rem;
            padding: 0.75rem;
            border-radius: 8px;
            font-size: 0.9rem;
            text-align: center;
            animation: fadeIn 0.3s ease;
        }
        .form-message.error {
            background-color: rgba(220, 53, 69, 0.2);
            color: #dc3545;
            border-left: 3px solid #dc3545;
        }
        .form-message.success {
            background-color: rgba(40, 167, 69, 0.2);
            color: #28a745;
            border-left: 3px solid #28a745;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Inicializa quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    
    // Limpa qualquer sessão anterior ao entrar na página de email
    localStorage.removeItem('passwordResetSession');
    
    // Associa a função ao formulário
    const form = document.querySelector('form');
    if (form) {
        form.onsubmit = enviarEmail;
    }
});
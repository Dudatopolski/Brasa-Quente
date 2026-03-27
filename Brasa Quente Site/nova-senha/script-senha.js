// script-senha.js - Recupera o email salvo e salva a nova senha

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

// Função para recuperar o email salvo
function getSavedEmail() {
    const resetData = localStorage.getItem('passwordResetSession');
    if (!resetData) return null;
    
    try {
        const data = JSON.parse(resetData);
        return data.resetEmail;
    } catch (error) {
        console.error('Erro ao recuperar email:', error);
        return null;
    }
}

// Função para salvar a nova senha
function saveNewPassword(email, newPassword) {
    // Recupera usuários existentes ou cria novo objeto
    let users = {};
    const storedUsers = localStorage.getItem('brasa_quente_users');
    
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
    
    // Verifica se o usuário já existe
    if (users[email]) {
        // Atualiza a senha do usuário existente
        users[email].password = newPassword;
        users[email].updatedAt = new Date().toISOString();
        console.log('Senha atualizada para:', email);
    } else {
        // Cria novo usuário
        users[email] = {
            email: email,
            password: newPassword,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        console.log('Novo usuário criado:', email);
    }
    
    // Salva no localStorage
    localStorage.setItem('brasa_quente_users', JSON.stringify(users));
    
    // Registra o histórico de alteração de senha
    const resetLog = {
        email: email,
        newPassword: newPassword,
        timestamp: new Date().toISOString()
    };
    
    let resetHistory = [];
    const storedHistory = localStorage.getItem('password_reset_history');
    if (storedHistory) {
        resetHistory = JSON.parse(storedHistory);
    }
    resetHistory.push(resetLog);
    localStorage.setItem('password_reset_history', JSON.stringify(resetHistory));
    
    return true;
}

// Função para limpar a sessão após salvar
function clearResetSession() {
    localStorage.removeItem('passwordResetSession');
}

// Função principal chamada pelo formulário
function salvarNovaSenha(event) {
    event.preventDefault();
    
    // Recupera o email salvo anteriormente
    const email = getSavedEmail();
    
    if (!email) {
        showMessage('Sessão expirada. Por favor, reinicie o processo de recuperação de senha.');
        setTimeout(() => {
            window.location.href = 'email.html';
        }, 2000);
        return;
    }
    
    // Verifica se a sessão não expirou (30 minutos)
    const resetData = JSON.parse(localStorage.getItem('passwordResetSession'));
    const now = Date.now();
    const sessionAge = now - (resetData.timestamp || 0);
    
    if (sessionAge > 30 * 60 * 1000) {
        showMessage('Sessão expirada (mais de 30 minutos). Por favor, reinicie o processo.');
        clearResetSession();
        setTimeout(() => {
            window.location.href = 'esqueceu-senha.html';
        }, 2000);
        return;
    }
    
    // Captura os valores dos campos de senha
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const novaSenha = passwordInputs[0].value;
    const confirmarSenha = passwordInputs[1].value;
    
    // Validações
    if (!novaSenha || !confirmarSenha) {
        showMessage('Por favor, preencha ambos os campos de senha.');
        return;
    }
    
    if (novaSenha.length < 6) {
        showMessage('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    
    if (novaSenha !== confirmarSenha) {
        showMessage('As senhas não conferem. Digite novamente.');
        return;
    }
    
    // Salva a nova senha
    saveNewPassword(email, novaSenha);
    
    // Limpa a sessão temporária
    clearResetSession();
    
    // Mostra mensagem de sucesso
    showMessage(`Senha alterada com sucesso para ${email}! Redirecionando...`, false);
    
    // Redireciona para a página de login após 2 segundos
    setTimeout(() => {
        window.location.href = '../tela-de-login/index.html';
    }, 2000);
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

// Verifica se há email salvo ao carregar a página
function verificarSessao() {
    const email = getSavedEmail();
    if (!email) {
        const warningMsg = document.createElement('div');
        warningMsg.className = 'form-message error';
        warningMsg.textContent = 'Sessão não encontrada. Por favor, inicie a recuperação de senha novamente.';
        
        const form = document.querySelector('form');
        if (form) {
            form.insertAdjacentElement('afterend', warningMsg);
        }
        
        setTimeout(() => {
            window.location.href = 'esqueceu-senha.html';
        }, 3000);
    }
}

// Inicializa quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    verificarSessao();
    
    // Associa a função ao formulário
    const form = document.querySelector('form');
    if (form) {
        form.onsubmit = salvarNovaSenha;
    }
});
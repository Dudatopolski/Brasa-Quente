// script-reserva.js - Gerencia a reserva e redireciona

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formReserva');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Captura os dados da reserva
            const qtdPessoas = document.getElementById('qtd').value;
            const horario = document.getElementById('hora').value;
            const data = document.getElementById('data').value;
            
            // Validações
            if (!qtdPessoas || !horario || !data) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Valida se a data é futura
            const dataReserva = new Date(data);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            
            if (dataReserva < hoje) {
                alert('Por favor, escolha uma data futura!');
                return;
            }
            
            // Formata a data para exibição
            const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
            
            // Cria objeto com os dados da reserva
            const reserva = {
                id: Date.now(),
                qtdPessoas: qtdPessoas,
                horario: horario,
                data: data,
                dataFormatada: dataFormatada,
                timestamp: new Date().toISOString()
            };
            
            // Salva a reserva no localStorage
            let reservas = [];
            const reservasSalvas = localStorage.getItem('reservas_brasa');
            
            if (reservasSalvas) {
                reservas = JSON.parse(reservasSalvas);
            }
            
            reservas.push(reserva);
            localStorage.setItem('reservas_brasa', JSON.stringify(reservas));
            
            // Salva a reserva atual para exibir na página de conclusão
            localStorage.setItem('reserva_atual', JSON.stringify(reserva));
            
            // Redireciona para a página de conclusão
            window.location.href = '../concluido-reserva/concluido-reserva.html';
        });
    }
});
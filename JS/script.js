document.addEventListener('DOMContentLoaded', function() {
    // Recupera o nome do usuário do localStorage
    const nomeUsuario = localStorage.getItem('usuarioNome');
    if (nomeUsuario) {
        document.getElementById('nomeUsuario').textContent = nomeUsuario;
    } else {
        // Redireciona para a página de login se o nome não estiver definido
        window.location.href = 'login.html';
    }
});

let historicoProjetos = [];

function calcularAndamento() {
    const nomeProjeto = document.getElementById('nomeProjeto').value;
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFim = new Date(document.getElementById('dataFim').value);
    const dataHoje = new Date();

    if (!nomeProjeto || isNaN(dataInicio) || isNaN(dataFim)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    if (dataInicio > dataFim) {
        alert("A data de início deve ser anterior à data de fim.");
        return;
    }

    const diferencaInicioHoje = Math.floor((dataHoje - dataInicio) / (1000 * 3600 * 24));
    const diferencaHojeFim = Math.floor((dataFim - dataHoje) / (1000 * 3600 * 24));

    document.getElementById('resultadoInicioHoje').innerText = `Dias desde o início: ${diferencaInicioHoje} dias.`;
    document.getElementById('resultadoHojeFim').innerText = `Dias restantes para o término: ${diferencaHojeFim} dias.`;

    const projeto = {
        nome: nomeProjeto,
        inicio: dataInicio.toLocaleDateString(),
        fim: dataFim.toLocaleDateString(),
        diasDesdeInicio: diferencaInicioHoje,
        diasRestantes: diferencaHojeFim
    };

    historicoProjetos.unshift(projeto);
    if (historicoProjetos.length > 5) {
        historicoProjetos.pop();
    }

    atualizarHistorico();
    abrirModal();
}

function atualizarHistorico() {
    const listaHistorico = document.getElementById('listaHistorico');
    listaHistorico.innerHTML = '';

    historicoProjetos.forEach(projeto => {
        const item = document.createElement('li');
        item.innerHTML = `
            <strong>Nome do projeto:</strong> ${projeto.nome}<br>
            <strong>Datas:</strong> Início: ${projeto.inicio} | Término: ${projeto.fim}<br>
            <strong>Resultados:</strong> Dias desde o início: ${projeto.diasDesdeInicio} | Dias restantes: ${projeto.diasRestantes}
        `;
        listaHistorico.appendChild(item);
    });
}

function limparHistorico() {
    historicoProjetos = [];
    atualizarHistorico();
}

function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('nomeProjeto').value = '';
    document.getElementById('dataInicio').value = '';
    document.getElementById('dataFim').value = '';
}

function sair() {
    // Remove o nome do usuário do localStorage e redireciona para a página de login
    localStorage.removeItem('usuarioNome');
    window.location.href = 'login.html';
}
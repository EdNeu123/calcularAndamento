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
    const dataInicioInput = document.getElementById('dataInicio').value;
    const dataFimInput = document.getElementById('dataFim').value;
    const tasksTotalInput = document.getElementById('TasksTotal').value;
    const tasksFinalizadasInput = document.getElementById('TasksFinalizadas').value;

    // Verifica se todos os campos foram preenchidos
    if (!nomeProjeto || !dataInicioInput || !dataFimInput || !tasksTotalInput || !tasksFinalizadasInput) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const dataInicio = new Date(dataInicioInput);
    const dataFim = new Date(dataFimInput);
    const dataHoje = new Date();

    // Valida as datas
    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
        alert("Datas inválidas.");
        return;
    }

    if (dataInicio > dataFim) {
        alert("A data de início deve ser anterior à data de fim.");
        return;
    }

    // Converte os valores de tasks para números inteiros
    const tasksTotal = parseInt(tasksTotalInput, 10);
    const tasksFinalizadas = parseInt(tasksFinalizadasInput, 10);

    if (isNaN(tasksTotal) || isNaN(tasksFinalizadas)) {
        alert("Valores de tasks inválidos.");
        return;
    }

    if (tasksFinalizadas > tasksTotal) {
        alert("As tasks concluidas devem ser menores ou iguais ao total de tasks.");
        return;
    }
    


    // Calcula as diferenças de dias
    const diferencaInicioHoje = Math.floor((dataHoje - dataInicio) / (1000 * 3600 * 24));
    const diferencaHojeFim = Math.floor((dataFim - dataHoje) / (1000 * 3600 * 24));
    const tasksRestantes = tasksTotal - tasksFinalizadas;

    // Atualiza os resultados na tela
    document.getElementById('resultadoInicioHoje').innerText = `Dias desde o início: ${diferencaInicioHoje} dias.`;
    document.getElementById('resultadoHojeFim').innerText = `Dias restantes para o término: ${diferencaHojeFim} dias.`;
    document.getElementById('Tasks').innerText = `Tasks restantes: ${tasksRestantes}.`;

    // Cria o objeto do projeto
    const projeto = {
        nome: nomeProjeto,
        inicio: dataInicio.toLocaleDateString(),
        fim: dataFim.toLocaleDateString(),
        diasDesdeInicio: diferencaInicioHoje,
        diasRestantes: diferencaHojeFim,
        tasksRestantes: tasksRestantes
    };

    // Adiciona o projeto no histórico (máximo de 5 registros)
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
            <strong>Resultados:</strong> Dias desde o início: ${projeto.diasDesdeInicio} | Dias restantes: ${projeto.diasRestantes} <br>
            <strong>Tasks restantes:</strong> Tasks restantes: ${projeto.tasksRestantes}
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
    document.getElementById('TasksTotal').value = '';
    document.getElementById('TasksFinalizadas').value = '';

    // Limpa os resultados, se necessário
    document.getElementById('resultadoInicioHoje').innerText = '';
    document.getElementById('resultadoHojeFim').innerText = '';
    document.getElementById('Tasks').innerText = '';
}

function sair() {
    // Remove o nome do usuário do localStorage e redireciona para a página de login
    localStorage.removeItem('usuarioNome');
    window.location.href = 'login.html';
}

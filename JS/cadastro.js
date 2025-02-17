document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nomeCompleto = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nomeCompleto && email && senha) {
        // Captura apenas o primeiro nome
        const primeiroNome = nomeCompleto.split(' ')[0];
        // Armazena o primeiro nome no localStorage
        localStorage.setItem('usuarioNome', primeiroNome);
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
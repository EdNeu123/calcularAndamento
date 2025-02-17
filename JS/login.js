document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email && senha) {
        alert('Login realizado com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a página principal
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
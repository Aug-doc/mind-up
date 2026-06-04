const form =
    document.getElementById('meuFormulario');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const nome =
        document.getElementById('nome').value;

    const email =
        document.getElementById('email').value;

    const username =
        document.getElementById('username').value;

    const senha =
        document.getElementById('senha').value;

    const confirmarSenha =
        document.getElementById('confirmarSenha').value;

    if (
        !nome.trim() ||
        !email.trim() ||
        !username.trim()
    ) {

        alert('Preencha todos os campos');

        return;

    }

    if (senha !== confirmarSenha) {

        alert('As senhas não coincidem');

        return;

    }

    if (senha.length < 8) {

        alert('A senha deve ter pelo menos 8 caracteres');

        return;

    }

    try {

        const resposta = await fetch(
            'http://localhost:3000/cadastro',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    nome,
                    username,
                    email,
                    senha
                })
            }
        );

        const dados =
            await resposta.json();

        alert(dados.mensagem);

    } catch (erro) {

        console.log(erro);

        alert('Erro ao conectar');

    }

});
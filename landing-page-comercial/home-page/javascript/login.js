const form =
    document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email =
        document.getElementById('email').value;

    const senha =
        document.getElementById('senha').value;

    try {

        const resposta = await fetch(
            'http://localhost:3000/login',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );

        const dados =
            await resposta.json();

        alert(dados.mensagem);

        if (dados.sucesso) {

            window.location.href =
                'index.html';

        }

    } catch (erro) {

        console.log(erro);

        alert('Erro ao conectar');

    }

});
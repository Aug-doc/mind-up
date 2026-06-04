const usuario =
    JSON.parse(localStorage.getItem('usuario'));

if (usuario) {

    document.getElementById('menuUsuario')
        .innerHTML = `
            <li>Olá, ${usuario.nome}</li>
            <li>
                <a href="#" id="btnSair">
                    Sair
                </a>
            </li>
        `;

    document
        .getElementById('btnSair')
        .addEventListener('click', () => {

            localStorage.removeItem('usuario');

            window.location.reload();

        });

}
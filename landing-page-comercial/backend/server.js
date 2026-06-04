const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

app.post('/cadastro', async (req, res) => {

    const {
        nome,
        username,
        email,
        senha
    } = req.body;

    const verificarSql = `
        SELECT *
        FROM usuarios
        WHERE email = ? OR username = ?
    `;

    db.query(
        verificarSql,
        [email, username],
        async (err, resultado) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    mensagem: 'Erro no servidor'
                });

            }

            if (resultado.length > 0) {

                const usuarioExistente =
                    resultado[0];

                if (
                    usuarioExistente.email === email
                ) {

                    return res.status(400).json({
                        mensagem:
                            'Este e-mail já está cadastrado'
                    });

                }

                if (
                    usuarioExistente.username === username
                ) {

                    return res.status(400).json({
                        mensagem:
                            'Este nome de usuário já está em uso'
                    });

                }

            }

            try {

                const senhaHash =
                    await bcrypt.hash(
                        senha,
                        10
                    );

                const inserirSql = `
                    INSERT INTO usuarios
                    (nome, username, email, senha)
                    VALUES (?, ?, ?, ?)
                `;

                db.query(
                    inserirSql,
                    [
                        nome,
                        username,
                        email,
                        senhaHash
                    ],
                    (err) => {

                        if (err) {

                            console.log(err);

                            return res.status(500).json({
                                mensagem:
                                    'Erro no cadastro'
                            });

                        }

                        res.json({
                            mensagem:
                                'Usuário cadastrado com sucesso'
                        });

                    }
                );

            } catch (erro) {

                console.log(erro);

                res.status(500).json({
                    mensagem:
                        'Erro ao criptografar senha'
                });

            }

        }
    );

});

app.post('/login', (req, res) => {

    const { email, senha } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ?
    `;

    db.query(
        sql,
        [email],
        async (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    mensagem: 'Erro no servidor'
                });

            }

            if (result.length === 0) {

                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Email ou senha incorretos'
                });

            }

            const usuario = result[0];

            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );

            if (!senhaCorreta) {

                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Email ou senha incorretos'
                });

            }

            res.json({
                sucesso: true,
                mensagem: 'Login realizado',
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    username: usuario.username,
                    email: usuario.email
                }
            });

        }
    );

});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
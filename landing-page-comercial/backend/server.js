const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

app.post('/cadastro', (req, res) => {

    const {
        nome,
        username,
        email,
        senha
    } = req.body;

    const sql = `
        INSERT INTO usuarios
        (nome, username, email, senha)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nome, username, email, senha],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    mensagem: 'Erro no cadastro'
                });

            }

            res.json({
                mensagem: 'Usuário cadastrado com sucesso'
            });

        }
    );

});

app.post('/login', (req, res) => {

    const { email, senha } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ? AND senha = ?
    `;

    db.query(
        sql,
        [email, senha],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    mensagem: 'Erro no servidor'
                });

            }

            if (result.length > 0) {

                res.json({
                    sucesso: true,
                    mensagem: 'Login realizado'
                });

            } else {

                res.status(401).json({
                    sucesso: false,
                    mensagem: 'Email ou senha incorretos'
                });

            }

        }
    );

});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
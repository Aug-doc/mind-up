const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'mindup'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar:', err);
    } else {
        console.log('MySQL conectado');
    }
});

module.exports = connection;
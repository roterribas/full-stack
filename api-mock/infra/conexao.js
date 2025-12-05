import mysql from 'mysql2';

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    usuario: 'root',
    password: 'root',
    database: 'copa_mundo'
});

conexao.connect();

export default conexao;
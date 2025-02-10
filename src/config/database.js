require('dotenv').config(); // Carregar variáveis do .env
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Monitoramento de conexões
pool.on('acquire', (connection) => {
    console.log('Conexão %d adquirida', connection.threadId);
});

pool.on('release', (connection) => {
    console.log('Conexão %d liberada', connection.threadId);
});

// Exportar o pool para ser utilizado em outros arquivos
module.exports = pool;

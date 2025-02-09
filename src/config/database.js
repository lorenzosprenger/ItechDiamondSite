// config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,          // Host do banco
    user: process.env.DB_USER,          // Usuário do banco
    password: process.env.DB_PASSWORD,  // Senha do banco
    database: process.env.DB_NAME,      // Nome do banco
    port: process.env.DB_PORT || 3306,  // Porta do banco
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Melhor tratamento de erro na conexão
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conectado ao banco de dados MySQL com sucesso!');
        connection.release();
    } catch (err) {
        console.error('❌ Erro ao conectar ao banco:', err);
        console.error('Tentando conectar em:', process.env.DB_HOST);
    }
})();

module.exports = pool;

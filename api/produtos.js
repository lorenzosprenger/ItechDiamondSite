const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Iniciando configuração do banco de dados...');
console.log('Variáveis de ambiente carregadas:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Criar pool de conexão
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Função para testar a conexão
async function testConnection() {
    console.log('Testando conexão com o banco de dados...');
    try {
        const connection = await pool.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        console.log('Configurações de conexão:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        connection.release();
        return true;
    } catch (error) {
        console.error('Erro detalhado ao conectar com o banco de dados:', {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState,
            sqlMessage: error.sqlMessage
        });
        return false;
    }
}

module.exports = async (req, res) => {
    console.log('Handler de produtos executado');
    try {
        const mockProdutos = [
            {
                id: 1,
                nome: "Fresa de Topo",
                referencia: "FT-001",
                categoria: "fresa"
            },
            {
                id: 2,
                nome: "Broca Helicoidal",
                referencia: "BH-001",
                categoria: "broca"
            }
        ];

        try {
            console.log('Tentando conectar ao banco de dados...');
            const [rows] = await pool.query('SELECT * FROM produtos');
            console.log('Dados recuperados do banco:', rows);
            res.json(rows);
        } catch (dbError) {
            console.error('Erro ao acessar banco de dados:', dbError);
            console.log('Retornando dados mock');
            res.json(mockProdutos);
        }
    } catch (error) {
        console.error('Erro no handler de produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};
const mysql = require('mysql2/promise');
require('dotenv').config();

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

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    // Sempre retornar todos os produtos (remoção da paginação)
    try {
        const [rows] = await pool.query('SELECT * FROM produtos');

        // Total de produtos
        const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM produtos');

        res.status(200).json({
            products: rows,
            totalPages: 1,
            currentPage: 1,
            total: total
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};
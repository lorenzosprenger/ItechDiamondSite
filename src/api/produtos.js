const mysql = require('mysql2/promise');
require('dotenv').config();

// Support both DB_* and MYSQL_ADDON_* environment variable names (Clever Cloud)
const dbHost = process.env.DB_HOST || process.env.MYSQL_ADDON_HOST;
const dbUser = process.env.DB_USER || process.env.MYSQL_ADDON_USER;
const dbPassword = process.env.DB_PASSWORD || process.env.MYSQL_ADDON_PASSWORD;
const dbName = process.env.DB_NAME || process.env.MYSQL_ADDON_DB;
const dbPort = process.env.DB_PORT || process.env.MYSQL_ADDON_PORT || 3306;

const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    port: Number(dbPort),
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
        // If DEBUG_DB is set to 'true' return the error message/stack to help debugging in staging
        if (process.env.DEBUG_DB === 'true') {
            return res.status(500).json({ error: 'Erro ao buscar produtos', message: error.message, stack: error.stack });
        }
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};
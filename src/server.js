const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dbConfig = require('./config/database');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://itech-diamond-git-main-lorenzosprengers-projects.vercel.app', 'https://itech-diamond.vercel.app']
        : 'http://localhost:3000',
    credentials: true
}));

const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requisições
}));

app.use(express.json());
app.use(express.static('src')); // Serve arquivos estáticos da pasta src

// Criar pool de conexões MySQL com configurações mais detalhadas
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

// Teste de conexão ao iniciar o servidor
pool.getConnection()
    .then(connection => {
        console.log('Conectado ao banco de dados MySQL com sucesso!');
        connection.release();
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco:', err.message);
    });

// Endpoint para buscar produtos com melhor tratamento de erro
app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produtos');
        console.log('Produtos encontrados:', rows.length);
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar produtos',
            details: error.message
        });
    }
});

module.exports = app;

// Só inicia o servidor se não estiver no Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
} 
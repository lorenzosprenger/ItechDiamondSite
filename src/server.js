require('dotenv').config(); // Carrega variáveis do .env automaticamente

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pool = require('./config/database'); // Importa a conexão do banco

const app = express();
const port = process.env.PORT || 3000;

// Segurança
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://itech-diamond-git-main-lorenzosprengers-projects.vercel.app', 'https://itech-diamond.vercel.app']
        : 'http://localhost:3000',
    credentials: true
}));

// Limite de requisições
app.use('/api/', rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limite de 100 requisições
}));

app.use(express.json());
app.use(express.static('src'));

// Rota para buscar produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produtos');
        console.log(`Produtos encontrados: ${rows.length}`);
        res.json(rows);
    } catch (error) {
        console.error('Erro detalhado:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar produtos',
            details: error.message,
            code: error.code
        });
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});

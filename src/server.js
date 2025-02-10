require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const produtosHandler = require('./api/produtos');
const testHandler = require('./api/test');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('src'));

// Rotas da API
app.get('/api/test', testHandler);
app.get('/api/produtos', async (req, res) => {
    try {
        await produtosHandler(req, res);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para páginas HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// Log das configurações de conexão
console.log('Configurações de conexão do banco de dados:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ? '********' : 'undefined',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Inicialização do servidor
const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
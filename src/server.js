require('dotenv').config();
const express = require('express');
const cors = require('cors');
const produtosHandler = require('../api/produtos');
const testHandler = require('../api/test');
const path = require('path');

const app = express();

// Configurações básicas
app.use(cors());
app.use(express.json());
app.use(express.static('src'));


// Rotas da API
app.get('/api/test', testHandler);
app.get('/api/produtos', produtosHandler);

// Adicione esta rota antes da inicialização do servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Certifique-se de que o caminho para o arquivo está correto
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
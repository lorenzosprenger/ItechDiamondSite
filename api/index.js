const express = require('express');
const cors = require('cors');
const produtosHandler = require('./produtos');

const app = express();

app.use(cors());
app.use(express.json());

// Log middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rota raiz da API
app.get('/', (req, res) => {
    res.json({ message: 'API está funcionando!' });
});

// Rota produtos sem o prefixo /api
app.get('/produtos', produtosHandler);

// Handler para rotas não encontradas
app.use((req, res) => {
    console.log(`Rota não encontrada: ${req.url}`);
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.url
    });
});

// Handler de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: err.message
    });
});

module.exports = app; 
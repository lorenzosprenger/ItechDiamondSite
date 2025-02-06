-- Criação da tabela de produtos
CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    referencia VARCHAR(100) NOT NULL UNIQUE,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2),
    estoque INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para melhor performance
    INDEX idx_categoria (categoria),
    INDEX idx_referencia (referencia)
);

-- Criação de tabela para log de alterações
CREATE TABLE produtos_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT,
    acao VARCHAR(20),
    dados_antigos JSON,
    dados_novos JSON,
    usuario VARCHAR(100),
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Criação de tabela para controle de estoque
CREATE TABLE movimentacao_estoque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT,
    tipo_movimento ENUM('entrada', 'saida'),
    quantidade INT,
    data_movimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
); 
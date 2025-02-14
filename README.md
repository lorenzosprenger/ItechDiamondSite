# iTech Diamond

<div align="center">
  <img src="src/assets/logoItech.png" alt="iTech Diamond Logo" width="200"/>
</div>

## 📋 Sobre o Projeto

iTech Diamond é um site de comércio eletrônico especializado em ferramentas de precisão, sendo distribuidor oficial GESAC. O projeto oferece uma plataforma para visualização de produtos, solicitação de orçamentos e suporte técnico.

## 🛠 Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3 (Tailwind CSS)
  - JavaScript (Vanilla)

- **Backend:**
  - Node.js
  - Express.js
  - MySQL

- **Deploy:**
  - Vercel
  - Clever Cloud (Banco de Dados)

## 📁 Estrutura do Projeto

```
iTechDiamondSite/
├── src/
│   ├── api/
│   │   ├── produtos.js      # Handler para API de produtos
│   │   ├── test.js         # Endpoints de teste
│   │   └── index.js        # Configuração principal da API
│   ├── assets/
│   │   ├── DIAMANTE.png    # Ícone do site
│   │   └── logoItech.png   # Logo principal
│   ├── components/
│   │   └── SpeedInsights.js # Componente de análise de performance
│   ├── config/
│   │   └── database.js     # Configuração do banco de dados
│   ├── database/
│   │   ├── schema.sql      # Estrutura do banco de dados
│   │   └── insert_produtos.sql # Dados iniciais
│   ├── scripts/
│   │   ├── cart.js         # Lógica do carrinho
│   │   ├── common.js       # Funções compartilhadas
│   │   ├── main.js         # Script principal
│   │   ├── mensagens.js    # Lógica de mensagens
│   │   └── products.js     # Lógica de produtos
│   ├── styles/
│   │   ├── common.css      # Estilos compartilhados
│   │   ├── output.css      # CSS compilado do Tailwind
│   │   └── tailwind.css    # Configurações do Tailwind
│   ├── carrinho.html       # Página do carrinho
│   ├── ferramentas.html    # Página de produtos
│   ├── index.html          # Página principal
│   ├── robots.txt          # Configurações para crawlers
│   ├── suporte.html        # Página de suporte
│   ├── tecnologia.html     # Página de tecnologia
│   └── server.js           # Servidor Node.js
├── .env                    # Variáveis de ambiente
├── .env.example           # Exemplo de variáveis de ambiente
├── .env.local             # Variáveis locais
├── .gitignore             # Arquivos ignorados pelo git
├── .vercelignore          # Arquivos ignorados pelo Vercel
├── package.json           # Dependências e scripts
├── package-lock.json      # Versões específicas das dependências
└── vercel.json           # Configuração do deploy Vercel
```

## Instalação

1. Clone o repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```sh
   cp .env.example .env
   ```

4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

## Deploy

O projeto está configurado para deploy automático na Vercel. Cada push para a branch principal aciona um novo deploy.

## Licença

Este projeto está licenciado sob a MIT License.


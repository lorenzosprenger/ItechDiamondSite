# Itech Diamond Landing Page

Este projeto é uma landing page para o e-commerce da Itech Diamond, construída utilizando Tailwind CSS para estilização e JavaScript para interatividade.

## Estrutura do Projeto

```
ItechDiamondSite
├── node_modules/            # Dependências do Node.js
├── src/                     # Diretório principal do código-fonte
│   ├── assets/              # Recursos estáticos (imagens, ícones, etc.)
│   │   ├── DIAMANTE.png     # Logo do diamante
│   │   └── logoltech.png    # Logo da Itech
│   ├── scripts/             # Scripts JavaScript
│   │   └── main.js          # Código para interatividade
│   ├── styles/              # Diretório de estilos
│   │   ├── output.css       # Arquivo de saída do Tailwind CSS
│   │   └── tailwind.css     # Estilos personalizados com Tailwind CSS
│   ├── enviar_email.php     # Script para envio de emails
│   ├── ferramentas.html     # Página de ferramentas
│   ├── index.html           # Página principal da landing page
│   ├── suporte.html         # Página de suporte
│   ├── tecnologia.html      # Página de tecnologia
│   └── teste.php            # Página de teste
├── .gitignore               # Arquivo de configurações do Git
├── package.json             # Configuração do npm
├── package-lock.json        # Dependências do npm
├── tailwind.config.js       # Configuração do Tailwind CSS
└── README.md                # Documentação do projeto
```

## Instalação

1. Clone o repositório:

   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:

   ```sh
   cd ItechDiamondSite
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

## Uso

Para iniciar o projeto, você pode abrir o arquivo `src/index.html` em um navegador. Para um ambiente de desenvolvimento mais robusto, considere usar um servidor local, como o Live Server do VS Code:

```sh
npx live-server src
```

Se precisar recompilar os estilos do Tailwind CSS, utilize:

```sh
npx tailwindcss -i src/styles/tailwind.css -o src/styles/output.css --watch
```

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.


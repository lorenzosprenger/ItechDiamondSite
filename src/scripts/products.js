// Adiciona o filtro de suporte
const filtroContainer = document.querySelector(".flex.justify-center");
const btnSuporte = document.createElement("button");
btnSuporte.id = "suporte";
btnSuporte.className = "filter-btn px-6 py-2 bg-white text-diamond rounded-full hover:bg-gray-50 transition";
btnSuporte.innerText = "Suporte";
filtroContainer.appendChild(btnSuporte);


// Função para carregar produtos da API
async function loadProdutos() {
    try {
        console.log('Iniciando carregamento de produtos...');
        const apiUrl = '/api/produtos';
        console.log('Fazendo requisição para:', apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Status da resposta:', response.status);
        console.log('Headers:', Object.fromEntries(response.headers));
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Resposta não-OK:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText,
                url: response.url
            });
            throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
        }
        
        const produtos = await response.json();
        console.log('Produtos carregados:', produtos);
        renderProdutos(produtos);
    } catch (error) {
        console.error('Erro detalhado ao carregar produtos:', {
            message: error.message,
            stack: error.stack
        });
    }
}


// Função para renderizar produtos na página
function renderProdutos(produtos) {
    const container = document.querySelector('.grid');
    container.innerHTML = '';
    
    produtos.forEach(produto => {
        const produtoHtml = `
            <div class="produto bg-white rounded-lg shadow-lg overflow-hidden" data-categoria="${produto.categoria}">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-diamond mb-2">${produto.nome}</h3>
                    <p class="text-gray-600 mb-2"><strong>Referência:</strong> ${produto.referencia}</p>
                    <button onclick="addToCart(${JSON.stringify(produto)})" class="bg-diamond text-white px-4 py-2 rounded hover:bg-diamond-hover transition">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += produtoHtml;
    });
}

// Configuração dos filtros
function setupFiltros() {
    const filtroContainer = document.querySelector(".flex.justify-center");
    if (!filtroContainer) {
        console.error('Container de filtros não encontrado');
        return;
    }

    // Adiciona botão de suporte se não existir
    if (!document.getElementById('suporte')) {
        const btnSuporte = document.createElement("button");
        btnSuporte.id = "suporte";
        btnSuporte.className = "filter-btn px-6 py-2 bg-white text-diamond rounded-full hover:bg-gray-50 transition";
        btnSuporte.innerText = "Suporte";
        filtroContainer.appendChild(btnSuporte);
    }

    // Configura os filtros
    const buttons = document.querySelectorAll(".filter-btn");
    const produtosElements = document.querySelectorAll(".produto");

    buttons.forEach((button) => {
        button.removeEventListener("click", filterHandler); // Remove handlers antigos
        button.addEventListener("click", filterHandler);
    });
}

// Handler para os filtros
function filterHandler() {
    const buttons = document.querySelectorAll(".filter-btn");
    const produtosElements = document.querySelectorAll(".produto");
    
    buttons.forEach((btn) => {
        btn.classList.remove("bg-green-500", "text-white");
        btn.classList.add("bg-white", "text-diamond");
    });

    this.classList.remove("bg-white", "text-diamond");
    this.classList.add("bg-green-500", "text-black");

    const filtro = this.id;

    produtosElements.forEach((produto) => {
        if (filtro === "todas" || produto.classList.contains(filtro)) {
            produto.style.display = "block";
        } else {
            produto.style.display = "none";
        }
    });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando carregamento de produtos...');
    loadProdutos();
});
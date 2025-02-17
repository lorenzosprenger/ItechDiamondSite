// Adicionar variável para armazenar produtos
let allProducts = [];

// Função para carregar produtos da API
async function loadProdutos() {
    try {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta:', {
                status: response.status,
                text: errorText
            });
            throw new Error(`Erro ao carregar produtos: ${response.status}`);
        }
        allProducts = await response.json(); // Guardar todos os produtos
        renderProdutos(allProducts);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Função para renderizar produtos na página
function renderProdutos(produtos) {
    const container = document.querySelector(".grid");
    if (!container) {
        console.error('Container .grid não encontrado');
        return;
    }

    console.log('Renderizando produtos:', produtos.length);
    container.innerHTML = ''; // Limpa o container

    produtos.forEach((produto) => {
        if (!produto || !produto.nome) {
            console.error('Produto inválido:', produto);
            return;
        }

        // Sanitiza os dados
        const sanitize = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };

        const sanitizedProduto = {
            nome: sanitize(produto.nome),
            referencia: sanitize(produto.referencia),
            categoria: sanitize(produto.categoria),
        };

        const div = document.createElement("div");
        div.className = `produto ${sanitizedProduto.categoria} bg-white rounded-lg shadow-lg overflow-hidden`;
        div.innerHTML = `
            <div class="p-6">
                <h3 class="text-xl font-semibold text-diamond mb-2">${sanitizedProduto.nome}</h3>
                <p class="text-gray-600 mb-2"><strong>Referência:</strong> ${sanitizedProduto.referencia}</p>
                <p class="text-gray-600 mb-4">Produto de alta qualidade para usinagem</p>
                <button class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition" data-produto='${JSON.stringify(sanitizedProduto)}'>
                    Adicionar ao Carrinho
                </button>
            </div>
        `;

        // Adiciona o evento de clique para o botão dinamicamente
        const button = div.querySelector("button");
        button.addEventListener("click", () => {
            addToCart(sanitizedProduto);
        });

        container.appendChild(div);
    });

    setupFiltros();
}

// Configuração dos filtros
function setupFiltros() {
    const filtroContainer = document.querySelector(".flex.justify-center");
    if (!filtroContainer) {
        console.error('Container de filtros não encontrado');
        return;
    }

    // Estilo base para todos os botões de filtro
    const baseButtonClass = "filter-btn px-10 py-2 rounded-full transition-all duration-300 transform hover:scale-105 mx-2";
    const activeClass = "bg-green-500 text-black";
    const inactiveClass = "bg-white text-gray-600 border-2 border-gray-600";

    // Atualiza classes de todos os botões existentes
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((button) => {
        // Remove classes antigas
        button.className = baseButtonClass;
        // Adiciona classes iniciais
        button.classList.add(...inactiveClass.split(' '));
        
        // Se o botão já estiver ativo, aplica o estilo ativo
        if (button.classList.contains('active')) {
            button.classList.remove(...inactiveClass.split(' '));
            button.classList.add(...activeClass.split(' '));
        }

        // Remove handlers antigos e adiciona novo
        button.removeEventListener("click", filterHandler);
        button.addEventListener("click", function() {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = ''; // Limpar pesquisa ao trocar filtro
                document.getElementById('clearSearch').style.display = 'none';
            }
            filterHandler.call(this);
        });
    });
}

// Handler para os filtros
function filterHandler() {
    const buttons = document.querySelectorAll(".filter-btn");
    const produtosElements = document.querySelectorAll(".produto");
    
    // Remove classe ativa de todos os botões
    buttons.forEach((btn) => {
        btn.classList.remove("bg-green-500", "text-black", "active");
        btn.classList.add("bg-white", "text-gray-600", "border-2", "border-gray-600");
    });

    // Adiciona classe ativa ao botão clicado
    this.classList.remove("bg-white", "text-gray-600", "border-2", "border-gray-600");
    this.classList.add("bg-green-500", "text-black", "active");

    const filtro = this.id;

    // Filtra os produtos
    produtosElements.forEach((produto) => {
        if (filtro === "todas" || produto.classList.contains(filtro)) {
            produto.style.display = "block";
        } else {
            produto.style.display = "none";
        }
    });
}

// Adicionar função de pesquisa
function searchProducts(query) {
    if (!query) {
        renderProdutos(allProducts);
        return;
    }

    query = query.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.nome.toLowerCase().includes(query) || 
        product.referencia.toLowerCase().includes(query)
    );

    renderProdutos(filteredProducts);
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando carregamento de produtos...');
    loadProdutos();

    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            searchProducts(query);
            clearButton.style.display = query ? 'block' : 'none';
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            searchProducts('');
            clearButton.style.display = 'none';
        });
    }
});
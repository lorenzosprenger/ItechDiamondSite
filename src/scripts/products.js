document.addEventListener('DOMContentLoaded', () => {
    const categoryGrid = document.getElementById('category-grid');
    const productView = document.getElementById('product-view');
    const productListContainer = document.getElementById('product-list');
    const backButton = document.getElementById('back-to-categories');
    const selectedCategoryImage = document.getElementById('selected-category-image');
    const productListTitle = document.getElementById('product-list-title');

    let allProducts = [];
    let currentView = 'main'; // 'main', 'pastilhas', 'products'

    // Configuração das categorias (nomes, palavras-chave e imagens)
    const mainCategories = [
        { name: 'Fresa', image: 'assets/ferramentas/fresa.png' },
        { name: 'Broca', image: 'assets/ferramentas/broca.png' },
        { name: 'Pastilha', image: 'assets/ferramentas/pastilha.png' },
        { name: 'Suporte', image: 'assets/ferramentas/suporte.png' },
        { name: 'Macho', image: 'assets/ferramentas/macho.png' },
        { name: 'Outros', image: 'assets/ferramentas/outros.png' }
    ];

    const pastilhaCategories = [
        { name: 'Pastilha Rosqueamento', image: 'assets/ferramentas/pastilhaRosqueamento.png', displayName: 'Rosqueamento' },
        { name: 'Pastilha Torneamento', image: 'assets/ferramentas/pastilhaTorneamento.png', displayName: 'Torneamento' },
        { name: 'Pastilha Canal', image: 'assets/ferramentas/pastilhaCanal.png', displayName: 'Canal' },
        { name: 'Pastilha Fresamento', image: 'assets/ferramentas/pastilhaFresamento.png', displayName: 'Fresamento' },
        { name: 'Pastilha Furação', image: 'assets/ferramentas/pastilhaFuracao.png', displayName: 'Furação' }
    ];

    // Função para obter a categoria do produto direto do banco
    const getProductCategory = (product) => {
        if (!product || !product.categoria) return 'Outros';
        return product.categoria; // Retorna a categoria exata do banco de dados
    };

    // Função para renderizar os cards de categoria
    const displayCategoryCards = (categories, isSubcategory = false) => {
        if (!categoryGrid) return;
        
        categoryGrid.innerHTML = ''; // Limpa o grid antes de adicionar novos cards
        
        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'bg-gray-800 rounded-lg p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer';
            
            const displayName = category.displayName || category.name;
            
            card.innerHTML = `
                <img src="${category.image}" alt="${displayName}" class="w-32 h-32 object-contain mb-4">
                <h3 class="text-xl font-semibold text-cyan-400">${displayName}</h3>
            `;
            
            card.addEventListener('click', () => {
                if (category.name === 'Pastilha' && !isSubcategory) {
                    currentView = 'pastilhas';
                    displayCategoryCards(pastilhaCategories, true);
                    if (backButton) {
                        backButton.style.display = 'block';
                        backButton.onclick = () => {
                            currentView = 'main';
                            displayCategoryCards(mainCategories);
                            backButton.style.display = 'none';
                        };
                    }
                } else {
                    showProductsForCategory(category.name);
                }
            });
            
            categoryGrid.appendChild(card);
        });
    };    // Função para exibir os produtos de uma categoria específica
    const showProductsForCategory = (categoryName) => {
        const categoryData = [...mainCategories, ...pastilhaCategories].find(c => c.name === categoryName);
        // Garantir que allProducts seja um array antes de filtrar
        const source = Array.isArray(allProducts) ? allProducts : [];
        const filteredProducts = source.filter(p => getProductCategory(p) === categoryName);

        displayProducts(filteredProducts);
        
        // Atualiza a view - verificação de elementos antes de usar
        if (categoryGrid) categoryGrid.classList.add('hidden');
        if (productView) productView.classList.remove('hidden');
        
        if (selectedCategoryImage && categoryData) {
            selectedCategoryImage.src = categoryData.image;
            selectedCategoryImage.alt = categoryData.name;
        }
        
        if (productListTitle) {
            productListTitle.textContent = `Mostrando todos os produtos para ${categoryName}`;
        }
    };
    
    // Função para voltar à visualização de categorias
    if (backButton) {
        backButton.addEventListener('click', () => {
            if (categoryGrid) categoryGrid.classList.remove('hidden');
            if (productView) productView.classList.add('hidden');
        });
    }

    // Função para renderizar a lista de produtos
    const displayProducts = (products) => {
        if (!productListContainer) return;
        
        productListContainer.innerHTML = '';
        const list = Array.isArray(products) ? products : [];

        if (list.length === 0) {
            productListContainer.innerHTML = '<p class="text-gray-400 col-span-full text-center">Nenhum produto encontrado nesta categoria.</p>';
            return;
        }

        list.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between border border-gray-700';
            productCard.innerHTML = `
                <div>
                    <h3 class="text-lg font-bold text-white">${product.nome || 'Nome não disponível'}</h3>
                    <p class="text-sm text-gray-400 mt-1">Referência: ${product.referencia || 'N/A'}</p>
                    <p class="text-gray-300 my-3"> Especificações: ${product.descricao || 'Produto de alta qualidade para usinagem.'}</p>
                </div>
                <button class="add-to-cart-btn mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 w-full" data-product-id="${product.id_produto || product.id || ''}">
                    Adicionar ao Carrinho
                </button>
            `;
            productListContainer.appendChild(productCard);

            // Adiciona o evento de clique ao botão
            const addButton = productCard.querySelector('.add-to-cart-btn');
            if (addButton) {
                addButton.addEventListener('click', () => {
                    // A função addToCart está no escopo global (definida em cart.js)
                    if (typeof window.addToCart === 'function') {
                        window.addToCart({
                            id_produto: product.id_produto || product.id,
                            nome: product.nome || 'Produto',
                            referencia: product.referencia || '',
                            image: product.imagem_url || product.imagem || ''
                        });
                    } else {
                        // Fallback: tenta acessar a função diretamente
                        if (typeof addToCart === 'function') {
                            addToCart({
                                id_produto: product.id_produto || product.id,
                                nome: product.nome || 'Produto',
                                referencia: product.referencia || '',
                                image: product.imagem_url || product.imagem || ''
                            });
                        }
                    }
                });
            }
        });
    };

    // Função principal para buscar os dados e iniciar a página
    async function init() {
        try {
            const response = await fetch('/api/produtos');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Normaliza resposta da API (array ou { products: [...] })
            if (Array.isArray(data)) {
                allProducts = data;
            } else if (data && Array.isArray(data.products)) {
                allProducts = data.products;
            } else {
                allProducts = [];
            }

            displayCategoryCards(mainCategories);
            
        } catch (error) {
            if (categoryGrid) {
                categoryGrid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                        <p class="text-red-500 text-lg mb-2">Não foi possível carregar os produtos.</p>
                        <p class="text-gray-400 mb-4">Verifique sua conexão ou tente novamente mais tarde.</p>
                        <button onclick="location.reload()" class="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                            Tentar Novamente
                        </button>
                    </div>
                `;
            }
        }
    }

    // Inicia a aplicação
    init();
});
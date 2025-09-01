document.addEventListener('DOMContentLoaded', () => {
    const categoryGrid = document.getElementById('category-grid');
    const productView = document.getElementById('product-view');
    const productListContainer = document.getElementById('product-list');
    const pageTitle = document.getElementById('page-title');
    const backButton = document.getElementById('back-to-categories');
    const selectedCategoryImage = document.getElementById('selected-category-image');
    const productListTitle = document.getElementById('product-list-title');

    let allProducts = [];

    // Configuração das categorias (nomes, palavras-chave e imagens)
    const categories = [
        { name: 'Fresas', keywords: ['FRESA'], image: 'assets/ferramentas/fresa.png' },
        { name: 'Brocas', keywords: ['BROCA'], image: 'assets/ferramentas/broca.png' },
        { name: 'Pastilhas', keywords: ['PASTILHA'], image: 'assets/ferramentas/pastilha.png' },
        { name: 'Suportes', keywords: ['SUPORTE'], image: 'assets/ferramentas/suporte.png' },
        { name: 'Machos', keywords: ['MACHO'], image: 'assets/ferramentas/macho.png' },
        { name: 'Outros', keywords: ['CHAVE', 'PARAFUSO'], image: 'assets/ferramentas/outros.png' }
    ];

    // Função para categorizar um produto baseado no nome
    const getProductCategory = (productName) => {
        const upperCaseName = productName.toUpperCase();
        for (const category of categories) {
            if (category.keywords.some(keyword => upperCaseName.includes(keyword))) {
                return category.name;
            }
        }
        return 'Outros'; // Categoria padrão
    };

    // Função para renderizar os cards de categoria
    const displayCategoryCards = () => {
        categoryGrid.innerHTML = '';
        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-700';
            card.dataset.category = category.name;
            card.innerHTML = `
                <div class="p-6 text-center">
                    <img src="${category.image}" alt="${category.name}" class="mx-auto h-40 w-40 object-contain mb-4">
                    <h2 class="text-2xl font-bold text-cyan-400">${category.name}</h2>
                </div>
            `;
            card.addEventListener('click', () => showProductsForCategory(category.name));
            categoryGrid.appendChild(card);
        });
    };

    // Função para exibir os produtos de uma categoria específica
    const showProductsForCategory = (categoryName) => {
    const categoryData = categories.find(c => c.name === categoryName);
    // Garantir que allProducts seja um array antes de filtrar
    const source = Array.isArray(allProducts) ? allProducts : [];
        const filteredProducts = source.filter(p => getProductCategory((p && p.nome) || '') === categoryName);

        displayProducts(filteredProducts);
        
        // Atualiza a view
        pageTitle.classList.add('hidden');
        categoryGrid.classList.add('hidden');
        productView.classList.remove('hidden');
        
        selectedCategoryImage.src = categoryData.image;
        selectedCategoryImage.alt = categoryData.name;
        productListTitle.textContent = `Mostrando todos os produtos para ${categoryName}`;
    };
    
    // Função para voltar à visualização de categorias
    backButton.addEventListener('click', () => {
        pageTitle.classList.remove('hidden');
        categoryGrid.classList.remove('hidden');
        productView.classList.add('hidden');
    });

    // Função para renderizar a lista de produtos
   const displayProducts = (products) => {
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
                <h3 class="text-lg font-bold text-white">${product.nome}</h3>
                <p class="text-sm text-gray-400 mt-1">Referência: ${product.referencia}</p>
                <p class="text-gray-300 my-3">${product.descricao || 'Produto de alta qualidade para usinagem.'}</p>
            </div>
            <button class="add-to-cart-btn mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 w-full" data-product-id="${product.id_produto}">
                Adicionar ao Carrinho
            </button>
        `;
        productListContainer.appendChild(productCard);

        // Adiciona o evento de clique ao botão
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            // A função addToCart está no escopo global (definida em cart.js)
            if (typeof addToCart === 'function') {
                addToCart({
                    id_produto: product.id_produto,
                    nome: product.nome,
                    referencia: product.referencia,
                    image: product.imagem_url || product.imagem || '' // tenta campos alternativos
                });
            }
        });
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
                // resposta inesperada
                console.warn('Resposta inesperada:', data);
                allProducts = [];
            }

            displayCategoryCards();
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            categoryGrid.innerHTML = '<p class="text-red-500 text-center col-span-full">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }

    init();
});
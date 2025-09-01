document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');

    function renderCartPage() {
        if (!cartContainer) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartCount();

        if (cart.length === 0) {
            // RENDERIZA A MENSAGEM DE CARRINHO VAZIO
            cartContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center text-center py-20 bg-gray-800 rounded-xl border border-gray-700/50">
                    <i class="fas fa-shopping-cart text-6xl text-gray-600 mb-4"></i>
                    <h2 class="text-3xl font-bold text-white">Seu carrinho está vazio</h2>
                    <p class="text-gray-400 mt-2 mb-6">Adicione produtos da nossa página de ferramentas para começar.</p>
                    <a href="ferramentas.html" class="cta-button text-white font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300">
                        Ver Ferramentas
                    </a>
                </div>
            `;
        } else {
            // RENDERIZA O GRID COM OS ITENS E O RESUMO
            cartContainer.innerHTML = `
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div id="cart-items" class="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        </div>
                    <aside id="cart-summary" class="lg:col-span-1">
                        <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700/50 sticky top-32">
                            <h2 class="text-3xl font-bold text-white border-b border-gray-700 pb-4 mb-6">Resumo</h2>
                            <p class="text-gray-300 mb-6">
                                Este é um pedido de cotação. Nossa equipe comercial entrará em contato com os valores e prazos.
                            </p>
                            <button id="finalize-button" class="w-full cta-button text-white font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105">
                                <i class="fab fa-whatsapp mr-3"></i> Finalizar Cotação
                            </button>
                            <a href="ferramentas.html" class="block text-center mt-4 text-cyan-400 hover:text-white">
                                Continuar Comprando
                            </a>
                        </div>
                    </aside>
                </div>
            `;

            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = cart.map((item, index) => {
                const itemId = item.id_produto || item.referencia;
                return `
                <div class="cart-item flex flex-col md:flex-row items-center justify-between p-4 ${index < cart.length - 1 ? 'border-b border-gray-700' : ''}">
                    <div class="flex items-center mb-4 md:mb-0 w-full md:w-1/2">
                        <img src="${item.image || 'assets/DIAMANTE.png'}" alt="${item.nome}" class="h-16 w-16 object-contain mr-4 bg-gray-700 p-1 rounded-md">
                        <div>
                            <h3 class="font-bold text-lg text-white">${item.nome}</h3>
                            <p class="text-sm text-gray-400">Ref: ${item.referencia}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <input type="number" min="1" value="${item.quantity}" data-id="${itemId}" class="quantity-input w-20 bg-gray-700 rounded-lg py-2 px-3 text-center">
                        <button class="remove-from-cart-btn text-red-500 hover:text-red-400" data-id="${itemId}">
                            <i class="fas fa-trash-alt text-xl"></i>
                        </button>
                    </div>
                </div>
            `}).join('');
        }
        // Adiciona os eventos DEPOIS de renderizar o HTML
        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                removeFromCart(e.currentTarget.dataset.id);
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                updateQuantity(e.currentTarget.dataset.id, parseInt(e.currentTarget.value));
            });
        });
        
        const finalizeButton = document.getElementById('finalize-button');
        if(finalizeButton) {
            finalizeButton.addEventListener('click', () => {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                if(cart.length > 0) {
                    let message = "Olá, gostaria de solicitar um orçamento para os seguintes itens:\n\n";
                    cart.forEach(item => {
                        message += `*Produto:* ${item.nome}\n*Referência:* ${item.referencia}\n*Quantidade:* ${item.quantity}\n------------------------\n`;
                    });
                    const whatsappUrl = `https://wa.me/5551995112894?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                }
            });
        }
    }
    
    function removeFromCart(itemId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => (item.id_produto || item.referencia).toString() !== itemId.toString());
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartPage();
    }

    function updateQuantity(itemId, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(item => (item.id_produto || item.referencia).toString() === itemId.toString());
        if (product && newQuantity > 0) {
            product.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartPage();
        } else if (newQuantity <= 0) {
            removeFromCart(itemId);
        }
    }

    renderCartPage();
});

// Funções globais que podem ser chamadas de outros scripts
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.classList.toggle('hidden', totalItems === 0);
    }
}

window.addToCart = function(product) {
    const uniqueId = product.id_produto || product.referencia;
    if (!uniqueId) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => (item.id_produto || item.referencia) === uniqueId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.nome} adicionado ao carrinho!`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg';
    document.body.appendChild(toast);
    toast.textContent = message;
    setTimeout(() => { toast.remove(); }, 3000);
}
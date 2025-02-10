function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const solicitarBtn = document.getElementById('solicitarOrcamentoBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    
    if (!cartContainer) return;
    
    // Verifica se o carrinho está vazio
    if (!cartItems || cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="col-span-3 text-center py-8">
                <div class="text-4xl mb-4">🛒</div>
                <h3 class="text-2xl font-semibold text-gray-600 mb-4">Seu carrinho está vazio</h3>
                <p class="text-gray-500 mb-8">Adicione alguns produtos para solicitar um orçamento.</p>
                <div class="mt-8">
                    <a href="ferramentas.html" class="border-2 border-gray-600 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-700 hover:text-white transition transform hover:scale-105 font-semibold">
                        Ver Produtos
                    </a>
                </div>
            </div>
        `;
        
        // Esconde os botões quando o carrinho está vazio
        if (solicitarBtn) solicitarBtn.style.display = 'none';
        if (clearCartBtn) clearCartBtn.style.display = 'none';
        return;
    }
    
    // Mostra os botões quando há itens no carrinho
    if (solicitarBtn) solicitarBtn.style.display = 'inline-block';
    if (clearCartBtn) clearCartBtn.style.display = 'inline-block';
    
    cartContainer.innerHTML = '';
    
    const groupedItems = cartItems.reduce((acc, item) => {
        const key = `${item.nome}-${item.referencia}`;
        if (!acc[key]) {
            acc[key] = { ...item, quantidade: 0 };
        }
        acc[key].quantidade += 1;
        return acc;
    }, {});

    Object.values(groupedItems).forEach((item, index) => {
        // Remover informações sensíveis antes de renderizar
        const safeItem = {
            nome: item.nome,
            referencia: item.referencia,
            quantidade: item.quantidade
        };
        
        const div = document.createElement('div');
        div.className = 'produto bg-white rounded-lg shadow-lg overflow-hidden';
        div.innerHTML = `
            <div class="p-6">
                <h3 class="text-xl font-semibold text-diamond mb-2 item-name">${safeItem.nome}</h3>
                <p class="text-gray-600 mb-2"><strong>Referência:</strong> ${safeItem.referencia}</p>
                <p class="text-gray-600 mb-2 item-quantity">Quantidade: ${safeItem.quantidade}</p>
                <button class="remove-item bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700" data-index="${index}">Remover</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    // Adiciona eventos aos botões de remover
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeCartItem(index);
        });
    });
}

function removeCartItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    renderCartItems();
}

function clearCart() {
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    renderCartItems();
}

// Inicialização específica do carrinho
document.addEventListener('DOMContentLoaded', () => {
    // Carregar itens do carrinho
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartCount();
    renderCartItems();
    
    // Setup do modal de orçamento
    const modal = document.getElementById('orcamentoModal');
    const closeModal = document.getElementById('closeModal');
    const solicitarBtn = document.getElementById('solicitarOrcamentoBtn');
    
    if (solicitarBtn) {
        solicitarBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'flex';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    // Adicionar evento ao botão de limpar carrinho se existir
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});
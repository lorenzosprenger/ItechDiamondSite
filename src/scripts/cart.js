function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
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
        const div = document.createElement('div');
        div.className = 'produto bg-white rounded-lg shadow-lg overflow-hidden';
        div.innerHTML = `
            <div class="p-6">
                <h3 class="text-xl font-semibold text-diamond mb-2 item-name">${item.nome}</h3>
                <p class="text-gray-600 mb-2"><strong>Referência:</strong> ${item.referencia}</p>
                <p class="text-gray-600 mb-2 item-quantity">Quantidade: ${item.quantidade}</p>
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

// Inicialização específica do carrinho
document.addEventListener('DOMContentLoaded', () => {
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
}); 

function removeCartItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
}

function clearCart() {
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
}
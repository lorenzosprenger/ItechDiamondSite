// Variáveis globais
let cartItems = [];

// Gerenciamento do Carrinho
function loadCartItems() {
    try {
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return cartItems;
    } catch (e) {
        console.error('Erro ao carregar carrinho:', e);
        return [];
    }
}

function saveCartItems() {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
        console.error('Erro ao salvar carrinho:', e);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cartItems.length || '0';
    }
}

function addToCart(produto) {
    cartItems.push(produto);
    saveCartItems();
    updateCartCount();
}

function clearCart() {
    cartItems = [];
    saveCartItems();
    updateCartCount();
}

// Animação dos Diamantes
function createDiamond() {
    const container = document.getElementById('diamondContainer');
    if (!container) return;

    const diamond = document.createElement('div');
    diamond.className = 'falling-diamond';
    
    const left = Math.random() * window.innerWidth;
    diamond.style.left = `${left}px`;
    
    const duration = 8 + Math.random() * 7;
    const delay = Math.random() * 5;
    
    diamond.style.animation = `fallAndRotate ${duration}s linear ${delay}s infinite`;
    
    container.appendChild(diamond);
    
    setTimeout(() => {
        diamond.remove();
    }, (duration + delay) * 1000);
}

function initializeDiamonds() {
    const container = document.getElementById('diamondContainer');
    if (!container) return;

    // Limpa diamantes existentes
    container.innerHTML = '';

    // Cria novos diamantes
    for(let i = 0; i < 30; i++) {
        createDiamond();
    }
    
    // Continua criando diamantes periodicamente
    setInterval(createDiamond, 1000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartCount();
    initializeDiamonds();
});

// Exporta funções para uso global
window.addToCart = addToCart;
window.clearCart = clearCart;
window.updateCartCount = updateCartCount;
window.cartItems = cartItems;


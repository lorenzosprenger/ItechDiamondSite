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
        // Adicionar verificação de tamanho máximo
        if (JSON.stringify(cartItems).length > 5000000) { // 5MB limit
            console.error('Carrinho muito grande');
            return false;
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return true;
    } catch (e) {
        console.error('Erro ao salvar carrinho:', e);
        return false;
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cartItems.length || '0';
    }
}

// Adicionar função de sanitização
function sanitizeInput(input) {
    return input.replace(/[&<>"']/g, function(match) {
        const char_map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return char_map[match];
    });
}

// Modificar a função addToCart
function addToCart(produto) {
    // Sanitizar dados do produto
    const sanitizedProduto = {
        nome: sanitizeInput(produto.nome),
        referencia: sanitizeInput(produto.referencia),
        categoria: sanitizeInput(produto.categoria)
    };
    
    cartItems.push(sanitizedProduto);
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


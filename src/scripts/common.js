// Variáveis globais
let cartItems = [];

// Gerenciamento do Carrinho
function loadCartItems() {
    try {
        const storedItems = localStorage.getItem('cartItems');
        cartItems = storedItems ? JSON.parse(storedItems) : [];
        console.log('Carrinho carregado:', cartItems);
    } catch (e) {
        console.error('Erro ao carregar carrinho:', e);
        cartItems = [];
    }
}

function saveCartItems() {
    try {
        // Verificação de tamanho máximo para evitar erros
        if (JSON.stringify(cartItems).length > 5000000) { // 5MB limit
            console.error('Carrinho muito grande');
            return false;
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Carrinho salvo com sucesso:', cartItems);
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

// Função para sanitizar entrada
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Modificação da função `addToCart`
function addToCart(produto) {
    if (!produto || !produto.nome || !produto.referencia) {
        console.error('Produto inválido:', produto);
        return;
    }

    console.log('Adicionando ao carrinho:', produto);

    // Sanitiza os dados do produto
    const sanitizedProduto = {
        nome: sanitizeInput(produto.nome),
        referencia: sanitizeInput(produto.referencia),
        categoria: sanitizeInput(produto.categoria),
    };

    cartItems.push(sanitizedProduto);
    saveCartItems();
    updateCartCount();
}

// Garante que o botão "Limpar Carrinho" funcione corretamente
const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        console.log("Botão 'Limpar Carrinho' clicado!");
        clearCart(); // Chama a função corretamente
    });
}

function clearCart() {
    // Lógica para limpar o carrinho
    console.log('Carrinho limpo');
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartCount();
});

// Exporta funções globalmente para o `products.js`
window.addToCart = addToCart;
window.clearCart = clearCart;
window.updateCartCount = updateCartCount;
window.loadCartItems = loadCartItems;
window.cartItems = cartItems;

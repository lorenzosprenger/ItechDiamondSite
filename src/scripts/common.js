// Carrinho e inicialização global

// Carrega os itens do carrinho do localStorage
function loadCart() {
    const storedCart = localStorage.getItem('siteCart');
    return storedCart ? JSON.parse(storedCart) : [];
}

// Salva os itens no localStorage
function saveCart(cart) {
    localStorage.setItem('siteCart', JSON.stringify(cart));
}

// Atualiza o contador no ícone do header
function updateCartCount() {
    const cart = loadCart();
    // Soma a quantidade de todos os itens no carrinho
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count'); // O ícone no header
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        // Mostra ou esconde o contador se for maior que zero
        cartCountElement.classList.toggle('hidden', totalItems === 0);
    }
}

// Adiciona um produto ao carrinho (função global)
window.addToCart = function(product) {
    if (!product || !product.id_produto) {
        return;
    }

    let cart = loadCart();
    const existingProductIndex = cart.findIndex(item => item.id_produto === product.id_produto);

    if (existingProductIndex > -1) {
        // Se o produto já existe, incrementa a quantidade
        cart[existingProductIndex].quantity++;
    } else {
        // Se é um novo produto, adiciona com quantidade 1
        product.quantity = 1;
        cart.push(product);
    }

    saveCart(cart);
    updateCartCount();
    // Opcional: Mostra uma notificação de sucesso
    showToast(`${product.nome} foi adicionado ao carrinho!`);
}

// Limpa o carrinho (utilitário)
function clearCart() {
    saveCart([]);
    updateCartCount();
}

// Retorna os itens atuais do carrinho
function loadCartItems() {
    return loadCart();
}

// Expor uma referência simples ao conteúdo do carrinho
const cartItems = loadCart();

// Função para mostrar notificação (toast)
function showToast(message) {
    // Remove qualquer toast existente para não empilhar
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg animate-on-scroll is-visible';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}


// --- LÓGICA DE INICIALIZAÇÃO DA PÁGINA (Header, Footer, Navegação) ---
document.addEventListener("DOMContentLoaded", function() {
    
    const headerPlaceholder = document.getElementById('header-placeholder');

    // Função para lidar com o header dinâmico ao rolar a página
    const handleScroll = () => {
        const mainHeader = document.getElementById('main-header');
        if (mainHeader) {
            if (window.scrollY > 50) {
                mainHeader.classList.add('header-scrolled');
            } else {
                mainHeader.classList.remove('header-scrolled');
            }
        }
    };

    // Função para destacar o link da página atual no menu
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('text-cyan-400', 'font-bold');
                link.classList.remove('text-gray-200');
            } else {
                link.classList.remove('text-cyan-400', 'font-bold');
                link.classList.add('text-gray-200');
            }
        });
    };

    // 1. Carrega o Header
    fetch('header.html')
        .then(response => response.ok ? response.text() : Promise.reject('header.html não encontrado'))
        .then(data => {
            headerPlaceholder.id = 'main-header'; 
            headerPlaceholder.innerHTML = data;

            // Lógica para o menu mobile
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenuButton) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // 2. Executa as funções que dependem do header estar carregado
            setActiveNavLink();
            updateCartCount(); // Atualiza o contador do carrinho assim que o header carrega
            
            // 3. Ativa a lógica de scroll
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Executa uma vez para verificar a posição inicial
        })
        .catch(() => {});
    
    // Carrega o footer e inicializa elementos dependentes
    fetch('footer.html')
        .then(response => response.ok ? response.text() : Promise.reject('footer.html não encontrado'))
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            injectFloatingWhatsApp();
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));
});
// Exporta funções globalmente para outros scripts
window.addToCart = window.addToCart || addToCart;
window.clearCart = window.clearCart || clearCart;
window.updateCartCount = window.updateCartCount || updateCartCount;
window.loadCartItems = window.loadCartItems || loadCartItems;
window.cartItems = window.cartItems || cartItems;

// Injects a floating WhatsApp button (appears after footer loads)
function injectFloatingWhatsApp() {
    if (document.getElementById('floating-whatsapp-btn')) return;

    const waNumber = '5551995112894';
    const prefilled = encodeURIComponent('Olá, vim do site Itech Diamond — gostaria de mais informações.');

    const btn = document.createElement('a');
    btn.id = 'floating-whatsapp-btn';
    btn.href = `https://wa.me/${waNumber}?text=${prefilled}`;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'fixed z-50 flex items-center justify-center';
    btn.style.cssText = 'right:20px;bottom:20px;width:64px;height:64px;background:linear-gradient(135deg,#10b981,#06b6d4);border-radius:9999px;box-shadow:0 10px 20px rgba(2,6,23,0.4);animation:wa-pulse 2s infinite;transition:transform .15s ease-in-out;';

    btn.addEventListener('mouseover', () => btn.style.transform = 'translateY(-4px) scale(1.03)');
    btn.addEventListener('mouseout', () => btn.style.transform = 'translateY(0) scale(1)');

    btn.innerHTML = `<i class="fab fa-whatsapp" style="color: white; font-size: 28px;"></i>`;

    const ping = document.createElement('span');
    ping.style.cssText = 'position:absolute;width:18px;height:18px;right:-6px;top:-6px;background:#ecfeff;border-radius:9999px;box-shadow:0 0 0 6px rgba(6,182,212,0.12);animation:wa-blink 1.8s infinite;';
    btn.appendChild(ping);

    document.body.appendChild(btn);

    const style = document.createElement('style');
    style.textContent = '@keyframes wa-pulse{0%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.02)}100%{transform:translateY(0) scale(1)}}@keyframes wa-blink{0%{transform:scale(0.9);opacity:0.9}50%{transform:scale(1.4);opacity:0.25}100%{transform:scale(0.9);opacity:0.9}}';
    document.head.appendChild(style);
}

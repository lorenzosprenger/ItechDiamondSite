document.addEventListener('DOMContentLoaded', () => {
    // --- Animação de Contador para Produtos GESAC ---
    const gesacProductCounter = document.getElementById('gesac-product-counter');
    const targetCount = 42211; // O número que queremos exibir
    let currentCount = 0;
    const duration = 2000; // Duração da animação em ms
    const increment = Math.ceil(targetCount / (duration / 10)); // Incremento a cada 10ms

    const animateCounter = () => {
        if (!gesacProductCounter) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        currentCount += increment;
                        if (currentCount >= targetCount) {
                            currentCount = targetCount;
                            clearInterval(timer);
                        }
                        gesacProductCounter.textContent = currentCount.toLocaleString('pt-BR');
                    }, 10);
                    observer.unobserve(entry.target); // Para parar a observação após a animação
                }
            });
        }, { threshold: 0.5 }); // Inicia quando 50% do elemento está visível

        observer.observe(gesacProductCounter);
    };

    // --- Animação de Elementos ao Rolar (Scroll Reveal) ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    }, { threshold: 0.1 }); // Inicia quando 10% do elemento está visível

    animateOnScrollElements.forEach(element => {
        scrollObserver.observe(element);
    });

    animateCounter(); // Chama a função do contador
});
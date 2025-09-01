document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            // Fecha todos os outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-question i').classList.remove('rotate-180');
                }
            });

            // Alterna o item clicado
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });
});
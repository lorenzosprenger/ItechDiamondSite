// Gerar token CSRF
function generateCSRFToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

const contactAttempts = {
    count: 0,
    lastAttempt: 0
};

// Adicionar token aos formulários
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    const csrfToken = generateCSRFToken();
    
    forms.forEach(form => {
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'csrf_token';
        tokenInput.value = csrfToken;
        form.appendChild(tokenInput);
    });

    document.querySelector('#formContato').addEventListener('submit', function(e) {
        const now = Date.now();
        
        // Reset contador após 1 hora
        if (now - contactAttempts.lastAttempt > 3600000) {
            contactAttempts.count = 0;
        }
        
        // Limitar a 5 tentativas por hora
        if (contactAttempts.count >= 5) {
            e.preventDefault();
            alert('Muitas tentativas. Tente novamente mais tarde.');
            return;
        }
        
        contactAttempts.count++;
        contactAttempts.lastAttempt = now;
        
        e.preventDefault();
        
        const nome = document.querySelector('[name="nome"]').value;
        const email = document.querySelector('[name="email"]').value;
        const tipo = document.querySelector('[name="tipo"]').value;
        const assunto = document.querySelector('[name="assunto"]').value;
        const mensagem = document.querySelector('[name="mensagem"]').value;

        // Format the email body with consistent line breaks
        const messageBody = [
            "=".repeat(50),
            "NOVA MENSAGEM DE CONTATO",
            "=".repeat(50),
            "",
            "TIPO DE CONTATO: " + tipo.toUpperCase(),
            "NOME: " + nome,
            "EMAIL: " + email,
            "ASSUNTO: " + assunto,
            "",
            "MENSAGEM:",
            "-".repeat(50),
            mensagem,
            "-".repeat(50),
            "",
            "Enviado através do formulário de contato do site"
        ].join('\n');

        const emailSubject = "Nova mensagem de contato via site - " + tipo.charAt(0).toUpperCase() + tipo.slice(1);
        
        // Encode the body for mailto URL
        const encodedBody = encodeURIComponent(messageBody);
        const encodedSubject = encodeURIComponent(emailSubject);

        window.location.href = `mailto:vendas@itechdiamond.com.br?subject=${encodedSubject}&body=${encodedBody}`;
    });
});

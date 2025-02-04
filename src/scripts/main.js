document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#formContato').addEventListener('submit', function(e) {
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

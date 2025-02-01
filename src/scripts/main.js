// Este arquivo contém o código JavaScript para interatividade na landing page da Itech Diamond.

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('cta-button');
    
    if (button) {
        button.addEventListener('click', () => {
            alert('Obrigado por se interessar pela Itech Diamond!');
        });
    }

    document.querySelector('#formContato').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.querySelector('[name="nome"]').value;
        const email = document.querySelector('[name="email"]').value;
        const assunto = document.querySelector('[name="assunto"]').value;
        const mensagem = document.querySelector('[name="mensagem"]').value;
        
        const corpoEmail = `Nome: ${nome}%0D%0A
Email: ${email}%0D%0A
Assunto: ${assunto}%0D%0A
%0D%0A
Mensagem:%0D%0A${mensagem}`;
    
        window.location.href = `mailto:lorenzosprenger@gmail.com?subject=Contato: ${assunto}&body=${corpoEmail}`;
    });
});
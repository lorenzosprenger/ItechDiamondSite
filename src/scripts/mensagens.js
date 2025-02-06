document.getElementById('solicitarOrcamentoBtn').addEventListener('click', function() {
    document.getElementById('orcamentoModal').style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('orcamentoModal').style.display = 'none';
});

function validateForm(userName) {
    // Limitar tamanho do nome
    if (userName.length > 100) {
        alert('Nome muito longo');
        return false;
    }
    
    // Remover caracteres especiais
    if (/[<>{}()$]/.test(userName)) {
        alert('Nome contém caracteres inválidos');
        return false;
    }
    
    return true;
}

function generateMessage(userName) {
    if (!userName || !validateForm(userName)) {
        alert('Por favor, insira um nome válido.');
        return;
    }
    
    // Sanitizar nome do usuário
    userName = sanitizeInput(userName);
    
    let itemsText = '';
    const groupedItems = cartItems.reduce((acc, item) => {
        const key = `${item.nome}-${item.referencia}`;
        if (!acc[key]) {
            acc[key] = { ...item, quantidade: 0 };
        }
        acc[key].quantidade += 1;
        return acc;
    }, {});

    Object.values(groupedItems).forEach(item => {
        itemsText += `- ${item.nome} (Referência: ${item.referencia}, Quantidade: ${item.quantidade})\n`;
    });

    return `Olá, meu nome é ${userName}. Gostaria de solicitar um orçamento para os seguintes itens:\n\n${itemsText}`;
}

document.getElementById('whatsappLink').addEventListener('click', function() {
    var userName = document.getElementById('userName').value;
    var message = generateMessage(userName);
    if (message) {
        window.open(`https://wa.me/555195112894?text=${encodeURIComponent(message)}`, '_blank');
    }
});

document.getElementById('emailLink').addEventListener('click', function() {
    var userName = document.getElementById('userName').value;
    var message = generateMessage(userName);
    if (message) {
        window.open(`mailto:vendas@itechdiamond.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20Or%C3%A7amento&body=${encodeURIComponent(message)}`, '_blank');
    }
});

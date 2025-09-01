document.addEventListener('DOMContentLoaded', () => {
    // --- DADOS DOS CATÁLOGOS ---
    const catalogs = [
        
        {
            title: "Catálogo de Fresamento",
            description: "Soluções especializadas em fresamento de alta performance para todos os tipos de materiais e aplicações.",
            coverImage: "assets/capa-catalogos/capa-catalogo-fresamento.png",
            pdfFile: "catalogos/Fresamento.pdf" 
        },
        {
            title: "Catálogo de Torneamento",
            description: "Tecnologia de ponta em pastilhas e suportes para operações de torneamento de precisão.",
            coverImage: "assets/capa-catalogos/capa-catalogo-torneamento.png",
            pdfFile: "catalogos/Torneamento.pdf"
        },
        {
            title: "Catálogo de Furação",
            description: "Brocas de alta performance para furação eficiente e precisa nos mais diversos materiais da indústria.",
            coverImage: "assets/capa-catalogos/capa-catalogo-furacao.png",
            pdfFile: "catalogos/Furação.pdf"
        },
    ];

    const catalogGrid = document.getElementById('catalog-grid');

    if (catalogGrid) {
        catalogGrid.innerHTML = catalogs.map(cat => `
            <div class="catalog-card bg-gray-800 rounded-lg shadow-lg border border-gray-700/50 
                        flex flex-col w-full max-w-xs mx-auto p-3 text-center transition duration-200">
                
                <img src="${cat.coverImage}" alt="Capa do ${cat.title}" class="w-full h-auto rounded-md">
                
                <div class="pt-4 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-white mb-4">${cat.title}</h3>
                    
                    <div class="mt-auto flex space-x-4">
                        <a href="${cat.pdfFile}" download class="w-1/2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-center text-sm">
                            <i class="fas fa-download mr-1"></i>Download
                        </a>
                        <a href="${cat.pdfFile}" target="_blank" class="w-1/2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-center text-sm">
                            <i class="fas fa-eye mr-1"></i>Visualizar
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
});
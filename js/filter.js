// Filter.js - Sistema de filtragem de portfólio conforme especificações
document.addEventListener('DOMContentLoaded', function() {
    initializeFilter();
});

function initializeFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    /**
     * Filtra os projetos baseado na categoria selecionada
     */
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategories.includes(category)) {
                // Mostrar projeto
                card.classList.remove('hidden');
                card.classList.add('visible');
            } else {
                // Ocultar projeto
                card.classList.remove('visible');
                card.classList.add('hidden');
            }
        });
    }
    
    /**
     * Atualiza o estado ativo dos botões de filtro
     */
    function updateActiveButton(activeButton) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
    
    /**
     * Conta e exibe o número de projetos visíveis
     */
    function updateProjectCount() {
        const visibleProjects = document.querySelectorAll('.project-card.visible').length;
        const portfolioSection = document.querySelector('.portfolio h2');
        
        if (portfolioSection) {
            const originalText = 'Meu Portfólio';
            portfolioSection.textContent = `${originalText} (${visibleProjects} projeto${visibleProjects !== 1 ? 's' : ''})`;
        }
    }
    
    /**
     * Adiciona animação de entrada aos projetos filtrados
     */
    function animateFilteredProjects() {
        const visibleCards = document.querySelectorAll('.project-card.visible');
        
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Event listeners para os botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Atualizar botão ativo
            updateActiveButton(this);
            
            // Filtrar projetos
            filterProjects(filterValue);
            
            // Atualizar contador
            setTimeout(() => {
                updateProjectCount();
                animateFilteredProjects();
            }, 100);
            
            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log(`Filtro aplicado: ${filterValue}`);
        });
        
        // Efeito hover nos botões
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Inicializar com todos os projetos visíveis
    filterProjects('all');
    updateProjectCount();
    
    // Funcionalidade adicional: filtro por URL hash
    function checkUrlHash() {
        const hash = window.location.hash.replace('#filter-', '');
        const validFilters = ['all', 'react', 'javascript', 'php', 'python', 'django'];
        
        if (validFilters.includes(hash)) {
            const targetButton = document.querySelector(`[data-filter="${hash}"]`);
            if (targetButton) {
                targetButton.click();
            }
        }
    }
    
    // Verificar hash na inicialização
    checkUrlHash();
    
    // Escutar mudanças no hash
    window.addEventListener('hashchange', checkUrlHash);
    
    // Funcionalidade adicional: busca rápida por tecnologia
    function createQuickSearch() {
        const portfolioSection = document.querySelector('.portfolio .container');
        if (!portfolioSection) return;
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'quick-search-container';
        searchContainer.style.cssText = `
            margin-bottom: 2rem;
            text-align: center;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar por tecnologia...';
        searchInput.className = 'quick-search-input';
        searchInput.style.cssText = `
            padding: 0.5rem 1rem;
            border: 2px solid var(--border-color);
            border-radius: 25px;
            width: 300px;
            max-width: 100%;
            font-size: 1rem;
            background: var(--background-color);
            color: var(--text-color);
        `;
        
        searchContainer.appendChild(searchInput);
        
        // Inserir antes dos botões de filtro
        const filterButtonsContainer = document.querySelector('.filter-buttons');
        if (filterButtonsContainer) {
            portfolioSection.insertBefore(searchContainer, filterButtonsContainer);
        }
        
        // Funcionalidade de busca
        const debouncedSearch = debounce(function(searchTerm) {
            if (searchTerm.length === 0) {
                // Se busca vazia, mostrar todos
                filterProjects('all');
                updateActiveButton(document.querySelector('[data-filter="all"]'));
            } else {
                // Filtrar por termo de busca
                projectCards.forEach(card => {
                    const cardText = card.textContent.toLowerCase();
                    const cardCategories = card.getAttribute('data-category').toLowerCase();
                    
                    if (cardText.includes(searchTerm.toLowerCase()) || 
                        cardCategories.includes(searchTerm.toLowerCase())) {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                    } else {
                        card.classList.remove('visible');
                        card.classList.add('hidden');
                    }
                });
                
                // Remover active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
            }
            
            setTimeout(() => {
                updateProjectCount();
                animateFilteredProjects();
            }, 100);
        }, 300);
        
        searchInput.addEventListener('input', function() {
            debouncedSearch(this.value);
        });
    }
    
    // Criar busca rápida
    createQuickSearch();
    
    console.log('Sistema de filtros inicializado com sucesso!');
}

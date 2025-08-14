// Search.js - Sistema de pesquisa global conforme especificações
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    // URLs das páginas para busca (simulando múltiplas páginas)
    const searchablePages = [
        { url: 'index.html', title: 'Página Inicial' },
        { url: 'portfolio.html', title: 'Portfólio' },
        { url: 'contact.html', title: 'Contato' },
        { url: 'about.html', title: 'Sobre' }
    ];
    
    /**
     * Realiza busca assíncrona no conteúdo das páginas
     */
    async function performSearch(searchTerm) {
        if (!searchTerm || searchTerm.length < 2) {
            showToast('Digite pelo menos 2 caracteres para buscar', 'warning');
            return;
        }
        
        showToast('Buscando...', 'info', 1000);
        
        const results = [];
        
        try {
            // Buscar na página atual primeiro
            const currentPageResults = searchInCurrentPage(searchTerm);
            if (currentPageResults.length > 0) {
                results.push(...currentPageResults);
            }
            
            // Simular busca em outras páginas (já que temos apenas uma página)
            const simulatedResults = simulateSearchInOtherPages(searchTerm);
            results.push(...simulatedResults);
            
            displaySearchResults(results, searchTerm);
            
        } catch (error) {
            console.error('Erro na busca:', error);
            showToast('Erro ao realizar busca', 'error');
        }
    }
    
    /**
     * Busca no conteúdo da página atual
     */
    function searchInCurrentPage(searchTerm) {
        const results = [];
        const searchableElements = document.querySelectorAll('h1, h2, h3, p, a, .project-info');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            const term = searchTerm.toLowerCase();
            
            if (text.includes(term)) {
                const context = extractContext(element.textContent, searchTerm);
                const section = findParentSection(element);
                
                results.push({
                    title: getElementTitle(element),
                    context: context,
                    section: section,
                    element: element,
                    page: 'Página Atual',
                    url: '#' + (section ? section.id : '')
                });
            }
        });
        
        return results;
    }
    
    /**
     * Simula busca em outras páginas (para demonstração)
     */
    function simulateSearchInOtherPages(searchTerm) {
        const simulatedContent = {
            'portfolio.html': [
                'Projetos em React e JavaScript',
                'Desenvolvimento de aplicações web modernas',
                'Experiência com Django e Python',
                'Sistemas PHP e MySQL'
            ],
            'contact.html': [
                'Entre em contato conosco',
                'Formulário de contato',
                'Informações de contato',
                'Email: contato@portfolio.com'
            ],
            'about.html': [
                'Sobre nossa empresa',
                'História e missão',
                'Equipe de desenvolvimento',
                'Tecnologias utilizadas'
            ]
        };
        
        const results = [];
        const term = searchTerm.toLowerCase();
        
        Object.entries(simulatedContent).forEach(([page, contents]) => {
            contents.forEach(content => {
                if (content.toLowerCase().includes(term)) {
                    results.push({
                        title: content,
                        context: content,
                        section: 'Conteúdo da página',
                        page: getPageTitle(page),
                        url: page
                    });
                }
            });
        });
        
        return results;
    }
    
    /**
     * Extrai contexto ao redor do termo encontrado
     */
    function extractContext(text, searchTerm, contextLength = 100) {
        const lowerText = text.toLowerCase();
        const lowerTerm = searchTerm.toLowerCase();
        const index = lowerText.indexOf(lowerTerm);
        
        if (index === -1) return text.substring(0, contextLength);
        
        const start = Math.max(0, index - contextLength / 2);
        const end = Math.min(text.length, index + searchTerm.length + contextLength / 2);
        
        let context = text.substring(start, end);
        
        // Adicionar reticências se necessário
        if (start > 0) context = '...' + context;
        if (end < text.length) context = context + '...';
        
        // Destacar o termo encontrado
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        context = context.replace(regex, '<mark>$1</mark>');
        
        return context;
    }
    
    /**
     * Encontra a seção pai do elemento
     */
    function findParentSection(element) {
        let parent = element.parentElement;
        while (parent && parent !== document.body) {
            if (parent.tagName === 'SECTION' && parent.id) {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null;
    }
    
    /**
     * Obtém título do elemento
     */
    function getElementTitle(element) {
        if (element.tagName.match(/^H[1-6]$/)) {
            return element.textContent;
        }
        
        const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
            return heading.textContent;
        }
        
        const section = findParentSection(element);
        if (section) {
            const sectionHeading = section.querySelector('h1, h2, h3, h4, h5, h6');
            if (sectionHeading) {
                return sectionHeading.textContent;
            }
        }
        
        return 'Resultado encontrado';
    }
    
    /**
     * Obtém título da página baseado no nome do arquivo
     */
    function getPageTitle(filename) {
        const titles = {
            'index.html': 'Página Inicial',
            'portfolio.html': 'Portfólio',
            'contact.html': 'Contato',
            'about.html': 'Sobre'
        };
        return titles[filename] || filename;
    }
    
    /**
     * Exibe os resultados da busca
     */
    function displaySearchResults(results, searchTerm) {
        // Criar ou encontrar container de resultados
        let resultsContainer = document.getElementById('search-results');
        
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results';
            resultsContainer.className = 'search-results-container';
            resultsContainer.style.cssText = `
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 600px;
                max-height: 400px;
                overflow-y: auto;
                background: var(--background-color);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                box-shadow: var(--shadow);
                z-index: 1500;
                padding: 1rem;
                display: none;
            `;
            document.body.appendChild(resultsContainer);
        }
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Não foram encontrados resultados para "${searchTerm}"</p>
                </div>
            `;
        } else {
            const resultsHTML = `
                <div class="search-header">
                    <h3>Resultados da busca por "${searchTerm}"</h3>
                    <button class="close-search" onclick="closeSearchResults()">×</button>
                </div>
                <div class="search-results-list">
                    ${results.map(result => `
                        <div class="search-result-item" onclick="navigateToResult('${result.url}')">
                            <h4>${result.title}</h4>
                            <p class="result-context">${result.context}</p>
                            <small class="result-page">Em: ${result.page}</small>
                        </div>
                    `).join('')}
                </div>
            `;
            resultsContainer.innerHTML = resultsHTML;
        }
        
        // Mostrar resultados
        resultsContainer.style.display = 'block';
        
        // Fechar ao clicar fora
        setTimeout(() => {
            document.addEventListener('click', closeSearchOnClickOutside);
        }, 100);
        
        showToast(`${results.length} resultado(s) encontrado(s)`, 'success');
    }
    
    /**
     * Navega para o resultado selecionado
     */
    window.navigateToResult = function(url) {
        if (url.startsWith('#')) {
            // Link interno - scroll suave
            const element = document.querySelector(url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Destacar elemento temporariamente
                element.style.backgroundColor = 'var(--secondary-color)';
                element.style.color = 'white';
                element.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    element.style.backgroundColor = '';
                    element.style.color = '';
                }, 2000);
            }
        } else {
            // Link externo (simulado)
            showToast(`Navegando para: ${url}`, 'info');
        }
        closeSearchResults();
    };
    
    /**
     * Fecha os resultados da busca
     */
    window.closeSearchResults = function() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
        document.removeEventListener('click', closeSearchOnClickOutside);
    };
    
    /**
     * Fecha busca ao clicar fora
     */
    function closeSearchOnClickOutside(event) {
        const resultsContainer = document.getElementById('search-results');
        const searchContainer = document.querySelector('.search-container');
        
        if (resultsContainer && 
            !resultsContainer.contains(event.target) && 
            !searchContainer.contains(event.target)) {
            closeSearchResults();
        }
    }
    
    // Event Listeners
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        performSearch(searchTerm);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            performSearch(searchTerm);
        }
    });
    
    // Busca em tempo real (opcional)
    const debouncedSearch = debounce(function(searchTerm) {
        if (searchTerm.length >= 3) {
            performSearch(searchTerm);
        } else if (searchTerm.length === 0) {
            closeSearchResults();
        }
    }, 500);
    
    searchInput.addEventListener('input', function() {
        debouncedSearch(this.value.trim());
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearchResults();
        }
    });
    
    console.log('Sistema de busca inicializado com sucesso!');
}

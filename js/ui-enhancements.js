// UI-Enhancements.js - Efeitos e animações conforme especificações
document.addEventListener('DOMContentLoaded', function() {
    initializeUIEnhancements();
});

function initializeUIEnhancements() {
    initializeBackToTop();
    initializeClipboard();
    initializeThemeToggle();
    console.log('Melhorias de UI inicializadas com sucesso!');
}

/**
 * 1. Botão "Voltar ao Topo" - conforme especificações
 */
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    const SCROLL_THRESHOLD = 300; // 300 pixels conforme especificação
    
    // Mostrar/ocultar botão baseado no scroll
    function toggleBackToTopButton() {
        if (window.pageYOffset > SCROLL_THRESHOLD) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', debounce(toggleBackToTopButton, 100));
    
    // Click handler - scroll suave para o topo
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Feedback visual
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Inicializar estado
    toggleBackToTopButton();
}

/**
 * 2. Funcionalidade de Clipboard (Copiar) - conforme especificações
 */
function initializeClipboard() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            if (textToCopy) {
                copyToClipboard(textToCopy, this);
            }
        });
    });
    
    /**
     * Copia texto para a área de transferência
     */
    async function copyToClipboard(text, button) {
        try {
            // Usar API moderna do Clipboard se disponível
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                showCopySuccess(button, text);
            } else {
                // Fallback para navegadores mais antigos
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    showCopySuccess(button, text);
                } else {
                    showCopyError(button);
                }
            }
        } catch (error) {
            console.error('Erro ao copiar:', error);
            showCopyError(button);
        }
    }
    
    /**
     * Mostra feedback de sucesso na cópia
     */
    function showCopySuccess(button, copiedText) {
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;
        
        // Feedback visual conforme especificação
        button.textContent = 'Copiado!';
        button.style.backgroundColor = '#27ae60';
        button.disabled = true;
        
        // Mostrar toast
        showToast(`Copiado: ${copiedText}`, 'success');
        
        // Restaurar após 2 segundos conforme especificação
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBg;
            button.disabled = false;
        }, 2000);
    }
    
    /**
     * Mostra feedback de erro na cópia
     */
    function showCopyError(button) {
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;
        
        button.textContent = 'Erro!';
        button.style.backgroundColor = 'var(--accent-color)';
        
        showToast('Erro ao copiar texto', 'error');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBg;
        }, 2000);
    }
}

/**
 * 3. Alternador de Tema (Claro/Escuro) - conforme especificações
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Aplicar tema salvo imediatamente para evitar "piscar"
    applyStoredTheme();
    
    // Event listener para alternar tema
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });
    
    /**
     * Aplica tema salvo no localStorage
     */
    function applyStoredTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            updateThemeButton('dark');
            window.AppState.currentTheme = 'dark';
        } else {
            document.body.classList.remove('dark-theme');
            updateThemeButton('light');
            window.AppState.currentTheme = 'light';
        }
    }
    
    /**
     * Alterna entre tema claro e escuro
     */
    function toggleTheme() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        
        if (isDarkTheme) {
            // Mudar para tema claro
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            updateThemeButton('light');
            window.AppState.currentTheme = 'light';
            showToast('Tema claro ativado', 'info');
        } else {
            // Mudar para tema escuro
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeButton('dark');
            window.AppState.currentTheme = 'dark';
            showToast('Tema escuro ativado', 'info');
        }
        
        // Animação do botão
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
    
    /**
     * Atualiza o ícone do botão de tema
     */
    function updateThemeButton(theme) {
        if (theme === 'dark') {
            themeToggle.textContent = '☀️'; // Sol para tema escuro (para mudar para claro)
            themeToggle.title = 'Mudar para tema claro';
        } else {
            themeToggle.textContent = '🌙'; // Lua para tema claro (para mudar para escuro)
            themeToggle.title = 'Mudar para tema escuro';
        }
    }
    
    // Detectar preferência do sistema (opcional)
    if (window.matchMedia && !localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeButton('dark');
            window.AppState.currentTheme = 'dark';
        }
    }
    
    // Escutar mudanças na preferência do sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-theme');
                    updateThemeButton('dark');
                    window.AppState.currentTheme = 'dark';
                } else {
                    document.body.classList.remove('dark-theme');
                    updateThemeButton('light');
                    window.AppState.currentTheme = 'light';
                }
            }
        });
    }
}

/**
 * Funcionalidades adicionais de UI
 */

/**
 * Animação de entrada para elementos
 */
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.project-card, .contact-form, .filter-btn');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Efeito de parallax suave no hero
 */
function initializeParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }, 10));
}

/**
 * Smooth hover effects para cards
 */
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Loading states para botões
 */
function addLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.classList.add('loading');
            }
        });
    });
}

/**
 * Keyboard navigation melhorada
 */
function improveKeyboardNavigation() {
    // Adicionar indicadores visuais para foco
    const focusableElements = document.querySelectorAll('button, input, textarea, a, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--secondary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Navegação por teclado no carousel
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.carousel-container')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
            }
        }
    });
}

// Inicializar funcionalidades adicionais
window.addEventListener('load', function() {
    animateOnScroll();
    initializeParallax();
    initializeHoverEffects();
    addLoadingStates();
    improveKeyboardNavigation();
});

// Exportar funções para uso global se necessário
window.toggleTheme = function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.click();
    }
};

// Script principal - Gerenciamento de estado e inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Estado global da aplicação
    window.AppState = {
        isLoggedIn: false,
        currentUser: null,
        currentTheme: localStorage.getItem('theme') || 'light'
    };

    // Inicializar tema salvo
    initializeTheme();
    
    // Inicializar navegação mobile
    initializeMobileNavigation();
    
    // Inicializar smooth scroll para links internos
    initializeSmoothScroll();
    
    // Verificar estado de login salvo
    checkLoginState();
    
    console.log('Aplicação inicializada com sucesso!');
});

/**
 * Inicializa o tema salvo no localStorage
 */
function initializeTheme() {
    if (window.AppState.currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

/**
 * Inicializa a navegação mobile (hamburger menu)
 */
function initializeMobileNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa smooth scroll para links internos
 */
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensar altura do header fixo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Verifica se existe um estado de login salvo
 */
function checkLoginState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            window.AppState.isLoggedIn = true;
            window.AppState.currentUser = userData;
            updateLoginUI(userData);
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            localStorage.removeItem('currentUser');
        }
    }
}

/**
 * Atualiza a interface do usuário após login
 */
function updateLoginUI(userData) {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && userData) {
        loginBtn.textContent = `Olá, ${userData.username}`;
        loginBtn.onclick = logout;
        loginBtn.classList.add('logged-in');
    }
}

/**
 * Função de logout
 */
function logout() {
    window.AppState.isLoggedIn = false;
    window.AppState.currentUser = null;
    localStorage.removeItem('currentUser');
    
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = null;
        loginBtn.classList.remove('logged-in');
    }
    
    showToast('Logout realizado com sucesso!', 'success');
}

/**
 * Função utilitária para mostrar toast notifications
 */
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Mostrar toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remover toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

/**
 * Função utilitária para validar email
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Função utilitária para debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Função para animar elementos quando entram na viewport
 */
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// Inicializar observer quando a página carregar
window.addEventListener('load', observeElements);

// Exportar funções globais necessárias
window.showToast = showToast;
window.validateEmail = validateEmail;
window.debounce = debounce;

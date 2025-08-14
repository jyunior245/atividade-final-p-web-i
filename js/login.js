// Login.js - Sistema de login com validação conforme especificações
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
});

function initializeLogin() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('login-form');
    
    if (!loginBtn || !loginModal || !loginForm) return;
    
    // Abrir modal de login
    loginBtn.addEventListener('click', function() {
        if (window.AppState.isLoggedIn) {
            // Se já está logado, fazer logout
            logout();
        } else {
            // Abrir modal de login
            loginModal.style.display = 'block';
            document.getElementById('username').focus();
        }
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', function() {
        closeLoginModal();
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.style.display === 'block') {
            closeLoginModal();
        }
    });
    
    // Validação e submissão do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateAndLogin();
    });
    
    // Validação em tempo real
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    usernameInput.addEventListener('input', function() {
        validateUsername(this.value);
    });
    
    passwordInput.addEventListener('input', function() {
        validatePassword(this.value);
    });
}

/**
 * Valida o campo usuário conforme especificações
 */
function validateUsername(username) {
    const usernameError = document.getElementById('username-error');
    const errors = [];
    
    // Não pode estar vazio
    if (!username || username.trim().length === 0) {
        errors.push('Usuário não pode estar vazio');
    }
    
    // Máximo de 15 caracteres
    if (username.length > 15) {
        errors.push('Usuário deve ter no máximo 15 caracteres');
    }
    
    // Exibir erros
    if (errors.length > 0) {
        usernameError.textContent = errors[0];
        return false;
    } else {
        usernameError.textContent = '';
        return true;
    }
}

/**
 * Valida a senha conforme especificações rigorosas
 */
function validatePassword(password) {
    const passwordError = document.getElementById('password-error');
    const errors = [];
    
    // Não pode estar vazia
    if (!password || password.length === 0) {
        errors.push('Senha não pode estar vazia');
        passwordError.textContent = errors[0];
        return false;
    }
    
    // Mínimo de 8 caracteres
    if (password.length < 8) {
        errors.push('Senha deve ter no mínimo 8 caracteres');
    }
    
    // Mínimo de 2 números
    const numbers = password.match(/\d/g);
    if (!numbers || numbers.length < 2) {
        errors.push('Senha deve ter no mínimo 2 números');
    }
    
    // Mínimo de 1 caractere especial
    const specialChars = password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
    if (!specialChars || specialChars.length < 1) {
        errors.push('Senha deve ter no mínimo 1 caractere especial (!@#$%^&*)');
    }
    
    // Mínimo de 1 letra maiúscula
    const upperCase = password.match(/[A-Z]/g);
    if (!upperCase || upperCase.length < 1) {
        errors.push('Senha deve ter no mínimo 1 letra maiúscula');
    }
    
    // Mínimo de 1 letra minúscula
    const lowerCase = password.match(/[a-z]/g);
    if (!lowerCase || lowerCase.length < 1) {
        errors.push('Senha deve ter no mínimo 1 letra minúscula');
    }
    
    // Exibir erros
    if (errors.length > 0) {
        passwordError.innerHTML = errors.map(error => `• ${error}`).join('<br>');
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}

/**
 * Valida e realiza o login
 */
function validateAndLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validar campos
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    
    if (!isUsernameValid || !isPasswordValid) {
        showToast('Por favor, corrija os erros no formulário', 'error');
        return;
    }
    
    // Simular autenticação (em um projeto real, seria uma chamada para API)
    simulateAuthentication(username, password);
}

/**
 * Simula processo de autenticação
 */
function simulateAuthentication(username, password) {
    // Mostrar loading
    const submitBtn = document.querySelector('#login-form .submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Entrando...';
    submitBtn.disabled = true;
    
    // Simular delay de rede
    setTimeout(() => {
        // Credenciais de teste (em um projeto real, seria validado no servidor)
        const validCredentials = [
            { username: 'admin', password: 'Admin123!' },
            { username: 'user', password: 'User123!' },
            { username: 'test', password: 'Test123!' }
        ];
        
        const isValidUser = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        if (isValidUser) {
            // Login bem-sucedido
            const userData = {
                username: username,
                loginTime: new Date().toISOString(),
                role: username === 'admin' ? 'admin' : 'user'
            };
            
            // Salvar estado
            window.AppState.isLoggedIn = true;
            window.AppState.currentUser = userData;
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Atualizar UI
            updateLoginUI(userData);
            closeLoginModal();
            
            // Feedback
            showToast(`Bem-vindo, ${username}!`, 'success');
            
            // Limpar formulário
            document.getElementById('login-form').reset();
            clearValidationErrors();
            
        } else {
            // Login falhou
            showToast('Usuário ou senha incorretos', 'error');
        }
        
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 1500); // Simular 1.5s de delay
}

/**
 * Atualiza a interface após login bem-sucedido
 */
function updateLoginUI(userData) {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && userData) {
        loginBtn.textContent = `Olá, ${userData.username}`;
        loginBtn.classList.add('logged-in');
        
        // Adicionar dropdown menu (opcional)
        createUserDropdown(userData);
    }
}

/**
 * Cria dropdown menu para usuário logado
 */
function createUserDropdown(userData) {
    const loginBtn = document.getElementById('login-btn');
    const navItem = loginBtn.parentElement;
    
    // Remover dropdown existente
    const existingDropdown = navItem.querySelector('.user-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }
    
    // Criar novo dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: 5px;
        box-shadow: var(--shadow);
        min-width: 150px;
        display: none;
        z-index: 1000;
    `;
    
    dropdown.innerHTML = `
        <div class="dropdown-item" style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color);">
            <strong>${userData.username}</strong><br>
            <small>${userData.role}</small>
        </div>
        <div class="dropdown-item dropdown-link" onclick="showProfile()" style="padding: 0.5rem 1rem; cursor: pointer;">
            👤 Perfil
        </div>
        <div class="dropdown-item dropdown-link" onclick="logout()" style="padding: 0.5rem 1rem; cursor: pointer; color: var(--accent-color);">
            🚪 Sair
        </div>
    `;
    
    navItem.style.position = 'relative';
    navItem.appendChild(dropdown);
    
    // Toggle dropdown
    loginBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function() {
        dropdown.style.display = 'none';
    });
    
    // Hover effects
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--secondary-color)';
            this.style.color = 'white';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.color = '';
        });
    });
}

/**
 * Mostra perfil do usuário (funcionalidade adicional)
 */
window.showProfile = function() {
    const userData = window.AppState.currentUser;
    if (userData) {
        const profileInfo = `
            Usuário: ${userData.username}
            Tipo: ${userData.role}
            Login: ${new Date(userData.loginTime).toLocaleString('pt-BR')}
        `;
        showToast(profileInfo, 'info', 5000);
    }
};

/**
 * Realiza logout
 */
function logout() {
    // Limpar estado
    window.AppState.isLoggedIn = false;
    window.AppState.currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Restaurar UI
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.textContent = 'Login';
        loginBtn.classList.remove('logged-in');
        
        // Remover dropdown
        const dropdown = loginBtn.parentElement.querySelector('.user-dropdown');
        if (dropdown) {
            dropdown.remove();
        }
        
        // Restaurar event listener original
        loginBtn.onclick = null;
    }
    
    showToast('Logout realizado com sucesso!', 'success');
}

/**
 * Fecha o modal de login
 */
function closeLoginModal() {
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.style.display = 'none';
        clearValidationErrors();
    }
}

/**
 * Limpa mensagens de erro de validação
 */
function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Exportar função de logout para uso global
window.logout = logout;

console.log('Sistema de login inicializado com sucesso!');

// Contact.js - Validação de formulário de contato conforme especificações
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const messageTextarea = document.getElementById('message');
    const charCountElement = document.getElementById('char-count');
    
    if (!contactForm) return;
    
    // Configurações
    const MAX_MESSAGE_LENGTH = 500;
    const MIN_MESSAGE_LENGTH = 10;
    
    // Inicializar contador de caracteres
    if (messageTextarea && charCountElement) {
        initializeCharacterCounter();
    }
    
    // Validação em tempo real
    setupRealTimeValidation();
    
    // Submissão do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateAndSubmitForm();
    });
    
    /**
     * Inicializa o contador de caracteres em tempo real
     */
    function initializeCharacterCounter() {
        function updateCharCount() {
            const currentLength = messageTextarea.value.length;
            charCountElement.textContent = currentLength;
            
            const counterContainer = document.querySelector('.char-counter');
            
            // Mudar cor se ultrapassar limite
            if (currentLength > MAX_MESSAGE_LENGTH) {
                counterContainer.classList.add('over-limit');
                charCountElement.style.color = 'var(--accent-color)';
            } else {
                counterContainer.classList.remove('over-limit');
                charCountElement.style.color = '';
            }
            
            // Feedback visual próximo ao limite
            if (currentLength > MAX_MESSAGE_LENGTH * 0.9) {
                charCountElement.style.fontWeight = 'bold';
            } else {
                charCountElement.style.fontWeight = '';
            }
        }
        
        // Atualizar contador em tempo real
        messageTextarea.addEventListener('input', updateCharCount);
        messageTextarea.addEventListener('paste', function() {
            setTimeout(updateCharCount, 10);
        });
        
        // Inicializar contador
        updateCharCount();
    }
    
    /**
     * Configura validação em tempo real para todos os campos
     */
    function setupRealTimeValidation() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        
        // Validação do nome
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                validateName(this.value);
            });
            
            nameInput.addEventListener('input', function() {
                // Limpar erro enquanto digita
                if (this.value.length > 0) {
                    clearFieldError('name');
                }
            });
        }
        
        // Validação do email
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateEmail(this.value);
            });
            
            emailInput.addEventListener('input', function() {
                // Limpar erro enquanto digita
                if (this.value.length > 0) {
                    clearFieldError('email');
                }
            });
        }
        
        // Validação do assunto
        if (subjectInput) {
            subjectInput.addEventListener('blur', function() {
                validateSubject(this.value);
            });
            
            subjectInput.addEventListener('input', function() {
                // Limpar erro enquanto digita
                if (this.value.length > 0) {
                    clearFieldError('subject');
                }
            });
        }
        
        // Validação da mensagem
        if (messageTextarea) {
            messageTextarea.addEventListener('blur', function() {
                validateMessage(this.value);
            });
            
            messageTextarea.addEventListener('input', function() {
                // Limpar erro enquanto digita
                if (this.value.length >= MIN_MESSAGE_LENGTH) {
                    clearFieldError('message');
                }
            });
        }
    }
    
    /**
     * Valida o campo nome
     */
    function validateName(name) {
        const nameError = document.getElementById('name-error');
        
        if (!name || name.trim().length === 0) {
            showFieldError('name', 'Nome não pode estar vazio');
            return false;
        }
        
        if (name.trim().length < 2) {
            showFieldError('name', 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        
        clearFieldError('name');
        return true;
    }
    
    /**
     * Valida o campo email com expressão regular
     */
    function validateEmail(email) {
        const emailError = document.getElementById('email-error');
        
        if (!email || email.trim().length === 0) {
            showFieldError('email', 'Email não pode estar vazio');
            return false;
        }
        
        // Expressão regular para validação de email
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if (!emailRegex.test(email)) {
            showFieldError('email', 'Por favor, insira um email válido');
            return false;
        }
        
        clearFieldError('email');
        return true;
    }
    
    /**
     * Valida o campo assunto
     */
    function validateSubject(subject) {
        const subjectError = document.getElementById('subject-error');
        
        if (!subject || subject.trim().length === 0) {
            showFieldError('subject', 'Assunto não pode estar vazio');
            return false;
        }
        
        if (subject.trim().length < 3) {
            showFieldError('subject', 'Assunto deve ter pelo menos 3 caracteres');
            return false;
        }
        
        clearFieldError('subject');
        return true;
    }
    
    /**
     * Valida o campo mensagem
     */
    function validateMessage(message) {
        const messageError = document.getElementById('message-error');
        
        if (!message || message.trim().length === 0) {
            showFieldError('message', 'Mensagem não pode estar vazia');
            return false;
        }
        
        if (message.trim().length < MIN_MESSAGE_LENGTH) {
            showFieldError('message', `Mensagem deve ter no mínimo ${MIN_MESSAGE_LENGTH} caracteres`);
            return false;
        }
        
        if (message.length > MAX_MESSAGE_LENGTH) {
            showFieldError('message', `Mensagem deve ter no máximo ${MAX_MESSAGE_LENGTH} caracteres`);
            return false;
        }
        
        clearFieldError('message');
        return true;
    }
    
    /**
     * Mostra erro em um campo específico
     */
    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.style.borderColor = 'var(--accent-color)';
        }
    }
    
    /**
     * Limpa erro de um campo específico
     */
    function clearFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (inputElement) {
            inputElement.style.borderColor = '';
        }
    }
    
    /**
     * Valida todo o formulário e submete se válido
     */
    function validateAndSubmitForm() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validar todos os campos
        const isNameValid = validateName(formData.name);
        const isEmailValid = validateEmail(formData.email);
        const isSubjectValid = validateSubject(formData.subject);
        const isMessageValid = validateMessage(formData.message);
        
        const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;
        
        if (!isFormValid) {
            showToast('Por favor, corrija os erros no formulário', 'error');
            return;
        }
        
        // Se chegou até aqui, o formulário é válido
        submitForm(formData);
    }
    
    /**
     * Submete o formulário (simulação de envio)
     */
    function submitForm(formData) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Mostrar loading
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio (em um projeto real, seria uma chamada para API)
        setTimeout(() => {
            // Simular sucesso
            showToast('Mensagem enviada com sucesso!', 'success');
            
            // Simular envio para email (apenas log para demonstração)
            console.log('Simulando envio de email:', {
                to: 'contato@portfolio.com',
                from: formData.email,
                subject: formData.subject,
                body: `
                    Nome: ${formData.name}
                    Email: ${formData.email}
                    Assunto: ${formData.subject}
                    
                    Mensagem:
                    ${formData.message}
                `
            });
            
            // Limpar formulário
            contactForm.reset();
            
            // Resetar contador de caracteres
            if (charCountElement) {
                charCountElement.textContent = '0';
                document.querySelector('.char-counter').classList.remove('over-limit');
            }
            
            // Limpar todos os erros
            const errorElements = contactForm.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
            });
            
            // Remover estilos de erro dos inputs
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
            
            // Restaurar botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Mostrar confirmação adicional
            showEmailConfirmation(formData);
            
        }, 2000); // Simular 2s de delay
    }
    
    /**
     * Mostra confirmação de envio de email
     */
    function showEmailConfirmation(formData) {
        const confirmationMessage = `
            <div style="text-align: left;">
                <strong>✅ Email enviado com sucesso!</strong><br><br>
                <strong>Para:</strong> contato@portfolio.com<br>
                <strong>Assunto:</strong> ${formData.subject}<br>
                <strong>De:</strong> ${formData.name} (${formData.email})<br><br>
                <em>Responderemos em breve!</em>
            </div>
        `;
        
        // Criar modal de confirmação personalizado
        const confirmationModal = document.createElement('div');
        confirmationModal.className = 'confirmation-modal';
        confirmationModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        confirmationModal.innerHTML = `
            <div style="
                background: var(--background-color);
                padding: 2rem;
                border-radius: 10px;
                max-width: 400px;
                width: 90%;
                box-shadow: var(--shadow);
            ">
                ${confirmationMessage}
                <button onclick="this.closest('.confirmation-modal').remove()" 
                        style="
                            background: var(--secondary-color);
                            color: white;
                            border: none;
                            padding: 0.5rem 1rem;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-top: 1rem;
                            width: 100%;
                        ">
                    Fechar
                </button>
            </div>
        `;
        
        document.body.appendChild(confirmationModal);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (confirmationModal.parentNode) {
                confirmationModal.remove();
            }
        }, 5000);
    }
    
    console.log('Formulário de contato inicializado com sucesso!');
}

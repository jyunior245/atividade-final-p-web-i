// Carousel.js - Funcionalidade do carrossel conforme especificações
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
});

function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isTransitioning = false;
    
    // Configurações do carousel
    const SLIDE_DURATION = 5000; // 5 segundos conforme especificação
    const TRANSITION_DURATION = 500;
    
    /**
     * Mostra o slide especificado
     */
    function showSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Remove classe active de todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adiciona classe active ao slide atual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
        
        // Reset do flag de transição
        setTimeout(() => {
            isTransitioning = false;
        }, TRANSITION_DURATION);
    }
    
    /**
     * Vai para o próximo slide
     */
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    /**
     * Vai para o slide anterior
     */
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    /**
     * Inicia a transição automática
     */
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, SLIDE_DURATION);
    }
    
    /**
     * Para a transição automática
     */
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    /**
     * Reinicia o temporizador (após interação manual)
     */
    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Event Listeners
    
    // Botão anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            restartAutoSlide(); // Reinicia temporizador após clique manual
        });
    }
    
    // Botão próximo
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            restartAutoSlide(); // Reinicia temporizador após clique manual
        });
    }
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            if (index !== currentSlide) {
                showSlide(index);
                restartAutoSlide(); // Reinicia temporizador após clique manual
            }
        });
    });
    
    // Pausa inteligente (hover) - conforme especificação
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            stopAutoSlide();
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            startAutoSlide(); // Reinicia quando mouse sai da área
        });
    }
    
    // Controle por teclado (acessibilidade)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartAutoSlide();
        }
    });
    
    // Suporte a touch/swipe para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próximo slide
                nextSlide();
            } else {
                // Swipe right - slide anterior
                prevSlide();
            }
            restartAutoSlide();
        }
    }
    
    // Pausar carousel quando a aba não está ativa
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    // Inicializar carousel
    showSlide(0);
    startAutoSlide();
    
    console.log('Carousel inicializado com sucesso!');
}

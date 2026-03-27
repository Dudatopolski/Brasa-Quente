// Inicializar AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Newsletter Form
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        alert('Obrigado por se cadastrar! Você receberá nossas promoções em breve.');
        this.reset();
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de fade no menu ao scroll
window.addEventListener('scroll', () => {
    const menu = document.querySelector('.menu-topo');
    if (window.scrollY > 100) {
        menu.style.background = 'rgba(0,0,0,0.95)';
        menu.style.backdropFilter = 'blur(10px)';
    } else {
        menu.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)';
        menu.style.backdropFilter = 'none';
    }
});
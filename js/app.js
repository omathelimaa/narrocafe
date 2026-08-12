/**
 * NARRO CAFÉ - SCRIPT PRINCIPAL (MINIMALISTA)
 * Lógica de interatividade refinada e transições fluidas.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
  initNewsletterForm();
});

/**
 * 1. ALTERNADOR DE TEMA (CONTRASTE CLARO/ESCURO)
 * Persiste a preferência no LocalStorage e verifica preferências de acessibilidade.
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  if (!themeToggleBtn) return;

  // Carrega preferência anterior
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  // Alterna o tema
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * 2. MENU MOBILE RESPONSIVO
 * Gerencia a visibilidade do menu de navegação em smartphones.
 */
function initMobileMenu() {
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggleBtn || !navMenu) return;

  // Alterna classes ao clicar no hambúrguer
  menuToggleBtn.addEventListener('click', () => {
    const isOpen = menuToggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fecha o menu ao clicar nos links internos
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 3. COMPORTAMENTO INTELIGENTE DO CABEÇALHO (HEADER)
 * Adiciona uma linha divisória e fundo fosco ao rolar a página.
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Executa ao carregar para capturar scrolls iniciais
}

/**
 * 4. SCROLL REVEAL (INTERSECTION OBSERVER)
 * Entrada elegante e gradual dos blocos e faixas ao rolar a página.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach(element => {
    element.classList.add('revealed');
  });
}

/**
 * 5. FORMULÁRIO DE CONTATO (ADQUIRIR LOTES)
 * Captura o e-mail do interessado e exibe uma confirmação estética.
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const feedbackElement = document.getElementById('form-message');

  if (!form || !feedbackElement) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const emailValue = emailInput.value.trim();

    if (!emailValue) return;

    feedbackElement.className = 'form-feedback';
    feedbackElement.textContent = 'Enviando sua solicitação à fazenda...';

    setTimeout(() => {
      feedbackElement.className = 'form-feedback success';
      feedbackElement.textContent = 'Obrigado! Em breve você receberá nossos preços e disponibilidade do lote atual.';
      emailInput.value = '';
      
      // Limpa mensagem
      setTimeout(() => {
        feedbackElement.textContent = '';
        feedbackElement.className = 'form-feedback';
      }, 5000);
    }, 1200);
  });
}

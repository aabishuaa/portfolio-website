/**
 * UI INTERACTIONS MODULE
 * Handles back to top button, carousel, theme toggle, and other UI elements
 */

/**
 * Initialize back to top button
 */
export function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleBackToTop);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Pause tech carousel on hover
 */
export function initCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (!carouselTrack) return;

  carouselTrack.addEventListener('mouseenter', () => {
    carouselTrack.style.animationPlayState = 'paused';
  });

  carouselTrack.addEventListener('mouseleave', () => {
    carouselTrack.style.animationPlayState = 'running';
  });
}

/**
 * Initialize theme toggle functionality
 */
export function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');

    // Save preference
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  }
}

/**
 * Initialize page loading animation
 */
export function initLoadingAnimation() {
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });
}

/**
 * Initialize scroll indicator click handler
 */
export function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (!scrollIndicator) return;

  scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

/**
 * Initialize all UI interactions
 */
export function initUI() {
  initBackToTop();
  initCarousel();
  initThemeToggle();
  initLoadingAnimation();
  initScrollIndicator();
}

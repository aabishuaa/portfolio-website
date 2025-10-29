/**
 * NAVIGATION MODULE
 * Handles smooth scrolling, navigation highlighting, and navbar behavior
 */

import { smoothScrollTo, debounce } from './utils.js';

/**
 * Initialize smooth scrolling for navigation links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        smoothScrollTo(target, navHeight + 20);
      }
    });
  });
}

/**
 * Highlight active navigation link based on scroll position
 */
export function highlightNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  const scrollPosition = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/**
 * Handle navbar background change on scroll
 */
export function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
  }
}

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
  initSmoothScroll();

  // Apply debounced scroll handlers
  const debouncedHighlight = debounce(highlightNavigation, 10);
  const debouncedNavbar = debounce(handleNavbarScroll, 10);

  window.addEventListener('scroll', debouncedHighlight);
  window.addEventListener('scroll', debouncedNavbar);
}

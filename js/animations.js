/**
 * ANIMATIONS MODULE
 * Handles counters, intersection observers, parallax, and visual effects
 */

import { debounce } from './utils.js';

/**
 * Animate counter numbers in stats section
 */
export function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function animateCounters() {
    if (hasAnimated) return;

    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    const sectionPosition = aboutSection.getBoundingClientRect();

    if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
      hasAnimated = true;

      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target + '+';
          }
        };

        updateCounter();
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
}

/**
 * Initialize intersection observer for fade-in animations
 */
export function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards and sections for fade-in animations
  const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .now-card, .contact-card, .specialty-item'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * Handle parallax effect on hero section
 */
export function handleParallax() {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
}

/**
 * Animate floating blobs with mouse movement
 */
export function initBlobAnimation() {
  const blobs = document.querySelectorAll('.blob');
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateBlobs() {
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.005;
      const x = (mouseX - window.innerWidth / 2) * speed;
      const y = (mouseY - window.innerHeight / 2) * speed;

      blob.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animateBlobs);
  }

  animateBlobs();
}

/**
 * Skill card tilt effect on hover
 */
export function initCardTilt() {
  const cards = document.querySelectorAll('.skill-card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/**
 * Initialize lazy loading for images
 */
export function initLazyLoading() {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Initialize all animations
 */
export function initAnimations() {
  initCounterAnimation();
  initIntersectionObserver();
  initBlobAnimation();
  initCardTilt();
  initLazyLoading();

  // Parallax with debounce
  const debouncedParallax = debounce(handleParallax, 10);
  window.addEventListener('scroll', debouncedParallax);
}

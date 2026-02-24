/**
 * ANIMATIONS MODULE
 * Handles counters, scroll-reveal, parallax, and visual effects
 */

import { debounce } from './utils.js';

/**
 * Animate counter numbers in the stats section
 */
export function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function animateCounters() {
    if (hasAnimated) return;

    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      hasAnimated = true;

      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 1800; // ms
        const fps = 60;
        const increment = target / (duration / (1000 / fps));
        let current = 0;

        const tick = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(tick);
          } else {
            stat.textContent = target + '+';
          }
        };

        tick();
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // run once on load in case already in view
}

/**
 * Scroll-reveal using IntersectionObserver + CSS classes.
 * Elements get `anim-ready` applied in JS, then `anim-in` when visible.
 * Transition properties live in styles.css (.anim-ready / .anim-in).
 */
export function initScrollReveal() {
  const selector = '.skill-card, .project-card, .now-card, .contact-card, .specialty-item, .stat-item';
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-in');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el, i) => {
    el.classList.add('anim-ready');
    // Stagger delay based on position within its parent
    const siblings = Array.from(el.parentElement.children);
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = `${idx * 60}ms`;
    observer.observe(el);
  });
}

/**
 * Parallax fade on hero content as user scrolls down
 */
export function handleParallax() {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent || scrolled >= window.innerHeight) return;

  const progress = scrolled / window.innerHeight;
  heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
  heroContent.style.opacity = 1 - progress * 1.4;
}

/**
 * Animate background blobs subtly with mouse position
 */
export function initBlobAnimation() {
  const blobs = document.querySelectorAll('.blob');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = [mouseX, mouseX, mouseX];
  let currentY = [mouseY, mouseY, mouseY];

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Lerp (smooth follow) so blobs drift rather than snap
  function animateBlobs() {
    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 0.003;
      const lerp = 0.03 + i * 0.01;

      currentX[i] += ((mouseX - window.innerWidth / 2) * speed - currentX[i] + window.innerWidth / 2) * lerp;
      currentY[i] += ((mouseY - window.innerHeight / 2) * speed - currentY[i] + window.innerHeight / 2) * lerp;

      const dx = currentX[i] - window.innerWidth / 2;
      const dy = currentY[i] - window.innerHeight / 2;
      blob.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    requestAnimationFrame(animateBlobs);
  }

  animateBlobs();
}

/**
 * 3D tilt effect on skill and project preview cards
 */
export function initCardTilt() {
  const cards = document.querySelectorAll('.skill-card, .card-preview');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * 5;
      const rotY = ((cx - x) / cx) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * Lazy-load images as they enter the viewport
 */
export function initLazyLoading() {
  if (!('IntersectionObserver' in window)) return;

  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        img.classList.add('loaded');
        obs.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => imgObserver.observe(img));
}

/**
 * Master init
 */
export function initAnimations() {
  initCounterAnimation();
  initScrollReveal();
  initBlobAnimation();
  initCardTilt();
  initLazyLoading();

  const debouncedParallax = debounce(handleParallax, 8);
  window.addEventListener('scroll', debouncedParallax, { passive: true });
}

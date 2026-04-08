/**
 * 3D EFFECTS & FUTURISTIC ANIMATIONS MODULE
 * Particle neural network, 3D section reveals, typewriter, name glow
 */

// ─── PARTICLE NEURAL NETWORK CANVAS ────────────────────────────────────────
export function initParticleNetwork() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const mouse = { x: W / 2, y: H / 2 };
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  // Fewer particles on mobile for performance
  const COUNT = window.innerWidth < 768 ? 45 : 90;
  const CONNECT = 160;

  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 1.8 + 0.5,
    hue: Math.random() > 0.55 ? 195 : 270, // cyan or purple
    alpha: Math.random() * 0.4 + 0.3,
  }));

  // Track if hero is in view — pause animation when scrolled away
  let heroVisible = true;
  const heroSection = document.getElementById('home');
  if (heroSection) {
    const visObs = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    visObs.observe(heroSection);
  }

  let rafId;
  function tick() {
    rafId = requestAnimationFrame(tick);
    if (!heroVisible) return;

    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      // Wrap
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // Mouse repulsion
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      if (d < 90 && d > 0) {
        p.x += (dx / d) * 1.2;
        p.y += (dy / d) * 1.2;
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsl(${p.hue}, 100%, 72%)`;
      ctx.fill();
    });

    // Draw connections
    ctx.shadowBlur = 0;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          const a = (1 - d / CONNECT) * 0.38;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  tick();
}

// ─── 3D SECTION REVEAL TRANSITIONS ─────────────────────────────────────────
export function initSectionTransitions() {
  const sections = document.querySelectorAll(
    '.about-section, .skills-section, .portfolio-section, .now-section, .contact-section'
  );

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(s => {
    s.classList.add('section-3d-ready');
    obs.observe(s);
  });
}

// ─── TYPEWRITER EFFECT FOR HERO SUBTITLE ───────────────────────────────────
export function initTypewriter() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const text = subtitle.textContent.trim();

  // Wait for the subtitle's fadeSlideUp animation to complete (delay 200ms + dur 800ms)
  setTimeout(() => {
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    subtitle.style.transform = 'none';
    subtitle.style.animation = 'none';

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    subtitle.appendChild(cursor);

    let i = 0;
    function type() {
      if (i < text.length) {
        subtitle.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        setTimeout(type, 52);
      } else {
        // Remove cursor after a pause
        setTimeout(() => cursor.classList.add('cursor-idle'), 2000);
      }
    }
    type();
  }, 1050);
}

// ─── GLITCH FLICKER ON NAME (runs once on load) ─────────────────────────────
export function initNameGlitch() {
  const name = document.querySelector('.name-highlight');
  if (!name) return;

  // Short glitch sequence 1.5s after page load
  setTimeout(() => {
    name.classList.add('name-glitch');
    setTimeout(() => name.classList.remove('name-glitch'), 600);
  }, 1500);
}

// ─── TILT ENHANCEMENT FOR SECTION HEADERS ───────────────────────────────────
export function initSectionHeaderGlow() {
  const headers = document.querySelectorAll('.section-title');
  headers.forEach(h => {
    const underline = h.nextElementSibling;
    if (underline && underline.classList.contains('title-underline')) {
      h.classList.add('section-title-glow');
    }
  });
}

// ─── NEON BORDER PULSE ON SKILL CARDS ───────────────────────────────────────
export function initNeonCards() {
  const cards = document.querySelectorAll('.skill-card');
  const colors = ['#00d4ff', '#7b2fff', '#ff2fdb', '#00d4ff', '#7b2fff', '#ff6b6b'];
  cards.forEach((card, i) => {
    card.style.setProperty('--neon-color', colors[i % colors.length]);
    card.classList.add('neon-card');
  });
}

// ─── MASTER INIT ───────────────────────────────────────────────────────────
export function init3DEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initParticleNetwork();
  initSectionTransitions();
  initTypewriter();
  initNameGlitch();
  initSectionHeaderGlow();
  initNeonCards();
}

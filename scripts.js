/**
 * PORTFOLIO WEBSITE - INTERACTIVE JAVASCRIPT
 * Author: Abishua
 * Last Updated: 2025
 */

// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // NAVIGATION HIGHLIGHTING ON SCROLL
  // ============================================

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
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

  window.addEventListener('scroll', highlightNavigation);

  // ============================================
  // NAVBAR BACKGROUND ON SCROLL
  // ============================================

  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================

  const backToTopBtn = document.getElementById('backToTop');

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

  // ============================================
  // ANIMATED COUNTER FOR STATS
  // ============================================

  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function animateCounters() {
    if (hasAnimated) return;

    const aboutSection = document.querySelector('.about-section');
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

  // ============================================
  // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ============================================

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

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      // Show success message (you can replace this with actual form submission)
      showFormMessage('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');

      // Reset form
      contactForm.reset();

      // In production, you would send the data to your backend:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })
      // .then(response => response.json())
      // .then(data => {
      //   showFormMessage('success', 'Message sent successfully!');
      // })
      // .catch(error => {
      //   showFormMessage('error', 'Failed to send message. Please try again.');
      // });
    });
  }

  function showFormMessage(type, message) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;

    // Style the message
    messageDiv.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px 20px;
      margin-top: 20px;
      border-radius: 12px;
      font-weight: 600;
      animation: slideIn 0.3s ease;
      background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
      color: ${type === 'success' ? '#155724' : '#721c24'};
      border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;

    // Insert message after form
    contactForm.insertAdjacentElement('afterend', messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }

  // ============================================
  // TECH CAROUSEL PAUSE ON HOVER
  // ============================================

  const carouselTrack = document.querySelector('.carousel-track');

  if (carouselTrack) {
    carouselTrack.addEventListener('mouseenter', () => {
      carouselTrack.style.animationPlayState = 'paused';
    });

    carouselTrack.addEventListener('mouseleave', () => {
      carouselTrack.style.animationPlayState = 'running';
    });
  }

  // ============================================
  // FLOATING BLOB CURSOR EFFECT
  // ============================================

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

  // ============================================
  // TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
  // ============================================

  function createTypingEffect() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (!subtitleElement) return;

    const originalText = subtitleElement.textContent;
    const titles = [
      'Software Engineer & AI Innovator',
      'Full Stack Developer',
      'Machine Learning Enthusiast',
      'UI/UX Designer',
      'Tech Entrepreneur'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentTitle = titles[0];

    function type() {
      const speed = isDeleting ? 50 : 100;
      const pause = 2000;

      if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => { isDeleting = true; type(); }, pause);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        currentTitle = titles[titleIndex];
        setTimeout(type, 500);
        return;
      }

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      subtitleElement.textContent = currentTitle.substring(0, charIndex);

      // Add cursor effect
      if (!isDeleting && charIndex === currentTitle.length) {
        subtitleElement.textContent += '|';
      } else if (charIndex < currentTitle.length) {
        subtitleElement.textContent += '|';
      }

      setTimeout(type, speed);
    }

    // Uncomment to enable typing effect
    // setTimeout(type, 1000);
  }

  // createTypingEffect(); // Uncomment to enable

  // ============================================
  // PARALLAX EFFECT ON SCROLL
  // ============================================

  function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
  }

  window.addEventListener('scroll', handleParallax);

  // ============================================
  // SKILL CARD TILT EFFECT ON HOVER
  // ============================================

  const skillCards = document.querySelectorAll('.skill-card, .project-card');

  skillCards.forEach(card => {
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

  // ============================================
  // THEME TOGGLE (Optional Future Enhancement)
  // ============================================

  // Add this button to your HTML if you want dark mode toggle:
  // <button id="themeToggle" class="theme-toggle">
  //   <i class="fas fa-moon"></i>
  // </button>

  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
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
      themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
  }

  // ============================================
  // LOADING ANIMATION
  // ============================================

  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================

  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll handlers
  const debouncedHighlight = debounce(highlightNavigation, 10);
  const debouncedNavbar = debounce(handleNavbarScroll, 10);
  const debouncedParallax = debounce(handleParallax, 10);

  window.addEventListener('scroll', debouncedHighlight);
  window.addEventListener('scroll', debouncedNavbar);
  window.addEventListener('scroll', debouncedParallax);

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================

  if ('IntersectionObserver' in window) {
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

  // ============================================
  // EXPANDABLE PROJECT CARDS
  // ============================================

  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const expandBtn = card.querySelector('.card-expand-btn');
    const closeBtn = card.querySelector('.card-close-btn');
    const cardPreview = card.querySelector('.card-preview');

    // Expand card when clicking the expand button
    if (expandBtn) {
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        expandCard(card);
      });
    }

    // Expand card when clicking the card preview
    if (cardPreview) {
      cardPreview.addEventListener('click', () => {
        if (!card.classList.contains('expanded')) {
          expandCard(card);
        }
      });
    }

    // Close card when clicking close button
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        collapseCard(card);
      });
    }
  });

  function expandCard(card) {
    // Close any other open cards
    projectCards.forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('expanded')) {
        collapseCard(otherCard);
      }
    });

    // Expand the selected card
    card.classList.add('expanded');

    // Smooth scroll to the card
    setTimeout(() => {
      const cardTop = card.offsetTop;
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      window.scrollTo({
        top: cardTop - navbarHeight - 20,
        behavior: 'smooth'
      });
    }, 100);
  }

  function collapseCard(card) {
    card.classList.remove('expanded');
  }

  // Close expanded card with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const expandedCard = document.querySelector('.project-card.expanded');
      if (expandedCard) {
        collapseCard(expandedCard);
      }
    }
  });
});

// ============================================
// ADD CUSTOM CSS FOR FORM MESSAGES (via JavaScript)
// ============================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .form-message i {
    font-size: 1.2rem;
  }
`;
document.head.appendChild(style);

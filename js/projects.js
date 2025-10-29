/**
 * PROJECTS MODULE
 * Handles expandable project cards functionality
 */

/**
 * Expand a project card
 * @param {HTMLElement} card - Card element to expand
 */
function expandCard(card) {
  const projectCards = document.querySelectorAll('.project-card');

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

/**
 * Collapse a project card
 * @param {HTMLElement} card - Card element to collapse
 */
function collapseCard(card) {
  card.classList.remove('expanded');
}

/**
 * Initialize expandable project cards
 */
export function initProjectCards() {
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

  // Close expanded card with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const expandedCard = document.querySelector('.project-card.expanded');
      if (expandedCard) {
        collapseCard(expandedCard);
      }
    }
  });
}

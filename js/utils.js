/**
 * UTILITY FUNCTIONS
 * Reusable helper functions
 */

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
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

/**
 * Smooth scroll to element
 * @param {HTMLElement} target - Element to scroll to
 * @param {number} offset - Offset from top in pixels
 */
export function smoothScrollTo(target, offset = 0) {
  const targetPosition = target.offsetTop - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

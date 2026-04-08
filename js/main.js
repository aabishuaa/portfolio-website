/**
 * MAIN ENTRY POINT
 * Portfolio Website - Interactive JavaScript
 * Author: Abishua
 * Last Updated: 2025
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initUI } from './ui.js';
import { initForms } from './forms.js';
import { initProjectCards } from './projects.js';
import { init3DEffects } from './3d-effects.js';

/**
 * Initialize all modules when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality modules
  initNavigation();
  initAnimations();
  initUI();
  initForms();
  initProjectCards();
  init3DEffects();

  console.log('Portfolio website initialized successfully!');
});

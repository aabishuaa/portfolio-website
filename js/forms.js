/**
 * FORMS MODULE
 * Handles contact form submission and validation
 */

/**
 * Display form message (success or error)
 * @param {string} type - 'success' or 'error'
 * @param {string} message - Message to display
 * @param {HTMLElement} form - Form element
 */
function showFormMessage(type, message, form) {
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
  form.insertAdjacentElement('afterend', messageDiv);

  // Remove message after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

/**
 * Initialize contact form handling
 */
export function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

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

    // Show success message (replace with actual API call in production)
    showFormMessage(
      'success',
      'Thank you! Your message has been sent successfully. I\'ll get back to you soon!',
      contactForm
    );

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
    //   showFormMessage('success', 'Message sent successfully!', contactForm);
    // })
    // .catch(error => {
    //   showFormMessage('error', 'Failed to send message. Please try again.', contactForm);
    // });
  });
}

/**
 * Add CSS for form animations
 */
export function addFormStyles() {
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
}

/**
 * Initialize forms functionality
 */
export function initForms() {
  initContactForm();
  addFormStyles();
}

document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar ul li a');

  let currentIndex = -1;

  sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentIndex = index;
      }
  });

  if (currentIndex !== -1) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[currentIndex].classList.add('active');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.querySelector('nav ul li a[href="#contact"]'); // Navbar Contact link
  const contactSection = document.getElementById("contact-section");

  if (contactBtn && contactSection) {
      contactBtn.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent default anchor behavior

          // Toggle the contact section
          contactSection.classList.toggle("active");

          // Scroll smoothly to the contact section when opened
          if (contactSection.classList.contains("active")) {
              contactSection.scrollIntoView({ behavior: "smooth" });
          }
      });
  }

  // Modal functionality
  const modal = document.getElementById("projectModal");
  const modalClose = document.querySelector(".modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const cardArrows = document.querySelectorAll(".card-arrow");

  // Open modal when clicking card arrows
  cardArrows.forEach(arrow => {
    arrow.addEventListener("click", function(event) {
      event.preventDefault();

      const title = this.getAttribute("data-title");
      const image = this.getAttribute("data-image");
      const description = this.getAttribute("data-description");

      modalTitle.textContent = title;
      modalImage.src = image;
      modalDescription.textContent = description;

      modal.style.display = "block";
    });
  });

  // Close modal when clicking X
  modalClose.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
});

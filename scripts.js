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
});

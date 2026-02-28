/* =============================================
   EDUSUPPLY — script.js
   Handles: Scroll FX, Navbar, Forms, Utilities
   (Cart, Products & Toast handled by products.js)
============================================= */

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setupScrollEffects();
  setupNavbar();
  setupForms();
  setMinDeliveryDate();
  fixFilterTabs();
  // NOTE: Cart button is wired by products.js wireCartIcon() — do NOT add another listener here
});

// ===== FIX FILTER TABS =====
// HTML uses class "filter-tab" but products.js looks for "edu-filter-tab".
// This bridges the gap so clicking tabs actually filters products.
function fixFilterTabs() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (typeof renderProducts === 'function') {
        renderProducts(tab.dataset.filter);
      }
    });
  });
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
  const revealEls = document.querySelectorAll(
    '.cat-card, .step, .testimonial-card, .section-header'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== NAVBAR SCROLL =====
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--cream)';
      navLinks.style.padding = '1rem 2.5rem';
      navLinks.style.gap = '1.2rem';
      navLinks.style.boxShadow = 'var(--shadow-md)';
    });
  }
}

// ===== FORM HANDLERS =====
function setupForms() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Use products.js showToast if available, else fallback
      if (typeof showToast === 'function') {
        showToast('✓ Enquiry sent! We\'ll get back within 24 hours.', 'success');
      }
      e.target.reset();
    });
  }
}

// ===== SCROLL TO SECTION =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===== MIN DELIVERY DATE =====
function setMinDeliveryDate() {
  const dateInput = document.getElementById('deliveryDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }
}

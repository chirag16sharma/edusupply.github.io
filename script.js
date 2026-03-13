/* =============================================
   EDUSUPPLY — script.js
   Handles: Scroll FX, Navbar, Forms, Utilities
============================================= */

document.addEventListener('DOMContentLoaded', () => {
  setupScrollEffects();
  setupNavbar();
  setupForms();
  setMinDeliveryDate();
  fixFilterTabs();
});

// ===== FIX FILTER TABS =====
function fixFilterTabs() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (typeof renderProducts === 'function') renderProducts(tab.dataset.filter);
    });
  });
}

// ===== FILTER PRODUCTS FROM CATEGORY CARDS =====
function filterProducts(category) {
  scrollToSection('products');
  setTimeout(() => {
    if (typeof renderProducts === 'function') renderProducts(category);
    document.querySelectorAll('.edu-filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === category);
    });
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === category);
    });
  }, 400);
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
  const revealEls = document.querySelectorAll('.cat-card, .step, .testimonial-card, .section-header');
  revealEls.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== NAVBAR =====
function setupNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  if (hamburger && navLinks) {
    let isOpen = false;

    function openNav() {
      isOpen = true;
      navLinks.style.display        = 'flex';
      navLinks.style.flexDirection  = 'column';
      navLinks.style.position       = 'absolute';
      navLinks.style.top            = '70px';
      navLinks.style.left           = '0';
      navLinks.style.right          = '0';
      navLinks.style.background     = 'var(--cream)';
      navLinks.style.padding        = '1rem 2.5rem';
      navLinks.style.gap            = '1.2rem';
      navLinks.style.boxShadow      = 'var(--shadow-md)';
      navLinks.style.zIndex         = '9998';
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
      isOpen = false;
      navLinks.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen ? closeNav() : openNav();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (isOpen && !navLinks.contains(e.target) && e.target !== hamburger) {
        closeNav();
      }
    });

    // Close when a nav link is clicked (e.g. scrolling to a section)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeNav();
    });
  }
}

// ===== FORM HANDLERS =====
function setupForms() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof showToast === 'function') {
        showToast('✓ Enquiry sent! We\'ll get back within 24 hours.', 'success');
      }
      e.target.reset();
    });
  }

  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof showToast === 'function') {
        const total = typeof cartTotal === 'function' ? cartTotal() : 0;
        const msg   = total > 0
          ? `🎉 Order of ₹${total.toLocaleString('en-IN')} placed! We'll confirm within 2 hours.`
          : '🎉 Order placed! We\'ll confirm within 2 hours.';
        showToast(msg, 'success', 5000);
      }
      if (typeof cart !== 'undefined') {
        cart.length = 0;
        if (typeof saveCart  === 'function') saveCart();
        if (typeof renderCart === 'function') renderCart();
      }
      document.getElementById('orderModal')?.classList.remove('open');
      e.target.reset();
    });
  }
}

// ===== HELPERS =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function setMinDeliveryDate() {
  const dateInput = document.getElementById('deliveryDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min   = tomorrow.toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }
}

function toggleEduCart() {
  const sidebar = document.getElementById('edu-cart-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  } else {
    setTimeout(() => {
      const s = document.getElementById('edu-cart-sidebar');
      if (s) s.classList.toggle('open');
    }, 100);
  }
}

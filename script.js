/* =============================================
   EDUSUPPLY — script.js
   Handles: Products, Cart, Filters, Modals,
            Toast, Scroll FX, Form Submission
============================================= */

// ===== PRODUCT DATA =====
const products = [
  // FURNITURE
  { id: 1, name: "Student Bench (2-Seater)", category: "furniture", price: 2800, unit: "per bench", badge: "Best Seller", img: "images/prod-bench.svg",      desc: "Sturdy hardwood bench with anti-rust metal frame. Seats 2 students." },
  { id: 2, name: "Student Chair & Desk Set", category: "furniture", price: 3500, unit: "per set",   badge: null,          img: "images/prod-desk.svg",       desc: "Ergonomic writing desk with attached chair, adjustable height." },
  { id: 3, name: "Teacher's Cabin / Cubicle", category: "furniture", price: 12500, unit: "per unit", badge: "New",          img: "images/prod-cabin.svg",      desc: "Premium wooden cabin for teacher privacy. Includes a lockable drawer." },
  { id: 4, name: "Staff Room Table (6-Seater)", category: "furniture", price: 8900, unit: "per table", badge: null,         img: "images/prod-table.svg",      desc: "Large conference-style wooden table. Perfect for staff meetings." },
  { id: 5, name: "Library Bookshelf (5-Tier)", category: "furniture", price: 4200, unit: "per unit", badge: null,           img: "images/prod-shelf.svg",      desc: "High-load bookshelf with metal brackets and wooden shelves." },

  // LAB SUPPLIES
  { id: 6, name: "Chemistry Lab Kit (Class 10)", category: "lab", price: 6500, unit: "per kit", badge: "Popular",     img: "images/prod-chemkit.svg",    desc: "Includes acids, indicators, glassware, and safety equipment." },
  { id: 7, name: "Physics Instruments Set",       category: "lab", price: 5800, unit: "per set", badge: null,          img: "images/prod-physics.svg",    desc: "Vernier caliper, screw gauge, spring balance, prism, lenses & more." },
  { id: 8, name: "Beakers & Glassware Pack",      category: "lab", price: 1800, unit: "per pack", badge: null,         img: "images/prod-beaker.svg",     desc: "Set of 12 borosilicate glass beakers in varied sizes." },
  { id: 9, name: "Biology Dissection Kit",        category: "lab", price: 2200, unit: "per kit",  badge: null,         img: "images/prod-biokit.svg",     desc: "Scalpels, pins, forceps, trays, wax mold included." },
  { id: 10, name: "Microscope (40x–1000x)",       category: "lab", price: 7200, unit: "per unit", badge: "Top Pick",   img: "images/prod-microscope.svg", desc: "Binocular compound microscope with LED illumination." },

  // BOARDS
  { id: 11, name: "Smart Interactive Board 75\"", category: "boards", price: 95000, unit: "per unit", badge: "Premium",  img: "images/prod-smartboard.svg", desc: "4K touch-enabled interactive smart board with built-in speaker." },
  { id: 12, name: "Green Chalk Board (8×4 ft)",   category: "boards", price: 3800, unit: "per unit", badge: null,        img: "images/prod-chalkboard.svg", desc: "Wall-mounted matte green surface. Durable powder-coated frame." },
  { id: 13, name: "Magnetic Whiteboard (6×3 ft)", category: "boards", price: 5200, unit: "per unit", badge: null,        img: "images/prod-whiteboard.svg", desc: "High-gloss whiteboard with magnetic surface and pen tray." },

  // STATIONERY
  { id: 14, name: "Chalk Box (100 Pcs – White)",  category: "stationery", price: 120,  unit: "per box",  badge: null,   img: "images/prod-chalk.svg",      desc: "Dust-free white chalk sticks. 100 pieces per box." },
  { id: 15, name: "Board Duster Set (Pack of 5)", category: "stationery", price: 350,  unit: "per pack", badge: null,   img: "images/prod-duster.svg",     desc: "Felt dusters with ergonomic wooden handle. Washable." },
  { id: 16, name: "Projector (3200 Lumens)",      category: "stationery", price: 28000, unit: "per unit", badge: "New",  img: "images/prod-projector.svg",  desc: "Full-HD classroom projector with HDMI, USB, and WiFi." },
];

// ===== STATE =====
let cart = [];
let activeFilter = 'all';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  setupScrollEffects();
  setupNavbar();
  setupForms();
  setMinDeliveryDate();
});

// ===== RENDER PRODUCTS =====
function renderProducts(filter) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="product-img">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" onerror="this.src='images/placeholder.svg'" />
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3>${p.name}</h3>
        <p style="font-size:0.8rem;color:var(--text-soft);margin-top:0.3rem">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price">₹${p.price.toLocaleString('en-IN')} <span>${p.unit}</span></div>
          <button class="btn-add" onclick="addToCart(${p.id})" title="Add to Cart">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Trigger reveal animations
  setTimeout(() => {
    document.querySelectorAll('.product-card.reveal').forEach(el => el.classList.add('visible'));
  }, 50);
}

// ===== FILTER PRODUCTS =====
function filterProducts(filter, btnEl) {
  activeFilter = filter;
  renderProducts(filter);

  // Update active button
  if (btnEl) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  // Scroll to products if called from categories
  if (!btnEl) {
    scrollToSection('products');
    // Sync filter buttons
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filter);
    });
  }
}

// ===== CART LOGIC =====
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`✓ ${product.name} added to cart`);
}

function removeFromCart(productId) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  if (item.qty > 1) {
    item.qty -= 1;
  } else {
    cart = cart.filter(c => c.id !== productId);
  }
  updateCartUI();
  renderCartItems();
}

function increaseQty(productId) {
  addToCart(productId);
  renderCartItems();
}

function updateCartUI() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById('cartBadge').textContent = count;
  document.getElementById('cartTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
  document.getElementById('cartFooter').style.display = cart.length > 0 ? 'block' : 'none';

  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <img src="images/empty-cart.svg" alt="empty" />
        <p>Your cart is empty</p>
      </div>`;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='images/placeholder.svg'" />
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>₹${(item.price * item.qty).toLocaleString('en-IN')}</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="removeFromCart(${item.id})">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
      </div>
    </div>
  `).join('');
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

document.getElementById('cartBtn').addEventListener('click', toggleCart);

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
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
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

// ===== FORM HANDLERS =====
function setupForms() {
  // Contact form
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✓ Enquiry sent! We\'ll get back within 24 hours.');
    e.target.reset();
  });

  // Order form
  document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const modal = document.getElementById('orderModal');
    modal.classList.remove('open');
    cart = [];
    updateCartUI();
    showToast('🎉 Order placed! Confirmation sent to your email.');
    e.target.reset();
  });
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
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

// ===== CLOSE MODAL ON OUTSIDE CLICK =====
document.getElementById('orderModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('orderModal')) {
    document.getElementById('orderModal').classList.remove('open');
  }
});

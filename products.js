/* ============================================================
   EduSupply — products.js
   Handles: product data, rendering, filters, cart, modals,
            smooth scroll, toast notifications, order form
   ============================================================ */

/* ──────────────────────────────────────────────
   1.  PRODUCT DATA
   ────────────────────────────────────────────── */
const PRODUCTS = [
  // ── FURNITURE ──────────────────────────────
  {
    id: 1,
    name: "Double-Seater Student Bench",
    category: "Furniture",
    price: 2800,
    originalPrice: 3500,
    image: "images/products/bench.svg",
    fallbackEmoji: "🪑",
    badge: "Bestseller",
    description: "Heavy-duty metal frame with wooden seat, anti-rust coated.",
    specs: ["Material: MS Frame + Plywood", "Weight: 12 kg", "Warranty: 2 years"],
  },
  {
    id: 2,
    name: "Teacher's Cabin Desk",
    category: "Furniture",
    price: 7500,
    originalPrice: 9000,
    image: "images/products/teacher-desk.svg",
    fallbackEmoji: "🗂️",
    badge: "Popular",
    description: "Spacious cabin desk with lockable drawers and modesty panel.",
    specs: ["Material: Engineered Wood", "Dimensions: 120×60×75 cm", "Warranty: 1 year"],
  },
  {
    id: 3,
    name: "Ergonomic Student Chair",
    category: "Furniture",
    price: 1200,
    originalPrice: 1500,
    image: "images/products/chair.svg",
    fallbackEmoji: "🪑",
    badge: null,
    description: "Comfortable polypropylene chair with non-slip rubber feet.",
    specs: ["Material: PP + MS legs", "Weight capacity: 120 kg", "Colors: Blue, Green, Red"],
  },
  {
    id: 4,
    name: "Steel Almirah / Storage Cabinet",
    category: "Furniture",
    price: 5500,
    originalPrice: 6800,
    image: "images/products/almirah.svg",
    fallbackEmoji: "🗄️",
    badge: null,
    description: "Double-door steel almirah with 3 internal shelves and locker.",
    specs: ["Dimensions: 90×45×180 cm", "Finish: Powder coated", "Warranty: 3 years"],
  },
  {
    id: 5,
    name: "Library Reading Table (6-seater)",
    category: "Furniture",
    price: 9200,
    originalPrice: 11000,
    image: "images/products/library-table.svg",
    fallbackEmoji: "📚",
    badge: "New",
    description: "Long rectangular table perfect for school libraries and reading rooms.",
    specs: ["Size: 180×75×75 cm", "Surface: Laminate finish", "Seats up to 6"],
  },

  // ── LAB ────────────────────────────────────
  {
    id: 6,
    name: "Chemistry Reagent Set (50 chemicals)",
    category: "Lab",
    price: 4200,
    originalPrice: 5000,
    image: "images/products/chem-set.svg",
    fallbackEmoji: "🧪",
    badge: "Bestseller",
    description: "CBSE-approved lab-grade chemicals with MSDS sheets included.",
    specs: ["50 chemicals included", "250 ml bottles", "Safety data sheets"],
  },
  {
    id: 7,
    name: "Physics Instrument Kit",
    category: "Lab",
    price: 3800,
    originalPrice: 4500,
    image: "images/products/physics-kit.svg",
    fallbackEmoji: "⚗️",
    badge: "Popular",
    description: "Complete kit with vernier calipers, screw gauge, optics bench & more.",
    specs: ["20+ instruments", "Wooden storage box", "Grade 9–12 aligned"],
  },
  {
    id: 8,
    name: "Biology Dissection Kit",
    category: "Lab",
    price: 850,
    originalPrice: 1100,
    image: "images/products/bio-kit.svg",
    fallbackEmoji: "🔬",
    badge: null,
    description: "Stainless steel dissection tools in a zip pouch. Ideal for student use.",
    specs: ["12 tools included", "Stainless steel", "Autoclavable"],
  },
  {
    id: 9,
    name: "Digital Weighing Balance",
    category: "Lab",
    price: 2200,
    originalPrice: 2800,
    image: "images/products/balance.svg",
    fallbackEmoji: "⚖️",
    badge: null,
    description: "0.01 g precision digital balance for accurate lab measurements.",
    specs: ["Range: 0–500 g", "Precision: 0.01 g", "LCD display"],
  },
  {
    id: 10,
    name: "Laboratory Glassware Set",
    category: "Lab",
    price: 1600,
    originalPrice: 2000,
    image: "images/products/glassware.svg",
    fallbackEmoji: "🧫",
    badge: "New",
    description: "Borosilicate glass beakers, flasks, test tubes and more for full lab setup.",
    specs: ["30 pieces", "Borosilicate glass", "Heat resistant"],
  },

  // ── BOARDS ─────────────────────────────────
  {
    id: 11,
    name: "75-inch Smart Board",
    category: "Boards",
    price: 85000,
    originalPrice: 100000,
    image: "images/products/smartboard.svg",
    fallbackEmoji: "📺",
    badge: "Premium",
    description: "4K UHD interactive smart board with Android OS and built-in speakers.",
    specs: ["75-inch 4K display", "Android 11", "10-point touch", "Wi-Fi + HDMI"],
  },
  {
    id: 12,
    name: "Green Chalkboard (8×4 ft)",
    category: "Boards",
    price: 3200,
    originalPrice: 4000,
    image: "images/products/chalkboard.svg",
    fallbackEmoji: "🟩",
    badge: "Bestseller",
    description: "Traditional green vitreous enamel chalkboard mounted on MS frame.",
    specs: ["Size: 8×4 ft", "Enamel coated surface", "Wall mount included"],
  },
  {
    id: 13,
    name: "Magnetic Whiteboard (6×4 ft)",
    category: "Boards",
    price: 4800,
    originalPrice: 5800,
    image: "images/products/whiteboard.svg",
    fallbackEmoji: "🔲",
    badge: "Popular",
    description: "Double-sided magnetic whiteboard with marker tray and wall brackets.",
    specs: ["Size: 6×4 ft", "Magnetic surface", "Includes 4 markers + eraser"],
  },
  {
    id: 14,
    name: "Projection Screen (Pull-Down)",
    category: "Boards",
    price: 3500,
    originalPrice: 4200,
    image: "images/products/screen.svg",
    fallbackEmoji: "🎞️",
    badge: null,
    description: "Matte white pull-down projection screen with 1.1 gain factor.",
    specs: ["Size: 8×6 ft", "Matt white surface", "Ceiling/wall mount"],
  },
  {
    id: 15,
    name: "Notice Board / Soft Board (4×3 ft)",
    category: "Boards",
    price: 1200,
    originalPrice: 1600,
    image: "images/products/noticeboard.svg",
    fallbackEmoji: "📌",
    badge: null,
    description: "Fabric-covered softboard in aluminum frame. Pin anything easily.",
    specs: ["Size: 4×3 ft", "Cork + Fabric surface", "Aluminum frame"],
  },

  // ── STATIONERY ─────────────────────────────
  {
    id: 16,
    name: "Classroom Chalk Box (144 pcs)",
    category: "Stationery",
    price: 180,
    originalPrice: 220,
    image: "images/products/chalk.svg",
    fallbackEmoji: "✏️",
    badge: "Bestseller",
    description: "Dust-free white chalk, 12 boxes of 12 sticks. Ideal for daily use.",
    specs: ["144 sticks total", "Dust-free formula", "White / Coloured options"],
  },
  {
    id: 17,
    name: "Projector (3500 Lumens)",
    category: "Stationery",
    price: 28000,
    originalPrice: 34000,
    image: "images/products/projector.svg",
    fallbackEmoji: "📽️",
    badge: "Popular",
    description: "Full HD DLP projector with HDMI and USB ports. Lamp life: 10,000 hrs.",
    specs: ["3500 ANSI lumens", "Full HD 1080p", "HDMI / USB / VGA"],
  },
  {
    id: 18,
    name: "Whiteboard Marker Set (50 pcs)",
    category: "Stationery",
    price: 350,
    originalPrice: 450,
    image: "images/products/markers.svg",
    fallbackEmoji: "🖊️",
    badge: null,
    description: "Assorted colour whiteboard markers with refillable ink cartridges.",
    specs: ["50 markers", "4 colours", "Refillable"],
  },
  {
    id: 19,
    name: "Duster / Board Eraser (Pack of 10)",
    category: "Stationery",
    price: 250,
    originalPrice: 320,
    image: "images/products/duster.svg",
    fallbackEmoji: "🧹",
    badge: null,
    description: "High-absorption felt duster for chalkboards and whiteboards.",
    specs: ["Pack of 10", "Felt surface", "Ergonomic grip"],
  },
  {
    id: 20,
    name: "Globe — Political (12 inch)",
    category: "Stationery",
    price: 680,
    originalPrice: 850,
    image: "images/products/globe.svg",
    fallbackEmoji: "🌍",
    badge: "New",
    description: "Rotating 12-inch political globe on a durable plastic meridian stand.",
    specs: ["Diameter: 12 inches", "Rotating axis", "Country labels in English"],
  },
];


/* ──────────────────────────────────────────────
   2.  CART STATE  (persisted in localStorage)
   ────────────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem("edusupply_cart") || "[]");

function saveCart() {
  localStorage.setItem("edusupply_cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`✅ "${product.name}" added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    saveCart();
    updateCartUI();
  }
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}


/* ──────────────────────────────────────────────
   3.  RENDER HELPERS
   ────────────────────────────────────────────── */
function formatINR(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function discount(p) {
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}

function productCardHTML(p) {
  return `
    <div class="product-card" data-category="${p.category}" data-id="${p.id}">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="product-emoji-fallback" style="display:none">${p.fallbackEmoji}</div>
      </div>
      <div class="product-info">
        <span class="product-category-tag">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-pricing">
          <span class="product-price">${formatINR(p.price)}</span>
          <span class="product-original">${formatINR(p.originalPrice)}</span>
          <span class="product-discount">${discount(p)}% off</span>
        </div>
        <button class="btn-add-cart" onclick="addToCart(${p.id})">
          🛒 Add to Cart
        </button>
      </div>
    </div>`;
}

function cartItemHTML(item) {
  return `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">${formatINR(item.price)} × ${item.qty}</span>
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, +1)">+</button>
        <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
      </div>
    </div>`;
}


/* ──────────────────────────────────────────────
   4.  UPDATE ALL CART UI
   ────────────────────────────────────────────── */
function updateCartUI() {
  // Badge count
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = cartCount();

  // Sidebar items
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const cartEmptyEl = document.getElementById("cart-empty");

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "";
    if (cartEmptyEl) cartEmptyEl.style.display = "flex";
  } else {
    if (cartEmptyEl) cartEmptyEl.style.display = "none";
    cartItemsEl.innerHTML = cart.map(cartItemHTML).join("");
  }

  if (cartTotalEl) cartTotalEl.textContent = formatINR(cartTotal());

  // Order modal summary
  populateOrderSummary();
}


/* ──────────────────────────────────────────────
   5.  RENDER PRODUCT GRID
   ────────────────────────────────────────────── */
function renderProducts(filter = "All") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const filtered =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  grid.innerHTML = filtered.map(productCardHTML).join("");
}


/* ──────────────────────────────────────────────
   6.  FILTER TABS
   ────────────────────────────────────────────── */
function initFilterTabs() {
  const tabsContainer = document.querySelector(".product-filters");
  if (!tabsContainer) return;

  tabsContainer.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-filter]");
    if (!tab) return;

    tabsContainer.querySelectorAll("[data-filter]").forEach((t) =>
      t.classList.remove("active")
    );
    tab.classList.add("active");

    renderProducts(tab.dataset.filter);
  });
}


/* ──────────────────────────────────────────────
   7.  CART SIDEBAR OPEN / CLOSE
   ────────────────────────────────────────────── */
function openCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (sidebar) sidebar.classList.add("open");
}

function closeCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (sidebar) sidebar.classList.remove("open");
}

function initCartSidebar() {
  // Cart icon / button
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) cartBtn.addEventListener("click", openCart);

  // Close button inside sidebar
  const closeBtn = document.getElementById("cart-close");
  if (closeBtn) closeBtn.addEventListener("click", closeCart);

  // Backdrop click
  const backdrop = document.getElementById("cart-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeCart);

  // "Proceed to Order" button inside cart
  const proceedBtn = document.getElementById("cart-proceed");
  if (proceedBtn)
    proceedBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("⚠️ Your cart is empty!", "warning");
        return;
      }
      closeCart();
      openOrderModal();
    });
}


/* ──────────────────────────────────────────────
   8.  ORDER MODAL
   ────────────────────────────────────────────── */
function openOrderModal() {
  const modal = document.getElementById("order-modal");
  if (modal) {
    populateOrderSummary();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeOrderModal() {
  const modal = document.getElementById("order-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function populateOrderSummary() {
  const summaryEl = document.getElementById("order-summary-items");
  const summaryTotal = document.getElementById("order-summary-total");
  if (!summaryEl) return;

  if (cart.length === 0) {
    summaryEl.innerHTML = "<p style='color:#888;font-size:14px;'>No items in cart.</p>";
    if (summaryTotal) summaryTotal.textContent = "₹0";
    return;
  }

  summaryEl.innerHTML = cart
    .map(
      (item) =>
        `<div class="order-summary-row">
          <span>${item.name} × ${item.qty}</span>
          <span>${formatINR(item.price * item.qty)}</span>
        </div>`
    )
    .join("");

  if (summaryTotal) summaryTotal.textContent = formatINR(cartTotal());
}

function initOrderModal() {
  // Close button
  const closeBtn = document.getElementById("order-modal-close");
  if (closeBtn) closeBtn.addEventListener("click", closeOrderModal);

  // Backdrop
  const modal = document.getElementById("order-modal");
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeOrderModal();
    });

  // Form submit
  const form = document.getElementById("order-form");
  if (form)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleOrderSubmit(form);
    });
}

function handleOrderSubmit(form) {
  const name = form.querySelector('[name="customer-name"]')?.value.trim();
  const school = form.querySelector('[name="school-name"]')?.value.trim();
  const phone = form.querySelector('[name="phone"]')?.value.trim();
  const address = form.querySelector('[name="address"]')?.value.trim();
  const date = form.querySelector('[name="delivery-date"]')?.value;

  // Basic validation
  if (!name || !school || !phone || !address || !date) {
    showToast("⚠️ Please fill in all fields.", "warning");
    return;
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    showToast("⚠️ Enter a valid 10-digit Indian mobile number.", "warning");
    return;
  }
  if (cart.length === 0) {
    showToast("⚠️ Your cart is empty!", "warning");
    return;
  }

  // ── If you have an EmailJS account, uncomment and configure below ──
  // emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  //   customer_name: name,
  //   school_name: school,
  //   phone: phone,
  //   address: address,
  //   delivery_date: date,
  //   cart_items: cart.map(i => `${i.name} ×${i.qty}`).join(", "),
  //   cart_total: formatINR(cartTotal()),
  // });

  // Clear cart + show success
  cart = [];
  saveCart();
  updateCartUI();
  closeOrderModal();
  form.reset();

  showSuccessScreen(name, school);
}

function showSuccessScreen(name, school) {
  const existing = document.getElementById("order-success-overlay");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.id = "order-success-overlay";
  div.innerHTML = `
    <div class="success-box">
      <div class="success-icon">🎉</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you, <strong>${name}</strong>!</p>
      <p>We've received your order for <strong>${school}</strong>.<br>
         Our team will confirm within 2 hours.</p>
      <button onclick="document.getElementById('order-success-overlay').remove()">
        Back to Shopping
      </button>
    </div>`;
  document.body.appendChild(div);
}


/* ──────────────────────────────────────────────
   9.  ENQUIRY / CONTACT FORM
   ────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('[name="email"]')?.value.trim();
    if (!email) { showToast("⚠️ Please enter your email.", "warning"); return; }

    // ── Formspree integration: replace YOUR_FORM_ID ──
    // fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   headers: { "Accept": "application/json" },
    //   body: new FormData(form)
    // }).then(() => showToast("✅ Enquiry sent! We'll get back within 24 hrs."));

    showToast("✅ Enquiry sent! We'll get back within 24 hours.");
    form.reset();
  });
}


/* ──────────────────────────────────────────────
   10. SMOOTH SCROLL (nav links + hero CTAs)
   ────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}


/* ──────────────────────────────────────────────
   11. CATEGORY CARDS → filter + scroll to products
   ────────────────────────────────────────────── */
function initCategoryCards() {
  document.querySelectorAll("[data-category-link]").forEach((card) => {
    card.addEventListener("click", () => {
      const cat = card.dataset.categoryLink;

      // Activate matching tab
      const tab = document.querySelector(`[data-filter="${cat}"]`);
      if (tab) {
        document.querySelectorAll("[data-filter]").forEach((t) =>
          t.classList.remove("active")
        );
        tab.classList.add("active");
        renderProducts(cat);
      }

      // Scroll to products section
      const section = document.getElementById("products");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}


/* ──────────────────────────────────────────────
   12. TOAST NOTIFICATION
   ────────────────────────────────────────────── */
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}


/* ──────────────────────────────────────────────
   13. INJECT REQUIRED CSS (avoids editing HTML)
   ────────────────────────────────────────────── */
function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* ── Product Grid ───────────────────────── */
    #products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      padding: 32px 0;
    }
    .product-card {
      position: relative;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 16px rgba(0,0,0,.08);
      overflow: hidden;
      transition: transform .25s, box-shadow .25s;
      display: flex;
      flex-direction: column;
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0,0,0,.14);
    }
    .product-badge {
      position: absolute;
      top: 12px; left: 12px;
      background: #e63946;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: .5px;
      z-index: 1;
    }
    .product-img {
      height: 160px;
      background: #f0f4ff;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .product-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .product-emoji-fallback {
      font-size: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .product-info {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }
    .product-category-tag {
      font-size: 11px;
      font-weight: 600;
      color: #4361ee;
      text-transform: uppercase;
      letter-spacing: .6px;
    }
    .product-name {
      font-size: 15px;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0;
      line-height: 1.3;
    }
    .product-desc {
      font-size: 13px;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }
    .product-pricing {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 4px;
    }
    .product-price {
      font-size: 18px;
      font-weight: 800;
      color: #1a1a2e;
    }
    .product-original {
      font-size: 13px;
      color: #aaa;
      text-decoration: line-through;
    }
    .product-discount {
      font-size: 12px;
      font-weight: 700;
      color: #2dc653;
      background: #e8faf0;
      padding: 2px 7px;
      border-radius: 20px;
    }
    .btn-add-cart {
      margin-top: auto;
      padding: 10px;
      background: #4361ee;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background .2s, transform .1s;
      width: 100%;
    }
    .btn-add-cart:hover { background: #3451d1; }
    .btn-add-cart:active { transform: scale(.97); }

    /* ── Filter Tabs ────────────────────────── */
    .product-filters {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .product-filters [data-filter] {
      padding: 8px 20px;
      border: 2px solid #4361ee;
      background: transparent;
      color: #4361ee;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
    }
    .product-filters [data-filter].active,
    .product-filters [data-filter]:hover {
      background: #4361ee;
      color: #fff;
    }

    /* ── Cart Backdrop ──────────────────────── */
    #cart-backdrop {
      display: none;
      position: fixed; inset: 0;
      background: rgba(0,0,0,.45);
      z-index: 900;
    }
    #cart-sidebar.open ~ #cart-backdrop,
    #cart-sidebar.open + #cart-backdrop { display: block; }

    /* ── Cart Sidebar ───────────────────────── */
    #cart-sidebar {
      position: fixed;
      top: 0; right: -420px;
      width: 380px; max-width: 95vw;
      height: 100vh;
      background: #fff;
      z-index: 901;
      box-shadow: -4px 0 32px rgba(0,0,0,.18);
      transition: right .3s ease;
      display: flex;
      flex-direction: column;
    }
    #cart-sidebar.open { right: 0; }
    .cart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid #eee;
      font-size: 18px;
      font-weight: 700;
      color: #1a1a2e;
    }
    #cart-close {
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: #666;
      line-height: 1;
    }
    #cart-close:hover { color: #e63946; }
    #cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 16px 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    #cart-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: #aaa;
      font-size: 15px;
      padding: 40px;
      text-align: center;
      flex: 1;
    }
    #cart-empty img { opacity: .4; width: 100px; }
    .cart-item {
      background: #f8f9ff;
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .cart-item-info { display: flex; flex-direction: column; gap: 3px; }
    .cart-item-name { font-size: 14px; font-weight: 600; color: #1a1a2e; }
    .cart-item-price { font-size: 13px; color: #4361ee; font-weight: 600; }
    .cart-item-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .cart-item-controls button {
      width: 28px; height: 28px;
      border: 1.5px solid #ddd;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .15s;
    }
    .cart-item-controls button:hover { border-color: #4361ee; color: #4361ee; }
    .cart-remove-btn { color: #e63946 !important; border-color: #fdd !important; }
    .cart-remove-btn:hover { background: #fff0f0 !important; }
    .cart-item-controls span { font-weight: 700; min-width: 20px; text-align: center; }
    .cart-footer {
      padding: 20px 24px;
      border-top: 1px solid #eee;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .cart-total-row {
      display: flex;
      justify-content: space-between;
      font-size: 17px;
      font-weight: 700;
      color: #1a1a2e;
    }
    #cart-proceed {
      padding: 14px;
      background: #4361ee;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: background .2s;
    }
    #cart-proceed:hover { background: #3451d1; }

    /* ── Order Modal ────────────────────────── */
    #order-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.55);
      z-index: 950;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    #order-modal.open { display: flex; }
    .order-modal-box {
      background: #fff;
      border-radius: 20px;
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 32px;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,.25);
    }
    .order-modal-box h2 {
      margin: 0 0 20px;
      font-size: 22px;
      font-weight: 800;
      color: #1a1a2e;
    }
    #order-modal-close {
      position: absolute;
      top: 16px; right: 20px;
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: #aaa;
    }
    #order-modal-close:hover { color: #e63946; }
    #order-summary-items {
      background: #f8f9ff;
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .order-summary-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #333;
    }
    .order-summary-total-row {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 700;
      color: #1a1a2e;
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin-bottom: 20px;
    }
    #order-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    #order-form input,
    #order-form textarea {
      width: 100%;
      padding: 12px 14px;
      border: 1.5px solid #ddd;
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      transition: border-color .2s;
      font-family: inherit;
      box-sizing: border-box;
    }
    #order-form input:focus,
    #order-form textarea:focus { border-color: #4361ee; }
    #order-form textarea { min-height: 80px; resize: vertical; }
    #order-form button[type="submit"] {
      padding: 14px;
      background: #4361ee;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 4px;
      transition: background .2s;
    }
    #order-form button[type="submit"]:hover { background: #3451d1; }
    .form-row { display: flex; gap: 12px; }
    .form-row input { flex: 1; }

    /* ── Success Overlay ────────────────────── */
    #order-success-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.6);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .success-box {
      background: #fff;
      border-radius: 20px;
      padding: 48px 36px;
      text-align: center;
      max-width: 420px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,.25);
    }
    .success-icon { font-size: 56px; margin-bottom: 16px; }
    .success-box h2 { margin: 0 0 12px; font-size: 22px; color: #1a1a2e; }
    .success-box p { margin: 0 0 8px; color: #555; font-size: 15px; line-height: 1.6; }
    .success-box button {
      margin-top: 24px;
      padding: 12px 32px;
      background: #4361ee;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
    }
    .success-box button:hover { background: #3451d1; }

    /* ── Toast ──────────────────────────────── */
    #toast-container {
      position: fixed;
      bottom: 24px; right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    .toast {
      background: #1a1a2e;
      color: #fff;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 20px rgba(0,0,0,.2);
      opacity: 0;
      transform: translateY(12px);
      transition: opacity .3s, transform .3s;
      pointer-events: auto;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
    .toast-warning { background: #e6952a; }
    .toast-success { background: #2dc653; }

    /* ── Responsive ─────────────────────────── */
    @media (max-width: 600px) {
      #products-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
      .order-modal-box { padding: 24px 18px; }
      .form-row { flex-direction: column; }
    }
    @media (max-width: 400px) {
      #products-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}


/* ──────────────────────────────────────────────
   14. PATCH HTML — inject missing IDs / markup
       only if they don't already exist in HTML
   ────────────────────────────────────────────── */
function patchHTML() {

  /* ── Cart Sidebar ── */
  let sidebar = document.getElementById("cart-sidebar");
  if (sidebar && !sidebar.querySelector("#cart-items")) {
    sidebar.innerHTML = `
      <div class="cart-header">
        🛒 Your Cart
        <button id="cart-close">✕</button>
      </div>
      <div id="cart-empty">
        <img src="images/empty-cart.svg" alt="empty cart">
        Your cart is empty
      </div>
      <div id="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total-row">
          <span>Total</span>
          <span id="cart-total">₹0</span>
        </div>
        <button id="cart-proceed">Proceed to Order →</button>
      </div>`;

    // Append backdrop right after sidebar in body
    if (!document.getElementById("cart-backdrop")) {
      const backdrop = document.createElement("div");
      backdrop.id = "cart-backdrop";
      document.body.appendChild(backdrop);
    }
  }

  /* ── Order Modal ── */
  let modal = document.getElementById("order-modal");
  if (modal) {
    modal.innerHTML = `
      <div class="order-modal-box">
        <button id="order-modal-close">✕</button>
        <h2>📦 Place Your Order</h2>
        <div id="order-summary-items"></div>
        <div class="order-summary-total-row">
          <span>Order Total</span>
          <span id="order-summary-total">₹0</span>
        </div>
        <form id="order-form">
          <div class="form-row">
            <input type="text" name="customer-name" placeholder="Your Name *" required>
            <input type="text" name="school-name"   placeholder="School / Institution *" required>
          </div>
          <input  type="tel"  name="phone"          placeholder="Mobile Number (10 digits) *" maxlength="10" required>
          <textarea           name="address"        placeholder="Full Delivery Address *" required></textarea>
          <div class="form-row">
            <input type="date" name="delivery-date" required>
            <input type="text" name="remarks"       placeholder="Special Remarks (optional)">
          </div>
          <button type="submit">✅ Confirm Order</button>
        </form>
      </div>`;
  }

  /* ── Products section: inject grid + filter tabs if missing ── */
  const productsSection = document.getElementById("products");
  if (productsSection && !document.getElementById("products-grid")) {
    let filterBar = productsSection.querySelector(".product-filters");
    if (!filterBar) {
      filterBar = document.createElement("div");
      filterBar.className = "product-filters";
      filterBar.innerHTML = `
        <button data-filter="All" class="active">All</button>
        <button data-filter="Furniture">Furniture</button>
        <button data-filter="Lab">Lab</button>
        <button data-filter="Boards">Boards</button>
        <button data-filter="Stationery">Stationery</button>`;
      productsSection.appendChild(filterBar);
    }
    const grid = document.createElement("div");
    grid.id = "products-grid";
    productsSection.appendChild(grid);
  }

  /* ── Cart button ── give it an id if it doesn't have one */
  if (!document.getElementById("cart-btn")) {
    const cartEl = document.querySelector(
      'button[class*="cart"], .cart-btn, .cart-icon-wrapper, [onclick*="cart"]'
    );
    if (cartEl) cartEl.id = "cart-btn";
  }

  /* ── Cart count badge ── */
  if (!document.getElementById("cart-count")) {
    const badge = document.querySelector(
      ".cart-count, .cart-badge, #cart-btn .count, #cart-btn span"
    );
    if (badge) badge.id = "cart-count";
  }
}


/* ──────────────────────────────────────────────
   15. BOOT
   ────────────────────────────────────────────── */
function init() {
  injectStyles();
  patchHTML();
  renderProducts("All");
  initFilterTabs();
  initCartSidebar();
  initOrderModal();
  initContactForm();
  initSmoothScroll();
  initCategoryCards();
  updateCartUI();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

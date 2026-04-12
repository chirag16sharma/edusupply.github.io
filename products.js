/* ============================================================
   EduSupply — products.js  (self-contained, no HTML changes needed)
   ============================================================ */

/* ── 1. PRODUCT DATA ── */
const PRODUCTS = [
  { id:1,  name:"Student Dual Desk",         category:"Furniture",  price:3200,  originalPrice:3800,  emoji:"🪑", badge:"Bestseller", description:"Sturdy dual-seater wooden desk with iron frame, ideal for classrooms.", image:"images/products/student-desk.svg" },
  { id:2,  name:"Teacher's Cabin Table",     category:"Furniture",  price:7500,  originalPrice:9000,  emoji:"🗂️", badge:"Popular",    description:"Executive-style teacher cabin table with lockable drawer and storage.", image:"images/products/teacher-table.svg" },
  { id:3,  name:"Plastic Moulded Chair",     category:"Furniture",  price:850,   originalPrice:1100,  emoji:"🪑", badge:null,         description:"Lightweight, stackable plastic chairs suitable for classrooms and halls.", image:"images/products/chair.svg" },
  { id:4,  name:"Library Bookshelf (6-Tier)",category:"Furniture",  price:5400,  originalPrice:6200,  emoji:"📚", badge:null,         description:"Heavy-duty 6-tier metal bookshelf for school libraries.", image:"images/products/bookshelf.svg" },
  { id:5,  name:"Storage Locker (12-Door)",  category:"Furniture",  price:12500, originalPrice:14000, emoji:"🗄️", badge:"New",        description:"12-door steel locker unit for student bag and material storage.", image:"images/products/locker.svg" },
  { id:6,  name:"Chemistry Reagent Kit",     category:"Lab",        price:2800,  originalPrice:3200,  emoji:"🧪", badge:"Bestseller", description:"Complete set of 20 common reagents for Class 9–12 chemistry experiments.", image:"images/products/reagent-kit.svg" },
  { id:7,  name:"Vernier Caliper (Set of 10)",category:"Lab",       price:1900,  originalPrice:2400,  emoji:"📏", badge:null,         description:"Stainless steel vernier calipers with 0.02 mm least count, pack of 10.", image:"images/products/vernier.svg" },
  { id:8,  name:"Physics Optics Kit",        category:"Lab",        price:4200,  originalPrice:5000,  emoji:"🔭", badge:"Popular",    description:"Full optics experiment kit: lenses, prisms, mirrors, and light source box.", image:"images/products/optics-kit.svg" },
  { id:9,  name:"Biology Microscope",        category:"Lab",        price:6800,  originalPrice:7800,  emoji:"🔬", badge:"Top Rated",  description:"Binocular compound microscope with 40x–1000x magnification.", image:"images/products/microscope.svg" },
  { id:10, name:"Digital Weighing Balance",  category:"Lab",        price:3500,  originalPrice:4000,  emoji:"⚖️", badge:null,         description:"Digital analytical balance with 0.01g precision for chemistry labs.", image:"images/products/balance.svg" },
  { id:11, name:"Interactive Smart Board 75\"",category:"Boards",   price:89000, originalPrice:105000,emoji:"🖥️", badge:"Premium",    description:"4K interactive flat panel with Android OS, multi-touch & built-in speakers.", image:"images/products/smartboard.svg" },
  { id:12, name:"Magnetic Whiteboard (6×4 ft)",category:"Boards",   price:4800,  originalPrice:5500,  emoji:"🪟", badge:"Bestseller", description:"Double-sided magnetic whiteboard with aluminium frame for classrooms.", image:"images/products/whiteboard.svg" },
  { id:13, name:"Green Chalkboard (8×4 ft)", category:"Boards",     price:3200,  originalPrice:3800,  emoji:"🟩", badge:null,         description:"Traditional green chalk board with powder-coated steel frame.", image:"images/products/chalkboard.svg" },
  { id:14, name:"Projector Screen (8×6 ft)", category:"Boards",     price:5200,  originalPrice:6000,  emoji:"📽️", badge:"New",        description:"Wall-mounted motorized projector screen with remote control.", image:"images/products/projector-screen.svg" },
  { id:15, name:"Whiteboard Markers (Box 50)",category:"Stationery",price:480,   originalPrice:600,   emoji:"🖊️", badge:null,         description:"Assorted colour dry-erase whiteboard markers, low-odour ink.", image:"images/products/markers.svg" },
  { id:16, name:"Chalk Sticks (10 Boxes)",   category:"Stationery", price:320,   originalPrice:400,   emoji:"🖍️", badge:"Bestseller", description:"Dust-free white chalk sticks, 100 pieces per box, pack of 10 boxes.", image:"images/products/chalk.svg" },
  { id:17, name:"Document Projector (Visualizer)",category:"Stationery",price:14500,originalPrice:17000,emoji:"📷",badge:"Popular",  description:"HD document camera for classrooms with USB & HDMI output.", image:"images/products/visualizer.svg" },
  { id:18, name:"Classroom Duster Set (×12)",category:"Stationery", price:360,   originalPrice:480,   emoji:"🧹", badge:null,         description:"Soft felt board dusters for chalk and whiteboard, pack of 12.", image:"images/products/duster.svg" },
];

/* ── 2. CART (localStorage) ── */
let cart = JSON.parse(localStorage.getItem("eduSupplyCart") || "[]");
function saveCart() { localStorage.setItem("eduSupplyCart", JSON.stringify(cart)); }
function cartTotal() { return cart.reduce((s,i) => s + i.price * i.qty, 0); }
function cartCount() { return cart.reduce((s,i) => s + i.qty, 0); }

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(x => x.id === id);
  ex ? ex.qty++ : cart.push({...p, qty:1});
  saveCart(); renderCart();
  showToast(`"${p.name}" added to cart 🛒`);
}
function removeFromCart(id) { cart = cart.filter(i => i.id !== id); saveCart(); renderCart(); }
function changeQty(id, d) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); }
}

/* ── 3. INJECT STYLES ── */
function injectStyles() {
  if (document.getElementById("edu-products-style")) return;
  const s = document.createElement("style");
  s.id = "edu-products-style";
  s.textContent = `
    .edu-section-label {
      text-align: center;
      font-size: 0.8rem;
      font-weight: 700;
      color: #6366f1;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
    }
    .edu-section-title {
      text-align: center;
      font-size: 2rem;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 2rem;
    }
    .edu-filter-bar {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 2.5rem;
    }
    .edu-filter-tab {
      padding: 0.5rem 1.3rem;
      border: 2px solid #e2e8f0;
      border-radius: 30px;
      background: #fff;
      cursor: pointer;
      font-size: 0.88rem;
      font-weight: 600;
      color: #475569;
      transition: all 0.2s;
    }
    .edu-filter-tab:hover, .edu-filter-tab.active {
      background: #6366f1;
      border-color: #6366f1;
      color: #fff;
    }
    .edu-products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .edu-card {
      background: #fff;
      border-radius: 16px;
      padding: 1.4rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .edu-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(0,0,0,0.12); }
    .edu-card-badge {
      position: absolute; top: 1rem; right: 1rem;
      background: #f4b942; color: #fff;
      font-size: 0.68rem; font-weight: 700;
      padding: 3px 10px; border-radius: 20px;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .edu-card-img { width: 100%; height: 130px; object-fit: contain; margin-bottom: 0.4rem; }
    .edu-card-img-fallback {
      font-size: 4rem; text-align: center; height: 100px;
      display: flex; align-items: center; justify-content: center;
    }
    .edu-card-cat { font-size: 0.7rem; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.06em; }
    .edu-card-name { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.3; }
    .edu-card-desc { font-size: 0.82rem; color: #64748b; margin: 0; line-height: 1.5; }
    .edu-card-pricing { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.3rem; }
    .edu-price { font-size: 1.15rem; font-weight: 800; color: #16a34a; }
    .edu-original { font-size: 0.82rem; color: #94a3b8; text-decoration: line-through; }
    .edu-discount { font-size: 0.72rem; font-weight: 700; color: #ef4444; background: #fef2f2; padding: 2px 7px; border-radius: 20px; }
    .edu-atc-btn {
      margin-top: auto; padding: 0.65rem 1rem;
      background: #6366f1; color: #fff; border: none;
      border-radius: 10px; font-size: 0.88rem; font-weight: 700;
      cursor: pointer; transition: background 0.2s, transform 0.1s; width: 100%;
    }
    .edu-atc-btn:hover { background: #4f46e5; }
    .edu-atc-btn:active { transform: scale(0.97); }
    #edu-cart-sidebar {
      position: fixed; top: 0; right: -420px;
      width: 380px; max-width: 95vw; height: 100vh;
      background: #fff; box-shadow: -4px 0 30px rgba(0,0,0,0.15);
      z-index: 9999; display: flex; flex-direction: column;
      transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
      padding: 1.5rem; overflow-y: auto;
    }
    #edu-cart-sidebar.open { right: 0; }
    .edu-cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .edu-cart-header h3 { font-size: 1.1rem; font-weight: 800; color: #1e293b; }
    .edu-cart-close { background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #64748b; }
    .edu-cart-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem 0; border-bottom: 1px solid #f1f5f9; }
    .edu-cart-emoji { font-size: 2rem; flex-shrink: 0; }
    .edu-cart-info { flex: 1; }
    .edu-cart-iname { font-size: 0.85rem; font-weight: 600; color: #1e293b; margin: 0; }
    .edu-cart-iprice { font-size: 0.8rem; color: #16a34a; font-weight: 700; margin: 0; }
    .edu-cart-controls { display: flex; align-items: center; gap: 0.3rem; }
    .edu-qty-btn {
      width: 28px; height: 28px; border-radius: 6px;
      border: 1.5px solid #e2e8f0; background: #f8fafc;
      font-size: 1rem; cursor: pointer; font-weight: 700; color: #374151;
    }
    .edu-qty-btn:hover { background: #6366f1; color: #fff; border-color: #6366f1; }
    .edu-qty-val { font-size: 0.9rem; font-weight: 700; min-width: 20px; text-align: center; }
    .edu-remove-btn { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 2px; margin-left: 4px; opacity: 0.5; }
    .edu-remove-btn:hover { opacity: 1; }
    .edu-cart-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; padding: 3rem 1rem; color: #94a3b8; font-size: 0.9rem; }
    .edu-cart-footer { margin-top: auto; padding-top: 1rem; border-top: 2px solid #f1f5f9; }
    .edu-cart-total { font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 1rem; }
    .edu-proceed-btn {
      width: 100%; padding: 0.8rem; background: #16a34a;
      color: white; border: none; border-radius: 12px;
      font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: background 0.2s;
    }
    .edu-proceed-btn:hover { background: #15803d; }
    #edu-cart-count {
      display: inline-flex; align-items: center; justify-content: center;
      background: #ef4444; color: #fff; font-size: 0.7rem; font-weight: 700;
      width: 20px; height: 20px; border-radius: 50%;
      margin-left: 2px; vertical-align: top;
    }
    #edu-toast-container {
      position: fixed; bottom: 1.5rem; right: 1.5rem;
      z-index: 99999; display: flex; flex-direction: column; gap: 0.5rem;
    }
    .edu-toast {
      padding: 0.75rem 1.2rem; border-radius: 12px;
      font-size: 0.88rem; font-weight: 600; color: #fff; max-width: 320px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      opacity: 0; transform: translateY(10px); transition: opacity 0.3s, transform 0.3s;
    }
    .edu-toast.show { opacity: 1; transform: translateY(0); }
    .edu-toast.success { background: #16a34a; }
    .edu-toast.error   { background: #ef4444; }
  `;
  document.head.appendChild(s);
}

/* ── 4. BUILD PRODUCTS SECTION ── */
function buildProductsSection() {
  // Try to find existing products section
  let section = document.getElementById("products");

  // Fallback: find by heading text
  if (!section) {
    document.querySelectorAll("h2, h3").forEach(el => {
      if (el.textContent.includes("Top School Appliances") || el.textContent.includes("School Appliances")) {
        section = el.closest("section") || el.parentElement;
      }
    });
  }

  // Last resort: create and insert after categories section
  if (!section) {
    section = document.createElement("section");
    const cat = document.getElementById("categories");
    if (cat) cat.after(section);
    else document.body.appendChild(section);
  }

  section.id = "products";
  section.style.padding = "4rem 1.5rem";
  section.style.background = "#f8fafc";

  section.innerHTML = `
    <p class="edu-section-label">Our Catalogue</p>
    <h2 class="edu-section-title">Top School Appliances</h2>
    <div class="edu-filter-bar">
      <button class="edu-filter-tab active" data-filter="All">All</button>
      <button class="edu-filter-tab" data-filter="Furniture">Furniture</button>
      <button class="edu-filter-tab" data-filter="Lab">Lab</button>
      <button class="edu-filter-tab" data-filter="Boards">Boards</button>
      <button class="edu-filter-tab" data-filter="Stationery">Stationery</button>
    </div>
    <div class="edu-products-grid" id="edu-products-grid"></div>
  `;
}

/* ── 5. RENDER CARDS ── */
function renderProducts(filter = "All") {
  const grid = document.getElementById("edu-products-grid");
  if (!grid) return;
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  grid.innerHTML = list.map(p => {
    const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    return `
      <div class="edu-card">
        ${p.badge ? `<span class="edu-card-badge">${p.badge}</span>` : ""}
        <img class="edu-card-img" src="${p.image}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="edu-card-img-fallback" style="display:none">${p.emoji}</div>
        <span class="edu-card-cat">${p.category}</span>
        <h3 class="edu-card-name">${p.name}</h3>
        <p class="edu-card-desc">${p.description}</p>
        <div class="edu-card-pricing">
          <span class="edu-price">₹${p.price.toLocaleString("en-IN")}</span>
          <span class="edu-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
          <span class="edu-discount">${disc}% off</span>
        </div>
        <button class="edu-atc-btn" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
      </div>`;
  }).join("");
}

/* ── 6. FILTER TABS ── */
function initFilterTabs() {
  document.querySelectorAll(".edu-filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".edu-filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderProducts(tab.dataset.filter);
    });
  });
}

/* ── 7. CART SIDEBAR ── */
function buildCartSidebar() {
  if (document.getElementById("edu-cart-sidebar")) return;
  const sidebar = document.createElement("div");
  sidebar.id = "edu-cart-sidebar";
  sidebar.innerHTML = `
    <div class="edu-cart-header">
      <h3>🛒 Your Cart</h3>
      <button class="edu-cart-close" id="edu-cart-close">✕</button>
    </div>
    <div id="edu-cart-items" style="flex:1; overflow-y:auto;"></div>
    <div class="edu-cart-footer">
      <div class="edu-cart-total" id="edu-cart-total">Total: <strong>₹0</strong></div>
      <button class="edu-proceed-btn" id="edu-proceed-btn">Proceed to Order →</button>
    </div>
  `;
  document.body.appendChild(sidebar);

  document.getElementById("edu-cart-close").onclick = () => sidebar.classList.remove("open");
  document.getElementById("edu-proceed-btn").onclick = () => {
    if (cart.length === 0) { showToast("Your cart is empty!", "error"); return; }
    showToast(`🎉 Order of ₹${cartTotal().toLocaleString("en-IN")} placed! We'll confirm within 2 hours.`, "success", 5000);
    cart = []; saveCart(); renderCart();
    sidebar.classList.remove("open");
  };

  // Close on outside click
  document.addEventListener("click", e => {
    if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && !e.target.closest("[data-open-cart]")) {
      sidebar.classList.remove("open");
    }
  });
}

/* ── 8. WIRE CART ICON ── */
function wireCartIcon() {
  // Look for any element near a cart image or with cart text
  const allEls = document.querySelectorAll("header *, nav *");
  allEls.forEach(el => {
    const text = el.textContent.trim();
    const isCartLike = el.tagName === "IMG" && el.alt?.toLowerCase().includes("cart");
    const isCountEl = (text === "0" || text === "") && el.children.length === 0;

    if (isCartLike) {
      const parent = el.closest("a, button, div") || el.parentElement;
      if (!parent.dataset.cartWired) {
        parent.dataset.cartWired = "1";
        parent.style.cursor = "pointer";
        parent.addEventListener("click", e => {
          e.preventDefault();
          document.getElementById("edu-cart-sidebar")?.classList.toggle("open");
        });
      }
    }
  });

  // Also attach to any existing cart count number shown in nav
  document.querySelectorAll("nav").forEach(nav => {
    const txt = nav.querySelectorAll("*");
    txt.forEach(el => {
      if (el.children.length === 0 && el.textContent.trim() === "0") {
        el.id = "edu-cart-count";
      }
    });
  });
}

/* ── 9. RENDER CART ── */
function renderCart() {
  const itemsEl = document.getElementById("edu-cart-items");
  const totalEl = document.getElementById("edu-cart-total");

  // Update all count badges
  document.querySelectorAll("#edu-cart-count").forEach(el => el.textContent = cartCount());

  if (!itemsEl) return;
  itemsEl.innerHTML = cart.length === 0
    ? `<div class="edu-cart-empty"><span style="font-size:3rem">🛒</span><p>Your cart is empty</p></div>`
    : cart.map(item => `
        <div class="edu-cart-item">
          <div class="edu-cart-emoji">${item.emoji}</div>
          <div class="edu-cart-info">
            <p class="edu-cart-iname">${item.name}</p>
            <p class="edu-cart-iprice">₹${(item.price * item.qty).toLocaleString("en-IN")}</p>
          </div>
          <div class="edu-cart-controls">
            <button class="edu-qty-btn" onclick="changeQty(${item.id},-1)">−</button>
            <span class="edu-qty-val">${item.qty}</span>
            <button class="edu-qty-btn" onclick="changeQty(${item.id},1)">+</button>
            <button class="edu-remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
          </div>
        </div>`).join("");

  if (totalEl) totalEl.innerHTML = `Total: <strong>₹${cartTotal().toLocaleString("en-IN")}</strong>`;
}

/* ── 10. TOAST ── */
function showToast(msg, type = "success", duration = 3000) {
  let c = document.getElementById("edu-toast-container");
  if (!c) { c = document.createElement("div"); c.id = "edu-toast-container"; document.body.appendChild(c); }
  const t = document.createElement("div");
  t.className = `edu-toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); t.addEventListener("transitionend", () => t.remove()); }, duration);
}

/* ── 11. INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  injectStyles();
  buildProductsSection();
  buildCartSidebar();
  wireCartIcon();
  renderProducts("All");
  renderCart();
  initFilterTabs();
});

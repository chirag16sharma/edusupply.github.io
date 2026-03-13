/* order-page.js
   Single shared module for all category order pages.
   Each page imports this and calls initOrderPage(CONFIG).

   CONFIG shape:
   {
     category:     string,          // Firestore category value e.g. "Boards"
     emoji:        string,          // default emoji fallback
     submitLabel:  string,          // e.g. "📺 Submit Boards Order"
     successMsg:   string,          // e.g. "Your boards order has been received."
     accentColor:  string,          // CSS colour e.g. "#6a1b9a"
     accentLight:  string,          // light tint e.g. "#f3e5f5"
     heroGradient: string,          // CSS gradient for hero background
     emojiMap:     object,          // product name → emoji
   }
   ------------------------------------------------------------------ */

import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, query, where, getDocs, addDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export function initOrderPage(CONFIG) {
  // ── Apply CSS custom properties for this category's colour scheme ──────
  document.documentElement.style.setProperty('--accent',        CONFIG.accentColor);
  document.documentElement.style.setProperty('--accent-light',  CONFIG.accentLight);
  document.documentElement.style.setProperty('--hero-gradient', CONFIG.heroGradient);

  let products     = [];
  let selectedItems = {};
  let currentUser  = null;

  // ── Auth state ───────────────────────────────────────────────────────────
  onAuthStateChanged(auth, user => {
    currentUser = user;
    const dashLink    = document.getElementById('dashLink');
    const loginLink   = document.getElementById('loginLink');
    const loginPrompt = document.getElementById('loginPrompt');

    if (user) {
      if (dashLink)    dashLink.style.display    = 'inline';
      if (loginLink)   loginLink.style.display   = 'none';
      if (loginPrompt) loginPrompt.style.display = 'none';
    } else {
      if (loginPrompt) loginPrompt.style.display = 'flex';
    }
  });

  // ── Load products from Firestore ─────────────────────────────────────────
  async function loadProducts() {
    try {
      const q    = query(collection(db, 'products'), where('category', '==', CONFIG.category));
      const snap = await getDocs(q);
      products   = [];
      snap.forEach(d => products.push({ id: d.id, ...d.data() }));

      if (products.length === 0) {
        document.getElementById('productsGrid').innerHTML = `
          <div style="text-align:center;padding:40px;color:#aaa;grid-column:1/-1;">
            <div style="font-size:40px;margin-bottom:12px;">${CONFIG.emoji}</div>
            <p>No ${CONFIG.category.toLowerCase()} products added yet.</p>
            <p style="font-size:13px;margin-top:8px;">
              Add products with category "${CONFIG.category}" in your Firebase Firestore.
            </p>
          </div>`;
      } else {
        renderProducts();
      }
    } catch(e) {
      document.getElementById('productsGrid').innerHTML =
        '<div style="text-align:center;padding:40px;color:#f44336;grid-column:1/-1;">Error loading products.</div>';
    }
  }

  // ── Render product cards ─────────────────────────────────────────────────
  function renderProducts() {
    document.getElementById('productsGrid').innerHTML = products.map(p => `
      <div class="product-card" id="card-${p.id}">
        <div class="product-card-top">
          <div class="product-emoji">${CONFIG.emojiMap[p.name] || CONFIG.emoji}</div>
          <div class="product-price-tag">₹${(p.price || 0).toLocaleString('en-IN')}/unit</div>
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description || ''}</div>
        <div class="product-stock">✅ ${p.stock || 0} units available</div>
        <div class="qty-row">
          <span class="qty-label">Quantity:</span>
          <div style="display:flex;gap:10px;align-items:center;">
            <div class="qty-control">
              <button class="qty-btn" onclick="changeProdQty('${p.id}', -1)">−</button>
              <input class="qty-input" id="qty-${p.id}" type="number"
                value="0" min="0" max="${p.stock || 99}"
                onchange="manualProdQty('${p.id}')" />
              <button class="qty-btn" onclick="changeProdQty('${p.id}', 1)">+</button>
            </div>
            <button class="add-btn" id="addbtn-${p.id}" onclick="addToOrder('${p.id}')">Add</button>
          </div>
        </div>
      </div>`).join('');
  }

  // ── Quantity helpers (exposed on window for inline onclick) ──────────────
  window.changeProdQty = function(id, delta) {
    const input   = document.getElementById(`qty-${id}`);
    const product = products.find(p => p.id === id);
    input.value   = Math.max(0, Math.min(product.stock || 99, parseInt(input.value || 0) + delta));
  };

  window.manualProdQty = function(id) {
    const input   = document.getElementById(`qty-${id}`);
    const product = products.find(p => p.id === id);
    input.value   = Math.max(0, Math.min(product.stock || 99, parseInt(input.value) || 0));
  };

  // ── Add to order ─────────────────────────────────────────────────────────
  window.addToOrder = function(id) {
    const product = products.find(p => p.id === id);
    const qty     = parseInt(document.getElementById(`qty-${id}`).value) || 0;
    if (qty <= 0) { alert('Please set a quantity first.'); return; }
    selectedItems[id] = { ...product, qty };
    document.getElementById(`card-${id}`).classList.add('selected');
    const btn       = document.getElementById(`addbtn-${id}`);
    btn.innerText   = '✓ Added';
    btn.classList.add('added');
    updateOrderSummary();
  };

  // ── Remove from order ────────────────────────────────────────────────────
  window.removeItem = function(id) {
    delete selectedItems[id];
    document.getElementById(`card-${id}`).classList.remove('selected');
    const btn     = document.getElementById(`addbtn-${id}`);
    btn.innerText = 'Add';
    btn.classList.remove('added');
    document.getElementById(`qty-${id}`).value = 0;
    updateOrderSummary();
  };

  // ── Update order summary ─────────────────────────────────────────────────
  function updateOrderSummary() {
    const items     = Object.values(selectedItems);
    const container = document.getElementById('selectedItems');
    if (items.length === 0) {
      container.innerHTML = '<div class="empty-selection">No items selected yet. Set a quantity above to add items.</div>';
      document.getElementById('totalAmount').innerText = '₹0';
      return;
    }
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    container.innerHTML = items.map(i => `
      <div class="selected-item">
        <div>
          <div class="selected-item-name">${i.name}</div>
          <div class="selected-item-detail">₹${i.price.toLocaleString('en-IN')} × ${i.qty} units</div>
        </div>
        <div style="display:flex;align-items:center;">
          <div class="selected-item-price">₹${(i.price * i.qty).toLocaleString('en-IN')}</div>
          <button class="remove-btn" onclick="removeItem('${i.id}')">×</button>
        </div>
      </div>`).join('');
    document.getElementById('totalAmount').innerText = '₹' + total.toLocaleString('en-IN');
  }

  // ── Submit order ─────────────────────────────────────────────────────────
  window.submitOrder = async function() {
    if (!currentUser) { window.location.href = 'login.html'; return; }

    const items = Object.values(selectedItems);
    if (items.length === 0) { alert('Please add at least one item to your order.'); return; }

    const name    = document.getElementById('contactName').value.trim();
    const phone   = document.getElementById('contactPhone').value.trim();
    const school  = document.getElementById('schoolName').value.trim();
    const address = document.getElementById('deliveryAddress').value.trim();

    // Inline validation — no alert() for missing fields
    const fields = [
      { id: 'contactName',     val: name,    msg: 'Please enter a contact name.' },
      { id: 'contactPhone',    val: phone,   msg: 'Please enter a phone number.' },
      { id: 'schoolName',      val: school,  msg: 'Please enter your school name.' },
      { id: 'deliveryAddress', val: address, msg: 'Please enter a delivery address.' },
    ];
    let valid = true;
    fields.forEach(f => {
      const el    = document.getElementById(f.id);
      const errId = `err-${f.id}`;
      let errEl   = document.getElementById(errId);
      if (!errEl) {
        errEl    = document.createElement('span');
        errEl.id = errId;
        errEl.style.cssText = 'color:#c62828;font-size:12px;margin-top:2px;';
        el.parentNode.appendChild(errEl);
      }
      if (!f.val) {
        errEl.innerText = f.msg;
        el.style.borderColor = '#f44336';
        valid = false;
      } else {
        errEl.innerText    = '';
        el.style.borderColor = '';
      }
    });
    if (!valid) return;

    const btn       = document.getElementById('submitBtn');
    btn.disabled    = true;
    btn.innerText   = '⏳ Submitting...';

    try {
      const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
      const ref   = await addDoc(collection(db, 'orders'), {
        userId:          currentUser.uid,
        userEmail:       currentUser.email,
        category:        CONFIG.category,
        items:           items.map(i => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty })),
        total,
        contactName:     name,
        contactPhone:    phone,
        schoolName:      school,
        deliveryAddress: address,
        deliveryDate:    document.getElementById('deliveryDate').value,
        specialNote:     document.getElementById('specialNote').value,
        status:          'Pending',
        createdAt:       new Date().toISOString()
      });

      document.getElementById('orderSection').style.display  = 'none';
      document.getElementById('successScreen').style.display = 'block';
      document.getElementById('successOrderId').innerText =
        `Order ID: #EDU-${ref.id.substring(0, 6).toUpperCase()}`;
    } catch(e) {
      alert('Error submitting order: ' + e.message);
      btn.disabled  = false;
      btn.innerText = CONFIG.submitLabel;
    }
  };

  // ── Kick off ─────────────────────────────────────────────────────────────
  loadProducts();
}

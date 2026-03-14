/* ============================================================
   auth-nav.js
   Checks Firebase auth state on every page and swaps the
   Login button in the navbar for a profile chip when signed in.
   Add ONE line to index.html before </body>:
     <script src="auth-nav.js" type="module"></script>
   ============================================================ */

import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { doc, getDoc }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

onAuthStateChanged(auth, async (user) => {
  /* ── find the login link in the navbar ───────────────────
     Works for both the standard nav-links structure and
     the wow.js mobile nav panel (#p-mobile-nav)           */
  const loginLinks = [
    ...document.querySelectorAll('.nav-links a[href="login.html"]'),
    ...document.querySelectorAll('#p-mobile-nav a[href="login.html"]'),
    ...document.querySelectorAll('nav a[href="login.html"]'),
  ];

  if (!user) {
    /* Not logged in — make sure login links are visible */
    loginLinks.forEach(a => { a.style.display = ''; });
    removeChip();
    return;
  }

  /* ── logged in ───────────────────────────────────────── */

  /* Fetch school name from Firestore */
  let schoolName = user.email;
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists() && snap.data().schoolName) {
      schoolName = snap.data().schoolName;
    }
  } catch (_) { /* silently ignore — email is fine fallback */ }

  const initials = schoolName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  /* Hide original login links */
  loginLinks.forEach(a => { a.style.display = 'none'; });

  /* Inject profile chip next to the nav-actions area */
  injectChip(initials, schoolName);
});

/* ── helpers ──────────────────────────────────────────────── */

function removeChip() {
  document.getElementById('auth-nav-chip')?.remove();
}

function injectChip(initials, schoolName) {
  removeChip(); /* avoid duplicates */

  const chip = document.createElement('div');
  chip.id    = 'auth-nav-chip';
  chip.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    position: relative;
  `;

  chip.innerHTML = `
    <div id="auth-chip-btn" style="
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--p-ink, #060A30);
      color: rgba(255,255,255,.8);
      padding: 5px 14px 5px 5px;
      border-radius: 100px;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 500;
      max-width: 200px;
      user-select: none;
      transition: background .25s;
    ">
      <div style="
        width: 28px; height: 28px; border-radius: 50%;
        background: var(--p-gold, #E0C060);
        color: var(--p-ink, #060A30);
        display: flex; align-items: center; justify-content: center;
        font-family: 'Playfair Display', serif;
        font-size: 12px; font-weight: 700; flex-shrink: 0;
      ">${initials}</div>
      <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:130px;">${schoolName.split(' ')[0]}</span>
      <svg width="10" height="10" viewBox="0 0 10 10" style="opacity:.5;flex-shrink:0">
        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>

    <div id="auth-chip-menu" style="
      display: none;
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: var(--p-surface, #FAFCFF);
      border: 1px solid var(--p-line, #C8D0F0);
      border-radius: 14px;
      box-shadow: 0 8px 40px rgba(6,10,48,.13);
      min-width: 190px;
      overflow: hidden;
      z-index: 9999;
      font-family: 'DM Sans', sans-serif;
    ">
      <div style="padding:14px 16px 10px; border-bottom:1px solid var(--p-line, #C8D0F0);">
        <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--p-ink3,#4858A4);margin-bottom:2px;">Signed in as</div>
        <div style="font-size:13px;font-weight:600;color:var(--p-ink,#060A30);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${schoolName}</div>
      </div>
      <a href="dashboard.html" style="
        display:flex;align-items:center;gap:10px;
        padding:11px 16px;font-size:13px;font-weight:500;
        color:var(--p-ink,#060A30);text-decoration:none;
        transition:background .2s;
      " onmouseover="this.style.background='var(--p-bg,#F3F6FF)'"
         onmouseout="this.style.background='transparent'">
        <span style="font-size:15px">📦</span> My Dashboard
      </a>
      <a href="track-order.html" style="
        display:flex;align-items:center;gap:10px;
        padding:11px 16px;font-size:13px;font-weight:500;
        color:var(--p-ink,#060A30);text-decoration:none;
        transition:background .2s;
      " onmouseover="this.style.background='var(--p-bg,#F3F6FF)'"
         onmouseout="this.style.background='transparent'">
        <span style="font-size:15px">📍</span> Track Order
      </a>
      <div style="border-top:1px solid var(--p-line,#C8D0F0);padding:6px 10px;">
        <button id="auth-signout-btn" style="
          width:100%;padding:9px 12px;border:none;
          background:transparent;border-radius:9px;
          display:flex;align-items:center;gap:10px;
          font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;
          color:#8A0000;cursor:pointer;text-align:left;
          transition:background .2s;
        " onmouseover="this.style.background='#FFF0F0'"
           onmouseout="this.style.background='transparent'">
          <span style="font-size:15px">🚪</span> Sign Out
        </button>
      </div>
    </div>
  `;

  /* Insert chip into navbar */
  const target =
    document.querySelector('.nav-actions') ||
    document.querySelector('.nav-right')   ||
    document.querySelector('.navbar')      ||
    document.querySelector('nav');

  if (target) {
    /* Insert before cart button if it exists */
    const cartBtn = target.querySelector('.btn-cart, #cartBtn, [class*="cart"]');
    cartBtn ? target.insertBefore(chip, cartBtn) : target.appendChild(chip);
  }

  /* Toggle dropdown */
  const btn  = chip.querySelector('#auth-chip-btn');
  const menu = chip.querySelector('#auth-chip-menu');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.style.display === 'block';
    menu.style.display = open ? 'none' : 'block';
    btn.style.background = open
      ? 'var(--p-ink, #060A30)'
      : 'var(--p-ink2, #101C6C)';
  });

  /* Close on outside click */
  document.addEventListener('click', () => {
    menu.style.display   = 'none';
    btn.style.background = 'var(--p-ink, #060A30)';
  });

  /* Sign out */
  chip.querySelector('#auth-signout-btn').addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
  });
}

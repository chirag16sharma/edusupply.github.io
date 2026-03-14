/* ================================================================
   real-images.js
   Replaces every placeholder image on EduSupply with a real
   high-quality Unsplash photo. Zero HTML changes needed.

   Add ONE line to index.html before </body>:
     <script src="real-images.js" defer></script>
   ================================================================ */

(function () {

  /* ── Image map ─────────────────────────────────────────────────
     Keys are partial filename matches (case-insensitive).
     Values are permanent Unsplash URLs (w=640 for hero/category,
     w=320 for step/icon sized images).
  ─────────────────────────────────────────────────────────────── */
  const MAP = [

    /* ── Hero floating product cards ──────────────────────────── */
    {
      match: 'smartboard',
      url:   'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=640&q=85&fit=crop&auto=format',
      alt:   'Smart Board'
    },
    {
      match: 'beaker',
      url:   'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=640&q=85&fit=crop&auto=format',
      alt:   'Lab Chemicals'
    },
    {
      match: ['desk', 'step-browse'],
      url:   'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=640&q=85&fit=crop&auto=format',
      alt:   'Student Desks'
    },

    /* ── Category card images ──────────────────────────────────── */
    {
      match: 'cat-furniture',
      url:   'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=85&fit=crop&auto=format',
      alt:   'School Furniture',
      style: { borderRadius: '14px', objectFit: 'cover', width: '100%', height: '160px' }
    },
    {
      match: 'cat-lab',
      url:   'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=640&q=85&fit=crop&auto=format',
      alt:   'Lab Supplies',
      style: { borderRadius: '14px', objectFit: 'cover', width: '100%', height: '160px' }
    },
    {
      match: 'cat-board',
      url:   'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=640&q=85&fit=crop&auto=format',
      alt:   'Boards & Displays',
      style: { borderRadius: '14px', objectFit: 'cover', width: '100%', height: '160px' }
    },
    {
      match: 'cat-stationery',
      url:   'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?w=640&q=85&fit=crop&auto=format',
      alt:   'Stationery',
      style: { borderRadius: '14px', objectFit: 'cover', width: '100%', height: '160px' }
    },

    /* ── How It Works step images ──────────────────────────────── */
    {
      match: 'step-browse',
      url:   'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=480&q=80&fit=crop&auto=format',
      alt:   'Browse Products',
      style: { borderRadius: '10px', objectFit: 'cover', width: '72px', height: '72px' }
    },
    {
      match: 'step-order',
      url:   'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=480&q=80&fit=crop&auto=format',
      alt:   'Place Order',
      style: { borderRadius: '10px', objectFit: 'cover', width: '72px', height: '72px' }
    },
    {
      match: 'step-deliver',
      url:   'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=480&q=80&fit=crop&auto=format',
      alt:   'Fast Delivery',
      style: { borderRadius: '10px', objectFit: 'cover', width: '72px', height: '72px' }
    },

  ];

  /* ── Helper: does src match a key? ───────────────────────────── */
  function srcMatches(src, match) {
    if (!src) return false;
    const s = src.toLowerCase();
    if (Array.isArray(match)) return match.some(m => s.includes(m.toLowerCase()));
    return s.includes(match.toLowerCase());
  }

  /* ── Apply a real image to an <img> element ──────────────────── */
  function applyEntry(img, entry) {
    img.src = entry.url;
    if (entry.alt) img.alt = entry.alt;
    if (entry.style) Object.assign(img.style, entry.style);
    img.dataset.realImg = '1';

    /* Remove filter:invert that was used on placeholder icons */
    const computed = window.getComputedStyle(img);
    if (computed.filter && computed.filter.includes('invert')) {
      img.style.filter = 'none';
    }
  }

  /* ── Patch all images currently in DOM ───────────────────────── */
  function patchAll() {
    document.querySelectorAll('img:not([data-real-img])').forEach(img => {
      const src = img.getAttribute('src') || '';
      for (const entry of MAP) {
        if (srcMatches(src, entry.match)) {
          applyEntry(img, entry);
          break;
        }
      }
    });

    /* Also upgrade category cards — wrap img in a photo container */
    upgradeCategoryCards();
  }

  /* ── Make category cards use full-bleed photo tops ──────────── */
  function upgradeCategoryCards() {
    document.querySelectorAll('.cat-card').forEach(card => {
      if (card.dataset.upgraded) return;
      card.dataset.upgraded = '1';

      const icon = card.querySelector('.cat-icon');
      if (!icon) return;

      const img = icon.querySelector('img');
      if (!img || img.dataset.realImg) return;

      const src = img.getAttribute('src') || '';
      const entry = MAP.find(e => srcMatches(src, e.match));
      if (!entry) return;

      /* Build a photo banner at the top of the card */
      const banner = document.createElement('div');
      banner.style.cssText = `
        width: 100%;
        height: 140px;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 14px;
        position: relative;
      `;

      const photo = document.createElement('img');
      photo.src   = entry.url;
      photo.alt   = entry.alt || '';
      photo.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        transition: transform .4s ease;
        filter: none !important;
      `;
      photo.dataset.realImg = '1';

      banner.appendChild(photo);

      /* Hover zoom */
      card.addEventListener('mouseenter', () => photo.style.transform = 'scale(1.05)');
      card.addEventListener('mouseleave', () => photo.style.transform = '');

      /* Hide the old icon, insert banner before it */
      icon.style.display = 'none';
      card.insertBefore(banner, card.firstChild);
    });
  }

  /* ── Watch for dynamic changes ────────────────────────────────── */
  const observer = new MutationObserver(() => patchAll());
  observer.observe(document.body, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchAll);
  } else {
    patchAll();
    /* Run again after a tick in case products.js renders late */
    setTimeout(patchAll, 500);
    setTimeout(patchAll, 1500);
  }

})();

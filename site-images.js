/* ================================================================
   site-images.js
   Replaces placeholder images with real photos from the
   Unsplash CDN — no API key, no fetch, no CORS issues.
   Just direct public image URLs that work immediately.

   Deploy: add before </body> in index.html:
     <script src="site-images.js" defer></script>
   ================================================================ */

(function () {

  /* ── Static site image replacements ───────────────────────────
     Keys match partial filename in src.
     URLs are direct Unsplash CDN links — no API needed.
  ─────────────────────────────────────────────────────────────── */
  const SITE_MAP = [
    /* Hero floating cards */
    {
      match: 'smartboard',
      url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&q=80&fit=crop',
      alt: 'Smart Board'
    },
    {
      match: 'beaker',
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&fit=crop',
      alt: 'Lab Chemicals'
    },
    {
      match: ['images/desk', 'desk.png'],
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80&fit=crop',
      alt: 'Student Desks'
    },

    /* Category cards */
    {
      match: 'cat-furniture',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop',
      alt: 'School Furniture',
      banner: true
    },
    {
      match: 'cat-lab',
      url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80&fit=crop',
      alt: 'Lab Supplies',
      banner: true
    },
    {
      match: 'cat-board',
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80&fit=crop',
      alt: 'Boards & Displays',
      banner: true
    },
    {
      match: 'cat-stationery',
      url: 'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?w=600&q=80&fit=crop',
      alt: 'Stationery',
      banner: true
    },

    /* How It Works steps */
    {
      match: 'step-browse',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80&fit=crop',
      alt: 'Browse Products'
    },
    {
      match: 'step-order',
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80&fit=crop',
      alt: 'Place Order'
    },
    {
      match: 'step-deliver',
      url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&q=80&fit=crop',
      alt: 'Fast Delivery'
    },
  ];

  /* ── Product card image map ────────────────────────────────────
     Matched against .edu-card-name text (case-insensitive).
  ─────────────────────────────────────────────────────────────── */
  const PRODUCT_MAP = [
    { keys: ['smart board', 'smartboard', 'interactive board'],
      url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=480&q=80&fit=crop' },
    { keys: ['student desk', 'dual desk', 'school desk', 'classroom desk'],
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&q=80&fit=crop' },
    { keys: ['teacher desk', 'teacher cabin', 'cabin table', 'office desk'],
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=480&q=80&fit=crop' },
    { keys: ['chair', 'moulded chair', 'plastic chair', 'student chair'],
      url: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=480&q=80&fit=crop' },
    { keys: ['bookshelf', 'bookcase', 'library shelf', 'book shelf'],
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&q=80&fit=crop' },
    { keys: ['locker', 'storage locker', 'steel locker'],
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80&fit=crop' },
    { keys: ['bench', 'school bench', 'wooden bench'],
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=480&q=80&fit=crop' },
    { keys: ['chemistry', 'reagent', 'chemical'],
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&q=80&fit=crop' },
    { keys: ['microscope'],
      url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=480&q=80&fit=crop' },
    { keys: ['physics', 'optics', 'lens', 'prism', 'optics kit'],
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&q=80&fit=crop' },
    { keys: ['biology', 'specimen', 'dissection'],
      url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=480&q=80&fit=crop' },
    { keys: ['vernier', 'caliper', 'measuring instrument'],
      url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=480&q=80&fit=crop' },
    { keys: ['beaker', 'flask', 'glassware', 'test tube', 'lab glass'],
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&q=80&fit=crop' },
    { keys: ['globe', 'geography'],
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=480&q=80&fit=crop' },
    { keys: ['projector'],
      url: 'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?w=480&q=80&fit=crop' },
    { keys: ['whiteboard', 'chalkboard', 'blackboard', 'green board', 'display board'],
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&q=80&fit=crop' },
    { keys: ['notebook', 'exercise book', 'composition book'],
      url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=480&q=80&fit=crop' },
    { keys: ['pen', 'ballpoint', 'gel pen'],
      url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=480&q=80&fit=crop' },
    { keys: ['pencil'],
      url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=480&q=80&fit=crop' },
    { keys: ['ruler', 'scale', 'geometry box'],
      url: 'https://images.unsplash.com/photo-1606606767399-01e271823a2e?w=480&q=80&fit=crop' },
    { keys: ['crayon', 'marker', 'sketch pen', 'colour pen', 'felt'],
      url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=480&q=80&fit=crop' },
    { keys: ['scissors', 'glue', 'craft', 'art supply'],
      url: 'https://images.unsplash.com/photo-1609963471793-2f339bddf56c?w=480&q=80&fit=crop' },
    { keys: ['bag', 'school bag', 'backpack'],
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=480&q=80&fit=crop' },
  ];

  /* Category fallbacks */
  const CAT_FALLBACK = {
    furniture:  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&q=80&fit=crop',
    lab:        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&q=80&fit=crop',
    boards:     'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&q=80&fit=crop',
    stationery: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=480&q=80&fit=crop',
    default:    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&q=80&fit=crop',
  };

  /* ── Helpers ──────────────────────────────────────────────── */
  function srcMatches(src, match) {
    if (!src) return false;
    const s = src.toLowerCase();
    if (Array.isArray(match)) return match.some(m => s.includes(m.toLowerCase()));
    return s.includes(match.toLowerCase());
  }

  function applyImg(img, url, alt) {
    img.src   = url;
    if (alt) img.alt = alt;
    img.style.objectFit      = 'cover';
    img.style.objectPosition = 'center';
    img.style.filter         = 'none';
    img.dataset.realImg      = '1';
  }

  /* ── Replace static site images ──────────────────────────── */
  function replaceSiteImages() {
    document.querySelectorAll('img:not([data-real-img])').forEach(img => {
      const src = img.getAttribute('src') || '';
      for (const entry of SITE_MAP) {
        if (srcMatches(src, entry.match)) {
          applyImg(img, entry.url, entry.alt);

          /* For category cards — add photo banner */
          if (entry.banner) {
            const card = img.closest('.cat-card');
            if (card && !card.dataset.upgraded) upgradeCatCard(card, entry.url, entry.alt);
          }
          break;
        }
      }
    });
  }

  /* ── Full-bleed photo banner on category cards ────────────── */
  function upgradeCatCard(card, url, alt) {
    card.dataset.upgraded = '1';
    const icon = card.querySelector('.cat-icon');
    if (!icon) return;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:100%;height:150px;border-radius:12px;overflow:hidden;margin-bottom:14px;';

    const photo = document.createElement('img');
    photo.src   = url;
    photo.alt   = alt || '';
    photo.dataset.realImg = '1';
    photo.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:center;display:block;transition:transform .4s ease;filter:none!important;';

    wrap.appendChild(photo);
    card.addEventListener('mouseenter', () => photo.style.transform = 'scale(1.06)');
    card.addEventListener('mouseleave', () => photo.style.transform = '');
    icon.style.display = 'none';
    card.insertBefore(wrap, card.firstChild);
  }

  /* ── Replace product card images ─────────────────────────── */
  function replaceProductImages() {
    document.querySelectorAll('.edu-card:not([data-img-done])').forEach(card => {
      card.dataset.imgDone = '1';

      const img  = card.querySelector('img');
      if (!img) return;

      /* Already has a real remote image — skip */
      const src = img.getAttribute('src') || '';
      if (src.startsWith('https://images.unsplash.com')) return;

      const name = (card.querySelector('.edu-card-name')?.textContent || '').toLowerCase();
      const cat  = (card.querySelector('.edu-card-cat')?.textContent  || '').toLowerCase();

      let url = null;
      for (const entry of PRODUCT_MAP) {
        if (entry.keys.some(k => name.includes(k))) { url = entry.url; break; }
      }
      if (!url) {
        for (const [key, fallback] of Object.entries(CAT_FALLBACK)) {
          if (cat.includes(key)) { url = fallback; break; }
        }
      }
      if (!url) url = CAT_FALLBACK.default;

      applyImg(img, url, card.querySelector('.edu-card-name')?.textContent || '');
    });
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  function run() {
    replaceSiteImages();
    replaceProductImages();
  }

  const observer = new MutationObserver(run);
  observer.observe(document.body, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
    setTimeout(run, 600);
    setTimeout(run, 1800);
  }

})();

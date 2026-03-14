/* ================================================================
   product-images.js
   Watches for .edu-card elements rendered by products.js and
   fills in a real Unsplash photo whenever imageUrl is missing
   or the img fails to load.

   Add ONE line to index.html before </body>:
     <script src="product-images.js" defer></script>
   ================================================================ */

(function () {

  /* ── Curated image map ─────────────────────────────────────────
     Keys match product names (case-insensitive, partial match)
     or category names. Values are permanent Unsplash photo URLs.
     Format: https://images.unsplash.com/photo-{id}?w=480&q=80&fit=crop&auto=format
  ─────────────────────────────────────────────────────────────── */
  const NAME_MAP = [
    // Furniture
    { keys: ['student desk', 'dual desk', 'school desk'],
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&q=80&fit=crop&auto=format' },
    { keys: ['teacher desk', 'teacher cabin', 'cabin table'],
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=480&q=80&fit=crop&auto=format' },
    { keys: ['chair', 'moulded chair', 'plastic chair'],
      url: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=480&q=80&fit=crop&auto=format' },
    { keys: ['bookshelf', 'bookcase', 'library shelf'],
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&q=80&fit=crop&auto=format' },
    { keys: ['locker', 'storage locker', 'cabinet'],
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80&fit=crop&auto=format' },
    { keys: ['bench', 'school bench'],
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=480&q=80&fit=crop&auto=format' },
    { keys: ['computer table', 'computer desk', 'lab table'],
      url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=480&q=80&fit=crop&auto=format' },

    // Smart Boards & AV
    { keys: ['smart board', 'smartboard', 'interactive board', 'whiteboard'],
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&q=80&fit=crop&auto=format' },
    { keys: ['projector'],
      url: 'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?w=480&q=80&fit=crop&auto=format' },
    { keys: ['display board', 'notice board', 'bulletin board'],
      url: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=480&q=80&fit=crop&auto=format' },
    { keys: ['chalkboard', 'blackboard', 'green board'],
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&q=80&fit=crop&auto=format' },

    // Lab Equipment
    { keys: ['chemistry', 'reagent', 'chemical'],
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&q=80&fit=crop&auto=format' },
    { keys: ['microscope'],
      url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=480&q=80&fit=crop&auto=format' },
    { keys: ['physics', 'optics', 'lens', 'prism'],
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&q=80&fit=crop&auto=format' },
    { keys: ['biology', 'specimen', 'dissection'],
      url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=480&q=80&fit=crop&auto=format' },
    { keys: ['vernier', 'caliper', 'measuring'],
      url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=480&q=80&fit=crop&auto=format' },
    { keys: ['beaker', 'flask', 'glassware', 'test tube'],
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&q=80&fit=crop&auto=format' },
    { keys: ['lab kit', 'science kit', 'experiment kit'],
      url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=480&q=80&fit=crop&auto=format' },
    { keys: ['globe', 'geography'],
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=480&q=80&fit=crop&auto=format' },

    // Stationery
    { keys: ['notebook', 'exercise book', 'composition book'],
      url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=480&q=80&fit=crop&auto=format' },
    { keys: ['pen', 'pens', 'ballpoint'],
      url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=480&q=80&fit=crop&auto=format' },
    { keys: ['pencil', 'pencils', 'coloured pencil'],
      url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=480&q=80&fit=crop&auto=format' },
    { keys: ['ruler', 'scale', 'geometry box'],
      url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=480&q=80&fit=crop&auto=format' },
    { keys: ['eraser', 'rubber', 'sharpener'],
      url: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=480&q=80&fit=crop&auto=format' },
    { keys: ['crayon', 'marker', 'sketch pen', 'colour'],
      url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=480&q=80&fit=crop&auto=format' },
    { keys: ['stapler', 'file', 'folder', 'binder'],
      url: 'https://images.unsplash.com/photo-1568057373052-d95c70e01c3c?w=480&q=80&fit=crop&auto=format' },
    { keys: ['scissors', 'glue', 'craft'],
      url: 'https://images.unsplash.com/photo-1609963471793-2f339bddf56c?w=480&q=80&fit=crop&auto=format' },
    { keys: ['paper', 'sheet', 'a4'],
      url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=480&q=80&fit=crop&auto=format' },
    { keys: ['bag', 'school bag', 'backpack'],
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=480&q=80&fit=crop&auto=format' },
  ];

  /* Category fallbacks (used when no name match is found) */
  const CATEGORY_FALLBACK = {
    furniture:   'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&q=80&fit=crop&auto=format',
    boards:      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&q=80&fit=crop&auto=format',
    lab:         'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&q=80&fit=crop&auto=format',
    stationery:  'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=480&q=80&fit=crop&auto=format',
    default:     'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&q=80&fit=crop&auto=format',
  };

  /* ── Resolve image URL for a product ──────────────────────────── */
  function resolveImage(name, category) {
    const n = (name || '').toLowerCase();
    const c = (category || '').toLowerCase();

    for (const entry of NAME_MAP) {
      if (entry.keys.some(k => n.includes(k))) return entry.url;
    }

    return CATEGORY_FALLBACK[c] || CATEGORY_FALLBACK.default;
  }

  /* ── Patch a single card ───────────────────────────────────────── */
  function patchCard(card) {
    if (card.dataset.imgPatched) return;
    card.dataset.imgPatched = '1';

    const img = card.querySelector('.edu-card-img, img[class*="card"], img[class*="product"]');
    if (!img) return;

    /* Check if image is actually broken / missing */
    const needsPatch =
      !img.src ||
      img.src === window.location.href ||
      img.naturalWidth === 0;

    if (!needsPatch && img.complete && img.naturalWidth > 0) return;

    const name     = card.querySelector('.edu-card-name')?.textContent || '';
    const category = card.querySelector('.edu-card-cat')?.textContent  || '';
    const fallback = resolveImage(name, category);

    function applyFallback() {
      img.src = fallback;
      img.style.objectFit   = 'cover';
      img.style.objectPosition = 'center';
    }

    if (img.complete && img.naturalWidth === 0) {
      applyFallback();
    } else {
      img.addEventListener('error', applyFallback, { once: true });
      /* If src is empty, apply immediately */
      if (!img.getAttribute('src')) applyFallback();
    }
  }

  /* ── Watch for cards being added dynamically ──────────────────── */
  function patchAll() {
    document.querySelectorAll('.edu-card').forEach(patchCard);
  }

  const observer = new MutationObserver(() => patchAll());
  observer.observe(document.body, { childList: true, subtree: true });

  /* Run once on load in case cards are already rendered */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchAll);
  } else {
    patchAll();
  }

})();

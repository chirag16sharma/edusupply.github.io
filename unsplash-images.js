/* ================================================================
   unsplash-images.js
   Fetches accurate real photos from Unsplash for every product
   card and site image. Replace zx8EVDIK0N6jln1_VPUgF1w-H8j5uNI0XYcLhn7IiMs below with your
   Unsplash Access Key from unsplash.com/developers.

   Deploy: add before </body> in index.html:
     <script src="unsplash-images.js" defer></script>
   ================================================================ */

const UNSPLASH_KEY = 'zx8EVDIK0N6jln1_VPUgF1w-H8j5uNI0XYcLhn7IiMs';  // ← paste your key here

/* ── Static site images (hero cards, category icons, steps) ────
   These are fetched once and cached in sessionStorage so they
   don't re-fetch on every page scroll.
──────────────────────────────────────────────────────────────── */
const SITE_IMAGES = [
  /* Hero floating cards */
  { match: 'smartboard',     query: 'interactive smart board classroom school' },
  { match: 'beaker',         query: 'school chemistry lab beakers chemicals' },
  { match: 'desk',           query: 'school student desk classroom furniture' },

  /* Category cards */
  { match: 'cat-furniture',  query: 'school classroom furniture desks chairs' },
  { match: 'cat-lab',        query: 'school science laboratory equipment' },
  { match: 'cat-board',      query: 'school smart board whiteboard classroom' },
  { match: 'cat-stationery', query: 'school stationery pencils notebooks pens' },

  /* How It Works steps */
  { match: 'step-browse',    query: 'person browsing laptop online catalogue' },
  { match: 'step-order',     query: 'filling order form pen paper clipboard' },
  { match: 'step-deliver',   query: 'package delivery courier fast shipping' },
];

/* ── Product name → Unsplash search query ─────────────────────
   products.js renders .edu-card with .edu-card-name and
   .edu-card-cat. We build a search query from those.
──────────────────────────────────────────────────────────────── */
const PRODUCT_QUERY_MAP = [
  { keys: ['smart board', 'smartboard', 'interactive board'],  query: 'smart interactive whiteboard classroom' },
  { keys: ['student desk', 'dual desk', 'school desk'],        query: 'school student desk wood classroom' },
  { keys: ['teacher desk', 'teacher cabin', 'cabin table'],    query: 'teacher office desk chair school' },
  { keys: ['chair', 'moulded chair', 'plastic chair'],         query: 'plastic school chair classroom stacking' },
  { keys: ['bookshelf', 'bookcase', 'library shelf'],          query: 'school library bookshelf books shelves' },
  { keys: ['locker', 'storage locker'],                        query: 'school storage locker metal cabinet' },
  { keys: ['bench', 'school bench'],                           query: 'school bench wooden classroom' },
  { keys: ['chemistry', 'reagent', 'chemical'],                query: 'chemistry reagent lab chemicals school' },
  { keys: ['microscope'],                                       query: 'microscope laboratory school science' },
  { keys: ['physics', 'optics', 'lens', 'prism'],              query: 'physics optics experiment school lab' },
  { keys: ['biology', 'specimen'],                             query: 'biology lab specimen school science' },
  { keys: ['vernier', 'caliper'],                              query: 'vernier caliper measuring instrument lab' },
  { keys: ['beaker', 'flask', 'glassware', 'test tube'],       query: 'laboratory glassware beaker flask science' },
  { keys: ['globe', 'geography'],                              query: 'globe geography school classroom' },
  { keys: ['notebook', 'exercise book'],                       query: 'school notebook exercise book stationery' },
  { keys: ['pen', 'ballpoint'],                                query: 'pen ballpoint stationery school writing' },
  { keys: ['pencil'],                                          query: 'pencil school stationery writing' },
  { keys: ['ruler', 'scale', 'geometry'],                      query: 'geometry box ruler scale school' },
  { keys: ['crayon', 'marker', 'colour'],                      query: 'coloured markers crayons school art' },
  { keys: ['projector'],                                       query: 'projector classroom school presentation' },
  { keys: ['whiteboard', 'chalkboard', 'blackboard'],          query: 'whiteboard chalkboard classroom school' },
  { keys: ['bag', 'backpack'],                                 query: 'school bag backpack student' },
];

/* ── Cache wrapper ─────────────────────────────────────────── */
function cacheGet(key)        { try { return sessionStorage.getItem('edu_img_' + key); } catch { return null; } }
function cacheSet(key, value) { try { sessionStorage.setItem('edu_img_' + key, value); } catch {} }

/* ── Fetch one photo from Unsplash ─────────────────────────── */
async function fetchUnsplashUrl(query) {
  const cached = cacheGet(query);
  if (cached) return cached;

  try {
    const res  = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    if (!res.ok) throw new Error('Unsplash error ' + res.status);
    const data = await res.json();
    const url  = data.urls?.regular || data.urls?.small;
    if (url) cacheSet(query, url);
    return url;
  } catch (e) {
    console.warn('[EduSupply] Unsplash fetch failed for:', query, e.message);
    return null;
  }
}

/* ── Apply real image to an <img> element ──────────────────── */
function applyImage(img, url, alt) {
  if (!url || !img) return;
  img.src   = url;
  img.alt   = alt || img.alt;
  img.style.objectFit = 'cover'; 
  img.style.filter    = 'none';
  img.dataset.realImg = '1';
   
}

/* ── Replace static site images ───────────────────────────── */
async function replaceSiteImages() {
  const allImgs = [...document.querySelectorAll('img:not([data-real-img])')];

  for (const entry of SITE_IMAGES) {
    const img = allImgs.find(i => {
      const src = (i.getAttribute('src') || '').toLowerCase();
      return src.includes(entry.match.toLowerCase());
    });
    if (!img) continue;

    const url = await fetchUnsplashUrl(entry.query);
    if (!url) continue;

    applyImage(img, url, entry.query);

    /* For category cards — also build a photo banner */
    const catCard = img.closest('.cat-card');
    if (catCard && !catCard.dataset.upgraded) {
      catCard.dataset.upgraded = '1';
      buildCategoryBanner(catCard, url, entry.query);
    }
  }
}

/* ── Build full-bleed photo banner on category cards ────────── */
function buildCategoryBanner(card, url, alt) {
  const icon = card.querySelector('.cat-icon');
  if (!icon) return;

  const banner = document.createElement('div');
  banner.style.cssText = `
    width: 100%;
    height: 150px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 16px;
  `;

  const photo = document.createElement('img');
  photo.src   = url;
  photo.alt   = alt;
  photo.dataset.realImg = '1';
  photo.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform .4s ease;
    filter: none !important;
  `;

  banner.appendChild(photo);
  card.addEventListener('mouseenter', () => photo.style.transform = 'scale(1.05)');
  card.addEventListener('mouseleave', () => photo.style.transform = '');

  icon.style.display = 'none';
  card.insertBefore(banner, card.firstChild);
}

/* ── Replace product card images ───────────────────────────── */
async function replaceProductImages() {
  const cards = [...document.querySelectorAll('.edu-card:not([data-real-img])')];

  for (const card of cards) {
    card.dataset.realImg = '1';

    const nameEl = card.querySelector('.edu-card-name');
    const catEl  = card.querySelector('.edu-card-cat');
    const img    = card.querySelector('img, .edu-card-img');
    if (!img) continue;

    /* Skip if already has a real image URL (from Firestore) */
    const src = img.getAttribute('src') || '';
    if (src.startsWith('http') && !src.includes('placeholder') && img.naturalWidth > 0) continue;

    const name     = (nameEl?.textContent || '').toLowerCase();
    const category = (catEl?.textContent  || '').toLowerCase();

    /* Find best matching query */
    let query = null;
    for (const entry of PRODUCT_QUERY_MAP) {
      if (entry.keys.some(k => name.includes(k))) {
        query = entry.query;
        break;
      }
    }

    /* Fall back to category */
    if (!query) {
      if (category.includes('furniture'))  query = 'school furniture classroom desks chairs';
      else if (category.includes('lab'))   query = 'school science laboratory equipment';
      else if (category.includes('board')) query = 'school whiteboard smart board classroom';
      else                                  query = 'school stationery supplies education';
    }

    const url = await fetchUnsplashUrl(query);
    if (url) applyImage(img, url, nameEl?.textContent || '');
  }
}

/* ── Main ──────────────────────────────────────────────────── */
async function init() {
  if (!UNSPLASH_KEY) {
    console.warn('[EduSupply] Add your Unsplash API key to unsplash-images.js');
    return;
}

  await replaceSiteImages();

  /* Products load dynamically — watch and patch */
  replaceProductImages();

  const observer = new MutationObserver(() => replaceProductImages());
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

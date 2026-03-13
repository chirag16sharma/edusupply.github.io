/* ================================================================
   EduSupply — wow.js
   Drop-in script — add ONE tag to index.html before </body>:
     <script src="wow.js"></script>

   Effects:
   ① Announcement bar
   ② Gold scroll progress bar
   ③ Ambient cursor glow (desktop)
   ④ Hero title word-reveal animation
   ⑤ Stat counter animation (counts up on scroll)
   ⑥ Magnetic hover on buttons
   ⑦ Product card 3-D tilt on mouse move
   ⑧ Full-screen mobile nav panel (replaces default dropdown)
   ⑨ Adds data-cat attribute to product cards (for CSS fallback colours)
   ================================================================ */

(function () {
  'use strict';

  /* ── Wait for DOM ─────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupAnnouncementBar();
    setupScrollProgress();
    setupCursorGlow();
    setupHeroWordReveal();
    setupStatCounters();
    setupMagneticButtons();
    setupCardTilt();
    setupMobileNav();
    tagProductCards();
    setupScrollRevealEnhanced();
  }

  /* ════════════════════════════════════════════════════════════
     ① ANNOUNCEMENT BAR
     ════════════════════════════════════════════════════════════ */
 /* function setupAnnouncementBar() {
    /* Don't add twice */
   /* if (document.getElementById('p-announce')) return;

    const bar = document.createElement('div');
    bar.id = 'p-announce';
    bar.innerHTML = `
      🚚 <em>Free delivery</em> on orders above ₹5,000 &nbsp;·&nbsp;
      Serving Bengaluru &nbsp;·&nbsp;
      GST invoices provided &nbsp;·&nbsp;
      <em>Bulk discounts available</em>
      <button id="p-announce-close" aria-label="Close">✕</button>
    `;

    /* Insert before navbar */
  /*  const navbar = document.querySelector('.navbar') || document.querySelector('nav');
    if (!navbar) return;
    navbar.parentNode.insertBefore(bar, navbar);

    /* Push navbar down */
  /*  const barHeight = bar.offsetHeight || 40;
    navbar.style.top = barHeight + 'px';

    /* Slide in after a tick */
  /*  requestAnimationFrame(() => {
      requestAnimationFrame(() => bar.classList.add('visible'));
    });

    /* Close button */
  /*  document.getElementById('p-announce-close').addEventListener('click', () => {
      bar.style.transition = 'height .3s ease, opacity .3s ease';
      bar.style.opacity = '0';
      bar.style.height  = '0';
      bar.style.overflow = 'hidden';
      bar.style.padding = '0';
      setTimeout(() => {
        if (navbar) navbar.style.top = '0';
      }, 300);
    });
  } 

  /* ════════════════════════════════════════════════════════════
     ② SCROLL PROGRESS BAR
     ════════════════════════════════════════════════════════════ */
  function setupScrollProgress() {
    if (document.getElementById('p-progress')) return;

    const bar = document.createElement('div');
    bar.id = 'p-progress';
    document.body.appendChild(bar);

    function update() {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width  = pct + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ════════════════════════════════════════════════════════════
     ③ AMBIENT CURSOR GLOW  (desktop only)
     ════════════════════════════════════════════════════════════ */
  function setupCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (document.getElementById('p-cursor-glow')) return;

    const glow = document.createElement('div');
    glow.id = 'p-cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -1000, mouseY = -1000;
    let glowX  = -1000, glowY  = -1000;
    let rafId;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function tick() {
      /* Smooth follow — lerp */
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.left = (glowX + window.scrollX) + 'px';
      glow.style.top  = (glowY + window.scrollY) + 'px';
      rafId = requestAnimationFrame(tick);
    }
    tick();

    /* Intensify on interactive elements */
    document.addEventListener('mouseover', e => {
      const t = e.target;
      if (t.matches('button, a, .cat-card, .edu-card, .testimonial-card')) {
        glow.style.background = 'radial-gradient(circle, rgba(184,146,90,.14) 0%, transparent 65%)';
        glow.style.width  = '600px';
        glow.style.height = '600px';
      }
    }, { passive: true });

    document.addEventListener('mouseout', e => {
      const t = e.target;
      if (t.matches('button, a, .cat-card, .edu-card, .testimonial-card')) {
        glow.style.background = 'radial-gradient(circle, rgba(184,146,90,.08) 0%, transparent 65%)';
        glow.style.width  = '500px';
        glow.style.height = '500px';
      }
    }, { passive: true });
  }

  /* ════════════════════════════════════════════════════════════
     ④ HERO TITLE WORD-REVEAL
     ════════════════════════════════════════════════════════════ */
  function setupHeroWordReveal() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    /* Walk text nodes and wrap each word */
    function wrapWords(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/);
        const frag  = document.createDocumentFragment();
        words.forEach(word => {
          if (/^\s+$/.test(word)) {
            frag.appendChild(document.createTextNode(word));
          } else {
            const span = document.createElement('span');
            span.className = 'p-word';
            const inner = document.createElement('span');
            inner.className = 'p-word-inner';
            inner.textContent = word;
            span.appendChild(inner);
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(wrapWords);
      }
    }

    wrapWords(title);

    /* Stagger reveal */
    const inners = title.querySelectorAll('.p-word-inner');
    inners.forEach((inner, i) => {
      setTimeout(() => inner.classList.add('revealed'), 300 + i * 80);
    });
  }

  /* ════════════════════════════════════════════════════════════
     ⑤ STAT COUNTERS  (count up when hero scrolls into view)
     ════════════════════════════════════════════════════════════ */
  function setupStatCounters() {
    const nums = document.querySelectorAll('.stat-num');
    if (!nums.length) return;

    const targets = [
      { el: nums[0], end: 500,  suffix: '+', label: 'Products'       },
      { el: nums[1], end: 1200, suffix: '+', label: 'Schools Served' },
      { el: nums[2], end: 24,   suffix: 'hr', label: 'Avg Delivery'  },
    ];

    let started = false;

    function runCounters() {
      if (started) return;
      started = true;

      targets.forEach(({ el, end, suffix }) => {
        if (!el) return;
        let start = 0;
        const duration = 1600;
        const step = 16;
        const increment = end / (duration / step);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          el.textContent = Math.round(start).toLocaleString('en-IN') + suffix;
        }, step);
      });
    }

    /* Trigger when .hero-stats enters viewport */
    const statsEl = document.querySelector('.hero-stats');
    if (!statsEl) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(runCounters, 200);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(statsEl);
  }

  /* ════════════════════════════════════════════════════════════
     ⑥ MAGNETIC BUTTONS
     ════════════════════════════════════════════════════════════ */
  function setupMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    function addMagnet(selector) {
      document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const rect   = btn.getBoundingClientRect();
          const cx     = rect.left + rect.width  / 2;
          const cy     = rect.top  + rect.height / 2;
          const dx     = (e.clientX - cx) * 0.28;
          const dy     = (e.clientY - cy) * 0.28;
          btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    }

    /* Run once and again when product grid updates */
    function wire() {
      addMagnet('.btn-primary');
      addMagnet('.btn-outline');
      addMagnet('.cat-icon');
    }

    wire();
    /* Re-wire after products.js renders cards */
    setTimeout(wire, 1500);
  }

  /* ════════════════════════════════════════════════════════════
     ⑦ PRODUCT CARD 3-D TILT
     ════════════════════════════════════════════════════════════ */
  function setupCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const INTENSITY = 8; /* degrees */

    function addTilt(card) {
      if (card.dataset.tiltDone) return;
      card.dataset.tiltDone = '1';

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x    = (e.clientX - rect.left) / rect.width  - 0.5;  /* -0.5 to 0.5 */
        const y    = (e.clientY - rect.top ) / rect.height - 0.5;
        const rotX = -y * INTENSITY;
        const rotY =  x * INTENSITY;
        card.style.transform    = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
        card.style.boxShadow    = `${-rotY * 2}px ${rotX * 2 + 10}px 40px rgba(24,21,15,.15)`;
        card.style.borderColor  = 'rgba(184,146,90,.4)';
        card.style.transition   = 'box-shadow .1s, border-color .1s';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform   = '';
        card.style.boxShadow   = '';
        card.style.borderColor = '';
        card.style.transition  = 'transform .4s cubic-bezier(.4,0,.2,1), box-shadow .4s, border-color .4s';
      });
    }

    function wireTilt() {
      document.querySelectorAll('.edu-card').forEach(addTilt);
    }

    wireTilt();
    /* Re-wire after filter changes re-render cards */
    const grid = document.getElementById('edu-products-grid');
    if (grid) {
      new MutationObserver(wireTilt).observe(grid, { childList: true });
    }
    setTimeout(wireTilt, 2000);
  }

  /* ════════════════════════════════════════════════════════════
     ⑧ MOBILE NAV PANEL
     ════════════════════════════════════════════════════════════ */
  function setupMobileNav() {
    const hamburger = document.getElementById('hamburger');
    if (!hamburger) return;

    /* Collect nav link data from existing nav */
    const existingLinks = Array.from(
      document.querySelectorAll('.nav-links a')
    ).map(a => ({ href: a.href, text: a.textContent.trim() }));

    /* Build panel */
    const panel = document.createElement('div');
    panel.id = 'p-mobile-nav';
    panel.innerHTML = `
      <div id="p-mobile-overlay"></div>
      <div id="p-mobile-panel">
        <button id="p-mobile-close" aria-label="Close menu">✕</button>
        <nav id="p-mobile-links">
          ${existingLinks.map((link, i) => {
            const isLogin = link.text.toLowerCase().includes('login') || link.href.includes('login');
            return `<a href="${link.href}" class="${isLogin ? 'login-link' : ''}">${link.text}</a>`;
          }).join('')}
        </nav>
        <div id="p-mobile-footer">
          <strong>EduSupply</strong><br/>
          Bengaluru's trusted school supplies platform.<br/>
          📞 +91 93221 28609
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    function openPanel() {
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closePanel() {
      panel.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.contains('open') ? closePanel() : openPanel();
    });

    document.getElementById('p-mobile-close').addEventListener('click', closePanel);
    document.getElementById('p-mobile-overlay').addEventListener('click', closePanel);

    /* Close on link click */
    panel.querySelectorAll('#p-mobile-links a').forEach(a => {
      a.addEventListener('click', closePanel);
    });

    /* Close on Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closePanel();
    });
  }

  /* ════════════════════════════════════════════════════════════
     ⑨ TAG PRODUCT CARDS WITH data-cat
     (enables per-category CSS fallback backgrounds)
     ════════════════════════════════════════════════════════════ */
  function tagProductCards() {
    function tag() {
      document.querySelectorAll('.edu-card').forEach(card => {
        if (card.dataset.cat) return;
        const catEl = card.querySelector('.edu-card-cat');
        if (catEl) card.dataset.cat = catEl.textContent.trim();
      });
    }
    tag();
    const grid = document.getElementById('edu-products-grid');
    if (grid) {
      new MutationObserver(tag).observe(grid, { childList: true });
    }
    setTimeout(tag, 1500);
  }

  /* ════════════════════════════════════════════════════════════
     ENHANCED SCROLL REVEAL
     (Re-runs intersection observer so it catches late-rendered cards)
     ════════════════════════════════════════════════════════════ */
  function setupScrollRevealEnhanced() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    function observe() {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
    }

    observe();
    setTimeout(observe, 1000);
    setTimeout(observe, 2500);

    /* Also watch for new .edu-cards and add reveal class */
    const grid = document.getElementById('edu-products-grid');
    if (grid) {
      new MutationObserver(() => {
        grid.querySelectorAll('.edu-card:not(.reveal)').forEach(card => {
          card.classList.add('reveal');
          obs.observe(card);
        });
      }).observe(grid, { childList: true });
    }
  }

})();

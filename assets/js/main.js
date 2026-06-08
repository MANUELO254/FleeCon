/* ==========================================================================
   main.js — Site-wide behaviour.
   Loaded on every page.
   - Lucide icons initialisation
   - Sticky nav background on scroll
   - Mobile slide-in menu (open / close / auto-close on link tap)
   - Back-to-top button visibility + smooth scroll
   - Scroll-reveal animations via IntersectionObserver
   ========================================================================== */

(function(){
  'use strict';

  // ---------- 1. Icons ----------
  // Lucide is loaded via CDN in each page's <head>.
  if (window.lucide) lucide.createIcons();

  // ---------- 2. Sticky nav + back-to-top visibility ----------
  const hdr   = document.getElementById('hdr');
  const totop = document.getElementById('totop');

  // Pages with the .nav-sub class on <body> always show solid nav
  const isSubPage = document.body.classList.contains('nav-sub');

  function onScroll(){
    if (hdr && !isSubPage) {
      hdr.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (totop) {
      totop.classList.toggle('show', window.scrollY > 600);
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if (totop) {
    totop.addEventListener('click', () => {
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // ---------- 3. Mobile menu ----------
  const mm        = document.getElementById('mm');
  const burger    = document.getElementById('burger');
  const mmClose   = document.getElementById('mmClose');

  if (mm && burger) {
    burger.addEventListener('click', () => mm.classList.add('open'));
  }
  if (mm && mmClose) {
    mmClose.addEventListener('click', () => mm.classList.remove('open'));
  }
  if (mm) {
    // Close after tapping any link
    mm.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mm.classList.remove('open'));
    });
  }

  // ---------- 4. Scroll-reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});

    reveals.forEach((el, i) => {
      // Small stagger so grids cascade rather than firing in unison
      el.style.transitionDelay = (i % 3 * 0.08) + 's';
      io.observe(el);
    });
  } else {
    // No IO support? Just show everything.
    reveals.forEach(el => el.classList.add('in'));
  }

})();

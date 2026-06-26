/* ==========================================================================
   gallery.js - Gallery interactions.
   Handles two contexts:
   A) Portfolio page  — filter bar + full lightbox
   B) Service pages   — lightbox on .cell grids (no filter)
   ========================================================================== */

(function(){
  'use strict';

  /* A. FILTER BAR (portfolio page only) */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.pcard');
  const emptyState = document.querySelector('.empty-state');

  if (filterBtns.length && cards.length){
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        let visible = 0;
        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('hidden', !match);
          if (match) visible++;
        });
        if (emptyState) emptyState.classList.toggle('show', visible === 0);
      });
    });
  }

  /* B. LIGHTBOX — portfolio .pcard and service page .cell */
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbTitle   = document.getElementById('lbTitle');
  const lbTag     = document.getElementById('lbTag');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');

  if (!lightbox) return;

  const allItems = Array.from(document.querySelectorAll('[data-lb-src]'));
  let currentIndex = 0;

  function getVisible(){
    return allItems.filter(el => !el.classList.contains('hidden'));
  }

  function openLightbox(index){
    const visible = getVisible();
    if (!visible.length) return;
    currentIndex = ((index % visible.length) + visible.length) % visible.length;
    const item = visible[currentIndex];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = item.dataset.lbSrc;
      lbImg.alt = item.dataset.lbTitle || '';
      lbImg.onload = () => { lbImg.style.opacity = '1'; };
    }, 150);
    if (lbTitle)   lbTitle.textContent   = item.dataset.lbTitle || '';
    if (lbTag)     lbTag.textContent     = item.dataset.lbTag   || '';
    if (lbCounter) lbCounter.textContent = (currentIndex + 1) + ' / ' + visible.length;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if (lbImg) lbImg.src = ''; }, 300);
  }

  function navigate(dir){ openLightbox(currentIndex + dir); }

  allItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const visible = getVisible();
      const idx = visible.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click',  () => navigate(-1));
  if (lbNext)  lbNext.addEventListener('click',  () => navigate(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

})();
/* ==========================================================================
   main.js - Site-wide behaviour. Loaded on every page.
   - Lucide icons init
   - Sticky nav on scroll
   - Mobile menu
   - Back-to-top button
   - Scroll-reveal animations
   - Floating WhatsApp button
   ========================================================================== */

(function(){
  'use strict';

  const PHONE = '254710678147';

  /* 1. Icons */
  if (window.lucide) lucide.createIcons();

  /* 2. Sticky nav + back-to-top */
  const hdr   = document.getElementById('hdr');
  const totop = document.getElementById('totop');
  const isSubPage = document.body.classList.contains('nav-sub');

  function onScroll(){
    if (hdr && !isSubPage){
      hdr.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (totop){
      totop.classList.toggle('show', window.scrollY > 600);
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if (totop){
    totop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  /* 3. Mobile menu */
  const mm      = document.getElementById('mm');
  const burger  = document.getElementById('burger');
  const mmClose = document.getElementById('mmClose');

  if (mm && burger) burger.addEventListener('click', () => mm.classList.add('open'));
  if (mm && mmClose) mmClose.addEventListener('click', () => mm.classList.remove('open'));
  if (mm) mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));

  /* 4. Scroll-reveal */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});

    reveals.forEach((el, i) => {
      el.style.transitionDelay = (i % 3 * 0.08) + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* 5. Floating WhatsApp button */
  const waFloat = document.createElement('a');
  waFloat.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent("Hi Fleecon, I'd like to discuss a project.");
  waFloat.target = '_blank';
  waFloat.rel = 'noopener noreferrer';
  waFloat.className = 'wa-float';
  waFloat.setAttribute('aria-label', 'Chat on WhatsApp');
  waFloat.innerHTML = `
    <span class="wa-float-tooltip">Chat on WhatsApp</span>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-.6 3.1.5 1.4 1.5 2.7 1.7 2.9.2.2 2.9 4.5 7.1 6 .7.2 1.2.4 1.6.5.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
    </svg>`;
  document.body.appendChild(waFloat);

})();
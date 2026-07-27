/* =============================================
   VOXITRON: main.js
   Handles: scroll reveal
   ============================================= */

'use strict';

/* Scroll Reveal
   Sections below the hero fade in on scroll.
   opacity 0 to 1, translateY 12px to 0, 0.45s ease-out */
(function initScrollReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  /* Graceful fallback if IntersectionObserver unavailable */
  if (!('IntersectionObserver' in window)) {
    items.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  items.forEach(function(el) { observer.observe(el); });
})();

/* =============================================
   VOXITRON — main.js
   Handles: scroll reveal, async form submission
   ============================================= */

'use strict';

/* ── Scroll Reveal ─────────────────────────────
   Sections below the hero fade in on scroll.
   opacity: 0→1 + translateY(12px→0) / 0.45s ease-out
   ─────────────────────────────────────────────── */
(function initScrollReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  /* Graceful fallback if IntersectionObserver unavailable */
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  items.forEach(function (el) { observer.observe(el); });
})();

/* ── Form Submit ────────────────────────────────
   Async POST to Formspree — no page reload.
   500ms loading state → success / error state.
   Both .waitlist-form instances handled.
   ─────────────────────────────────────────────── */
(function initForms() {
  document.querySelectorAll('.waitlist-form').forEach(function (form) {
    var btn = form.querySelector('button[type="submit"]');
    var input = form.querySelector('input[type="email"]');

    if (!btn || !input) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      /* Loading state */
      btn.textContent = 'Sending\u2026';
      btn.disabled = true;

      /* 500ms intentional loading delay — feels considered, not broken */
      await new Promise(function (resolve) { setTimeout(resolve, 500); });

      try {
        var res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          btn.textContent = "You\u2019re on the list \u2713";
          btn.style.background = 'var(--bg-elevated)';
          btn.style.color = 'var(--accent)';
          input.value = '';
        } else {
          btn.textContent = 'Try again \u2192';
          btn.disabled = false;
        }
      } catch (_) {
        btn.textContent = 'Try again \u2192';
        btn.disabled = false;
      }
    });
  });
})();

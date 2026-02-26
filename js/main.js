document.addEventListener('DOMContentLoaded', () => {

  /* 1 — Nav active link */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 80;
    sections.forEach(s => {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight)
        navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + s.id));
    });
  }, { passive: true });

  /* 2 — Scroll reveal */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      const bar = e.target.querySelector('.sk-fill');
      if (bar) setTimeout(() => { bar.style.width = (e.target.dataset.pct || 0) + '%'; }, 220);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('[data-r]').forEach(el => {
    const kids = Array.from(el.parentElement.querySelectorAll(':scope > [data-r]'));
    if (kids.length > 1) el.style.transitionDelay = (kids.indexOf(el) * 0.1) + 's';
    obs.observe(el);
  });

  /* 3 — Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 64, behavior: 'smooth' }); }
    });
  });

});

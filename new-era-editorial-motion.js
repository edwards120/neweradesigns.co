(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;

  const reveal = (root = document) => {
    const elements = [...root.querySelectorAll('[data-ned-reveal]:not([data-ned-ready])')];
    elements.forEach((element) => {
      element.dataset.nedReady = 'true';
      if (reduced.matches || !('IntersectionObserver' in window)) {
        element.classList.add('is-visible');
        return;
      }
      observer ||= new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      observer.observe(element);
    });
  };

  const pointerFields = (root = document) => {
    root.querySelectorAll('[data-ned-pointer-field]:not([data-ned-pointer-ready])').forEach((field) => {
      field.dataset.nedPointerReady = 'true';
      if (reduced.matches || !window.matchMedia('(pointer:fine)').matches) return;
      let frame;
      field.addEventListener('pointermove', (event) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = field.getBoundingClientRect();
          field.style.setProperty('--ned-pointer-x', `${((event.clientX - rect.left) / rect.width - .5).toFixed(3)}`);
          field.style.setProperty('--ned-pointer-y', `${((event.clientY - rect.top) / rect.height - .5).toFixed(3)}`);
        });
      }, { passive: true });
      field.addEventListener('pointerleave', () => {
        field.style.setProperty('--ned-pointer-x', '0');
        field.style.setProperty('--ned-pointer-y', '0');
      });
    });
  };

  const initialize = (root = document) => { reveal(root); pointerFields(root); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => initialize()) : initialize();
  document.addEventListener('shopify:section:load', (event) => initialize(event.target));
})();

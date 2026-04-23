// Nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (toggle && list) {
    toggle.addEventListener('click', () => list.classList.toggle('open'));
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(target * eased);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  }

  // Notificación post-envío
  const msg = document.getElementById('form-msg');
  if (msg) {
    const p = new URLSearchParams(window.location.search);
    if (p.get('enviado') === '1') {
      msg.textContent = '✓ Solicitud enviada. Le responderemos en menos de 24 horas hábiles.';
      msg.style.cssText = 'display:block;background:#eaf4ed;color:#1a5c30;border:1px solid #b2d9be;padding:14px 18px;border-radius:2px;font-size:14px;margin-bottom:20px';
    } else if (p.get('error') === '1') {
      msg.textContent = 'Ocurrió un error al enviar. Por favor escríbanos a jualamos@exportclima.cl.';
      msg.style.cssText = 'display:block;background:#fdf0f0;color:#7a1a1a;border:1px solid #e2b4b4;padding:14px 18px;border-radius:2px;font-size:14px;margin-bottom:20px';
    }
  }
});

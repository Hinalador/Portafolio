// Efectos interactivos: reveal on scroll, typing y partículas del hero.
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Reveal al hacer scroll ---------- */
let revealObserver;
export function observeReveals(root = document) {
  if (!('IntersectionObserver' in window)) {
    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el));
}

/* ---------- Efecto de escritura ---------- */
export function createTyper(el, getWords) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timer;

  function tick() {
    const words = getWords();
    if (reducedMotion()) {
      el.textContent = words[0];
      return;
    }
    const word = words[wordIndex % words.length];

    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex >= word.length) {
        deleting = true;
        timer = setTimeout(tick, 1900);
        return;
      }
      timer = setTimeout(tick, 60 + Math.random() * 60);
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex <= 0) {
        deleting = false;
        wordIndex++;
        timer = setTimeout(tick, 350);
        return;
      }
      timer = setTimeout(tick, 32);
    }
  }

  return {
    restart() {
      clearTimeout(timer);
      wordIndex = 0;
      charIndex = 0;
      deleting = false;
      el.textContent = '';
      timer = setTimeout(tick, 300);
    },
  };
}

/* ---------- Partículas suaves en el fondo del hero ---------- */
export function initParticles(canvas) {
  if (!canvas || reducedMotion()) return;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let points = [];
  let raf = 0;
  let visible = true;
  let rgb = '135 161 222';
  const LINK = 130;

  const readColor = () => {
    rgb = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim() || rgb;
  };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(70, (width * height) / 16000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.6,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${rgb} / 0.55)`;
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const q = points[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgb(${rgb} / ${(1 - dist / LINK) * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  const start = () => {
    cancelAnimationFrame(raf);
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };

  readColor();
  resize();
  start();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  // Pausa la animación cuando el hero no está visible (ahorra batería)
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : cancelAnimationFrame(raf);
  }).observe(canvas);

  document.addEventListener('visibilitychange', start);
  new MutationObserver(readColor).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

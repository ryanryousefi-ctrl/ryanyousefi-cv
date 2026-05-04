// ==============================================
// STAR FIELD — dramatic, colorful, layered
// ==============================================
(function () {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars, frame = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkStar() {
    const tier = Math.random();
    // tier 0-0.6: small dim stars
    // tier 0.6-0.88: medium stars
    // tier 0.88-1: large bright stars
    const isBright = tier > 0.88;
    const isMid    = tier > 0.6 && !isBright;
    const hued     = Math.random() > 0.78; // some stars get a blue/purple tint

    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     isBright ? Math.random() * 1.6 + 1.0
           : isMid    ? Math.random() * 0.9 + 0.5
                      : Math.random() * 0.55 + 0.15,
      base:  isBright ? Math.random() * 0.35 + 0.55
           : isMid    ? Math.random() * 0.3  + 0.25
                      : Math.random() * 0.22 + 0.08,
      amp:   isBright ? Math.random() * 0.3  + 0.1
                      : Math.random() * 0.18 + 0.04,
      spd:   Math.random() * 0.007 + 0.002,
      phase: Math.random() * Math.PI * 2,
      // colour channel: white, cool-blue, or lavender
      r_ch:  hued ? (Math.random() > 0.5 ? 180 : 200) : 215,
      g_ch:  hued ? (Math.random() > 0.5 ? 200 : 185) : 220,
      b_ch:  255,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: 240 }, mkStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;
    stars.forEach(s => {
      const a = Math.min(1, Math.max(0, s.base + s.amp * Math.sin(s.phase + frame * s.spd)));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.r_ch},${s.g_ch},${s.b_ch},${a})`;
      ctx.fill();

      // glow halo on bright stars
      if (s.r > 1.2 && a > 0.6) {
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        grd.addColorStop(0, `rgba(${s.r_ch},${s.g_ch},${s.b_ch},${a * 0.25})`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); stars = Array.from({ length: 240 }, mkStar); });
  init();
  draw();
})();

// ==============================================
// PLANET PARALLAX
// ==============================================
const planet = document.querySelector('.hero-planet');
if (planet) {
  window.addEventListener('scroll', () => {
    planet.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }, { passive: true });
}

// ==============================================
// PROGRESS BAR
// ==============================================
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });

// ==============================================
// NAV SCROLL STATE
// ==============================================
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ==============================================
// HAMBURGER
// ==============================================
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  const bars = hamburger.querySelectorAll('span');
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    bars[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    bars[1].style.opacity   = open ? '0' : '';
    bars[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      bars[0].style.transform = bars[2].style.transform = '';
      bars[1].style.opacity = '';
    });
  });
}

// ==============================================
// FADE-IN ON SCROLL
// ==============================================
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
fadeEls.forEach(el => fadeObs.observe(el));

// ==============================================
// ACTIVE NAV
// ==============================================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a, .mobile-nav a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-35% 0px -60% 0px' });
sections.forEach(s => secObs.observe(s));

// ==============================================
// SMOOTH SCROLL
// ==============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ==============================================
// TYPED EFFECT
// ==============================================
(function () {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const roles = [
    'Director of Communications',
    'GTM & Growth Strategist',
    'Product Marketing Leader',
    'Community & Partnerships Operator',
    'Event Planning & Brand Lead',
  ];
  let ri = 0, ci = 0, del = false;

  function tick() {
    const word = roles[ri];
    el.textContent = del ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    del ? ci-- : ci++;
    if (!del && ci === word.length) { del = true; setTimeout(tick, 2600); return; }
    if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    setTimeout(tick, del ? 40 : 60);
  }
  setTimeout(tick, 1600);
})();

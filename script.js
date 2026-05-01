// ==============================
// STAR FIELD CANVAS
// ==============================
(function () {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkStar() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.1 + 0.15,
      base: Math.random() * 0.5 + 0.1,
      amp:  Math.random() * 0.35,
      spd:  Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: 160 }, mkStar);
  }

  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;
    stars.forEach(s => {
      const opacity = s.base + s.amp * Math.sin(s.phase + frame * s.spd);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    stars = Array.from({ length: 160 }, mkStar);
  });

  init();
  draw();
})();

// ==============================
// SCROLL PROGRESS BAR
// ==============================
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });

// ==============================
// NAV SCROLL STATE
// ==============================
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ==============================
// MOBILE HAMBURGER
// ==============================
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobile-nav');
const [bar1, bar2, bar3] = hamburger.querySelectorAll('span');

hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  bar1.style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  bar2.style.opacity   = open ? '0' : '';
  bar3.style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    bar1.style.transform = bar3.style.transform = '';
    bar2.style.opacity = '';
  });
});

// ==============================
// FADE-IN ON SCROLL
// ==============================
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
fadeEls.forEach(el => fadeObserver.observe(el));

// ==============================
// ACTIVE NAV HIGHLIGHTING
// ==============================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a, .mobile-nav a');

const secObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
      });
    }
  }),
  { rootMargin: '-38% 0px -57% 0px' }
);
sections.forEach(s => secObserver.observe(s));

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ==============================
// TYPED ROLE EFFECT
// ==============================
(function () {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = [
    'Crypto Gaming Growth & Content Leader',
    'Director of Communications',
    'Community & Partnerships Strategist',
    'Blockchain Gaming Executive',
    'Web3 Growth Leader',
  ];

  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    el.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    deleting ? ci-- : ci++;

    if (!deleting && ci === word.length) {
      deleting = true;
      setTimeout(tick, 2400);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
    setTimeout(tick, deleting ? 42 : 62);
  }

  setTimeout(tick, 1400);
})();

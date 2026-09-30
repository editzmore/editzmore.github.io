/**
 * Portfolio Script
 * 1. Theme Toggle (Orange ↔ Green)
 * 2. Role Text Animation
 * 3. Modal Preview (Drive embed)
 */

/* ── 1. Theme ────────────────────────────────────────────────────── */
const initTheme = () => {
  const toggle    = document.getElementById('themeToggle');
  const icon      = document.getElementById('themeIcon');
  const labelText = document.getElementById('themeLabelText');
  if (!toggle) return;

  const apply = (isGreen) => {
    document.body.classList.toggle('green-mode', isGreen);
    toggle.checked = isGreen;
    if (icon) icon.className = isGreen ? 'ri-moon-line' : 'ri-sun-line';
    if (labelText) labelText.textContent = isGreen ? 'Green' : 'Orange';
  };

  apply(localStorage.getItem('theme') === 'green');

  toggle.addEventListener('change', () => {
    const isGreen = toggle.checked;
    apply(isGreen);
    localStorage.setItem('theme', isGreen ? 'green' : 'orange');
  });
};

/* ── 2. Role Animation ───────────────────────────────────────────── */
const initRoles = () => {
  const roles = [
    'Video Editor & Reels / Shorts Editor',
    'Premiere Pro & DaVinci Expert',
    'Social Media Content Creator',
    'Motion Graphics Designer',
    'Photoshop & Illustrator Artist',
  ];

  const el = document.getElementById('heroRole');
  if (!el) return;

  let idx = 0;

  setInterval(() => {
    el.classList.add('slide-out');
    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      el.textContent = roles[idx];
      el.classList.remove('slide-out');
      el.classList.add('slide-in');
      el.addEventListener('animationend', () => el.classList.remove('slide-in'), { once: true });
    }, 290);
  }, 3000);
};

/* ── 3. Modal Preview ────────────────────────────────────────────── */
const initModal = () => {
  const overlay    = document.getElementById('previewModal');
  const box        = document.getElementById('modalBox');
  const closeBtn   = document.getElementById('modalClose');
  const iframeWrap = document.getElementById('modalIframeWrap');
  const titleEl    = document.getElementById('modalTitle');
  const driveLink  = document.getElementById('modalDriveLink');
  if (!overlay) return;

  const openModal = (card) => {
    const src   = card.dataset.src;
    const title = card.dataset.title;
    const link  = card.dataset.link;
    const type  = card.dataset.type;

    box.className = 'modal-box modal-box--' + (type === 'reel' ? 'reel' : 'vector');
    titleEl.textContent = title;
    driveLink.href = link;

    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.allow = 'autoplay; fullscreen';
    iframe.loading = 'lazy';
    iframeWrap.innerHTML = '';
    iframeWrap.appendChild(iframe);

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { iframeWrap.innerHTML = ''; }, 250);
  };

  /* Attach to every .wcard */
  document.querySelectorAll('.wcard').forEach(card => {
    /* Preview button inside card */
    const playBtn = card.querySelector('.wcard__play');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(card);
      });
    }

    /* Click anywhere on card also opens */
    card.addEventListener('click', () => openModal(card));

    /* Keyboard */
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });
};

/* ── Boot ────────────────────────────────────────────────────────── */
const boot = () => { initTheme(); initRoles(); initModal(); };
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot, { once: true })
  : boot();

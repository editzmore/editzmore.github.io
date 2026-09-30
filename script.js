/**
 * Portfolio Script
 * 1. Theme Toggle (Orange ↔ Green)
 * 2. Role Text Animation
 * 3. Modal Preview (Drive embed)
 */

/* ── 1. Theme ────────────────────────────────────────────────────── */
const initTheme = () => {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const apply = (isGreen) => {
    document.body.classList.toggle('green-mode', isGreen);
    toggle.checked = isGreen;
    // iOS switch visual is handled entirely by CSS :checked selector
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

/* ── 4. Creative Motion Studio ───────────────────────────────────── */
const initMotionStudio = () => {
  const tabs = document.querySelectorAll('.studio-tab');
  const scenes = document.querySelectorAll('.studio-scene');
  const progressFill = document.getElementById('studioProgressFill');
  const playPauseBtn = document.getElementById('studioPlayPause');
  const playPauseIcon = document.getElementById('studioPlayPauseIcon');
  const stage = document.getElementById('studioStage');

  if (!tabs.length || !scenes.length) return;

  let currentIdx = 0;
  let isPlaying = true;
  const DURATION = 6000; // 6 seconds per scene
  let startTime = Date.now();
  let elapsedBeforePause = 0;
  let rafId = null;

  const showScene = (idx) => {
    currentIdx = idx;
    tabs.forEach((tab, i) => {
      const active = i === idx;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    scenes.forEach((scene, i) => {
      scene.classList.toggle('is-active', i === idx);
    });
    // Reset timer
    startTime = Date.now();
    elapsedBeforePause = 0;
    if (progressFill) progressFill.style.width = '0%';
  };

  const tick = () => {
    if (!isPlaying) return;
    const now = Date.now();
    const elapsed = elapsedBeforePause + (now - startTime);
    const pct = Math.min((elapsed / DURATION) * 100, 100);
    if (progressFill) progressFill.style.width = pct + '%';

    if (elapsed >= DURATION) {
      showScene((currentIdx + 1) % scenes.length);
    }
    rafId = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    if (isPlaying && rafId) return;
    isPlaying = true;
    startTime = Date.now();
    if (playPauseIcon) playPauseIcon.className = 'ri-pause-line';
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  };

  const pauseLoop = () => {
    if (!isPlaying) return;
    isPlaying = false;
    elapsedBeforePause += Date.now() - startTime;
    if (playPauseIcon) playPauseIcon.className = 'ri-play-line';
    cancelAnimationFrame(rafId);
  };

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      showScene(idx);
      if (isPlaying) {
        startTime = Date.now();
        elapsedBeforePause = 0;
      }
    });
  });

  let userManualPause = false;
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseLoop();
        userManualPause = true;
      } else {
        startLoop();
        userManualPause = false;
      }
    });
  }

  if (stage) {
    stage.addEventListener('mouseenter', () => {
      if (isPlaying) pauseLoop();
    });
    stage.addEventListener('mouseleave', () => {
      if (!isPlaying && !userManualPause) startLoop();
    });
  }

  startLoop();
};

/* ── Boot ────────────────────────────────────────────────────────── */
const boot = () => {
  initTheme();
  initRoles();
  initModal();
  initMotionStudio();
};
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot, { once: true })
  : boot();


/**
 * Portfolio Script — Complete Rewrite
 *
 * 1. Theme Toggle (Orange ↔ Green) with localStorage
 * 2. Dynamic Role Text Cycling
 * 3. Modal Preview System (Drive embed inside popup)
 */

/* ── 1. Theme Toggle ─────────────────────────────────────────────── */
const initTheme = () => {
  const toggle    = document.getElementById('themeToggle');
  const icon      = document.getElementById('themeIcon');
  const labelText = document.getElementById('themeLabel-text');
  if (!toggle) return;

  const apply = (isGreen) => {
    document.body.classList.toggle('green-mode', isGreen);
    toggle.checked     = isGreen;
    icon.className     = isGreen ? 'ri-moon-line' : 'ri-sun-line';
    if (labelText) labelText.textContent = isGreen ? 'Green' : 'Orange';
  };

  // Restore saved preference
  apply(localStorage.getItem('theme') === 'green');

  toggle.addEventListener('change', () => {
    const isGreen = toggle.checked;
    apply(isGreen);
    localStorage.setItem('theme', isGreen ? 'green' : 'orange');
  });
};

/* ── 2. Role Text Animation ──────────────────────────────────────── */
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

  const next = () => {
    el.classList.add('slide-out');

    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      el.textContent = roles[idx];
      el.classList.remove('slide-out');
      el.classList.add('slide-in');

      el.addEventListener('animationend', () => {
        el.classList.remove('slide-in');
      }, { once: true });
    }, 320);
  };

  setInterval(next, 3000);
};

/* ── 3. Modal Preview System ─────────────────────────────────────── */
const initModal = () => {
  const overlay     = document.getElementById('previewModal');
  const box         = document.getElementById('modalBox');
  const closeBtn    = document.getElementById('modalClose');
  const iframeWrap  = document.getElementById('modalIframeWrap');
  const titleEl     = document.getElementById('modalTitle');
  const driveLink   = document.getElementById('modalDriveLink');

  if (!overlay) return;

  let activeIframe = null;

  const openModal = (card) => {
    const src   = card.dataset.src;
    const title = card.dataset.title;
    const link  = card.dataset.link;
    const type  = card.dataset.type; // 'reel' | 'vector'

    // Set modal type class
    box.className = 'modal-box';
    box.classList.add(type === 'reel' ? 'modal-box--reel' : 'modal-box--vector');

    // Set title & link
    titleEl.textContent = title;
    driveLink.href = link;

    // Inject iframe
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.allow = 'autoplay; fullscreen';
    iframe.loading = 'lazy';
    iframeWrap.innerHTML = '';
    iframeWrap.appendChild(iframe);
    activeIframe = iframe;

    // Open overlay
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Remove iframe after animation to stop video
    setTimeout(() => {
      iframeWrap.innerHTML = '';
      activeIframe = null;
    }, 280);
  };

  // Card or Preview btn click → open modal
  document.querySelectorAll('.work-card').forEach(card => {
    // Clicking the preview button
    const previewBtn = card.querySelector('.work-card__preview-btn');
    if (previewBtn) {
      previewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(card);
      });
    }

    // Clicking anywhere else on card also opens modal
    card.addEventListener('click', () => openModal(card));

    // Keyboard: Enter / Space
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Click outside modal box → close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Escape key → close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });
};

/* ── Boot ────────────────────────────────────────────────────────── */
const boot = () => {
  initTheme();
  initRoles();
  initModal();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

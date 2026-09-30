/**
 * Portfolio Interactive Script
 * - Sun/Moon Theme Switcher (Orange Mode vs. Green Mode) with LocalStorage
 * - Dynamic Role Text Animation (slide-in / slide-out cycling)
 */

/* ── Dynamic Role Cycling ─────────────────────────────────────── */
const roles = [
  'Video Editor & Reels / Shorts Editor',
  'Premiere Pro & DaVinci Expert',
  'Social Media Content Creator',
  'Motion Graphics Designer',
  'Photoshop & Illustrator Artist',
];

const initRoleAnimation = () => {
  const roleEl = document.querySelector('.dynamic-role');
  if (!roleEl) return;

  let current = 0;

  const nextRole = () => {
    // Slide out current text
    roleEl.classList.add('slide-out');

    setTimeout(() => {
      current = (current + 1) % roles.length;
      roleEl.textContent = roles[current];
      roleEl.classList.remove('slide-out');
      roleEl.classList.add('slide-in');

      // Clean up slide-in class after animation ends
      roleEl.addEventListener('animationend', () => {
        roleEl.classList.remove('slide-in');
      }, { once: true });
    }, 350); // matches CSS transition duration
  };

  // Start cycling every 2.8 seconds
  setInterval(nextRole, 2800);
};

/* ── Theme Switcher ───────────────────────────────────────────── */
const initializePortfolio = () => {
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    const savedTheme = localStorage.getItem('portfolio-theme-mode');
    if (savedTheme === 'green-mode') {
      themeToggle.checked = true;
      document.body.classList.add('green-canvas-mode');
    }

    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.classList.add('green-canvas-mode');
        localStorage.setItem('portfolio-theme-mode', 'green-mode');
      } else {
        document.body.classList.remove('green-canvas-mode');
        localStorage.setItem('portfolio-theme-mode', 'orange-mode');
      }
    });
  }

  initRoleAnimation();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
} else {
  initializePortfolio();
}

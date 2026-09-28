/**
 * Portfolio Interactive Script
 * - Sun/Moon Theme Switcher (Orange Mode vs. Green Mode) with LocalStorage
 */

const initializePortfolio = () => {
  document.querySelectorAll('.sample-preview-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const previewUrl = trigger.getAttribute('data-preview-url');
      const title = trigger.getAttribute('aria-label');
      if (!previewUrl || !title) {
        return;
      }

      const player = document.createElement('iframe');
      player.src = `${previewUrl}?autoplay=1`;
      player.title = title.replace(/^Play /, '');
      player.allow = 'autoplay; encrypted-media; picture-in-picture';
      player.allowFullscreen = true;
      player.loading = 'eager';
      player.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      trigger.replaceWith(player);
    });
  });

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
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
} else {
  initializePortfolio();
}

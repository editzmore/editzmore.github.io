/**
 * Portfolio Interactive Script
 * - Sun/Moon Theme Switcher (Orange Mode vs. Green Mode) with LocalStorage
 */

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
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
} else {
  initializePortfolio();
}

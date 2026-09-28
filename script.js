/**
 * Portfolio Interactive Script
 * - Sun/Moon Theme Switcher (Orange Mode vs. Green Mode) with LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Switch (Orange Canvas <-> Green Canvas)
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    // Check saved preference
    const savedTheme = localStorage.getItem('portfolio-theme-mode');
    if (savedTheme === 'green-mode') {
      themeToggle.checked = true;
      document.body.classList.add('green-canvas-mode');
    }

    // Toggle event listener
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

});

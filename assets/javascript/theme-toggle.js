(function () {
  var storageKey = 'site-theme';
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var navbar = document.querySelector('.navbar');

  function readTheme() {
    var theme = root.getAttribute('data-theme');
    return theme === 'light' ? 'light' : 'dark';
  }

  function writeTheme(theme) {
    root.setAttribute('data-theme', theme);

    if (navbar) {
      navbar.classList.toggle('navbar-light', theme === 'light');
      navbar.classList.toggle('bg-light', theme === 'light');
      navbar.classList.toggle('navbar-dark', theme !== 'light');
      navbar.classList.toggle('bg-dark', theme !== 'light');
    }

    if (!button) {
      return;
    }

    var nextTheme = theme === 'light' ? 'dark' : 'light';
    var label = nextTheme === 'light' ? 'Switch to light theme' : 'Switch to dark theme';
    var icon = button.querySelector('.fa');
    var textLabel = button.querySelector('[data-theme-toggle-label]');

    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);

    if (icon) {
      icon.className = theme === 'light' ? 'fa fa-moon-o' : 'fa fa-sun-o';
    }

    if (textLabel) {
      textLabel.textContent = label;
    }
  }

  writeTheme(readTheme());

  if (!button) {
    return;
  }

  button.addEventListener('click', function () {
    var nextTheme = readTheme() === 'light' ? 'dark' : 'light';
    writeTheme(nextTheme);

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch (error) {
      // Theme switching still works for the current page if storage is unavailable.
    }
  });
}());

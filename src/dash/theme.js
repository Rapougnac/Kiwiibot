/* eslint-disable no-undef */
const themeMap = {
  dark: 'light',
  light: 'solar',
  solar: 'dark',
};

if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
} else {
  const bodyClass = document.body.classList;
  const saved = localStorage.getItem('theme');
  bodyClass.replace('dark', saved);
}

function toggleTheme() {
  const bodyClass = document.body.classList;
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;


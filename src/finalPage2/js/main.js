// js/main.js

document.querySelectorAll('.chapter-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const link = button.dataset.link;
    window.location.href = link;
  });
});

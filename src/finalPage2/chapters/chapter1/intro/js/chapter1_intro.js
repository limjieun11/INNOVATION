// chapters/chapter1/intro/js/chapter1_intro.js

document.querySelectorAll('.type-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const link = button.dataset.link;
    window.location.href = link;
  });
});

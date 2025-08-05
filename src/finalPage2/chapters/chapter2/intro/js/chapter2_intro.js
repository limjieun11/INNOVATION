// chapters/chapter2/intro/js/chapter2_intro.js

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');

  startButton.addEventListener('click', () => {
    // myroom.html로 이동 (루프 시작점)
    window.location.href = '../scenes/myroom.html';
  });
});

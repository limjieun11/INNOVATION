function floatingObject(el) {
  let x =
    parseFloat(el.style.left) || Math.random() * (window.innerWidth - 150);
  let y =
    parseFloat(el.style.top) || Math.random() * (window.innerHeight - 150);
  let angle = Math.random() * 2 * Math.PI;
  let speed = 1;
  let dx = Math.cos(angle) * speed;
  let dy = Math.sin(angle) * speed;

  function move() {
    x += dx;
    y += dy;

    if (x < 0 || x > window.innerWidth - 250) dx *= -1;
    if (y < 0 || y > window.innerHeight - 300) dy *= -1;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    el._moveFrame = requestAnimationFrame(move);
  }

  // 이전 애니메이션 루프 제거 (있을 경우)
  if (el._moveFrame) cancelAnimationFrame(el._moveFrame);
  move();
}

function animateObjects() {
  const objects = document.querySelectorAll('.floating-obj');

  objects.forEach((obj) => {
    obj.style.position = 'absolute';
    obj.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
    obj.style.top = `${Math.random() * (window.innerHeight - 150)}px`;

    floatingObject(obj);

    obj.addEventListener('click', (e) => {
      e.stopPropagation(); // 배경 클릭 이벤트 방지
      const link = obj.dataset.target;
      if (link) window.location.href = link;
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  animateObjects();

  // 🔁 배경 클릭 시: 위치 + 방향 모두 초기화
  document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('floating-obj')) {
      document.querySelectorAll('.floating-obj').forEach((el) => {
        el.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
        el.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        floatingObject(el); // 움직임도 다시 설정
      });
    }
  });

  // 🔍 타이틀 호버 툴팁
  const titleImg = document.getElementById('chapter-title');
  const tooltip = document.getElementById('title-tooltip');

  if (titleImg && tooltip) {
    titleImg.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });

    titleImg.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    titleImg.addEventListener('mousemove', (e) => {
      tooltip.style.left = `${e.pageX + 12}px`;
      tooltip.style.top = `${e.pageY + 12}px`;
    });
  }
});

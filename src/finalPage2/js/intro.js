document.addEventListener('DOMContentLoaded', () => {
  const NEXT_URL = document.body.getAttribute('data-next') || './main.html';
  const video = document.getElementById('intro-video'); // ✅ id 변경
  const skip = document.getElementById('skip-button');

  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = NEXT_URL;
  };

  // 건너뛰기 / ESC
  skip?.addEventListener('click', navigate);
  window.addEventListener('keydown', (e) => e.key === 'Escape' && navigate());

  if (video) {
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.muted = true;

    // 오직 영상 종료 시 자동 이동
    video.addEventListener('ended', navigate, { once: true });

    // 자동재생 실패/에러 시 자동 이동하지 않음(사용자 건너뛰기)
    const p = video.play?.();
    if (p && typeof p.then === 'function') p.catch(() => {});
    video.addEventListener('error', () => {});
    video.addEventListener('stalled', () => {});
  }
});

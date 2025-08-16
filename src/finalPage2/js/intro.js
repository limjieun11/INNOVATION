// ./js/intro.js
document.addEventListener('DOMContentLoaded', () => {
  const NEXT_URL = document.body.getAttribute('data-next') || './main.html';
  const video = document.getElementById('introVideo');
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
    // iOS 인라인 재생 보강
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.muted = true;

    // ✅ 오직 'ended'에서만 자동 이동
    video.addEventListener('ended', navigate, { once: true });

    // 자동재생 실패/에러일 땐 자동 이동 안 함(사용자가 건너뛰기)
    const p = video.play?.();
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        /* autoplay blocked → skip만 사용 */
      });
    }
    video.addEventListener('error', () => {
      /* 에러 → skip만 사용 */
    });
    video.addEventListener('stalled', () => {
      /* 네트워크 정지 → skip만 사용 */
    });
  }
});

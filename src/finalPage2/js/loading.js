document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('page-loading');

  // CHAPTER 버튼 - 캡처 단계에서 선점
  document.querySelectorAll('.chapter-btn').forEach((btn) => {
    btn.addEventListener(
      'click',
      (e) => {
        const url = btn.getAttribute('data-link');
        const needsLoading = btn.hasAttribute('data-loading'); // CH2만 true
        if (!url) return;

        if (needsLoading) {
          // 다른 핸들러들이 바로 이동 못 하게 완전 차단
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          showLoadingAndNavigate(url, 2000); // 2초 보장
        }
        // 다른 챕터는 main.js 등 기존 로직이 즉시 이동
      },
      true
    ); // ← 캡처 단계에서 등록
  });

  function showLoadingAndNavigate(url, minMs = 1000) {
    if (!overlay) {
      window.location.href = url;
      return;
    }

    document.body.classList.add('body-lock');
    // 트랜지션 강제 트리거
    overlay.offsetHeight;
    overlay.classList.add('show');

    setTimeout(() => {
      window.location.href = url;
    }, minMs);
  }

  // 디버그: ?test=loading 붙이면 1.2초 표시
  if (new URLSearchParams(location.search).has('test')) {
    document.body.classList.add('body-lock');
    overlay.classList.add('show');
    setTimeout(() => {
      overlay.classList.remove('show');
      document.body.classList.remove('body-lock');
    }, 1200);
  }
});

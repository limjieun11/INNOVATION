// /js/loading.js
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('page-loading');
  const chapterButtons = document.querySelectorAll('.chapter-btn');

  // 중복 실행 가드
  let navigating = false;

  chapterButtons.forEach((btn) => {
    // 캡처 단계에서 선점하여 다른 핸들러보다 먼저 개입
    btn.addEventListener(
      'click',
      (e) => {
        const url = btn.getAttribute('data-link');
        if (!url) return;

        // data-loading 속성이 있는 버튼만 오버레이 노출 (CH2)
        const shouldShow =
          btn.hasAttribute('data-loading') || btn.dataset.loading === 'true';
        if (!shouldShow) return; // 다른 챕터는 기본 로직대로

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (navigating) return;
        navigating = true;

        showLoadingThenGo(url, 1400); // 최소 1.4s 보장 (원하면 조절)
      },
      true
    );
  });

  function showLoadingThenGo(url, minMs = 1000) {
    if (!overlay) {
      window.location.href = url;
      return;
    }

    // hidden 해제 + 표시 클래스 부여
    overlay.removeAttribute('hidden');
    overlay.classList.add('show');
    document.body.classList.add('body-lock');

    // 페인트 보장: rAF 2번 → 레이아웃 강제 → 타이머
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void overlay.offsetHeight;

        // 키보드 포커스 해제(모바일에서 포커스 윤곽 제거 목적)
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }

        setTimeout(() => {
          window.location.href = url;
        }, minMs);
      });
    });
  }

  // 디버그: ?test=loading 붙이면 1.2초 테스트
  if (new URLSearchParams(location.search).has('test')) {
    if (overlay) {
      overlay.removeAttribute('hidden');
      overlay.classList.add('show');
      document.body.classList.add('body-lock');
      setTimeout(() => {
        overlay.classList.remove('show');
        overlay.setAttribute('hidden', '');
        document.body.classList.remove('body-lock');
      }, 1200);
    }
  }
});

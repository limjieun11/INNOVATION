document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.chapter-btn').forEach((btn) => {
    // CH2(로딩 대상)는 loading.js에서 처리
    if (btn.hasAttribute('data-loading')) return;

    btn.addEventListener('click', () => {
      const href = btn.getAttribute('data-link');
      if (href) window.location.href = href;
    });
  });
});

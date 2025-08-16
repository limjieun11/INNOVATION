document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.chapter-btn').forEach((btn) => {
    // ✅ 로딩 버튼은 loading.js에 맡김
    if (btn.hasAttribute('data-loading')) return;

    btn.addEventListener('click', () => {
      const link = btn.dataset.link;
      if (link) window.location.href = link;
    });
  });
});

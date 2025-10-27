document.addEventListener('click', (e) => {
  const btn = e.target.closest('.back-btn');
  if (!btn) return;

  // ✅ 수정: 히스토리 확인 로직 제거. data-fallback 주소를 무조건 사용.
  const fallbackUrl = btn.getAttribute('data-fallback') || '../../../main.html';
  window.location.href = fallbackUrl;
});

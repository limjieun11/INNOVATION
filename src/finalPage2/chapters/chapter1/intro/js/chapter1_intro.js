document.addEventListener('click', (e) => {
  const btn = e.target.closest('.back-btn');
  if (!btn) return;
  if (window.history.length > 1) {
    window.history.back();
  } else {
    const fb = btn.getAttribute('data-fallback') || '../../../main.html';
    window.location.href = fb;
  }
});

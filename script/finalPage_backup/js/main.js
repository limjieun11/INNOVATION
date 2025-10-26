document.addEventListener('DOMContentLoaded', () => {
  /* ===== 1) 챕터 버튼 네비 (CH2는 loading.js가 처리) ===== */
  document.querySelectorAll('.chapter-btn').forEach((btn) => {
    if (btn.hasAttribute('data-loading')) return;
    btn.addEventListener('click', () => {
      const href = btn.getAttribute('data-link');
      if (href) window.location.href = href;
    });
  });

  /* ===== 2) 프로젝트 소개 패널 토글 ===== */
  const btn = document.getElementById('infoBtn');
  const panel = document.getElementById('infoPanel');
  const overlay = document.getElementById('infoOverlay');
  const backBtn = document.getElementById('infoBack');

  if (!btn || !panel || !overlay) return;

  const open = () => {
    panel.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(() => {
      panel.classList.add('open');
      overlay.classList.add('show');
    });
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    (panel.querySelector('h2') || panel).focus?.();
  };

  const close = () => {
    panel.classList.remove('open');
    overlay.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    let closed = false;
    const done = () => {
      if (closed) return;
      closed = true;
      panel.hidden = true;
      overlay.hidden = true;
      panel.removeEventListener('transitionend', done);
      btn.focus();
    };
    panel.addEventListener('transitionend', done);
    setTimeout(done, 320); // 모션 꺼짐 대비
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  });
  overlay.addEventListener('click', close);
  backBtn?.addEventListener('click', close);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });
});

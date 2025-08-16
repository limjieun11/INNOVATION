// 1) #hanja1 이미지를 샘플링해 파티클로 만들고,
//    호버 시 흩어졌다가(Scatter) 원래 자리로 모이도록 한다.
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('hanja1');
  if (!img) return;

  const ensureLoaded = (el) =>
    el.complete && el.naturalWidth
      ? Promise.resolve()
      : new Promise((res) => el.addEventListener('load', res, { once: true }));

  ensureLoaded(img).then(() => {
    try {
      buildParticles(img);
    } catch (e) {
      console.error(e);
    }
  });

  let currentWrap = null;
  let rebuildTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(() => {
      // 리사이즈 시 재구성
      if (currentWrap) currentWrap.remove();
      img.style.visibility = ''; // 잠시 보이게
      buildParticles(img);
    }, 150);
  });

  function buildParticles(imageEl) {
    const rect = imageEl.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(imageEl, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    const wrap = document.createElement('div');
    wrap.className = 'hanja-particles';
    Object.assign(wrap.style, {
      position: 'absolute',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${w}px`,
      height: `${h}px`,
    });
    document.body.appendChild(wrap);
    currentWrap = wrap;

    // 이미지 크기에 비례한 밀도
    const step = Math.max(5, Math.round(Math.min(w, h) / 120));
    const size = Math.max(2, Math.round(step * 0.4));

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const a = data[i + 3];
        if (a < 90) continue; // 거의 투명한 부분은 스킵

        const r = data[i],
          g = data[i + 1],
          b = data[i + 2];

        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.background = `rgb(${r},${g},${b})`;

        // 흩어질 방향/거리
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 40 + 20; // px
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const rot = Math.random() * 60 - 30 + 'deg';
        dot.style.setProperty('--dx', `${dx}px`);
        dot.style.setProperty('--dy', `${dy}px`);
        dot.style.setProperty('--rot', rot);

        wrap.appendChild(dot);
      }
    }

    // 원본 이미지는 파티클로 대체
    imageEl.style.visibility = 'hidden';

    let hoverCount = 0;
    const enter = () => {
      hoverCount++;
      wrap.classList.add('scatter');
    };
    const leave = () => {
      hoverCount = Math.max(0, hoverCount - 1);
      if (hoverCount === 0) wrap.classList.remove('scatter');
    };
    wrap.addEventListener('mouseenter', enter);
    wrap.addEventListener('mouseleave', leave);
  }
});

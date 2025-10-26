// js/hanja.js
// #hanja1 이미지를 점(파티클)로 재구성하고,
// 커서 주변만 반경 내 점을 밀어내는 "구멍 효과"를 캔버스로 렌더 (고성능)

(() => {
  const IMG_ID = 'hanja1';

  // ===== 튜닝 파라미터 =====
  const SETTINGS = {
    targetDots: 4800, // 6500 → 4800 (조금 덜 촘촘하게 = step↑ = 점 더 큼)
    minStep: 2,
    maxStep: 8,
    alphaThreshold: 40,
    lumaThreshold: 185,
    jitter: 0.4,
    // dotSize: 1.2,   ← 이 항목은 더 이상 쓰지 않음
    dotScale: 1.6, // ★ 점 크기 = step * dotScale (원래보다 크게)
    minDot: 2.5, // ★ 점 최소 지름(px)
    radius: 90,
    repel: 6,
    returnSpeed: 0.08,
    damping: 0.92,
    dprMax: 2,
  };

  let img,
    layerCanvas,
    ctx,
    particles = [];
  let cssW = 0,
    cssH = 0,
    dpr = 1;

  const mouse = { x: 0, y: 0, inside: false };

  document.addEventListener('DOMContentLoaded', async () => {
    img = document.getElementById(IMG_ID);
    if (!img) return;
    await ensureLoaded(img);

    build();

    // 반응형/스크롤 대응
    const debRebuild = debounce(() => {
      const r = img.getBoundingClientRect();
      const w = Math.round(r.width),
        h = Math.round(r.height);
      if (w !== cssW || h !== cssH) build();
      else relayout();
    }, 150);
    window.addEventListener('resize', debRebuild);
    window.addEventListener('scroll', () => relayout(), { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(debRebuild).observe(img);

    // 포인터 추적
    window.addEventListener(
      'mousemove',
      (e) => {
        if (!layerCanvas) return;
        const R = layerCanvas.getBoundingClientRect();
        mouse.x = e.clientX - R.left;
        mouse.y = e.clientY - R.top;
        mouse.inside =
          mouse.x >= 0 &&
          mouse.y >= 0 &&
          mouse.x <= R.width &&
          mouse.y <= R.height;
      },
      { passive: true }
    );

    requestAnimationFrame(tick);
  });

  function build() {
    // 이미지 크기
    const r = img.getBoundingClientRect();
    cssW = Math.max(1, Math.round(r.width));
    cssH = Math.max(1, Math.round(r.height));

    // 캔버스 준비(없으면 생성, 있으면 교체)
    if (!layerCanvas) {
      layerCanvas = document.createElement('canvas');
      layerCanvas.className = 'hanja-canvas';
      document.body.appendChild(layerCanvas);
    }
    dpr = Math.min(window.devicePixelRatio || 1, SETTINGS.dprMax);
    layerCanvas.style.width = cssW + 'px';
    layerCanvas.style.height = cssH + 'px';
    layerCanvas.width = Math.round(cssW * dpr);
    layerCanvas.height = Math.round(cssH * dpr);
    ctx = layerCanvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    relayout();

    // 이미지 샘플링 → 파티클 생성
    particles = [];
    const sctx = offscreenCtx(cssW, cssH);
    sctx.drawImage(img, 0, 0, cssW, cssH);
    const data = sctx.getImageData(0, 0, cssW, cssH).data;

    // 적응형 목표점(대화면/DPR에서 자동 감소)
    const area = cssW * cssH;
    const sizePenalty = Math.max(1, area / (1200 * 700)); // 기준 사이즈 대비 페널티
    const adaptiveTarget = Math.max(
      1800,
      Math.round(SETTINGS.targetDots / (dpr * dpr) / Math.sqrt(sizePenalty))
    );
    let step = Math.round(Math.sqrt(area / adaptiveTarget));
    step = clamp(step, SETTINGS.minStep, SETTINGS.maxStep);

    const size = Math.max(1, Math.round(SETTINGS.dotSize));
    for (let y = 0; y < cssH; y += step) {
      for (let x = 0; x < cssW; x += step) {
        const i = (y * cssW + x) * 4;
        const a = data[i + 3];
        if (a < SETTINGS.alphaThreshold) continue;
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2];
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (luma >= SETTINGS.lumaThreshold) continue;

        const jx = (Math.random() - 0.5) * step * SETTINGS.jitter * 2;
        const jy = (Math.random() - 0.5) * step * SETTINGS.jitter * 2;
        particles.push({
          x: x + jx,
          y: y + jy, // 현재 위치
          tx: x + jx,
          ty: y + jy, // 타깃(원위치)
          vx: 0,
          vy: 0, // 속도
          col: `rgb(${r},${g},${b})`,
          size,
        });
      }
    }

    // 원본 이미지는 숨겨서 겹침 방지 (다른 한자 이미지엔 영향 없음)
    img.style.visibility = 'hidden';
  }

  function relayout() {
    if (!layerCanvas) return;
    const r = img.getBoundingClientRect();
    layerCanvas.style.left = r.left + window.scrollX + 'px';
    layerCanvas.style.top = r.top + window.scrollY + 'px';
  }

  function tick() {
    // 업데이트
    const R = SETTINGS.radius;
    const repel = SETTINGS.repel;
    const ret = SETTINGS.returnSpeed;
    const damp = SETTINGS.damping;

    if (mouse.inside) {
      for (let p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const R2 = R * R;
        if (d2 < R2 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const f = (1 - d / R) * repel; // 가까울수록 강하게
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.ty - p.y) * ret; // 원위치 복귀력
        p.vy += (p.tx - p.x) * ret;
      }
    } else {
      for (let p of particles) {
        p.vx += (p.ty - p.y) * ret;
        p.vy += (p.tx - p.x) * ret;
      }
    }

    for (let p of particles) {
      p.vx *= damp;
      p.vy *= damp;
      p.x += p.vx;
      p.y += p.vy;
    }

    // 그리기
    ctx.clearRect(0, 0, cssW, cssH);
    for (let p of particles) {
      ctx.fillStyle = p.col;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  // ===== helpers =====
  function ensureLoaded(el) {
    return el.complete && el.naturalWidth
      ? Promise.resolve()
      : new Promise((res) => el.addEventListener('load', res, { once: true }));
  }
  function offscreenCtx(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c.getContext('2d', { willReadFrequently: true });
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const debounce = (fn, ms) => {
    let t;
    return (...as) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...as), ms);
    };
  };
})();

(function () {
  const BANK = window.CH4_BANK;

  let saved;
  try {
    saved = JSON.parse(localStorage.getItem('ch4OrderV2'));
  } catch (_) {}
  const order = saved?.ids || [];
  if (!order.length) {
    location.href = './index.html';
    return;
  }

  const m = location.pathname.match(/question(\d+)\.html$/);
  const idx = m ? parseInt(m[1], 10) : 1;
  const qid = order[idx - 1];
  const q = BANK.find((x) => x.id === qid) || {};

  const elText = document.getElementById('q-text');
  const elA = document.getElementById('optA');
  const elB = document.getElementById('optB');
  const aInput = elA?.querySelector('input');
  const bInput = elB?.querySelector('input');
  const btnNext = document.getElementById('nextBtn');
  const progress = document.getElementById('progress');

  if (progress) progress.textContent = `${idx}/4`;
  if (elText) elText.textContent = q.text || '';
  if (elA) elA.querySelector('span').textContent = q.a || '';
  if (elB) elB.querySelector('span').textContent = q.b || '';

  const answersKey = 'ch4Answers';
  const crowdKey = 'ch4CrowdLocal';

  let answers = {};
  let localCrowd = {};
  try {
    answers = JSON.parse(localStorage.getItem(answersKey)) || {};
  } catch (_) {}
  try {
    localCrowd = JSON.parse(localStorage.getItem(crowdKey)) || {};
  } catch (_) {}

  const name = `q${idx}`;
  if (answers[name] === 'A' && aInput) aInput.checked = true;
  if (answers[name] === 'B' && bInput) bInput.checked = true;

  // crowdbar 보장(없으면 생성)
  function ensureCrowdBar() {
    let bar = document.getElementById('crowdbar');
    let pctAEl = document.getElementById('crowdPctA');
    let pctBEl = document.getElementById('crowdPctB');
    if (!bar) {
      bar = document.createElement('section');
      bar.id = 'crowdbar';
      bar.className = 'crowdbar';
      const l = document.createElement('div');
      l.className = 'crowdbar__left';
      const r = document.createElement('div');
      r.className = 'crowdbar__right';
      const sa = document.createElement('span');
      sa.id = 'crowdPctA';
      sa.textContent = '--%';
      const sb = document.createElement('span');
      sb.id = 'crowdPctB';
      sb.textContent = '--%';
      l.appendChild(sa);
      r.appendChild(sb);
      bar.append(l, r);
      const container = document.getElementById('ch4') || document.body;
      if (btnNext?.parentElement)
        btnNext.parentElement.insertBefore(bar, btnNext);
      else container.appendChild(bar);
      pctAEl = sa;
      pctBEl = sb;
    }
    return { bar, pctAEl, pctBEl };
  }
  const { bar, pctAEl, pctBEl } = ensureCrowdBar();

  // ===== 퍼센트 계산/표시 =====
  const PRIOR = Number(window.CH4_CROWD_PRIOR ?? 30); // ← 가중치(기본 30로 낮춤)

  function computeCrowd(question, statsOverride) {
    const seedA =
      question?.crowd && typeof question.crowd.A === 'number'
        ? question.crowd.A
        : 0.5;
    const seedB = 1 - seedA;
    const stats = statsOverride ?? localCrowd[qid] ?? { A: 0, B: 0 };
    const a = seedA * PRIOR + (stats.A || 0);
    const b = seedB * PRIOR + (stats.B || 0);
    const pa = a / (a + b);
    return { pa, pb: 1 - pa };
  }

  function renderCrowd(statsOverride) {
    if (!bar) return;
    const { pa, pb } = computeCrowd(q, statsOverride);
    const left = Math.round(pa * 100);
    const right = 100 - left;
    bar.style.gridTemplateColumns = `${left}% ${right}%`;
    if (pctAEl) pctAEl.textContent = `${left}%`;
    if (pctBEl) pctBEl.textContent = `${right}%`;
  }

  renderCrowd();

  // 선택 → 저장 → (즉시 UI 반영) → 다음
  btnNext?.addEventListener('click', () => {
    const picked = (aInput?.checked && 'A') || (bInput?.checked && 'B') || null;
    if (!picked) {
      alert('하나를 선택해 주세요.');
      return;
    }

    // 1) 답 저장
    answers[name] = picked;
    answers[qid] = picked;
    localStorage.setItem(answersKey, JSON.stringify(answers));

    // 2) 로컬 집계 업데이트 + 즉시 화면에 미리 반영
    const current = localCrowd[qid] || { A: 0, B: 0 };
    const after = { ...current, [picked]: (current[picked] || 0) + 1 };
    localCrowd[qid] = after;
    localStorage.setItem(crowdKey, JSON.stringify(localCrowd));
    renderCrowd(after); // ← 클릭 직후 눈에 보이게 변화

    // 3) 약간의 지연 후 다음 페이지로
    setTimeout(() => {
      location.href = window.CH4Nav.nextHref(idx);
    }, 280);
  });
})();

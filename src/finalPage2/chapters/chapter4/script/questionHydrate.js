// 로컬 전용 누적 그래프(처음 0%/0% → 선택 때마다 누적, 애니메이션로 증가)
(function () {
  const KEY_LOCAL = 'ch4CrowdLocalV3'; // { [qid]: { left: n, right: n } }

  // --- URL 리셋 스위치: ...question1.html?reset=1 로 열면 로컬 데이터 초기화 ---
  let __RESET_TRIGGERED__ = false;
  (function resetSwitch() {
    const qs = new URLSearchParams(location.search);
    if (qs.has('reset')) {
      // 현 버전 + 예전 키들까지 같이 삭제
      ['ch4CrowdLocalV3', 'ch4CrowdLocal', 'ch4Answers', 'ch4OrderV2'].forEach(
        (k) => localStorage.removeItem(k)
      );

      __RESET_TRIGGERED__ = true;
      // 쿼리 스트립하고 한 번만 새로고침(깨끗한 URL, 0%로 시작)
      location.replace(location.pathname);
    }
  })();
  if (__RESET_TRIGGERED__) return;

  const read = (k, f = {}) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? f;
    } catch {
      return f;
    }
  };
  const write = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  };

  // 숫자 텍스트 세팅
  const setPct = (el, v) => {
    if (el) el.textContent = `${Math.round(v)}%`;
  };

  // 부드러운 증가(숫자만) — 변화가 잘 보이게
  const animatePct = ({ elL, elR, fromL, fromR, toL, toR, duration = 800 }) => {
    const start = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3); // easeOutCubic
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const e = ease(t);
      setPct(elL, fromL + (toL - fromL) * e);
      setPct(elR, fromR + (toR - fromR) * e);
      if (t < 1) requestAnimationFrame(frame);
      else {
        setPct(elL, toL);
        setPct(elR, toR);
      }
    }
    requestAnimationFrame(frame);
  };

  // 현재 퍼센트 계산(로컬 누적만)
  function ratio(counts) {
    const L = counts.left || 0;
    const R = counts.right || 0;
    const sum = L + R;
    if (sum === 0) return { left: 0, right: 0 }; // 처음엔 0/0
    const left = (L / sum) * 100;
    return { left, right: 100 - left };
  }

  // 숫자 강조 효과(애니메이션 클래스는 CSS에 정의: .bump, .flash)
  function pop(el) {
    if (!el) return;
    el.classList.remove('bump');
    el.classList.remove('flash');
    void el.offsetWidth; // reflow
    el.classList.add('bump');
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 600);
  }

  // 공개: 페이지에서 호출해 연결
  window.CH4WireChoices = function ({ qid, nextHref }) {
    const L = document.getElementById('stat-left');
    const R = document.getElementById('stat-right');

    // 1) 최초 표시: 0% / 0%
    setPct(L, 0);
    setPct(R, 0);

    // 2) 이전에 이 질문에 투표한 내역이 있다면 → 그 비율로 0→현재값 애니메이션
    const map0 = read(KEY_LOCAL, {});
    const cur0 = map0[qid] || { left: 0, right: 0 };
    const end0 = ratio(cur0);
    if (cur0.left + cur0.right > 0) {
      animatePct({
        elL: L,
        elR: R,
        fromL: 0,
        fromR: 0,
        toL: end0.left,
        toR: end0.right,
        duration: 900,
      });
    }

    // 3) 선택 시: 로컬 누적 + 비율 애니메이션 + 강조 → 다음 화면
    document.querySelectorAll('.option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const side = opt.id.includes('left') ? 'left' : 'right';

        const map = read(KEY_LOCAL, {});
        const cur = map[qid] || { left: 0, right: 0 };

        const from = ratio(cur);
        cur[side] = (cur[side] || 0) + 1; // 누적 1 증가
        map[qid] = cur;
        write(KEY_LOCAL, map);

        const to = ratio(cur);

        animatePct({
          elL: L,
          elR: R,
          fromL: from.left,
          fromR: from.right,
          toL: to.left,
          toR: to.right,
          duration: 700,
        });
        pop(L);
        pop(R);

        // 앱 네비 훅 우선
        if (window.CH4Nav?.choose) {
          window.CH4Nav.choose(side);
          return;
        }
        // 없으면 약간 딜레이 후 다음
        if (nextHref)
          setTimeout(() => {
            window.location.href = nextHref;
          }, 420);
      });
    });
  };
})();

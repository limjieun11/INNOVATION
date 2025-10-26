// main.js

// ----------------------------------------------------
// 1. SVG 필터 마크업 문자열 정의
// ----------------------------------------------------
const svgFilterMarkup = `
  <svg class="svg-sprite" style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
    <filter id="filter">
      <feTurbulence type="fractalNoise" baseFrequency="0.000001 0.000001" numOctaves="1" result="warp"></feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp"></feDisplacementMap>
    </filter>
  </svg>
`;

// ----------------------------------------------------
// 2. GSAP 글리치 제어 로직 함수 정의 (jQuery와 GSAP 사용)
// ----------------------------------------------------

var $filter, $turb, turbVal, turbValX, btnGlitch;

const initializeGlitch = () => {
  // <body>의 가장 앞부분에 SVG 마크업 삽입
  document.body.insertAdjacentHTML('afterbegin', svgFilterMarkup);

  // DOM 요소 정의
  $filter = document.querySelector('.svg-sprite');
  // jQuery 대신 vanilla JS를 사용하여 $turb 정의 (querySelector 사용)
  $turb = $filter.querySelector('#filter feTurbulence');
  turbVal = { val: 0.000001 };
  turbValX = { val: 0.000001 };

  var glitchTimeline = function () {
    var timeline = new TimelineMax({
      repeat: -1,
      repeatDelay: 0,
      paused: true,
      onUpdate: function () {
        $turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
      },
    });

    // 애니메이션 시퀀스 정의
    timeline.to(turbValX, 0.1, { val: 0.5 }).to(turbVal, 0.1, { val: 0.02 });
    timeline.set(turbValX, { val: 0.000001 }).set(turbVal, { val: 0.000001 });
    timeline
      .to(turbValX, 0.2, { val: 0.4 }, 0.4)
      .to(turbVal, 0.2, { val: 0.002 }, 0.4);
    timeline.set(turbValX, { val: 0.000001 }).set(turbVal, { val: 0.000001 });

    return {
      start: function () {
        timeline.play(0);
      },
      stop: function () {
        timeline.pause();
        // 정지 시 필터 원상복구
        $turb.setAttribute('baseFrequency', '0.000001 0.000001');
      },
    };
  };

  // 글리치 인스턴스 생성 및 이벤트 바인딩
  btnGlitch = new glitchTimeline();

  // jQuery를 사용하여 호버 이벤트 처리
  $('.chapter-btn')
    .on('mouseenter', function () {
      $(this).addClass('btn-glitch-active');
      btnGlitch.start();
    })
    .on('mouseleave', function () {
      var $this = $(this);
      if ($this.hasClass('btn-glitch-active')) {
        $this.removeClass('btn-glitch-active');
        btnGlitch.stop();
      }
    });
};

// ----------------------------------------------------
// 3. 메인 애플리케이션 DOMContentLoaded 로직
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  /* ===== 1) 챕터 버튼 네비 (CH2는 loading.js가 처리) ===== */
  document.querySelectorAll('.chapter-btn').forEach((btn) => {
    // 기존 챕터 버튼 네비게이션 로직
    if (btn.hasAttribute('data-loading')) return;
    btn.addEventListener('click', () => {
      const href = btn.getAttribute('data-link');
      if (href) window.location.href = href;
    });
  });

  /* ===== 2) 프로젝트 소개 패널 토글 로직 유지 ===== */
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

  // ----------------------------------------------------
  // 4. 글리치 초기화 함수 호출
  // ----------------------------------------------------
  // jQuery와 GSAP 로드 여부를 확인하고 글리치 초기화
  if (typeof jQuery !== 'undefined' && typeof TweenMax !== 'undefined') {
    initializeGlitch();
  } else {
    console.error(
      'jQuery or GSAP (TweenMax) library is not loaded. Glitch effect disabled.'
    );
  }
});

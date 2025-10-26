/* =========================================
 *  Chapter 1 - 랜덤 말풍선 순차 등장
 *  - IntersectionObserver로 하나씩 표시
 *  - 좌우 번갈아 배치 + 간격 랜덤
 *  - 마지막 말풍선 후 자동 이동(옵션)
 * =======================================*/

/* ---------- 설정값 ---------- */
const CONFIG = {
  verticalGap: { min: 40, max: 120 }, // 각 말풍선 아래 여백(px)
  horizontalInset: { min: 32, max: 128 }, // 좌/우 가장자리에서 들여쓰기(px)
  observer: { threshold: 0.6, root: null, rootMargin: '0px' },
  nextRevealDelay: 300, // 다음 풍선까지 지연(ms)
  autoRedirect: {
    // 마지막 후 자동 이동(끄려면 url: null)
    url: '../intro/chapter1_intro.html',
    delay: 2000,
  },
};

/* ---------- 데이터 ---------- */
const comments = [
  '오작동 계속나면 나중에 진짜 일때 못나갈수도 있을거 같음',
  '개선이 필요해 보임',
  '중국산인가',
  '맨날 아무문제 없다고 넘어가',
  '진짜 개극혐',
  '울 학교 맨날 오작동 남 짜증나',
  '또또 오작동',
  '박먹다 울리면 개빡침',
  '어차피 안나감',
  '엌 나도 안나감..',
  '맞아 오작동인거 알고 다시 들어가기 귀찮음',
  '경고음 좀 바꾸면 안됨?',
  'ㅇㅈ 개시끄러워',
  '교실에서 울리면 아무도 안나감',
  'ㅇㅈ 나가면 오히려 혼남',
  '사이렌 감지기말고 스프링쿨러만 있으면 안됨?',
  '나만 울리면 내려가나',
  'ㅇㅇ 너만',
  'ㅋㅋㅋㅋㅋㅋㅋㅋ',
  '미쳤어 시도 때도 없이..ㅎ',
  '근데 울리면 나가는 사람 있긴함?',
  '저걸 왜 설치 해서 사람 속을 뒤집는지..참',
  '걍 설치하지마',
  'ㄹㅇ 이렇게 고장날거면 다 빼버려',
  '징글징글해',
  '사이렌 소리 소름',
];

/* ---------- 유틸 ---------- */
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/* ---------- DOM ---------- */
const container = document.getElementById('balloon-container');
if (!container) console.error('[balloon] #balloon-container 없음');

/* ---------- 상태 ---------- */
let currentIdx = 0;
let observer;

/* ---------- 말풍선 생성 ---------- */
function createBalloonElement(text, index) {
  const el = document.createElement('div');
  const isLeft = index % 2 === 0; // 좌우 번갈아
  el.classList.add('balloon', isLeft ? 'left' : 'right');
  el.textContent = text;

  // 랜덤 간격
  el.style.marginBottom = `${randInt(
    CONFIG.verticalGap.min,
    CONFIG.verticalGap.max
  )}px`;
  const inset = randInt(CONFIG.horizontalInset.min, CONFIG.horizontalInset.max);
  if (isLeft) el.style.marginLeft = `${inset}px`;
  else el.style.marginRight = `${inset}px`;

  return el;
}

/* ---------- 다음 말풍선 표시 ---------- */
function revealNextBalloon() {
  if (!container || currentIdx >= comments.length) return;

  const balloon = createBalloonElement(comments[currentIdx], currentIdx);
  container.appendChild(balloon);
  observer.observe(balloon);
  currentIdx++;

  // 마지막이면 자동 이동(옵션)
  if (currentIdx === comments.length && CONFIG.autoRedirect?.url) {
    setTimeout(() => {
      window.location.href = CONFIG.autoRedirect.url;
    }, CONFIG.autoRedirect.delay);
  }
}

/* ---------- 옵저버 ---------- */
observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
    setTimeout(revealNextBalloon, CONFIG.nextRevealDelay);
  });
}, CONFIG.observer);

/* ---------- 시작 ---------- */
revealNextBalloon();

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
  '자다가 놀라긴했는데 이건 필요함',
  '안전은 과해야 해',
  '그건 됐고 알람 때문에 놀라서 개빡침',
  '그래도 짜증나는건 어쩔 수 없던데..',
  '어차피 전쟁나면 다죽는데 뭐',
  '새벽에 대피한다는 생각 자체가ㅋ',
  '괜히 잠만 깼다',
  '진짜 가지가지한다.',
  '하여간~ㅋㅋㅋ',
  '진정한 모닝콜ㅋㅋ',
  '재밌다 싸이렌 소리',
  '쫄았네',
  '서울시가 시민들 다깨웠네',
  '어차피 대피할 곳 없어~',
  '난 소리에 깨고 다시 잠',
  '잠깬다',
  '역대 최악의 모닝콜',
  '미쳤어 시도 때도 없이..',
  'ㄹㅈㄷ',
  '아니 새벽에 대피한 사람들 개웃기네',
  'ㅇㅈㅋㅋ 도망가다 죽을듯',
  '난 그래서 알람 다 꺼버림',
  '나만 새벽에 못들었나',
  '쫄아서 짐싸는거 웃기네ㅋㅋㅋ',
  '경각심 다 줄어들 듯',
  '이게 재난임?',
  '아니 제대로 알고좀 문자 보내라',
  '재난 문자가 "재난"',
  'ㅋㅋ모르고 자고 있었음',
  '이거 찐임?',
  '난 그냥 사이렌 울리면 뒤져야지',
  '돌겠네',
  '하.. 밤샜는데 제대로 자지도 못하고 깸..',
  '한번만 더 보내봐라',
  '새벽엔 눈치껏 보내지마라',
  '이거 찐임?',
  '재밌네~',
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

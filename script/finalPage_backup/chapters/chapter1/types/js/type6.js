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
  '저런걸 대체 왜 함',
  '맞아 너무 위험해 보임',
  '재밌잖아ㅋ',
  '저것만큼 무식한 게임이 없음',
  '하지만 재밌죠?',
  '중독성 장난 아님',
  '젤 재밌었다',
  '오우 저거 너무 위험해보이는데 당장해보자',
  '위험하면 하지마~',
  '저거 우리는 옆으로 날아서 탐ㅋㅋㅋ',
  '최근에도 유행하던데',
  '아니 이거 안죽음',
  '재미있어 보이던데',
  '스위치 끄듯ㅋㅋㅋㅋ',
  '기절놀이 오늘만 7번 했음',
  '나도ㅋ',
  'ㄹㅇ 개꿀잼',
  '우리 학교 저 놀이 유행하고 있음',
  '하지마라.. 이거하고 입원함..',
  '구라ㄴㄴ',
  'ㅋㅋㅋㅋㅋㅋㅋㅋ',
  '뭘 고통스러워 재밌더만',
  '댓글 보니깐 다들 살아있네 뭘',
  '근데 나 해봤는데 ㄹㅇ 재밌음',
  '그렇게 하다 가는거다',
  '편하게 죽으면 나야 좋지 뭐',
  '남자가 빨리죽는 이유ㅋㅋ',
  '저 놀이는 남녀 불문이긴 함ㅋㅋㅋ',
  '별 이상한 놀이네ㅋㅋ',
  '새로운 놀이 발견',
  '오',
  '내일 저거 해봐야겠다',
  'MZ스럽네 YOUNG 하구만 뭘',
  'ㄹㅇ 귀여운 수준',
  '오~ 따라해봐야지~',
  '너무 위험한데.. 이해안감',
  '재밌잖아 한잔해',
  '라떼는 불장난 많이 했지',
  '어차피 안죽음 ㄱㅊ',
  '호들갑은',
  '역시 책임 없는 쾌락이 최고임',
  '지금도 재밌게 하는 중임',
  '나 해봤는데 건강함',
  '멀쩡해~',
  '이런걸로 뉴스 내는게 이상함',
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

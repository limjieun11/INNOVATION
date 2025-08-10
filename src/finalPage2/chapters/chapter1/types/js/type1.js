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
  '우리도 전쟁 준비 해야돼',
  '맞아 분단국가라는걸 잊으면 안돼',
  '근데 이게 벌써 몇번째냐..',
  '오물 풍선좀 그만날려..',
  '북한 돈 많나 봄ㅋㅋ',
  '또?ㅋㅋㅋ',
  '지겹다 그냥',
  '그만하자 이제 좀!ㅋㅋㅋㅋ',
  '그냥 전쟁하는 것도 좋을듯 어차피 우리가 이김',
  '자업자득',
  '풍선 놀이들 하고 있네~',
  '근데 6,25전쟁도 이러다가 갑자기...',
  '그때랑 지금이랑 같냐?ㅋㅋ',
  '어서와라 미사일ㅋ',
  '더 많이 쏴 그냥ㅋㅋ',
  '또 시작이네',
  '아주 신났네 신났어',
  '나 출근길에 풍선 봤음 개신기해',
  '좀 그만..',
  '또냐..?',
  '뭐가 걱정임? 어차피 전쟁 안남',
  '걍 전쟁해도 될 듯',
  '예정된 수순',
  '지겹다 에휴',
  '맨날 도발만 하고 들어올 생각 없음',
  '어서 안오면 우리가 먼저 처들어간다',
  '피를 보겠구나',
  '또 쏨ㅎ',
  '할 짓 없다',
  '요즘 초딩도 저런짓은 안한다',
  '이미 망.',
  '걍 우리도 똑같이 보내자',
  '정말 유치하다',
  '걍 다시 위로 보내 뭘 분석하고 자빠져',
  '팩트는 이래도 전쟁 안남ㅋㅋㅋ',
  '풍선놀이.',
  '주고받고 이게 무슨 카톡이냐?',
  '애쓴다',
  '통일 가능???',
  'ㄴㄴ',
  '괜찮아 돈없어서 그럼',
  '그래서 언제하는데 전쟁',
  '전쟁나면 학교 감?',
  '가즈아~',
  '경고사격하지말고 걍 전쟁 ㄱ',
  '쫄았네',
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

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

const container = document.getElementById('balloon-container');
let currentIdx = 0;
let observer;

function createBalloonElement(text, index) {
  const balloon = document.createElement('div');
  const isLeft = index % 2 === 0;
  balloon.classList.add('balloon', isLeft ? 'left' : 'right');
  balloon.textContent = text;

  // ✅ 세로 간격: 40~120px 랜덤
  const verticalSpacing = Math.floor(Math.random() * 120) + 40;
  balloon.style.marginBottom = `${verticalSpacing}px`;

  // ✅ 수평 간격: 32~128px 랜덤
  const horizontalSpacing = Math.floor(Math.random() * 128) + 32;
  if (isLeft) {
    balloon.style.marginLeft = `${horizontalSpacing}px`;
  } else {
    balloon.style.marginRight = `${horizontalSpacing}px`;
  }

  return balloon;
}

function revealNextBalloon() {
  if (currentIdx >= comments.length) return;

  const balloon = createBalloonElement(comments[currentIdx], currentIdx);
  container.appendChild(balloon);
  observer.observe(balloon);
  currentIdx++;

  // ✅ 마지막 말풍선이면 일정 시간 뒤 자동 페이지 이동
  if (currentIdx === comments.length) {
    setTimeout(() => {
      window.location.href = '/src/finalPage/chapter1_intro.html'; // 다음 페이지 경로 설정
    }, 2000); // 4초 뒤 이동 (필요 시 조절 가능)
  }
}

observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
        setTimeout(() => revealNextBalloon(), 300);
      }
    });
  },
  {
    threshold: 0.6,
  }
);

// 첫 말풍선 시작
revealNextBalloon();

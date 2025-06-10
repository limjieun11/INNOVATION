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

const container = document.getElementById('balloon-container');
let currentIdx = 0;
let observer;

function createBalloonElement(text, index) {
  const balloon = document.createElement('div');
  const isLeft = index % 2 === 0;
  balloon.classList.add('balloon', isLeft ? 'left' : 'right');
  balloon.textContent = text;

  // ✅ 세로 간격: 40~120px 랜덤
  const verticalSpacing = Math.floor(Math.random() * 100) + 40;
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

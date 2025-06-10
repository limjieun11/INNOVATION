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

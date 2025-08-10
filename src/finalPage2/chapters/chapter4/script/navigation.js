import { QUESTIONS, TOTAL, loadAnswers, saveAnswer } from './questionData.js';

// 현재 파일명이 questionN.html 일 때 N 꺼내기
function getCurrentQuestionId() {
  const m = location.pathname.match(/question(\d+)\.html$/);
  return m ? Number(m[1]) : 1;
}

const qid = getCurrentQuestionId();
const q = QUESTIONS.find((x) => x.id === qid);

// 엘리먼트
const titleEl = document.querySelector('.q-title');
const optA = document.querySelector('[data-choice="a"]');
const optB = document.querySelector('[data-choice="b"]');
const barA = document.querySelector('.bar.a > span');
const barB = document.querySelector('.bar.b > span');
const pctA = document.querySelector('.percent.a');
const pctB = document.querySelector('.percent.b');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const progressFill = document.querySelector('.progress > span');

// 초기 렌더
titleEl.textContent = q.title;
optA.querySelector('.text').textContent = q.a;
optB.querySelector('.text').textContent = q.b;

// 미리보기 퍼센트 반영
barA.style.width = `${q.pre.a}%`;
barB.style.width = `${q.pre.b}%`;
pctA.textContent = `${q.pre.a}%`;
pctB.textContent = `${q.pre.b}%`;

// 진행률
progressFill.style.width = `${((qid - 1) / TOTAL) * 100}%`;

// 기존 선택 표시
const saved = loadAnswers()[qid];
if (saved)
  document.querySelector(`[data-choice="${saved}"]`).classList.add('selected');

// 선택 핸들러
function select(choice) {
  document
    .querySelectorAll('.opt')
    .forEach((el) => el.classList.remove('selected'));
  document.querySelector(`[data-choice="${choice}"]`).classList.add('selected');
  saveAnswer(qid, choice);
  nextBtn.disabled = false;
}

optA.addEventListener('click', () => select('a'));
optB.addEventListener('click', () => select('b'));

// 내비게이션
prevBtn.addEventListener('click', () => {
  if (qid > 1) location.href = `./question${qid - 1}.html`;
  else location.href = './index.html';
});

nextBtn.addEventListener('click', () => {
  if (qid < TOTAL) location.href = `./question${qid + 1}.html`;
  else location.href = './result.html';
});

// 초기 버튼 상태
nextBtn.disabled = !saved;

// 문장등급별 점수
const SENTENCE_SCORE = {
  PERFECT: 10,
  GREAT: 7,
  GOOD: 5,
  BAD: 2,
  MISS: 0,
};

// 등급 컷
const GRADE_CUT = {
  S: 99,
  AP: 95,
  A: 85,
  B: 70,
  C: 50,
  D: 30,
};

// 등급별 점수
const GRADE_SCORE = {
  S: 10,
  AP: 8,
  A: 7,
  B: 6,
  C: 5,
  D: 4,
  F: 1,
};

/**
 * grade(rank)를 계산하는 함수
 * @param {*} studyingInfo 팝송 학습 정보
 * @returns 학습 결과를 점수화해 등급 판정 (S A+ A B C D F)
 */

export const totalToGrade = (studyingInfo) => {
  const total =
    studyingInfo.perfect * SENTENCE_SCORE.PERFECT +
    studyingInfo.great * SENTENCE_SCORE.GREAT +
    studyingInfo.good * SENTENCE_SCORE.GOOD +
    studyingInfo.bad * SENTENCE_SCORE.BAD;
  const grade = (total / (studyingInfo.sentenceIdx * 10)) * 100;

  if (grade >= GRADE_CUT.S) return "S";
  else if (grade >= GRADE_CUT.AP) return "A+";
  else if (grade >= GRADE_CUT.A) return "A";
  else if (grade >= GRADE_CUT.B) return "B";
  else if (grade >= GRADE_CUT.C) return "C";
  else if (grade >= GRADE_CUT.D) return "D";
  else return "F";
};

export const gradeToScore = (grade) => {
  const score = GRADE_SCORE[grade] || 0;
  return score;
};

import test from 'node:test';
import assert from 'node:assert/strict';
import { runHornerDivision, evaluatePolynomial, gradeAnswer, getMasteryCategory } from './mathLogic';
import { QUESTIONS_DATA } from '../data/questions';

test('Horner synthetic division works correctly', () => {
  // P(x) = 2x^3 - 5x^2 + 8x - 12 divided by (x - 3)
  // root = 3, coefficients: [2, -5, 8, -12]
  const result = runHornerDivision([2, -5, 8, -12], 3);
  assert.deepEqual(result.quotient, [2, 1, 11]);
  assert.equal(result.remainder, 21);
});

test('Polynomial evaluation matches Horner remainder', () => {
  const coeffs = [2, -5, 8, -12];
  const val = evaluatePolynomial(coeffs, 3);
  assert.equal(val, 21);
});

test('Question database contains exactly 25 questions distributed as requested', () => {
  assert.equal(QUESTIONS_DATA.length, 25, 'Total questions must be exactly 25');

  const pgCount = QUESTIONS_DATA.filter((q) => q.type === 'PG').length;
  const pgkCount = QUESTIONS_DATA.filter((q) => q.type === 'PGK').length;
  const bsCount = QUESTIONS_DATA.filter((q) => q.type === 'BS').length;

  assert.equal(pgCount, 9, 'Must have exactly 9 PG questions');
  assert.equal(pgkCount, 8, 'Must have exactly 8 PGK questions');
  assert.equal(bsCount, 8, 'Must have exactly 8 BS questions');

  // Check 5 questions per material
  for (let m = 1; m <= 5; m++) {
    const matQuestions = QUESTIONS_DATA.filter((q) => q.materialId === m);
    assert.equal(matQuestions.length, 5, `Material ${m} must have exactly 5 questions`);
  }
});

test('Grading logic validates PG, PGK, and BS correctly', () => {
  // PG Question 1
  const q1 = QUESTIONS_DATA.find((q) => q.id === 1)!;
  const grade1Correct = gradeAnswer(q1, { pgSelected: 'A' });
  assert.equal(grade1Correct.scoreEarned, 1.0);
  assert.equal(grade1Correct.isCorrect, true);

  const grade1Wrong = gradeAnswer(q1, { pgSelected: 'B' });
  assert.equal(grade1Wrong.scoreEarned, 0.0);
  assert.equal(grade1Wrong.isCorrect, false);

  // PGK Question 2: Correct is ['A', 'B', 'C']
  const q2 = QUESTIONS_DATA.find((q) => q.id === 2)!;
  const grade2Full = gradeAnswer(q2, { pgkSelected: ['A', 'B', 'C'] });
  assert.equal(grade2Full.scoreEarned, 1.0);
  assert.equal(grade2Full.isCorrect, true);

  // PGK partial: selected ['A', 'B'] (2 out of 3)
  const grade2Partial = gradeAnswer(q2, { pgkSelected: ['A', 'B'] });
  assert.ok(grade2Partial.scoreEarned > 0 && grade2Partial.scoreEarned < 1.0);

  // BS Question 3: Correct is [true, true, false]
  const q3 = QUESTIONS_DATA.find((q) => q.id === 3)!;
  const grade3Full = gradeAnswer(q3, { bsSelected: { 1: true, 2: true, 3: false } });
  assert.equal(grade3Full.scoreEarned, 1.0);
  assert.equal(grade3Full.isCorrect, true);

  // BS partial: 2 of 3 statements correct
  const grade3Partial = gradeAnswer(q3, { bsSelected: { 1: true, 2: true, 3: true } });
  assert.equal(grade3Partial.scoreEarned, 0.67);
  assert.equal(grade3Partial.isCorrect, false);
});

test('Mastery category levels comply with scale', () => {
  assert.equal(getMasteryCategory(95).category, 'MASTER POLINOMIAL');
  assert.equal(getMasteryCategory(85).category, 'SANGAT BAIK');
  assert.equal(getMasteryCategory(75).category, 'BAIK');
  assert.equal(getMasteryCategory(65).category, 'PERLU LATIHAN');
  assert.equal(getMasteryCategory(50).category, 'AYO BELAJAR LAGI');
});

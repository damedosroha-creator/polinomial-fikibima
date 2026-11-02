import { AppProgress, EvaluationResult, MasteryCategory, Question, UserAnswerState } from '../types';

/**
 * Perform Horner synthetic division for polynomial P(x) / (x - root)
 * coefficients are ordered from highest degree to constant: [a_n, a_{n-1}, ..., a_0]
 */
export interface HornerDivisionResult {
  quotient: number[];
  remainder: number;
  intermediate: number[];
  result: number[];
  steps: { inputCoeff: number; multiplyValue: number; sumResult: number }[];
}

export function runHornerDivision(coefficients: number[], root: number): HornerDivisionResult {
  const n = coefficients.length;
  if (n === 0) return { quotient: [], remainder: 0, intermediate: [], result: [], steps: [] };

  const intermediate = new Array(n).fill(0);
  const result = new Array(n).fill(0);

  result[0] = coefficients[0];
  const steps: { inputCoeff: number; multiplyValue: number; sumResult: number }[] = [
    { inputCoeff: coefficients[0], multiplyValue: 0, sumResult: coefficients[0] }
  ];

  for (let i = 1; i < n; i++) {
    intermediate[i] = result[i - 1] * root;
    result[i] = coefficients[i] + intermediate[i];
    steps.push({
      inputCoeff: coefficients[i],
      multiplyValue: intermediate[i],
      sumResult: result[i],
    });
  }

  const remainder = result[n - 1];
  const quotient = result.slice(0, n - 1);

  return {
    quotient,
    remainder,
    intermediate,
    result,
    steps,
  };
}

/**
 * Evaluate polynomial at x = val
 */
export function evaluatePolynomial(coefficients: number[], val: number): number {
  let res = 0;
  for (const c of coefficients) {
    res = res * val + c;
  }
  return res;
}

/**
 * Score a single question answer according to transparent pedagogical rules:
 * - PG: 1.0 if correct, 0.0 if incorrect
 * - PGK: Partial scoring based on Jaccard/set accuracy:
 *        Score = max(0, (correctSelected - incorrectSelected) / totalCorrectOptions)
 *        If all correct and no incorrect selected -> 1.0
 * - BS: Score = correctStatementsCount / totalStatements (e.g. 3/3 -> 1.0, 2/3 -> 0.67, 1/3 -> 0.33)
 */
export function gradeAnswer(
  question: Question,
  answer: Partial<UserAnswerState>
): { scoreEarned: number; isCorrect: boolean; detail: string } {
  if (question.type === 'PG') {
    const selected = answer.pgSelected;
    if (!selected) {
      return { scoreEarned: 0, isCorrect: false, detail: 'Belum dijawab' };
    }
    const isCorrect = selected === question.correctPg;
    return {
      scoreEarned: isCorrect ? 1.0 : 0.0,
      isCorrect,
      detail: isCorrect ? 'Jawaban Benar (Skor Penuh 1.0)' : `Jawaban Kurang Tepat. Kunci: ${question.correctPg}`,
    };
  }

  if (question.type === 'PGK') {
    const selected = answer.pgkSelected || [];
    const correct = question.correctPgk || [];
    if (selected.length === 0) {
      return { scoreEarned: 0, isCorrect: false, detail: 'Belum memilih pernyataan' };
    }

    const correctChosen = selected.filter((s) => correct.includes(s)).length;
    const wrongChosen = selected.filter((s) => !correct.includes(s)).length;
    const totalCorrect = correct.length;

    // Partial scoring formula
    const rawScore = (correctChosen - 0.5 * wrongChosen) / totalCorrect;
    const score = Math.max(0, Math.min(1.0, Math.round(rawScore * 100) / 100));
    const isCorrect = correctChosen === totalCorrect && wrongChosen === 0;

    let detail = '';
    if (isCorrect) {
      detail = `Sempurna! Semua ${totalCorrect} pilihan benar terpilih (Skor 1.0)`;
    } else {
      detail = `Benar terpilih: ${correctChosen}/${totalCorrect}, Salah terpilih: ${wrongChosen}. Skor parsial: ${(score * 100).toFixed(0)}%`;
    }

    return { scoreEarned: score, isCorrect, detail };
  }

  if (question.type === 'BS') {
    const selected = answer.bsSelected || {};
    const statements = question.statements || [];
    const answeredCount = Object.keys(selected).length;

    if (answeredCount === 0) {
      return { scoreEarned: 0, isCorrect: false, detail: 'Belum mengisi pernyataan Benar/Salah' };
    }

    let correctCount = 0;
    statements.forEach((stmt) => {
      if (selected[stmt.id] === stmt.correctIsBenar) {
        correctCount++;
      }
    });

    const total = statements.length;
    const rawScore = correctCount / total;
    const score = Math.round(rawScore * 100) / 100;
    const isCorrect = correctCount === total;

    return {
      scoreEarned: score,
      isCorrect,
      detail: `${correctCount} dari ${total} pernyataan dijawab dengan tepat. Skor: ${(score * 100).toFixed(0)}%`,
    };
  }

  return { scoreEarned: 0, isCorrect: false, detail: 'Format soal tidak dikenal' };
}

/**
 * Determine Mastery Category from percentage
 */
export function getMasteryCategory(percentage: number): {
  category: MasteryCategory;
  description: string;
  badgeColor: string;
} {
  if (percentage >= 90) {
    return {
      category: 'MASTER POLINOMIAL',
      description: 'Luar biasa! Pemahaman konsep, penalaran tingkat tinggi, dan ketelitian aljabar Anda sangat prima.',
      badgeColor: 'bg-emerald-600 text-white',
    };
  }
  if (percentage >= 80) {
    return {
      category: 'SANGAT BAIK',
      description: 'Kemampuan Anda sangat solid! Tinggal sedikit mengasah ketelitian pada pembagi kuadrat dan variabel sisipan.',
      badgeColor: 'bg-blue-600 text-white',
    };
  }
  if (percentage >= 70) {
    return {
      category: 'BAIK',
      description: 'Pemahaman konsep dasar dan teorema sisa sudah baik. Perbanyak latihan analisis kesalahan dan sistem persamaan.',
      badgeColor: 'bg-amber-600 text-white',
    };
  }
  if (percentage >= 60) {
    return {
      category: 'PERLU LATIHAN',
      description: 'Anda telah memahami sebagian konsep, namun perlu memperkuat metode Horner dan kombinasi teorema faktor.',
      badgeColor: 'bg-orange-600 text-white',
    };
  }
  return {
    category: 'AYO BELAJAR LAGI',
    description: 'Jangan patah semangat! Pelajari kembali rangkuman Rumus Kunci dan ikuti langkah Cara Cepat Mister Jo bertahap.',
    badgeColor: 'bg-rose-700 text-white',
  };
}

/**
 * Generate comprehensive evaluation analytics
 */
export function calculateEvaluation(
  questions: Question[],
  progress: AppProgress
): EvaluationResult {
  const totalQuestions = questions.length;
  let totalScore = 0;
  let totalCorrect = 0;
  let totalPartial = 0;
  let totalWrong = 0;
  let totalUnanswered = 0;

  // Material statistics tracking
  const materialStats: Record<number, { title: string; total: number; score: number; correct: number }> = {};
  for (let m = 1; m <= 5; m++) {
    materialStats[m] = {
      title: questions.find((q) => q.materialId === m)?.materialTitle || `Materi ${m}`,
      total: 0,
      score: 0,
      correct: 0,
    };
  }

  questions.forEach((q) => {
    const m = q.materialId;
    materialStats[m].total++;

    const ans = progress.answers[q.id];
    if (!ans || !ans.isSubmitted) {
      totalUnanswered++;
    } else {
      totalScore += ans.scoreEarned;
      materialStats[m].score += ans.scoreEarned;

      if (ans.scoreEarned === 1.0) {
        totalCorrect++;
        materialStats[m].correct++;
      } else if (ans.scoreEarned > 0) {
        totalPartial++;
      } else {
        totalWrong++;
      }
    }
  });

  const percentage = Math.round((totalScore / totalQuestions) * 100);
  const { category, description } = getMasteryCategory(percentage);

  const materialScores = Object.entries(materialStats).map(([idStr, val]) => {
    const id = Number(idStr);
    const pct = val.total > 0 ? Math.round((val.score / val.total) * 100) : 0;
    return {
      materialId: id,
      title: val.title,
      correctCount: val.correct,
      totalCount: val.total,
      score: Math.round(val.score * 10) / 10,
      percentage: pct,
    };
  });

  // Diagnostic Weaknesses & Recommendations
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  materialScores.forEach((m) => {
    if (m.percentage < 70) {
      if (m.materialId === 1) {
        weaknesses.push('Pembagian Horner untuk pembagi (ax - b) dan analisis pembagian bersusun.');
        recommendations.push('Ingat untuk selalu membagi hasil baris Horner dengan koefisien a pada pembagi (ax - b).');
      } else if (m.materialId === 2) {
        weaknesses.push('Penerapan Teorema Sisa 1 pada pembagi berderajat satu dan parameter aljabar.');
        recommendations.push('Gunakan substitusi langsung x = a ke P(x) untuk mencari sisa tanpa membagi panjang.');
      } else if (m.materialId === 3) {
        weaknesses.push('Teorema Sisa 2 dengan pembagi berderajat dua dan pemisalan sisa S(x) = mx + n.');
        recommendations.push('Faktorkan pembagi kuadrat menjadi dua akar, buat sistem persamaan S(r)=P(r) dan S(s)=P(s).');
      } else if (m.materialId === 4) {
        weaknesses.push('Teorema Faktor dan hubungan akar-akar polinomial (termasuk rumus Vieta).');
        recommendations.push('Syarat faktor adalah P(a) = 0. Gunakan jumlah akar untuk mencari akar-akar yang tersisa.');
      } else if (m.materialId === 5) {
        weaknesses.push('Penyelesaian sistem persamaan simultan pada variabel sisipan.');
        recommendations.push('Susun dua persamaan dari dua informasi pembagian, lalu selesaikan dengan eliminasi-substitusi.');
      }
    }
  });

  if (weaknesses.length === 0) {
    weaknesses.push('Tidak ditemukan kelemahan spesifik. Konsistensi penalaran Anda sudah merata di semua materi.');
    recommendations.push('Pertahankan kecepatan berpikir dan terus asah soal-soal olimpiade atau penalaran sains lanjutan!');
  }

  let misterJoMessage = '';
  if (percentage >= 90) {
    misterJoMessage = `Hebat sekali teman-teman FIKIBIMA! Kalian telah membuktikan diri sebagai Master Polinomial sejati. Setiap trik Horner dan Teorema Sisa kalian libas dengan tuntas!`;
  } else if (percentage >= 75) {
    misterJoMessage = `Keren! Prestasi yang sangat memuaskan bersama Mister Jo. Cermati beberapa catatan di evaluasi agar ketelitian aljabar kalian makin sempurna.`;
  } else {
    misterJoMessage = `Tetap semangat! Matematika itu seperti otot pikiran, makin dilatih makin tangguh. Buka kembali tab Rumus Kunci dan pelajari Cara Cepat Mister Jo!`;
  }

  return {
    totalScore: Math.round(totalScore * 10) / 10,
    maxScore: totalQuestions,
    percentage,
    totalCorrect,
    totalPartial,
    totalWrong,
    totalUnanswered,
    masteryCategory: category,
    categoryDescription: description,
    materialScores,
    weaknesses,
    recommendations,
    misterJoMessage,
  };
}

/**
 * Convert any digit or expression string to genuine Unicode superscript
 */
export function toSuperscript(val: number | string): string {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
    'n': 'ⁿ', 'i': 'ⁱ'
  };
  return String(val).split('').map((char) => map[char] || char).join('');
}

/**
 * Replace all caret power notations (e.g. x^3, (t-1)^2, x^{2026}) with real superscripts
 */
export function cleanSuperscriptsText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\^\{([0-9+\-ni]+)\}/g, (_, exp) => toSuperscript(exp))
    .replace(/\^([0-9ni]+)/g, (_, exp) => toSuperscript(exp));
}

/**
 * Phonetic speech synthesis formatter for Indonesian mathematical TTS
 * Converts latex-style notations or math formulas to fluent Indonesian spoken words
 */
export function formatSpeechMathIndonesian(text: string): string {
  if (!text) return '';

  let spoken = text;

  // Clean markdown bold/italic
  spoken = spoken.replace(/\*\*(.*?)\*\*/g, '$1');
  spoken = spoken.replace(/\*(.*?)\*/g, '$1');
  spoken = spoken.replace(/#{1,6}\s+/g, '');

  // Math substitutions
  spoken = spoken
    .replace(/P\(x\)/g, 'Pe dari eks')
    .replace(/Q\(x\)/g, 'Ki dari eks')
    .replace(/H\(x\)/g, 'Ha dari eks')
    .replace(/S\(x\)/g, 'Es dari eks')
    .replace(/f\(x\)/g, 'Ef dari eks')
    .replace(/g\(x\)/g, 'Ge dari eks')
    .replace(/T\(x\)/g, 'Te dari eks')
    .replace(/C\(x\)/g, 'Ce dari eks')
    .replace(/V\(t\)/g, 'Ve dari te')
    .replace(/x²⁰²⁶|x\^\{2026\}|x\^2026/g, 'eks pangkat dua ribu dua puluh enam')
    .replace(/x²⁰²⁵|x\^\{2025\}|x\^2025/g, 'eks pangkat dua ribu dua puluh lima')
    .replace(/1²⁰²⁶|1\^\{2026\}|1\^2026/g, 'satu pangkat dua ribu dua puluh enam')
    .replace(/1²⁰²⁵|1\^\{2025\}|1\^2025/g, 'satu pangkat dua ribu dua puluh lima')
    .replace(/x\^4|x⁴/g, 'eks pangkat empat')
    .replace(/x\^3|x³/g, 'eks pangkat tiga')
    .replace(/x\^2|x²/g, 'eks kuadrat')
    .replace(/t\^3|t³/g, 'te pangkat tiga')
    .replace(/t\^2|t²/g, 'te kuadrat')
    .replace(/m\^2|m²/g, 'em kuadrat')
    .replace(/n\^2|n²/g, 'en kuadrat')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 per $2')
    .replace(/\+/g, ' ditambah ')
    .replace(/-(?=\s|\d|[a-zA-Z])/g, ' dikurangi ')
    .replace(/=/g, ' sama dengan ')
    .replace(/≠/g, ' tidak sama dengan ')
    .replace(/·/g, ' dikali ')
    .replace(/×/g, ' dikali ')
    .replace(/\\cdot/g, ' dikali ')
    .replace(/\\le|<=/g, ' kurang dari atau sama dengan ')
    .replace(/\\ge|>=/g, ' lebih dari atau sama dengan ')
    .replace(/\\pm/g, ' plus minus ')
    .replace(/\$/g, '')
    .replace(/\\/g, ' ');

  // Clean excessive spaces
  spoken = spoken.replace(/\s{2,}/g, ' ').trim();
  return spoken;
}

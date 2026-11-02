import React, { useEffect } from 'react';
import { Question, AppProgress } from '../types';
import { calculateEvaluation } from '../utils/mathLogic';
import { 
  BarChart3, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  AlertTriangle, 
  Sparkles, 
  Volume2, 
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ttsService } from '../utils/tts';

interface EvaluationViewProps {
  questions: Question[];
  progress: AppProgress;
  onNavigateToQuestion: (questionId: number) => void;
  onNavigateToCurriculum: () => void;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  questions,
  progress,
  onNavigateToQuestion,
  onNavigateToCurriculum,
}) => {
  const evalResult = calculateEvaluation(questions, progress);

  useEffect(() => {
    if (evalResult.percentage >= 80) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#881337', '#f59e0b', '#10b981'],
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }
  }, [evalResult.percentage]);

  const handleSpeakEvaluation = () => {
    ttsService.speak(
      `Hasil evaluasi belajar kamu. Skor keseluruhan adalah ${evalResult.totalScore} dari dua puluh lima dengan persentase ketuntasan ${evalResult.percentage} persen. ` +
      `Kategori pencapaianmu: ${evalResult.masteryCategory}. ` +
      `${evalResult.categoryDescription} ` +
      `Pesan motivasi Mister Jo: ${evalResult.misterJoMessage}`
    );
  };

  const getBadgeClass = (category: string) => {
    switch (category) {
      case 'MASTER POLINOMIAL':
        return 'bg-gradient-to-r from-amber-500 to-rose-600 text-white';
      case 'SANGAT BAIK':
        return 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white';
      case 'BAIK':
        return 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white';
      case 'PERLU LATIHAN':
        return 'bg-gradient-to-r from-amber-600 to-orange-700 text-white';
      default:
        return 'bg-gradient-to-r from-rose-700 to-stone-800 text-white';
    }
  };

  return (
    <div className="space-y-6 py-4 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-rose-700" />
            <span>LAPORAN EVALUASI &bull; GRUP FIKIBIMA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Rapor Penilaian Mandiri Siswa
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Analisis capaian kompetensi, grafik ketuntasan per materi, dan rekomendasi penguatan konsep.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSpeakEvaluation}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Volume2 className="w-4 h-4 text-white" />
          <span>Dengarkan Evaluasi Mister Jo</span>
        </button>
      </div>

      {/* Main Score & Mastery Category Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Score & Mastery Level */}
        <div className="md:col-span-2 bg-gradient-to-br from-rose-950 via-rose-900 to-rose-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-700 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-extrabold text-rose-300">
                Kategori Pencapaian Kompetensi
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-md ${getBadgeClass(evalResult.masteryCategory)}`}>
                {evalResult.masteryCategory}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
                {evalResult.percentage}%
              </span>
              <span className="text-rose-200 text-base sm:text-lg font-medium">
                (Skor: {evalResult.totalScore} / {evalResult.maxScore})
              </span>
            </div>

            <p className="text-rose-100 text-sm sm:text-base leading-relaxed mb-4">
              {evalResult.categoryDescription}
            </p>
          </div>

          {/* Motivational message quote from Mister Jo */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mt-2">
            <div className="flex items-center gap-2 text-rose-200 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Pesan Motivasi Mister Jo:</span>
            </div>
            <p className="text-xs sm:text-sm text-white italic">
              "{evalResult.misterJoMessage}"
            </p>
          </div>
        </div>

        {/* Quick Answer Stats Counter */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="font-extrabold text-stone-900 text-base border-b border-stone-100 pb-2">
            Rincian Status 25 Soal
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-950">Jawaban Benar</span>
              </div>
              <span className="text-base font-extrabold text-emerald-700">
                {evalResult.totalCorrect} Soal
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-amber-950">Skor Parsial</span>
              </div>
              <span className="text-base font-extrabold text-amber-700">
                {evalResult.totalPartial} Soal
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span className="text-xs font-bold text-rose-950">Jawaban Salah</span>
              </div>
              <span className="text-base font-extrabold text-rose-700">
                {evalResult.totalWrong} Soal
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-stone-500" />
                <span className="text-xs font-bold text-stone-700">Belum Dijawab</span>
              </div>
              <span className="text-base font-extrabold text-stone-600">
                {evalResult.totalUnanswered} Soal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Per-Material Visual Progress Bar Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-700" />
            <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
              Grafik Ketuntasan Belajar Per Materi Pokok
            </h3>
          </div>
          <button
            type="button"
            onClick={onNavigateToCurriculum}
            className="text-xs font-bold text-rose-700 hover:underline"
          >
            Lihat Kisi-kisi Peta Materi →
          </button>
        </div>

        <div className="space-y-4 pt-2">
          {evalResult.materialScores.map((mat) => (
            <div key={mat.materialId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-stone-800">
                  {mat.title}
                </span>
                <span className="font-extrabold text-rose-900 font-mono">
                  {mat.percentage}% ({mat.score} / {mat.totalCount})
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    mat.percentage >= 80
                      ? 'bg-emerald-600'
                      : mat.percentage >= 60
                      ? 'bg-amber-500'
                      : 'bg-rose-600'
                  }`}
                  style={{ width: `${Math.max(4, mat.percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weakness Diagnostics & Study Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kelemahan Siswa */}
        <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-800 border-b border-rose-100 pb-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h4 className="font-extrabold text-base text-stone-900">
              Analisis Kelemahan / Titik Rawan
            </h4>
          </div>
          <div className="space-y-2 pt-1">
            {evalResult.weaknesses.map((w, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs sm:text-sm text-stone-800">
                <span className="w-5 h-5 rounded-lg bg-rose-200 text-rose-900 font-bold flex items-center justify-center shrink-0 text-xs">
                  {idx + 1}
                </span>
                <p className="leading-snug">{w}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rekomendasi Materi */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 border-b border-emerald-100 pb-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h4 className="font-extrabold text-base text-stone-900">
              Rekomendasi Belajar Ulang
            </h4>
          </div>
          <div className="space-y-2 pt-1">
            {evalResult.recommendations.map((r, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs sm:text-sm text-stone-800">
                <span className="w-5 h-5 rounded-lg bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center shrink-0 text-xs">
                  {idx + 1}
                </span>
                <p className="leading-snug">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Question, UserAnswerState, AppProgress } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck, 
  HelpCircle, 
  BookOpen, 
  Zap, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  Grid,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StimulusCard } from '../components/StimulusCard';
import { MathView } from '../components/MathView';
import { gradeAnswer } from '../utils/mathLogic';
import { updateAnswerInStorage, saveProgress } from '../utils/storage';
import { ttsService } from '../utils/tts';

interface QuizViewProps {
  questions: Question[];
  progress: AppProgress;
  onUpdateProgress: (progress: AppProgress) => void;
  onViewAllExplanations: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  progress,
  onUpdateProgress,
  onViewAllExplanations,
}) => {
  const currentIndex = progress.currentQuestionIndex;
  const currentQ = questions[currentIndex] || questions[0];

  const currentAnswer: UserAnswerState = progress.answers[currentQ.id] || {
    questionId: currentQ.id,
    type: currentQ.type,
    isSubmitted: false,
    scoreEarned: 0,
    hintsUnlockedCount: 0,
    isBookmarked: false,
    viewedExplanation: false,
    viewedCaraCepat: false,
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalKeyFormulaOpen, setModalKeyFormulaOpen] = useState(false);
  const [modalCaraCepatOpen, setModalCaraCepatOpen] = useState(false);
  const [showExplanationInline, setShowExplanationInline] = useState(false);

  // Local interaction handlers
  const handleSelectPg = (optionId: string) => {
    if (currentAnswer.isSubmitted) return;
    const updated = updateAnswerInStorage(currentQ.id, (prev) => ({
      ...(prev || currentAnswer),
      pgSelected: optionId,
    }));
    onUpdateProgress(updated);
  };

  const handleTogglePgk = (optionId: string) => {
    if (currentAnswer.isSubmitted) return;
    const currentList = currentAnswer.pgkSelected || [];
    const nextList = currentList.includes(optionId)
      ? currentList.filter((id) => id !== optionId)
      : [...currentList, optionId];

    const updated = updateAnswerInStorage(currentQ.id, (prev) => ({
      ...(prev || currentAnswer),
      pgkSelected: nextList,
    }));
    onUpdateProgress(updated);
  };

  const handleSelectBs = (statementId: number, isBenar: boolean) => {
    if (currentAnswer.isSubmitted) return;
    const currentMap = currentAnswer.bsSelected || {};
    const updatedMap = { ...currentMap, [statementId]: isBenar };

    const updated = updateAnswerInStorage(currentQ.id, (prev) => ({
      ...(prev || currentAnswer),
      bsSelected: updatedMap,
    }));
    onUpdateProgress(updated);
  };

  const handleCheckAnswer = () => {
    const grading = gradeAnswer(currentQ, currentAnswer);
    const updated = updateAnswerInStorage(currentQ.id, (prev) => ({
      ...(prev || currentAnswer),
      isSubmitted: true,
      isCorrect: grading.isCorrect,
      scoreEarned: grading.scoreEarned,
      partialScoreDetail: grading.detail,
      submittedAt: new Date().toISOString(),
    }));
    onUpdateProgress(updated);

    // Speak grading feedback
    let feedbackSpeech = '';
    if (grading.isCorrect) {
      feedbackSpeech = `Luar biasa! Jawabanmu untuk soal nomor ${currentQ.id} benar sempurna. Skor penuh satu koma nol.`;
    } else if (grading.scoreEarned > 0) {
      feedbackSpeech = `Bagus! Kamu mendapatkan skor parsial ${Math.round(grading.scoreEarned * 100)} persen untuk soal nomor ${currentQ.id}. Cek pembahasannya untuk melihat penyelesaian lengkap.`;
    } else {
      feedbackSpeech = `Jawabanmu belum tepat untuk soal nomor ${currentQ.id}. Jangan khawatir, buka tombol Petunjuk atau Pembahasan untuk mempelajari langkah yang benar!`;
    }
    ttsService.speak(feedbackSpeech);
  };

  const handleUnlockHint = () => {
    const nextCount = Math.min(3, (currentAnswer.hintsUnlockedCount || 0) + 1);
    const updated = updateAnswerInStorage(currentQ.id, (prev) => ({
      ...(prev || currentAnswer),
      hintsUnlockedCount: nextCount,
    }));
    onUpdateProgress(updated);

    // Speak unlocked hint
    let hintText = '';
    if (nextCount === 1) {
      hintText = `Petunjuk tahap satu, identifikasi konsep: ${currentQ.hints.hint1Identifikasi}`;
    } else if (nextCount === 2) {
      hintText = `Petunjuk tahap dua, pemilihan rumus: ${currentQ.hints.hint2Rumus}`;
    } else {
      hintText = `Petunjuk tahap tiga, arahan perhitungan: ${currentQ.hints.hint3Langkah}`;
    }
    ttsService.speak(hintText);
  };

  const handleToggleBookmark = () => {
    const nextBookmarked = !currentAnswer.isBookmarked;
    const updated = updateAnswerInStorage(currentQ.id, (prev) => ({
      ...(prev || currentAnswer),
      isBookmarked: nextBookmarked,
    }));
    onUpdateProgress(updated);
  };

  const handleNavigateQuestion = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= questions.length) return;
    const nextQ = questions[targetIndex];
    const updatedProgress = {
      ...progress,
      currentQuestionIndex: targetIndex,
    };
    saveProgress(updatedProgress);
    onUpdateProgress(updatedProgress);
    setDrawerOpen(false);
    setShowExplanationInline(false);

    // Trigger guide audio for next question
    ttsService.speak(
      `Soal nomor ${nextQ.id}. ${nextQ.materialTitle}. Coba perhatikan informasi pada stimulus sebelum menghitung!`
    );
  };

  const handleSpeakQuestion = () => {
    ttsService.speak(
      `Soal nomor ${currentQ.id}. ${currentQ.spokenQuestion}`
    );
  };

  const handleOpenCaraCepat = () => {
    setModalCaraCepatOpen(true);
    updateAnswerInStorage(currentQ.id, (prev) => ({
      ...(prev || currentAnswer),
      viewedCaraCepat: true,
    }));
    ttsService.speak(
      `Cara Cepat Mister Jo untuk nomor ${currentQ.id}. ${currentQ.caraCepatMisterJo.title}. ${currentQ.caraCepatMisterJo.spokenText}`
    );
  };

  const handleOpenKeyFormula = () => {
    setModalKeyFormulaOpen(true);
    ttsService.speak(
      `Rumus kunci yang relevan untuk nomor ${currentQ.id} adalah: ${currentQ.keyFormulaRef}`
    );
  };

  const handleToggleExplanation = () => {
    const nextState = !showExplanationInline;
    setShowExplanationInline(nextState);
    if (nextState) {
      updateAnswerInStorage(currentQ.id, (prev) => ({
        ...(prev || currentAnswer),
        viewedExplanation: true,
      }));
      ttsService.speak(
        `Pembahasan soal nomor ${currentQ.id}. ${currentQ.explanation.spokenSummary}. ${currentQ.explanation.fKesimpulan}`
      );
    }
  };

  // Determine answered count & progress
  const answeredCount = Object.values(progress.answers).filter((a) => a.isSubmitted).length;

  return (
    <div className="space-y-6 py-4 animate-fade-in max-w-5xl mx-auto">
      {/* Question Header & Navigator Control */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-rose-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-white font-extrabold flex items-center justify-center text-xl shadow-md border border-rose-700">
            {currentQ.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                {currentQ.type === 'PG' ? 'Pilihan Ganda' : currentQ.type === 'PGK' ? 'Pilihan Ganda Kompleks' : 'Benar / Salah'}
              </span>
              <span className="text-xs font-semibold text-stone-500">
                Tingkat: <strong className="text-stone-800">{currentQ.difficulty}</strong>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900">
              {currentQ.materialTitle}
            </h2>
          </div>
        </div>

        {/* Quick Question Selector Modal Button & Bookmark */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
              currentAnswer.isBookmarked
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
            title={currentAnswer.isBookmarked ? 'Hapus Tanda Ragu' : 'Tandai Soal untuk Ditinjau'}
          >
            {currentAnswer.isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-amber-600 fill-current" />
            ) : (
              <Bookmark className="w-4 h-4 text-stone-500" />
            )}
            <span className="hidden sm:inline">
              {currentAnswer.isBookmarked ? 'Ditandai' : 'Tandai Soal'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition flex items-center gap-2 border border-stone-300"
          >
            <Grid className="w-4 h-4 text-rose-700" />
            <span>Daftar 25 Soal ({answeredCount}/25)</span>
          </button>
        </div>
      </div>

      {/* Stimulus Card (Non-decorative, Authentic HOTS) */}
      <StimulusCard stimulus={currentQ.stimulus} questionNumber={currentQ.id} />

      {/* Main Question Card with Large Clear Typography */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        {/* Question Text */}
        <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="space-y-2 flex-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-800">
              Naskah Pertanyaan:
            </span>
            <p className="text-stone-900 font-bold text-lg sm:text-xl leading-relaxed">
              {currentQ.questionText}
            </p>
            {currentQ.questionLatex && (
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center my-2">
                <MathView math={currentQ.questionLatex} displayMode className="text-base sm:text-lg font-bold text-stone-800" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleSpeakQuestion}
            className="p-2 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 shrink-0"
            title="Dengarkan Naskah Pertanyaan"
          >
            <Volume2 className="w-4 h-4 text-rose-700" />
          </button>
        </div>

        {/* Answer Options Area */}
        <div className="space-y-3">
          {/* 1. Tipe PG */}
          {currentQ.type === 'PG' && currentQ.options && (
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-stone-500 block">
                Pilih satu jawaban yang paling tepat:
              </span>
              {currentQ.options.map((opt) => {
                const isSelected = currentAnswer.pgSelected === opt.id;
                const isSubmitted = currentAnswer.isSubmitted;
                const isCorrectOpt = opt.id === currentQ.correctPg;

                let optStyle = 'border-stone-200 hover:border-rose-300 bg-white text-stone-800';
                if (isSelected && !isSubmitted) {
                  optStyle = 'border-rose-600 bg-rose-50/80 text-rose-950 ring-2 ring-rose-500/30';
                } else if (isSubmitted) {
                  if (isCorrectOpt) {
                    optStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrectOpt) {
                    optStyle = 'border-rose-500 bg-rose-50 text-rose-950 line-through opacity-85';
                  } else {
                    optStyle = 'border-stone-200 bg-stone-50/50 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectPg(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center text-sm shrink-0 ${
                          isSelected
                            ? 'bg-rose-800 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {opt.id}
                      </div>
                      <span className="text-base sm:text-lg font-medium">
                        {opt.text}
                      </span>
                    </div>
                    {opt.latex && (
                      <span className="text-sm font-mono text-stone-600 hidden sm:inline">
                        <MathView math={opt.latex} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Tipe PGK */}
          {currentQ.type === 'PGK' && currentQ.options && (
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-stone-500 block">
                Pilih SELURUH pilihan yang benar (bisa lebih dari satu):
              </span>
              {currentQ.options.map((opt) => {
                const isSelected = (currentAnswer.pgkSelected || []).includes(opt.id);
                const isSubmitted = currentAnswer.isSubmitted;
                const isCorrectOpt = (currentQ.correctPgk || []).includes(opt.id);

                let optStyle = 'border-stone-200 hover:border-blue-300 bg-white text-stone-800';
                if (isSelected && !isSubmitted) {
                  optStyle = 'border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-500/30';
                } else if (isSubmitted) {
                  if (isCorrectOpt) {
                    optStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrectOpt) {
                    optStyle = 'border-rose-500 bg-rose-50 text-rose-950 line-through opacity-85';
                  } else {
                    optStyle = 'border-stone-200 bg-stone-50/50 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleTogglePgk(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center text-sm shrink-0 border ${
                          isSelected
                            ? 'bg-blue-800 text-white border-blue-800 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        {opt.id}
                      </div>
                      <span className="text-base sm:text-lg font-medium">
                        {opt.text}
                      </span>
                    </div>
                    {opt.latex && (
                      <span className="text-sm font-mono text-stone-600 hidden sm:inline">
                        <MathView math={opt.latex} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 3. Tipe BS */}
          {currentQ.type === 'BS' && currentQ.statements && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-stone-500 block">
                Tentukan status Benar atau Salah pada setiap pernyataan:
              </span>
              <div className="space-y-2.5">
                {currentQ.statements.map((stmt) => {
                  const selectedVal = (currentAnswer.bsSelected || {})[stmt.id];
                  const isSubmitted = currentAnswer.isSubmitted;
                  const isMatch = selectedVal === stmt.correctIsBenar;

                  return (
                    <div
                      key={stmt.id}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSubmitted
                          ? isMatch
                            ? 'bg-emerald-50/70 border-emerald-300'
                            : 'bg-rose-50/70 border-rose-300'
                          : 'bg-stone-50/70 border-stone-200'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center">
                            {stmt.id}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-stone-900">
                            {stmt.statement}
                          </span>
                        </div>
                        {stmt.latex && (
                          <div className="pl-8 text-xs font-mono text-stone-600">
                            <MathView math={stmt.latex} />
                          </div>
                        )}
                        {isSubmitted && (
                          <p className="text-xs text-stone-600 pl-8 italic mt-1">
                            Kunci: <strong className={stmt.correctIsBenar ? 'text-emerald-700' : 'text-rose-700'}>
                              {stmt.correctIsBenar ? 'BENAR' : 'SALAH'}
                            </strong> — {stmt.explanation}
                          </p>
                        )}
                      </div>

                      {/* True / False Choice Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelectBs(stmt.id, true)}
                          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition border ${
                            selectedVal === true
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                              : 'bg-white text-stone-700 border-stone-300 hover:bg-emerald-50'
                          }`}
                        >
                          BENAR
                        </button>
                        <button
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelectBs(stmt.id, false)}
                          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition border ${
                            selectedVal === false
                              ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                              : 'bg-white text-stone-700 border-stone-300 hover:bg-rose-50'
                          }`}
                        >
                          SALAH
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Feedback Banner if submitted */}
        {currentAnswer.isSubmitted && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
              currentAnswer.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : currentAnswer.scoreEarned > 0
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {currentAnswer.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="font-bold text-sm sm:text-base">
                  {currentAnswer.isCorrect ? 'Jawaban Sempurna!' : currentAnswer.scoreEarned > 0 ? 'Skor Parsial Diterima' : 'Jawaban Perlu Diperbaiki'}
                </h4>
                <p className="text-xs sm:text-sm">
                  {currentAnswer.partialScoreDetail}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider block">Nilai Soal</span>
              <span className="text-lg sm:text-xl font-extrabold">
                {(currentAnswer.scoreEarned * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        )}

        {/* 4 Interactive Buttons required in Section H:
            Periksa Jawaban, Petunjuk Bertahap, Pembahasan, Cara Cepat, Rumus Kunci */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-2">
            {/* Tombol Periksa Jawaban */}
            {!currentAnswer.isSubmitted ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>PERIKSA JAWABAN</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const updated = updateAnswerInStorage(currentQ.id, (prev) => ({
                    ...(prev || currentAnswer),
                    isSubmitted: false,
                  }));
                  onUpdateProgress(updated);
                }}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm transition border border-stone-300"
              >
                Coba Jawab Ulang
              </button>
            )}

            {/* Tombol Petunjuk Bertahap */}
            <button
              type="button"
              onClick={handleUnlockHint}
              disabled={currentAnswer.hintsUnlockedCount >= 3}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 border ${
                currentAnswer.hintsUnlockedCount >= 3
                  ? 'bg-stone-100 text-stone-400 border-stone-200'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
              title="Buka Petunjuk Bertahap (Tahap 1 Konsep, Tahap 2 Rumus, Tahap 3 Perhitungan)"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>
                PETUNJUK ({currentAnswer.hintsUnlockedCount || 0}/3)
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Tombol Cara Cepat */}
            <button
              type="button"
              onClick={handleOpenCaraCepat}
              className="px-3.5 py-2.5 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-purple-700" />
              <span>CARA CEPAT</span>
            </button>

            {/* Tombol Rumus Kunci */}
            <button
              type="button"
              onClick={handleOpenKeyFormula}
              className="px-3.5 py-2.5 rounded-xl bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-300 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>RUMUS KUNCI</span>
            </button>

            {/* Tombol Pembahasan */}
            <button
              type="button"
              onClick={handleToggleExplanation}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 border ${
                showExplanationInline
                  ? 'bg-rose-800 text-white border-rose-800'
                  : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-700" />
              <span>{showExplanationInline ? 'TUTUP PEMBAHASAN' : 'PEMBAHASAN'}</span>
            </button>
          </div>
        </div>

        {/* Progressive Hints Unlocked Display */}
        {(currentAnswer.hintsUnlockedCount || 0) > 0 && (
          <div className="space-y-2.5 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Bimbingan Petunjuk Bertahap Mister Jo:
              </span>
              <span>{currentAnswer.hintsUnlockedCount}/3 Tahap Terbuka</span>
            </div>

            {currentAnswer.hintsUnlockedCount >= 1 && (
              <div className="text-xs sm:text-sm bg-white p-3 rounded-xl border border-amber-200 text-stone-800">
                <strong className="text-amber-800">Tahap 1 (Identifikasi Konsep): </strong>
                {currentQ.hints.hint1Identifikasi}
              </div>
            )}
            {currentAnswer.hintsUnlockedCount >= 2 && (
              <div className="text-xs sm:text-sm bg-white p-3 rounded-xl border border-amber-200 text-stone-800">
                <strong className="text-amber-800">Tahap 2 (Pemilihan Rumus): </strong>
                {currentQ.hints.hint2Rumus}
              </div>
            )}
            {currentAnswer.hintsUnlockedCount >= 3 && (
              <div className="text-xs sm:text-sm bg-white p-3 rounded-xl border border-amber-200 text-stone-800">
                <strong className="text-amber-800">Tahap 3 (Arahan Perhitungan): </strong>
                {currentQ.hints.hint3Langkah}
              </div>
            )}
          </div>
        )}

        {/* Inline Explanation Box (7-Part Structure) */}
        {showExplanationInline && (
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-300 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rose-800" />
                <h4 className="font-extrabold text-base sm:text-lg text-rose-950">
                  Pembahasan Lengkap 7 Langkah Ilmiah (Soal #{currentQ.id})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => ttsService.speak(`Pembahasan lengkap soal nomor ${currentQ.id}. ${currentQ.explanation.spokenSummary}`)}
                className="text-xs bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengarkan</span>
              </button>
            </div>

            {/* A. Memahami Masalah */}
            <div className="text-xs sm:text-sm">
              <strong className="text-rose-900 block mb-1">A. MEMAHAMI MASALAH:</strong>
              <p className="text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                {currentQ.explanation.aMemahamiMasalah}
              </p>
            </div>

            {/* B. Konsep Matematika */}
            <div className="text-xs sm:text-sm">
              <strong className="text-rose-900 block mb-1">B. KONSEP MATEMATIKA:</strong>
              <p className="text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                {currentQ.explanation.bKonsepMatematika}
              </p>
            </div>

            {/* C. Rumus Kunci */}
            <div className="text-xs sm:text-sm">
              <strong className="text-rose-900 block mb-1">C. RUMUS KUNCI:</strong>
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center font-mono">
                <MathView math={currentQ.explanation.cRumusKunci} displayMode />
              </div>
            </div>

            {/* D. Langkah Perhitungan */}
            <div className="text-xs sm:text-sm">
              <strong className="text-rose-900 block mb-1">D. LANGKAH PERHITUNGAN:</strong>
              <div className="bg-white p-3 rounded-xl border border-stone-200 whitespace-pre-line font-mono text-stone-800 leading-relaxed">
                {currentQ.explanation.dLangkahPerhitungan}
              </div>
            </div>

            {/* E. Hasil Akhir */}
            <div className="text-xs sm:text-sm">
              <strong className="text-rose-900 block mb-1">E. HASIL AKHIR:</strong>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-300 font-bold text-emerald-950">
                {currentQ.explanation.eHasilAkhir}
              </div>
            </div>

            {/* F. Kesimpulan */}
            <div className="text-xs sm:text-sm">
              <strong className="text-rose-900 block mb-1">F. KESIMPULAN:</strong>
              <p className="text-stone-700 bg-white p-3 rounded-xl border border-stone-200">
                {currentQ.explanation.fKesimpulan}
              </p>
            </div>

            {/* G. Cara Cepat Mister Jo */}
            <div className="text-xs sm:text-sm bg-purple-50 p-4 rounded-xl border border-purple-200">
              <strong className="text-purple-900 block mb-1 flex items-center gap-1.5 font-bold">
                <Zap className="w-4 h-4 text-purple-700" />
                G. CARA CEPAT MISTER JO:
              </strong>
              <p className="text-purple-950 leading-relaxed">
                {currentQ.explanation.gCaraCepatMisterJo}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer (Previous / Next) */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => handleNavigateQuestion(currentIndex - 1)}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 border ${
            currentIndex === 0
              ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
              : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50 shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs sm:text-sm font-semibold text-stone-600">
          Soal {currentIndex + 1} dari {questions.length}
        </span>

        <button
          type="button"
          disabled={currentIndex === questions.length - 1}
          onClick={() => handleNavigateQuestion(currentIndex + 1)}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 border ${
            currentIndex === questions.length - 1
              ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
              : 'bg-rose-700 text-white border-rose-700 hover:bg-rose-800 shadow-md'
          }`}
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 25 Questions Grid Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border border-rose-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-stone-900">
                  Navigasi 25 Soal Polinomial
                </h3>
                <p className="text-xs text-stone-500">
                  Pilih nomor soal untuk melompat langsung ke lembar latihan
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg text-xs font-bold"
              >
                ✕ Tutup
              </button>
            </div>

            {/* Grid 1 to 25 */}
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2.5 max-h-[60vh] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const ans = progress.answers[q.id];
                const isCurrent = idx === currentIndex;
                const isDone = ans && ans.isSubmitted;
                const isMarked = ans && ans.isBookmarked;

                let btnBg = 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-rose-50';
                if (isCurrent) {
                  btnBg = 'bg-rose-800 text-white font-extrabold border-rose-900 ring-2 ring-rose-500/40';
                } else if (isDone) {
                  btnBg = ans.scoreEarned === 1.0 
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold' 
                    : 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleNavigateQuestion(idx)}
                    className={`h-12 rounded-xl border flex flex-col items-center justify-center relative transition ${btnBg}`}
                  >
                    <span className="text-sm font-extrabold leading-none">{q.id}</span>
                    <span className="text-[9px] uppercase font-semibold text-stone-500">
                      M{q.materialId}
                    </span>
                    {isMarked && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 pt-3 border-t border-stone-100">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-400" />
                Sudah Terjawab
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-stone-100 border border-stone-300" />
                Belum Terjawab
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Ditandai Ragu
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-800 text-white" />
                Soal Aktif
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cara Cepat Mister Jo */}
      {modalCaraCepatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-purple-200 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700">Trik Kilat Aljabar</span>
                  <h3 className="font-extrabold text-base sm:text-lg text-purple-950">
                    {currentQ.caraCepatMisterJo.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalCaraCepatOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 text-xs sm:text-sm text-purple-950 leading-relaxed">
              {currentQ.caraCepatMisterJo.explanation}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => ttsService.speak(currentQ.caraCepatMisterJo.spokenText)}
                className="px-3.5 py-2 rounded-xl bg-purple-100 text-purple-900 font-bold text-xs hover:bg-purple-200 transition flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengarkan Suara</span>
              </button>
              <button
                type="button"
                onClick={() => setModalCaraCepatOpen(false)}
                className="px-4 py-2 rounded-xl bg-purple-800 text-white font-bold text-xs hover:bg-purple-900 transition"
              >
                Tutup Trik
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Key Formula */}
      {modalKeyFormulaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-rose-200 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                  Rumus Kunci Soal #{currentQ.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalKeyFormulaOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-center font-mono">
              <MathView math={currentQ.keyFormulaRef} displayMode className="text-base font-bold text-rose-950" />
            </div>

            <p className="text-xs text-stone-600">
              Gunakan konsep rumus kunci di atas untuk menguraikan hubungan antara pembagi, hasil bagi, dan sisa.
            </p>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setModalKeyFormulaOpen(false)}
                className="px-4 py-2 rounded-xl bg-rose-800 text-white font-bold text-xs hover:bg-rose-900 transition"
              >
                Saya Paham
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

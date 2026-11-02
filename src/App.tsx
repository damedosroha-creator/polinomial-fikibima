import React, { useState, useEffect } from 'react';
import { AudioControlBar } from './components/AudioControlBar';
import { Navbar, NavTab } from './components/Navbar';
import { ResetModal } from './components/ResetModal';
import { HomeView } from './views/HomeView';
import { InstructionsView } from './views/InstructionsView';
import { CurriculumView } from './views/CurriculumView';
import { KeyFormulasView } from './views/KeyFormulasView';
import { QuizView } from './views/QuizView';
import { ExplanationsView } from './views/ExplanationsView';
import { EvaluationView } from './views/EvaluationView';
import { ProgressView } from './views/ProgressView';
import { QUESTIONS_DATA } from './data/questions';
import { loadProgress, saveProgress, resetAllProgress } from './utils/storage';
import { AppProgress } from './types';
import { ttsService } from './utils/tts';

export default function App() {
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress());
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Check URL parameters (e.g. ?autostart=1 skips directly to quiz)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setActiveTab('latihan');
      } else if (progress.lastActiveTab && ['beranda', 'petunjuk', 'peta', 'rumus', 'latihan', 'pembahasan', 'evaluasi', 'progres'].includes(progress.lastActiveTab)) {
        // Continue from last active tab if exists
        setActiveTab(progress.lastActiveTab as NavTab);
      }
    }
  }, []);

  // Save active tab change
  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    const updated = {
      ...progress,
      lastActiveTab: tab,
    };
    setProgress(updated);
    saveProgress(updated);
  };

  const handleUpdateProgress = (newProgress: AppProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleConfirmReset = () => {
    const fresh = resetAllProgress();
    setProgress(fresh);
    ttsService.speak('Seluruh progres belajar, jawaban, dan nilai Anda telah direset ke kondisi awal.');
  };

  const handleStartMaterialFromCurriculum = (materialId: number) => {
    // Jump to first question of this material
    const targetIdx = QUESTIONS_DATA.findIndex((q) => q.materialId === materialId);
    if (targetIdx !== -1) {
      const updated = {
        ...progress,
        currentQuestionIndex: targetIdx,
        lastActiveTab: 'latihan',
      };
      setProgress(updated);
      saveProgress(updated);
      setActiveTab('latihan');
      ttsService.speak(`Mulai latihan Materi ${materialId}. Soal nomor ${QUESTIONS_DATA[targetIdx].id}.`);
    }
  };

  const handleNavigateToQuestionFromProgress = (targetIndex: number) => {
    const updated = {
      ...progress,
      currentQuestionIndex: targetIndex,
      lastActiveTab: 'latihan',
    };
    setProgress(updated);
    saveProgress(updated);
    setActiveTab('latihan');
  };

  const answeredCount = Object.values(progress.answers).filter((a) => a.isSubmitted).length;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-rose-600 selection:text-white">
      {/* 1. Mister Jo Audio Tutor Dock */}
      <AudioControlBar />

      {/* 2. Main Navigation Bar with Offline Indicator */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        answeredCount={answeredCount}
        totalQuestions={QUESTIONS_DATA.length}
      />

      {/* 3. Main Views Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4">
        {activeTab === 'beranda' && (
          <HomeView
            onNavigate={handleSelectTab}
            answeredCount={answeredCount}
            totalQuestions={QUESTIONS_DATA.length}
          />
        )}

        {activeTab === 'petunjuk' && (
          <InstructionsView />
        )}

        {activeTab === 'peta' && (
          <CurriculumView onStartMaterial={handleStartMaterialFromCurriculum} />
        )}

        {activeTab === 'rumus' && (
          <KeyFormulasView />
        )}

        {activeTab === 'latihan' && (
          <QuizView
            questions={QUESTIONS_DATA}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onViewAllExplanations={() => handleSelectTab('pembahasan')}
          />
        )}

        {activeTab === 'pembahasan' && (
          <ExplanationsView questions={QUESTIONS_DATA} />
        )}

        {activeTab === 'evaluasi' && (
          <EvaluationView
            questions={QUESTIONS_DATA}
            progress={progress}
            onNavigateToQuestion={handleNavigateToQuestionFromProgress}
            onNavigateToCurriculum={() => handleSelectTab('peta')}
          />
        )}

        {activeTab === 'progres' && (
          <ProgressView
            questions={QUESTIONS_DATA}
            progress={progress}
            onNavigateToQuestion={handleNavigateToQuestionFromProgress}
            onOpenResetModal={() => setIsResetModalOpen(true)}
          />
        )}
      </main>

      {/* 4. Elegant Academic Footer */}
      <footer className="bg-white border-t border-rose-200 py-6 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-rose-950">
            POLINOMIAL MASTERCLASS &bull; RAHASIA SUKU BANYAK — Dari Pemula Menjadi Ahli
          </p>
          <p className="text-stone-600">
            Dikeluarkan untuk Matematika SMA Kelas XI &bull; Dibimbing oleh <strong>Mister Jo</strong> &bull; Komunitas Belajar <strong>Grup FIKIBIMA</strong>
          </p>
          <p className="text-[11px] text-stone-400">
            Dirancang dengan arsitektur responsif, rendering matematika KaTeX, Web Speech API, dan penyimpanan offline mandiri.
          </p>
        </div>
      </footer>

      {/* 5. Reset Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

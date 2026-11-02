import React from 'react';
import { Question, AppProgress } from '../types';
import { 
  HardDriveDownload, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  BookmarkCheck, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock
} from 'lucide-react';
import { ttsService } from '../utils/tts';

interface ProgressViewProps {
  questions: Question[];
  progress: AppProgress;
  onNavigateToQuestion: (index: number) => void;
  onOpenResetModal: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  questions,
  progress,
  onNavigateToQuestion,
  onOpenResetModal,
}) => {
  const answeredList = questions.filter((q) => progress.answers[q.id]?.isSubmitted);
  const unansweredList = questions.filter((q) => !progress.answers[q.id]?.isSubmitted);
  const bookmarkedList = questions.filter((q) => progress.answers[q.id]?.isBookmarked);

  const handleSpeakProgress = () => {
    ttsService.speak(
      `Progres belajar Anda. Kamu telah menyelesaikan ${answeredList.length} dari ${questions.length} soal. ` +
      `Terdapat ${bookmarkedList.length} soal yang kamu tandai untuk ditinjau. Seluruh data tersimpan secara offline di browser ini.`
    );
  };

  return (
    <div className="space-y-6 py-4 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>PENYIMPANAN OFFLINE LOCALSTORAGE AKTIF</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Pusat Progres & Manajemen Latihan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Riwayat pengerjaan, penandaan soal ragu, dan status kelengkapan 25 soal di perangkat ini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSpeakProgress}
            className="p-2.5 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Volume2Icon className="w-4 h-4 text-rose-700" />
            <span className="hidden sm:inline">Dengarkan</span>
          </button>
          <button
            type="button"
            onClick={onOpenResetModal}
            className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-300 font-bold text-xs sm:text-sm transition flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-rose-700" />
            <span>Reset Seluruh Progres</span>
          </button>
        </div>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">Soal Terjawab</span>
            <p className="text-2xl font-extrabold text-stone-900">{answeredList.length} / 25</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6 text-stone-500" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Belum Dijawab</span>
            <p className="text-2xl font-extrabold text-stone-900">{unansweredList.length} / 25</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <BookmarkCheck className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Ditandai Ragu</span>
            <p className="text-2xl font-extrabold text-stone-900">{bookmarkedList.length} Soal</p>
          </div>
        </div>
      </div>

      {/* Offline Storage Notice Box as requested in Section M */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-300">
            Jaminan Akses Tanpa Kuota / Offline
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            "PROGRES TERSIMPAN DI PERANGKAT INI"
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Jawaban, petunjuk yang telah dibuka, riwayat nilai, dan posisi terakhir pengerjaan tersimpan otomatis di memori browser lokal. Aplikasi tidak memerlukan koneksi internet untuk melanjutkan latihan!
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToQuestion(progress.currentQuestionIndex || 0)}
          className="px-6 py-3 rounded-xl bg-white text-emerald-950 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-emerald-50 transition flex items-center gap-2 shrink-0"
        >
          <span>Lanjutkan Soal Terakhir (#{progress.currentQuestionIndex + 1})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Marked / Bookmarked Questions Section */}
      {bookmarkedList.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-900 border-b border-amber-100 pb-2">
            <BookmarkCheck className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-base text-stone-900">
              Daftar Soal yang Kamu Tandai untuk Ditinjau ({bookmarkedList.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {bookmarkedList.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => onNavigateToQuestion(q.id - 1)}
                className="p-3.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-amber-900">Soal Nomor {q.id}</span>
                  <p className="text-xs text-stone-600 line-clamp-1">{q.questionText}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function Volume2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  );
}

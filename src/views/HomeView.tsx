import React from 'react';
import { 
  Play, 
  HelpCircle, 
  Compass, 
  KeyRound, 
  PenTool, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Brain, 
  Cpu, 
  Volume2, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { ttsService } from '../utils/tts';
import { NavTab } from '../components/Navbar';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  answeredCount: number;
  totalQuestions: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  answeredCount,
  totalQuestions,
}) => {
  const handleStartGreeting = () => {
    ttsService.setUserInteracted();
    ttsService.speak(
      'Halo teman-teman FIKIBIMA! Selamat datang di Polinomial Masterclass bersama Mister Jo. Hari ini kita akan menaklukkan materi suku banyak matematika SMA kelas sebelas. Tenang saja, kalau selama ini kalian merasa pembagian polinomial itu rumit, kita akan belajar langkah demi langkah. Kita mulai dari memahami masalah, memilih strategi, dan akhirnya menemukan jawabannya. Siap menjadi master polinomial?'
    );
  };

  const benefits = [
    { text: 'Memahami konsep dasar suku banyak secara intuitif dan kokoh', icon: <Brain className="w-4 h-4 text-rose-700" /> },
    { text: 'Melatih kemampuan numerik aljabar tingkat lanjut tanpa kesalahan tanda', icon: <Cpu className="w-4 h-4 text-rose-700" /> },
    { text: 'Melatih penalaran tingkat tinggi (HOTS) berbasis stimulus kontekstual', icon: <Sparkles className="w-4 h-4 text-rose-700" /> },
    { text: 'Memahami strategi pembagian polinomial bersusun dan bagan Horner sintetis', icon: <CheckCircle2 className="w-4 h-4 text-rose-700" /> },
    { text: 'Menguasai Teorema Sisa 1 untuk pembagi linear berderajat satu', icon: <Zap className="w-4 h-4 text-rose-700" /> },
    { text: 'Menguasai Teorema Sisa 2 untuk pembagi kuadratik berbentuk sisa linear', icon: <Zap className="w-4 h-4 text-rose-700" /> },
    { text: 'Menguasai Teorema Faktor untuk menemukan akar-akar rasional suku banyak', icon: <Award className="w-4 h-4 text-rose-700" /> },
    { text: 'Menyelesaikan persoalan variabel sisipan dengan sistem persamaan simultan', icon: <Brain className="w-4 h-4 text-rose-700" /> },
    { text: 'Meningkatkan kecepatan dan ketepatan dengan Jurus Kilat Cara Cepat Mister Jo', icon: <Sparkles className="w-4 h-4 text-rose-700" /> },
  ];

  return (
    <div className="space-y-8 py-4 sm:py-6 animate-fade-in">
      {/* Hero Banner with Elegant Merah-Putih Academic Vibe */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950 via-rose-900 to-rose-800 text-white shadow-xl border border-rose-700 p-6 sm:p-10">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Institution Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-rose-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>GRUP FIKIBIMA &bull; MATEMATIKA SMA KELAS XI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            POLINOMIAL MASTERCLASS
          </h1>
          <h2 className="text-xl sm:text-2xl font-serif italic text-rose-200 font-light mb-4">
            "RAHASIA SUKU BANYAK — Dari Pemula Menjadi Ahli"
          </h2>

          <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed max-w-2xl mb-6">
            Selamat datang di laboratorium tutor digital matematika bersama <strong>Mister Jo</strong>.
            Aplikasi ini mendampingi siswa SMA memahami stimulus, mengidentifikasi konsep,
            melakukan komputasi terstruktur, hingga menguasai trik kilat matematis yang cerdas.
          </p>

          {/* Teacher Badge & Speech greeting trigger */}
          <div className="flex flex-wrap items-center gap-4 pt-2 pb-6 border-t border-rose-800/80">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-extrabold text-white text-lg shadow-lg border-2 border-white/40">
                MJ
              </div>
              <div>
                <p className="font-bold text-white text-sm">Oleh MISTER JO</p>
                <p className="text-xs text-rose-300">Tutor Matematika & Edu-Tech Mentor</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartGreeting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-rose-950 font-bold text-xs sm:text-sm shadow-lg hover:bg-rose-50 transition transform hover:-translate-y-0.5"
            >
              <Volume2 className="w-4 h-4 text-rose-700" />
              <span>Dengarkan Sambutan Mister Jo</span>
            </button>
          </div>

          {/* Primary 6 Action Buttons specified in prompt section C */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('latihan')}
              className="flex items-center justify-between p-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 border border-rose-400 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-rose-200">Langkah 1</span>
                  <span>MULAI BELAJAR</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('petunjuk')}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-rose-200" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-rose-200">Panduan</span>
                  <span>PETUNJUK PENGGUNAAN</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition text-rose-200" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('peta')}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-rose-200" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-rose-200">Distribusi</span>
                  <span>KISI-KISI MATERI</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition text-rose-200" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('rumus')}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-rose-200">Formula Emas</span>
                  <span>RUMUS KUNCI POLINOMIAL</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition text-rose-200" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('latihan')}
              className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 border border-emerald-400 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <PenTool className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-emerald-200">Evaluasi</span>
                  <span>MULAI LATIHAN 25 SOAL</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('progres')}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-rose-200" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-rose-200">Status Belajar</span>
                  <span>LIHAT PROGRES BELAJAR</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition text-rose-200" />
            </button>
          </div>
        </div>
      </div>

      {/* 9 Key Pedagogical Benefits Grid as required in Section C */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-rose-600" />
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-rose-800">
            Target Capaian Pembelajaran
          </h3>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-6">
          Manfaat Belajar Menggunakan Aplikasi Polinomial Masterclass
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50/80 hover:bg-rose-50/60 border border-stone-200/80 hover:border-rose-200 transition"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-stone-800 leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress snapshot mini card */}
      <div className="bg-gradient-to-r from-rose-900 to-rose-800 text-white rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Status Latihan Saat Ini</span>
          <h3 className="text-xl sm:text-2xl font-bold">
            {answeredCount === 0 ? 'Kamu belum mulai mengerjakan soal latihan.' : `Kamu telah mengerjakan ${answeredCount} dari ${totalQuestions} soal.`}
          </h3>
          <p className="text-xs sm:text-sm text-rose-200 mt-1">
            Data tersimpan otomatis di browser ini. Kamu bisa lanjut kapan pun secara offline!
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('latihan')}
          className="px-6 py-3 rounded-xl bg-white text-rose-950 font-extrabold text-sm hover:bg-rose-50 transition shadow-lg shrink-0 flex items-center gap-2"
        >
          <span>{answeredCount === 0 ? 'Buka Soal Nomor 1' : 'Lanjutkan Pengerjaan'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  HelpCircle, 
  Lightbulb, 
  CheckSquare, 
  ToggleLeft, 
  PenTool, 
  Volume2, 
  Bookmark, 
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';
import { ttsService } from '../utils/tts';

export const InstructionsView: React.FC = () => {
  const handleReadFullInstructions = () => {
    ttsService.speak(
      'Petunjuk Penggunaan Polinomial Masterclass. ' +
      'Aplikasi ini dirancang sebagai tutor matematika digital interaktif. ' +
      'Terdapat tiga tipe soal: Pilihan Ganda dengan satu jawaban benar, Pilihan Ganda Kompleks di mana kamu harus memilih seluruh opsi yang benar, dan Benar Salah untuk menguji tiga pernyataan numerik. ' +
      'Gunakan tombol Petunjuk jika kamu memerlukan arahan bertahap. Tombol Periksa Jawaban akan langsung menilai jawabanmu dengan sistem skor transparan. ' +
      'Setelah menjawab, buka Pembahasan Lengkap dan pelajari Jurus Cara Cepat Mister Jo agar kemampuan aljabar kamu semakin lincah!'
    );
  };

  return (
    <div className="space-y-6 py-4 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-rose-700" />
            <span>PANDUAN SISWA &bull; GRUP FIKIBIMA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Petunjuk Penggunaan & Strategi Belajar
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Panduan lengkap menavigasi tutor digital, memahami format soal, dan memaksimalkan fitur cerdas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReadFullInstructions}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Volume2 className="w-4 h-4 text-white" />
          <span>Bacakan Petunjuk Lengkap</span>
        </button>
      </div>

      {/* 3 Question Types Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Type 1: PG */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="w-2 h-full bg-rose-600 absolute left-0 top-0" />
          <div className="flex items-center justify-between mb-3 pl-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Tipe 1</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-rose-100 text-rose-900">9 Soal</span>
          </div>
          <h3 className="font-extrabold text-base text-stone-900 pl-2 mb-2">Pilihan Ganda (PG)</h3>
          <p className="text-xs sm:text-sm text-stone-600 pl-2 leading-relaxed mb-3">
            Tersedia 5 opsi jawaban (A, B, C, D, E). Tepat <strong>satu jawaban yang benar</strong>.
          </p>
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 pl-3 text-xs text-stone-700 font-medium">
            <strong>Aturan Skor:</strong> Jawaban benar memperoleh 1.0 poin. Jawaban salah 0.0 poin.
          </div>
        </div>

        {/* Type 2: PGK */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="w-2 h-full bg-blue-600 absolute left-0 top-0" />
          <div className="flex items-center justify-between mb-3 pl-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Tipe 2</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-blue-100 text-blue-900">8 Soal</span>
          </div>
          <h3 className="font-extrabold text-base text-stone-900 pl-2 mb-2">Pilihan Ganda Kompleks (PGK)</h3>
          <p className="text-xs sm:text-sm text-stone-600 pl-2 leading-relaxed mb-3">
            Tersedia 5 pernyataan (A, B, C, D, E). Terdapat <strong>lebih dari satu pilihan yang benar</strong>.
          </p>
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 pl-3 text-xs text-stone-700 font-medium">
            <strong>Skor Parsial:</strong> Diberikan nilai proporsional berdasarkan jumlah pilihan benar yang kamu pilih dikurangi penalti opsi salah.
          </div>
        </div>

        {/* Type 3: BS */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="w-2 h-full bg-emerald-600 absolute left-0 top-0" />
          <div className="flex items-center justify-between mb-3 pl-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Tipe 3</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-100 text-emerald-900">8 Soal</span>
          </div>
          <h3 className="font-extrabold text-base text-stone-900 pl-2 mb-2">Benar atau Salah (BS)</h3>
          <p className="text-xs sm:text-sm text-stone-600 pl-2 leading-relaxed mb-3">
            Terdapat 3 pernyataan matematis independen. Tentukan status <strong>Benar</strong> atau <strong>Salah</strong> pada masing-masing baris.
          </p>
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 pl-3 text-xs text-stone-700 font-medium">
            <strong>Skor Parsial:</strong> Skor dihitung dari jumlah pernyataan yang dijawab tepat (contoh: 3/3 = 100%, 2/3 = 67%).
          </div>
        </div>
      </div>

      {/* Step by Step Feature Instructions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold text-stone-900">
          Alur Interaktif Saat Mengerjakan Soal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Cermati Stimulus HOTS</h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Setiap soal dilengkapi wacana kasus, tabel observasi, atau kurva grafik realistis. Dengarkan audio narasi stimulus untuk menangkap inti persoalan.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 font-bold text-sm">
              2
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Buka Petunjuk 3 Tahap Jika Ragu</h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Jangan langsung menyerah! Tekan tombol <strong>Petunjuk</strong>: Tahap 1 membantu identifikasi konsep, Tahap 2 mengarahkan rumus, Tahap 3 mengarahkan perhitungan tanpa membocorkan jawaban.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-sm">
              3
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Periksa Jawaban & Lihat Feedback</h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Tekan tombol <strong>Periksa Jawaban</strong> untuk melihat validasi otomatis, persentase nilai yang diperoleh, dan catatan evaluasi seketika.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-200 text-purple-800 flex items-center justify-center shrink-0 font-bold text-sm">
              4
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Pelajari Cara Cepat Mister Jo</h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Setiap soal memiliki <strong>Cara Cepat Mister Jo</strong> — strategi efisien berbasis logika aljabar cerdas yang menghemat waktu ujianmu!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

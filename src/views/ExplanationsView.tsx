import React, { useState } from 'react';
import { Question } from '../types';
import { BookOpenCheck, Volume2, Zap, Search, Filter } from 'lucide-react';
import { MathView } from '../components/MathView';
import { ttsService } from '../utils/tts';

interface ExplanationsViewProps {
  questions: Question[];
}

export const ExplanationsView: React.FC<ExplanationsViewProps> = ({ questions }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<number>(0);
  const [expandedId, setExpandedId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = questions.filter((q) => {
    const matchMat = selectedMaterial === 0 || q.materialId === selectedMaterial;
    const matchSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.materialTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toString() === searchQuery.trim();
    return matchMat && matchSearch;
  });

  const handleSpeakExplanation = (q: Question) => {
    ttsService.speak(
      `Pembahasan soal nomor ${q.id}. ${q.materialTitle}. ` +
      `Memahami masalah: ${q.explanation.aMemahamiMasalah}. ` +
      `Konsep matematika: ${q.explanation.bKonsepMatematika}. ` +
      `Hasil akhir: ${q.explanation.eHasilAkhir}. ` +
      `Kesimpulan: ${q.explanation.fKesimpulan}. ` +
      `Cara Cepat Mister Jo: ${q.explanation.gCaraCepatMisterJo}`
    );
  };

  return (
    <div className="space-y-6 py-4 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <BookOpenCheck className="w-3.5 h-3.5 text-rose-700" />
            <span>KHAZANAH PEMBAHASAN LENGKAP 25 SOAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Bank Solusi 7 Langkah & Cara Cepat Mister Jo
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Bedah tuntas langkah perhitungan ilmiah, pembuktian teorema, dan trik kilat pada seluruh 25 soal.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            type="button"
            onClick={() => setSelectedMaterial(0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedMaterial === 0
                ? 'bg-rose-800 text-white'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Semua Materi (25)
          </button>
          {[1, 2, 3, 4, 5].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMaterial(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedMaterial === m
                  ? 'bg-rose-800 text-white'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Materi {m} (5 Soal)
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor soal / kata kunci..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Explanations List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden transition"
            >
              {/* Accordion Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? 0 : q.id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/40 transition select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-900 text-white font-extrabold flex items-center justify-center text-base shrink-0">
                    {q.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {q.materialTitle}
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        Tipe: {q.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base mt-1 line-clamp-1">
                      {q.questionText}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-700 hidden sm:inline">
                    {isExpanded ? 'Tutup Rincian' : 'Buka 7 Langkah'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center font-bold">
                    {isExpanded ? '−' : '+'}
                  </div>
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-5 animate-fade-in">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSpeakExplanation(q)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-sm transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Bacakan Solusi Lengkap Soal #{q.id}</span>
                    </button>
                  </div>

                  {/* Stimulus Context Box */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200">
                    <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-1">
                      Stimulus & Pertanyaan Asal:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 mb-2">
                      {q.stimulus.contextText}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-stone-900">
                      {q.questionText}
                    </p>
                  </div>

                  {/* 7-Part Instructional Breakdown */}
                  <div className="space-y-4">
                    {/* A */}
                    <div>
                      <strong className="text-rose-900 text-xs sm:text-sm block mb-1">
                        A. MEMAHAMI MASALAH:
                      </strong>
                      <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {q.explanation.aMemahamiMasalah}
                      </div>
                    </div>

                    {/* B */}
                    <div>
                      <strong className="text-rose-900 text-xs sm:text-sm block mb-1">
                        B. KONSEP MATEMATIKA:
                      </strong>
                      <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {q.explanation.bKonsepMatematika}
                      </div>
                    </div>

                    {/* C */}
                    <div>
                      <strong className="text-rose-900 text-xs sm:text-sm block mb-1">
                        C. RUMUS KUNCI:
                      </strong>
                      <div className="bg-white p-3 rounded-xl border border-stone-200 text-center font-mono">
                        <MathView math={q.explanation.cRumusKunci} displayMode />
                      </div>
                    </div>

                    {/* D */}
                    <div>
                      <strong className="text-rose-900 text-xs sm:text-sm block mb-1">
                        D. LANGKAH PERHITUNGAN SISTEMATIS:
                      </strong>
                      <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs sm:text-sm font-mono text-stone-800 whitespace-pre-line leading-relaxed">
                        {q.explanation.dLangkahPerhitungan}
                      </div>
                    </div>

                    {/* E */}
                    <div>
                      <strong className="text-rose-900 text-xs sm:text-sm block mb-1">
                        E. HASIL AKHIR:
                      </strong>
                      <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-300 text-xs sm:text-sm font-bold text-emerald-950">
                        {q.explanation.eHasilAkhir}
                      </div>
                    </div>

                    {/* F */}
                    <div>
                      <strong className="text-rose-900 text-xs sm:text-sm block mb-1">
                        F. KESIMPULAN:
                      </strong>
                      <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700">
                        {q.explanation.fKesimpulan}
                      </div>
                    </div>

                    {/* G */}
                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                      <strong className="text-purple-900 text-xs sm:text-sm block mb-1.5 flex items-center gap-1.5 font-bold">
                        <Zap className="w-4 h-4 text-purple-700" />
                        G. CARA CEPAT MISTER JO:
                      </strong>
                      <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
                        {q.explanation.gCaraCepatMisterJo}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { KEY_FORMULAS, KeyFormulaItem } from '../data/keyFormulas';
import { KeyRound, Volume2, BookOpen, Layers, Lightbulb } from 'lucide-react';
import { MathView } from '../components/MathView';
import { HornerVisualizer } from '../components/HornerVisualizer';
import { LongDivisionVisualizer } from '../components/LongDivisionVisualizer';
import { ttsService } from '../utils/tts';

export const KeyFormulasView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Dasar', 'Teorema Sisa', 'Teorema Faktor', 'Metode Komputasi', 'Sistem Persamaan'];

  const filteredFormulas = selectedCategory === 'Semua'
    ? KEY_FORMULAS
    : KEY_FORMULAS.filter((f) => f.category === selectedCategory);

  const handleSpeakFormula = (formula: KeyFormulaItem) => {
    ttsService.speak(
      `${formula.title}. ${formula.audioExplanation}. Kapan digunakan: ${formula.whenToUse}. Contoh: ${formula.quickExample}`
    );
  };

  return (
    <div className="space-y-6 py-4 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <KeyRound className="w-3.5 h-3.5 text-rose-700" />
            <span>ENSIKLOPEDIA RUMUS KUNCI POLINOMIAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            9 Formula Emas & Algoritma Suku Banyak
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Panduan rumus komprehensif lengkap dengan simbol, contoh aplikasi, visualisasi bersusun, dan bagan interaktif Horner.
          </p>
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-rose-800 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-rose-50 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Special Interactive Visualizers for Horner & Long Division */}
      {(selectedCategory === 'Semua' || selectedCategory === 'Metode Komputasi') && (
        <div className="space-y-6">
          <HornerVisualizer />
          <LongDivisionVisualizer />
        </div>
      )}

      {/* Formulas List */}
      <div className="space-y-5">
        {filteredFormulas.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:border-rose-300 transition"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase tracking-wider">
                  {f.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
                  {f.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleSpeakFormula(f)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition"
                title="Dengarkan Pengucapan Rumus & Makna"
              >
                <Volume2 className="w-4 h-4 text-rose-700" />
                <span>Dengarkan Rumus</span>
              </button>
            </div>

            {/* Formula Display Box */}
            <div className="bg-gradient-to-r from-rose-50 via-white to-rose-50/50 p-4 rounded-2xl border border-rose-200/90 text-center my-3">
              <MathView math={f.formulaLatex} displayMode className="text-lg sm:text-xl text-rose-950 font-bold" />
            </div>

            {/* When to use */}
            <div className="mb-4 text-xs sm:text-sm text-stone-700 flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Kapan Digunakan: </strong>
                {f.whenToUse}
              </div>
            </div>

            {/* Symbols explanation */}
            <div className="mb-4">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Makna & Definisi Simbol:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {f.symbolExplanation.map((sym, sIdx) => (
                  <div key={sIdx} className="bg-stone-50/70 p-2.5 rounded-xl border border-stone-200/60 text-xs text-stone-700">
                    <code className="text-rose-800 font-bold font-mono mr-1">{sym.symbol}</code> : {sym.meaning}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Example */}
            <div className="border-t border-stone-100 pt-3">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-1">
                Contoh Kasus Singkat:
              </span>
              <p className="text-xs sm:text-sm text-stone-700 mb-2">
                {f.quickExample}
              </p>
              {f.exampleLatex && (
                <div className="bg-stone-50 p-2.5 rounded-xl text-center border border-stone-200">
                  <MathView math={f.exampleLatex} displayMode className="text-xs sm:text-sm text-stone-800 font-mono" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

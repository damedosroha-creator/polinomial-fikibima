import React from 'react';
import { BookOpen, Layers } from 'lucide-react';
import { MathView } from './MathView';

export const LongDivisionVisualizer: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 border-b border-rose-100 pb-3">
        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
          <BookOpen className="w-4 h-4 text-rose-700" />
        </div>
        <div>
          <h3 className="font-bold text-rose-950 text-base sm:text-lg">Proses Pembagian Bersusun Pendek (Porogapit Aljabar)</h3>
          <p className="text-xs text-stone-500">Standar visual buku teks ilmiah matematika SMA</p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-stone-700 mb-4 leading-relaxed">
        Contoh kasus: Pembagian polinomial <MathView math="P(x) = x^3 - 4x^2 + 5x + 8" /> oleh pembagi linear <MathView math="D(x) = x - 2" />.
      </p>

      {/* Structured Vertical Visualizer */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm">
        <div className="min-w-[360px] max-w-lg mx-auto text-stone-800">
          {/* Quotient Line */}
          <div className="flex justify-end mb-1 pr-4">
            <span className="text-rose-700 font-bold bg-rose-100 px-3 py-1 rounded border border-rose-200">
              Hasil Bagi: x² - 2x + 1
            </span>
          </div>

          {/* Division Bar */}
          <div className="flex items-center">
            <span className="font-bold text-rose-950 px-2 py-1 bg-white border border-stone-300 rounded mr-2">
              (x - 2)
            </span>
            <div className="flex-1 border-t-2 border-l-2 border-stone-800 pt-1 pl-3 font-bold text-stone-900 bg-white/70">
              x³ - 4x² + 5x + 8
            </div>
          </div>

          {/* Step 1 */}
          <div className="pl-24 text-stone-600 mt-2">
            <div className="border-b border-stone-400 pb-0.5 text-stone-500">
              -(x³ - 2x²) <span className="text-[10px] italic font-sans text-stone-400 ml-2">← x² · (x - 2)</span>
            </div>
            <div className="font-bold text-stone-800 pt-0.5">
              -2x² + 5x
            </div>
          </div>

          {/* Step 2 */}
          <div className="pl-28 text-stone-600 mt-2">
            <div className="border-b border-stone-400 pb-0.5 text-stone-500">
              -(-2x² + 4x) <span className="text-[10px] italic font-sans text-stone-400 ml-2">← -2x · (x - 2)</span>
            </div>
            <div className="font-bold text-stone-800 pt-0.5">
              x + 8
            </div>
          </div>

          {/* Step 3 */}
          <div className="pl-32 text-stone-600 mt-2">
            <div className="border-b-2 border-rose-700 pb-0.5 text-stone-500">
              -(x - 2) <span className="text-[10px] italic font-sans text-stone-400 ml-2">← 1 · (x - 2)</span>
            </div>
            <div className="mt-1 flex items-center justify-between bg-rose-600 text-white font-extrabold px-3 py-1.5 rounded-lg shadow-sm">
              <span>Sisa Pembagian (S):</span>
              <span className="text-base">10</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-stone-600">
        <div className="bg-rose-50/50 p-3 rounded-lg border border-rose-100 flex items-start gap-2">
          <Layers className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <span><strong>Kelebihan Bersusun:</strong> Bisa digunakan untuk pembagi sembarang derajat, termasuk pembagi kuadrat yang tidak memiliki akar real seperti <MathView math="(x^2 + 1)" />.</span>
        </div>
        <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex items-start gap-2">
          <Layers className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span><strong>Kelebihan Horner:</strong> Lebih cepat dan ringkas karena tidak perlu menulis variabel x dan tanda minus berulang-ulang.</span>
        </div>
      </div>
    </div>
  );
};

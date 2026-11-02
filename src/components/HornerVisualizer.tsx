import React, { useState } from 'react';
import { runHornerDivision, toSuperscript } from '../utils/mathLogic';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ttsService } from '../utils/tts';

export const HornerVisualizer: React.FC = () => {
  const [coeffInput, setCoeffInput] = useState<string>('2, -5, 8, -12');
  const [rootInput, setRootInput] = useState<string>('3');

  const parsedCoeffs = coeffInput
    .split(',')
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  const parsedRoot = parseFloat(rootInput) || 0;
  const result = runHornerDivision(parsedCoeffs, parsedRoot);

  const degree = parsedCoeffs.length - 1;

  const handleSpeakSteps = () => {
    let text = `Langkah Horner untuk suku banyak dengan akar ${parsedRoot}. `;
    text += `Koefisien awal adalah ${parsedCoeffs.join(', ')}. `;
    text += `Koefisien pertama ${result.result[0]} turun. `;
    for (let i = 1; i < parsedCoeffs.length; i++) {
      text += `Lalu ${result.result[i - 1]} dikali ${parsedRoot} sama dengan ${result.intermediate[i]}, dijumlahkan dengan ${parsedCoeffs[i]} menghasilkan ${result.result[i]}. `;
    }
    text += `Hasil bagi berderajat ${degree - 1} dengan sisa akhir ${result.remainder}.`;
    ttsService.speak(text);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-200 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-rose-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <Calculator className="w-4 h-4 text-rose-700" />
          </div>
          <div>
            <h3 className="font-bold text-rose-950 text-base sm:text-lg">Laboratorium Interaktif Horner Mister Jo</h3>
            <p className="text-xs text-stone-500">Uji coba skema bagan pembagian sintetis secara langsung</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSpeakSteps}
          className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold px-3 py-1.5 rounded-lg border border-rose-200 transition flex items-center gap-1.5"
        >
          <span>Dengarkan Langkah Suara</span>
        </button>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Koefisien Polinomial P(x) (pisahkan dengan koma):
          </label>
          <input
            type="text"
            value={coeffInput}
            onChange={(e) => setCoeffInput(e.target.value)}
            placeholder="Contoh: 2, -5, 8, -12"
            className="w-full text-sm font-mono px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Akar Pembuat Nol (k):
          </label>
          <input
            type="text"
            value={rootInput}
            onChange={(e) => setRootInput(e.target.value)}
            placeholder="Contoh: 3"
            className="w-full text-sm font-mono px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Visual Tableau */}
      {parsedCoeffs.length > 1 && (
        <div className="overflow-x-auto my-4 bg-rose-50/60 p-4 rounded-xl border border-rose-200/80">
          <table className="min-w-[420px] text-center border-collapse mx-auto">
            <tbody>
              {/* Header: Powers of x */}
              <tr className="text-xs font-semibold text-rose-700 border-b border-rose-200/60">
                <td className="p-2 w-16 text-right italic font-mono">x</td>
                {parsedCoeffs.map((_, idx) => {
                  const p = degree - idx;
                  return (
                    <td key={idx} className="p-2 w-16 font-mono font-bold">
                      {p === 0 ? 'konstan' : p === 1 ? 'x' : `x${toSuperscript(p)}`}
                    </td>
                  );
                })}
              </tr>

              {/* Row 1: Original Coefficients */}
              <tr className="font-mono text-stone-800 text-sm font-semibold">
                <td className="p-3 w-16 text-right font-bold text-rose-900 border-r-2 border-b-2 border-rose-800 bg-rose-100/70">
                  {parsedRoot}
                </td>
                {parsedCoeffs.map((c, idx) => (
                  <td key={idx} className="p-3 w-16 bg-white/80 border-b border-rose-100">
                    {c}
                  </td>
                ))}
              </tr>

              {/* Row 2: Intermediate Multiplications */}
              <tr className="font-mono text-xs text-rose-700 italic">
                <td className="p-2 text-right border-r-2 border-rose-800 text-[10px] text-rose-600 font-sans">
                  (+ kalikan {parsedRoot})
                </td>
                {result.intermediate.map((val, idx) => (
                  <td key={idx} className="p-2 bg-rose-50/40 border-b-2 border-rose-800">
                    {idx === 0 ? '' : `+(${val})`}
                  </td>
                ))}
              </tr>

              {/* Row 3: Result / Quotient and Remainder */}
              <tr className="font-mono text-base font-bold">
                <td className="p-3 text-right text-xs font-sans text-rose-900 font-semibold border-r-2 border-rose-800 bg-rose-100/40">
                  Hasil:
                </td>
                {result.result.map((r, idx) => {
                  const isRemainder = idx === result.result.length - 1;
                  return (
                    <td
                      key={idx}
                      className={`p-3 w-16 ${
                        isRemainder
                          ? 'bg-rose-600 text-white font-extrabold rounded-md shadow-sm'
                          : 'bg-emerald-50 text-emerald-900'
                      }`}
                    >
                      {r}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <p className="text-center text-[11px] text-stone-500 mt-2">
            Kotak merah di ujung kanan adalah <strong className="text-rose-800">Sisa Pembagian (S)</strong>, dan angka hijau adalah koefisien <strong className="text-emerald-800">Hasil Bagi H(x)</strong>.
          </p>
        </div>
      )}

      {/* Summary Box */}
      {parsedCoeffs.length > 1 && (
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mt-3 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-stone-800">Hasil Bagi:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-stone-300 font-mono text-emerald-800 font-bold">
                H(x) = {result.quotient.map((c, idx) => {
                  const p = degree - 1 - idx;
                  const sign = c >= 0 && idx > 0 ? '+ ' : '';
                  if (p === 0) return `${sign}${c}`;
                  if (p === 1) return `${sign}${c}x`;
                  return `${sign}${c}x${toSuperscript(p)}`;
                }).join(' ')}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-800">Sisa:</span>
              <code className="bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded border border-rose-300 font-mono font-bold">
                S = {result.remainder}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

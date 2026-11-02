import React from 'react';
import { Stimulus } from '../types';
import { Volume2, FileText, Table, LineChart, AlertTriangle, FlaskConical } from 'lucide-react';
import { ttsService } from '../utils/tts';
import { MathView } from './MathView';

interface StimulusCardProps {
  stimulus: Stimulus;
  questionNumber: number;
}

export const StimulusCard: React.FC<StimulusCardProps> = ({
  stimulus,
  questionNumber,
}) => {
  const getIcon = () => {
    switch (stimulus.type) {
      case 'table':
        return <Table className="w-4 h-4 text-rose-700" />;
      case 'graph':
        return <LineChart className="w-4 h-4 text-rose-700" />;
      case 'error_analysis':
        return <AlertTriangle className="w-4 h-4 text-amber-700" />;
      case 'experiment':
        return <FlaskConical className="w-4 h-4 text-purple-700" />;
      default:
        return <FileText className="w-4 h-4 text-rose-700" />;
    }
  };

  const handleSpeakStimulus = () => {
    ttsService.speak(`Stimulus soal nomor ${questionNumber}. ${stimulus.title}. ${stimulus.spokenStimulus}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 sm:p-6 mb-5 transition hover:border-rose-300">
      {/* Stimulus Header */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center">
            {getIcon()}
          </div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-800">
            Stimulus Kontekstual HOTS #{questionNumber}
          </span>
          <span className="text-xs text-stone-400 font-medium">|</span>
          <h4 className="text-sm sm:text-base font-bold text-stone-900">{stimulus.title}</h4>
        </div>
        <button
          type="button"
          onClick={handleSpeakStimulus}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/70 transition"
          title="Dengarkan Uraian Stimulus"
        >
          <Volume2 className="w-3.5 h-3.5 text-rose-700" />
          <span className="hidden sm:inline">Dengarkan Stimulus</span>
        </button>
      </div>

      {/* Context Narrative */}
      <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
        {stimulus.contextText}
      </p>

      {/* Table Data Render */}
      {stimulus.tableData && (
        <div className="overflow-x-auto my-3 border border-stone-200 rounded-xl bg-stone-50/60 p-2">
          <table className="min-w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="bg-rose-900 text-white font-semibold">
                {stimulus.tableData.headers.map((h, i) => (
                  <th key={i} className="py-2.5 px-3 rounded-t-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {stimulus.tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-rose-50/40 transition">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2.5 px-3 text-stone-800 font-medium">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Horner Tableau Render */}
      {stimulus.visualTableau && (
        <div className="overflow-x-auto my-3 bg-rose-50/50 p-4 rounded-xl border border-rose-200">
          <div className="text-xs font-bold text-rose-900 mb-2">Bagan Skema Horner:</div>
          <table className="text-center font-mono border-collapse mx-auto">
            <tbody>
              <tr className="border-b-2 border-rose-800">
                <td className="p-2.5 pr-4 text-right font-bold text-rose-900 border-r-2 border-rose-800 bg-rose-100/70">
                  {stimulus.visualTableau.divisorRoot}
                </td>
                {stimulus.visualTableau.coefficients.map((c, i) => (
                  <td key={i} className="p-2.5 min-w-[50px] font-bold text-stone-800">
                    {c}
                  </td>
                ))}
              </tr>
              <tr className="border-b-2 border-rose-800 text-xs text-rose-600">
                <td className="p-1.5 pr-4 text-right border-r-2 border-rose-800 text-[10px] text-stone-400 font-sans">
                  (+)
                </td>
                {stimulus.visualTableau.multiplications.map((m, i) => (
                  <td key={i} className="p-1.5 text-stone-500 italic">
                    {m !== '' ? m : ''}
                  </td>
                ))}
              </tr>
              <tr className="font-bold text-sm">
                <td className="p-2.5 pr-4 text-right border-r-2 border-rose-800 text-xs font-sans text-rose-900">
                  Hasil:
                </td>
                {stimulus.visualTableau.results.map((r, i) => {
                  const isRemainder = i === stimulus.visualTableau!.remainderIndex;
                  return (
                    <td
                      key={i}
                      className={`p-2.5 min-w-[50px] ${
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
          {stimulus.visualTableau.notes && (
            <p className="text-xs text-center text-rose-800 mt-2 italic font-medium">
              {stimulus.visualTableau.notes}
            </p>
          )}
        </div>
      )}

      {/* SVG Graph Render with clear coordinates and scales */}
      {stimulus.graphData && (
        <div className="my-4 bg-white p-4 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
              <LineChart className="w-3.5 h-3.5 text-rose-700" />
              {stimulus.graphData.title}
            </span>
            {stimulus.graphData.equationLatex && (
              <span className="text-xs text-stone-500 font-mono">
                <MathView math={stimulus.graphData.equationLatex} />
              </span>
            )}
          </div>

          <div className="relative w-full max-w-lg mx-auto aspect-[16/10] bg-stone-50/80 rounded-lg p-2 border border-stone-200">
            <svg
              viewBox="0 0 500 300"
              className="w-full h-full overflow-visible font-mono"
            >
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="500" height="300" fill="url(#grid)" />

              {/* X and Y Axes */}
              {/* Let X-axis be at y = 180 (for y = 0), and Y-axis be at x = 180 (for x = 0) */}
              <line x1="20" y1="200" x2="480" y2="200" stroke="#475569" strokeWidth="1.8" />
              <line x1="180" y1="20" x2="180" y2="280" stroke="#475569" strokeWidth="1.8" />

              {/* Axis Arrowheads */}
              <polygon points="480,196 490,200 480,204" fill="#475569" />
              <polygon points="176,20 180,10 184,20" fill="#475569" />

              {/* Labels */}
              <text x="475" y="190" fill="#1e293b" fontSize="12" fontWeight="bold">X</text>
              <text x="190" y="25" fill="#1e293b" fontSize="12" fontWeight="bold">Y</text>
              <text x="165" y="215" fill="#64748b" fontSize="11">0</text>

              {/* Axis Marks */}
              <line x1="120" y1="196" x2="120" y2="204" stroke="#475569" strokeWidth="1.2" />
              <text x="114" y="215" fill="#64748b" fontSize="10">-2</text>

              <line x1="240" y1="196" x2="240" y2="204" stroke="#475569" strokeWidth="1.2" />
              <text x="236" y="215" fill="#64748b" fontSize="10">1</text>

              <line x1="300" y1="196" x2="300" y2="204" stroke="#475569" strokeWidth="1.2" />
              <text x="296" y="215" fill="#64748b" fontSize="10">2</text>

              <line x1="360" y1="196" x2="360" y2="204" stroke="#475569" strokeWidth="1.2" />
              <text x="356" y="215" fill="#64748b" fontSize="10">3</text>

              {/* Smooth Spline Curve */}
              {stimulus.graphData.type === 'cubic' && (
                <path
                  d="M 60 270 C 100 230, 110 200, 120 200 C 140 200, 160 90, 180 80 C 200 70, 220 160, 240 200 C 270 250, 320 250, 360 200 C 390 160, 420 80, 450 30"
                  fill="none"
                  stroke="#be123c"
                  strokeWidth="2.8"
                />
              )}

              {/* Specific Plotted Points */}
              {stimulus.graphData.points.map((pt, pIdx) => {
                // Map mathematical coordinates to SVG viewBox (origin roughly 180, 200; scale x: 60px/unit, scale y: -10px/unit)
                const cx = 180 + pt.x * 60;
                const cy = 200 - pt.y * 10;
                return (
                  <g key={pIdx}>
                    <circle cx={cx} cy={cy} r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
                    {pt.label && (
                      <text
                        x={cx + 8}
                        y={cy - 8}
                        fill="#881337"
                        fontSize="11"
                        fontWeight="bold"
                        className="font-sans"
                      >
                        {pt.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="text-[11px] text-stone-500 text-center mt-1.5">
            Grafik akurat skala: titik merah menandai nilai data dan titik potong sumbu.
          </p>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { MATERIALS_DATA, MaterialMeta } from '../data/materials';
import { Compass, BookOpen, CheckCircle, ArrowRight, Volume2, Layers } from 'lucide-react';
import { ttsService } from '../utils/tts';

interface CurriculumViewProps {
  onStartMaterial: (materialId: number) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onStartMaterial }) => {
  const handleSpeakMaterial = (mat: MaterialMeta) => {
    ttsService.speak(`${mat.title}. ${mat.audioIntro} Konsep kunci: ${mat.keyConcept}`);
  };

  return (
    <div className="space-y-6 py-4 animate-fade-in max-w-5xl mx-auto">
      {/* Title Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-rose-700" />
            <span>KISI-KISI STANDAR KURIKULUM &bull; KELAS XI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Peta Materi & Distribusi 25 Soal
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Distribusi seimbang 5 materi pokok suku banyak dengan 5 soal HOTS pada masing-masing topik.
          </p>
        </div>
      </div>

      {/* 5 Material Cards */}
      <div className="space-y-4">
        {MATERIALS_DATA.map((mat) => (
          <div
            key={mat.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-rose-300 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-800 text-white">
                    {mat.badge}
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    5 Soal Terdistribusi (PG, PGK, BS)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  {mat.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSpeakMaterial(mat)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition flex items-center gap-1.5"
                  title="Dengarkan Penjelasan Materi"
                >
                  <Volume2 className="w-4 h-4 text-rose-700" />
                  <span className="hidden sm:inline">Dengarkan</span>
                </button>
                <button
                  type="button"
                  onClick={() => onStartMaterial(mat.id)}
                  className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
                >
                  <span>Latihan Soal Materi Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
              {mat.description}
            </p>

            {/* Key Concept Box */}
            <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200/70 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-900 block mb-1">
                Rumus / Konsep Kunci:
              </span>
              <p className="text-xs sm:text-sm font-semibold text-rose-950 font-mono">
                {mat.keyConcept}
              </p>
            </div>

            {/* Submaterials checklist */}
            <div className="border-t border-stone-100 pt-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Rincian Submateri:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mat.submaterials.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { ttsService, TTSState } from '../utils/tts';

export const AudioControlBar: React.FC = () => {
  const [ttsState, setTtsState] = useState<TTSState>(ttsService.getState());

  useEffect(() => {
    const unsubscribe = ttsService.subscribe((state) => {
      setTtsState(state);
    });
    return unsubscribe;
  }, []);

  const speedOptions = [0.8, 1.0, 1.2, 1.5];

  return (
    <aside aria-label="Mister Jo Audio Tutor Control" className="bg-rose-950/95 border-b border-rose-800 text-white backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Mister Jo Avatar & Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <span className="font-extrabold text-sm tracking-tight text-white">MJ</span>
            </div>
            {ttsState.isPlaying && !ttsState.isPaused && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-rose-950 rounded-full animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Tutor Narator</span>
              <span className="inline-flex items-center text-[10px] bg-rose-800/80 px-1.5 py-0.2 rounded font-semibold text-rose-100">
                Grup FIKIBIMA
              </span>
            </div>
            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
              Mister Jo
              {ttsState.isPlaying && !ttsState.isPaused && (
                <span className="inline-flex items-center gap-0.5 text-xs text-rose-200">
                  <span className="w-1 h-3 bg-rose-400 animate-pulse rounded-full" />
                  <span className="w-1 h-4 bg-rose-300 animate-pulse delay-75 rounded-full" />
                  <span className="w-1 h-2 bg-rose-400 animate-pulse delay-150 rounded-full" />
                  <span className="ml-1 text-[11px] text-rose-200 hidden sm:inline">Sedang Membimbing...</span>
                </span>
              )}
              {ttsState.isPaused && (
                <span className="text-[11px] text-amber-300 ml-1">Dijeda</span>
              )}
            </p>
          </div>
        </div>

        {/* Audio Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Play / Pause / Resume */}
          {ttsState.isPlaying ? (
            ttsState.isPaused ? (
              <button
                type="button"
                onClick={() => ttsService.resume()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition shadow"
                title="Lanjutkan Narasi"
              >
                <Play className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">Lanjutkan</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => ttsService.pause()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm transition shadow"
                title="Jeda Narasi"
              >
                <Pause className="w-4 h-4" />
                <span className="hidden sm:inline">Jeda</span>
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={() => ttsService.replay()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-medium text-xs sm:text-sm transition shadow"
              title="Dengarkan Ulang Narasi Halaman/Soal Ini"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Ulangi Suara</span>
            </button>
          )}

          {/* Replay Button */}
          {ttsState.isPlaying && (
            <button
              type="button"
              onClick={() => ttsService.replay()}
              className="p-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-200 hover:text-white transition"
              title="Ulangi dari Awal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Speed Selector */}
          <div className="flex items-center bg-rose-900/70 rounded-lg p-0.5 border border-rose-800/60">
            {speedOptions.map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => ttsService.setRate(rate)}
                className={`px-1.5 sm:px-2 py-1 text-xs font-semibold rounded-md transition ${
                  ttsState.rate === rate
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-rose-300 hover:text-white hover:bg-rose-800/50'
                }`}
                title={`Kecepatan ${rate}x`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Volume Slider for larger screens */}
          <div className="hidden md:flex items-center gap-1.5 bg-rose-900/60 px-2.5 py-1 rounded-lg border border-rose-800/60">
            <Volume2 className="w-3.5 h-3.5 text-rose-300" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ttsState.volume}
              onChange={(e) => ttsService.setVolume(parseFloat(e.target.value))}
              className="w-16 h-1.5 bg-rose-950 rounded-lg appearance-none cursor-pointer accent-rose-400"
              title={`Volume ${(ttsState.volume * 100).toFixed(0)}%`}
            />
          </div>

          {/* Mute / Unmute Toggle */}
          <button
            type="button"
            onClick={() => ttsService.toggleMute()}
            className={`p-2 rounded-lg font-medium text-xs transition border flex items-center gap-1.5 ${
              ttsState.isMuted
                ? 'bg-stone-800 text-rose-300 border-stone-700 hover:bg-stone-700'
                : 'bg-rose-800/80 text-white border-rose-700 hover:bg-rose-700'
            }`}
            title={ttsState.isMuted ? 'Aktifkan Suara Narator' : 'Bisukan Suara Narator'}
          >
            {ttsState.isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span className="text-xs hidden lg:inline">Suara Nonaktif</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs hidden lg:inline">Suara Aktif</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

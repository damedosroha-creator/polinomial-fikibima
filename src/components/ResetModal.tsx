import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-rose-200 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
          aria-label="Tutup dialog konfirmasi"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-stone-900 mb-2">
          Reset Seluruh Progres Belajar?
        </h3>

        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          Apakah Anda yakin ingin menghapus seluruh jawaban, nilai, dan riwayat latihan?
          Tindakan ini akan mengembalikan semua 25 soal ke status awal dan tidak dapat dibatalkan.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-stone-700 hover:bg-stone-100 transition"
          >
            BATAL
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm transition flex items-center gap-2 shadow-md shadow-rose-900/20"
          >
            <Trash2 className="w-4 h-4" />
            <span>YA, RESET PROGRES</span>
          </button>
        </div>
      </div>
    </div>
  );
};

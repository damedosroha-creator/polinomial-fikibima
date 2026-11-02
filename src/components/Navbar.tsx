import React, { useState } from 'react';
import { 
  Home, 
  HelpCircle, 
  Compass, 
  KeyRound, 
  PenTool, 
  BookOpenCheck, 
  BarChart3, 
  RotateCcw, 
  HardDriveDownload,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { ttsService } from '../utils/tts';

export type NavTab = 
  | 'beranda'
  | 'petunjuk'
  | 'peta'
  | 'rumus'
  | 'latihan'
  | 'pembahasan'
  | 'evaluasi'
  | 'progres';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenResetModal: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenResetModal,
  answeredCount,
  totalQuestions,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; voiceIntro: string }[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <Home className="w-4 h-4" />,
      voiceIntro: 'Selamat datang di Polinomial Masterclass bersama Mister Jo dan Grup FIKIBIMA. Di sini kita akan menguasai seluruh rahasia suku banyak dari pemula hingga menjadi ahli!',
    },
    {
      id: 'petunjuk',
      label: 'Petunjuk Belajar',
      icon: <HelpCircle className="w-4 h-4" />,
      voiceIntro: 'Berikut petunjuk penggunaan aplikasi. Polinomial Masterclass dirancang untuk membimbing kamu langkah demi langkah memahami stimulus, memilih rumus, dan menghitung secara akurat.',
    },
    {
      id: 'peta',
      label: 'Peta Materi',
      icon: <Compass className="w-4 h-4" />,
      voiceIntro: 'Ini adalah kisi-kisi dan peta materi suku banyak. Terdapat lima materi utama dengan pembagian tepat dua puluh lima soal berstandar penalaran tingkat tinggi.',
    },
    {
      id: 'rumus',
      label: 'Rumus Kunci',
      icon: <KeyRound className="w-4 h-4" />,
      voiceIntro: 'Menu Rumus Kunci memuat sembilan formula emas polinomial, mulai dari bentuk umum, teorema sisa, teorema faktor, hingga bagan interaktif metode Horner.',
    },
    {
      id: 'latihan',
      label: 'Latihan 25 Soal',
      icon: <PenTool className="w-4 h-4" />,
      voiceIntro: 'Masuk ke ruang latihan dua puluh lima soal. Jangan terburu-buru, baca stimulusnya dengan teliti, gunakan petunjuk bertahap jika ragu, dan periksa jawabanmu!',
    },
    {
      id: 'pembahasan',
      label: 'Pembahasan Lengkap',
      icon: <BookOpenCheck className="w-4 h-4" />,
      voiceIntro: 'Menu pembahasan lengkap menyajikan analisis tujuh langkah ilmiah beserta jurus cara cepat Mister Jo untuk seluruh dua puluh lima soal.',
    },
    {
      id: 'evaluasi',
      label: 'Hasil Evaluasi',
      icon: <BarChart3 className="w-4 h-4" />,
      voiceIntro: 'Ini adalah rapor hasil evaluasi belajar kamu. Cermati persentase ketuntasan, analisis kelemahan, dan rekomendasi materi yang perlu kamu perdalam.',
    },
    {
      id: 'progres',
      label: 'Progres Belajar',
      icon: <HardDriveDownload className="w-4 h-4" />,
      voiceIntro: 'Status progres belajar kamu tersimpan aman di perangkat ini secara offline. Kamu bisa melanjutkan latihan kapan saja tanpa khawatir kehilangan jawaban.',
    },
  ];

  const handleItemClick = (id: NavTab, voiceIntro: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    ttsService.setUserInteracted();
    ttsService.speak(voiceIntro);
  };

  return (
    <header className="bg-white border-b border-rose-200/90 shadow-sm sticky top-[53px] z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Logo and Identity */}
          <div 
            onClick={() => handleItemClick('beranda', navItems[0].voiceIntro)}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-900 group-hover:bg-rose-800 text-white flex items-center justify-center font-extrabold text-lg shadow-md transition transform group-hover:scale-105 border border-rose-700">
              <span className="text-rose-100 font-serif">P</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-rose-950 tracking-tight leading-none group-hover:text-rose-700 transition">
                  POLINOMIAL MASTERCLASS
                </span>
                <span className="hidden xl:inline text-[10px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                  SMA XI
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-500 font-medium leading-tight">
                Mister Jo &bull; <span className="text-rose-800 font-semibold">Grup FIKIBIMA</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id, item.voiceIntro)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-rose-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Status Pill & Reset */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Storage Offline Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px] font-semibold" title="Seluruh progres belajar tersimpan aman secara otomatis di browser lokal">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden md:inline">PROGRES TERSIMPAN OFFLINE</span>
              <span className="md:hidden">OFFLINE</span>
              <span className="text-emerald-700 font-bold ml-0.5">({answeredCount}/{totalQuestions})</span>
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={onOpenResetModal}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-semibold text-rose-800 hover:bg-rose-100 border border-rose-300 transition flex items-center gap-1"
              title="Reset Seluruh Progres Latihan"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-700" />
              <span className="hidden xl:inline">Reset</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-rose-200 px-4 py-3 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id, item.voiceIntro)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                    isActive
                      ? 'bg-rose-800 text-white'
                      : 'bg-stone-50 text-stone-700 hover:bg-rose-50 hover:text-rose-900 border border-stone-200'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Tersimpan di Perangkat Ini
            </span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResetModal();
              }}
              className="text-rose-700 font-bold hover:underline"
            >
              Reset Progres
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

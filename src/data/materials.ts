export interface MaterialMeta {
  id: number;
  title: string;
  shortTitle: string;
  badge: string;
  questionCount: number;
  description: string;
  submaterials: string[];
  keyConcept: string;
  audioIntro: string;
}

export const MATERIALS_DATA: MaterialMeta[] = [
  {
    id: 1,
    title: 'Materi 1 — Pembagian Polinomial dengan Metode Horner dan Bersusun Pendek',
    shortTitle: 'Metode Horner & Bersusun',
    badge: 'Dasar Operasi',
    questionCount: 5,
    description: 'Kuasai teknik pembagian polinomial tercepat dan paling sistematis: skema bagan Horner sintetis dan pembagian bersusun klasik seperti buku teks.',
    submaterials: [
      'Menentukan hasil bagi polinomial H(x)',
      'Menentukan sisa pembagian S(x)',
      'Pembagian menggunakan metode Horner untuk pembagi (x - k) dan (ax - b)',
      'Pembagian menggunakan metode bersusun pendek vertikal',
      'Membandingkan dan menganalisis efisiensi serta hasil kedua metode',
    ],
    keyConcept: 'P(x) = D(x) · H(x) + S(x). Derajat sisa selalu lebih kecil dari derajat pembagi.',
    audioIntro: 'Halo sobat FIKIBIMA! Di Materi 1, kita akan membedah tuntas rahasia pembagian suku banyak dengan skema Horner dan cara bersusun. Jangan sampai terjebak ketika pembaginya berbentuk a eks dikurangi b ya!',
  },
  {
    id: 2,
    title: 'Materi 2 — Teorema Sisa 1 (Pembagi Berderajat Satu)',
    shortTitle: 'Teorema Sisa Derajat Satu',
    badge: 'Fondasi Teorema',
    questionCount: 5,
    description: 'Menentukan sisa pembagian polinomial tanpa perlu melakukan pembagian panjang sama sekali, cukup substitusi akar pembagi!',
    submaterials: [
      'Menentukan sisa pembagian P(x) oleh (x - a) yaitu S = P(a)',
      'Menentukan sisa pembagian P(x) oleh (ax + b) yaitu S = P(-b/a)',
      'Menentukan nilai parameter koefisien berdasarkan informasi sisa',
      'Menganalisis hubungan nilai polinomial dengan sisa pembagian',
      'Menyelesaikan persoalan numerik berbasis konteks dan data riil',
    ],
    keyConcept: 'Jika P(x) dibagi oleh (x - a), maka sisa pembagiannya adalah S = P(a).',
    audioIntro: 'Di Materi 2, kita menguasai Teorema Sisa 1. Ingat trik Mister Jo: jika pembaginya derajat satu, kita tidak perlu membagi panjang-panjang, langsung substitusikan nilai pembuat nol pembagi ke fungsi polinomial!',
  },
  {
    id: 3,
    title: 'Materi 3 — Teorema Sisa 2 (Pembagi Berderajat Dua)',
    shortTitle: 'Teorema Sisa Derajat Dua',
    badge: 'Penalaran Kuadratik',
    questionCount: 5,
    description: 'Jika pembaginya adalah bentuk kuadrat ax² + bx + c, sisa pembagiannya berderajat satu dalam bentuk linear S(x) = mx + n.',
    submaterials: [
      'Menentukan bentuk umum sisa pembagian oleh ax² + bx + c yaitu S(x) = mx + n',
      'Menggunakan substitusi nilai akar-akar pembagi kuadratik',
      'Menentukan koefisien sisa berbentuk mx + n menggunakan sistem eliminasi',
      'Menentukan parameter yang belum diketahui pada polinomial berderajat tinggi',
      'Menyelesaikan persoalan gabungan beberapa informasi sisa yang saling terkait',
    ],
    keyConcept: 'Pembagi berderajat 2 menghasilkan sisa berderajat maksimal 1: S(x) = mx + n.',
    audioIntro: 'Selamat datang di Materi 3! Di sini pembaginya berderajat dua. Kunci suksesnya adalah memisalkan sisa sebagai m eks ditambah n, lalu bentuk sistem persamaan linear dua variabel.',
  },
  {
    id: 4,
    title: 'Materi 4 — Teorema Faktor',
    shortTitle: 'Teorema Faktor & Akar',
    badge: 'Akar & Faktorisasi',
    questionCount: 5,
    description: 'Memahami kondisi khusus pembagian tanpa sisa (habis dibagi) untuk menemukan akar-akar rasional dan pemfaktoran sempurna suku banyak.',
    submaterials: [
      'Menguji apakah (x - a) merupakan faktor dari P(x) dengan syarat P(a) = 0',
      'Menentukan nilai parameter agar polinomial memiliki faktor tertentu',
      'Menentukan semua faktor linear dari polinomial derajat tinggi',
      'Menentukan akar-akar real persamaan polinomial',
      'Menganalisis hubungan akar, faktor, dan titik potong grafik terhadap sumbu X',
    ],
    keyConcept: '(x - a) adalah faktor dari P(x) jika dan hanya jika P(a) = 0.',
    audioIntro: 'Materi 4 adalah tentang Teorema Faktor! Saat sisa pembagian bernilai nol, pembagi tersebut resmi menjadi faktor dari polinomial, dan pembuat nolnya adalah akar persamaan!',
  },
  {
    id: 5,
    title: 'Materi 5 — Variabel Sisipan dalam Polinomial',
    shortTitle: 'Variabel Sisipan & Simultan',
    badge: 'HOTS Terpadu',
    questionCount: 5,
    description: 'Menyelesaikan permasalahan suku banyak yang memuat beberapa parameter atau variabel tersembunyi dengan memadukan Teorema Sisa dan Teorema Faktor.',
    submaterials: [
      'Menentukan variabel sisipan menggunakan informasi pembagian',
      'Menentukan parameter berdasarkan dua atau lebih informasi sisa yang berbeda',
      'Menggunakan teorema sisa secara simultan membentuk SPLDV',
      'Menentukan nilai variabel yang belum diketahui secara cepat dan akurat',
      'Menyelesaikan permasalahan polinomial kombinasi teorema sisa dan teorema faktor',
    ],
    keyConcept: 'Gabungkan seluruh informasi sisa dan faktor menjadi sistem persamaan terpadu untuk mencari parameter sisipan a, b, p, q, atau k.',
    audioIntro: 'Ini dia puncak tantangan kita di Materi 5: Variabel Sisipan! Di sini kemampuan aljabar dan penalaran kalian akan benar-benar diuji untuk membongkar koefisien rahasia!',
  },
];

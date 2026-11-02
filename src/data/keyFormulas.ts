export interface KeyFormulaItem {
  id: number;
  title: string;
  formulaLatex: string;
  symbolExplanation: { symbol: string; meaning: string }[];
  whenToUse: string;
  quickExample: string;
  exampleLatex: string;
  audioExplanation: string;
  category: 'Dasar' | 'Teorema Sisa' | 'Teorema Faktor' | 'Metode Komputasi' | 'Sistem Persamaan';
}

export const KEY_FORMULAS: KeyFormulaItem[] = [
  {
    id: 1,
    title: '1. Bentuk Umum Polinomial (Suku Banyak)',
    formulaLatex: 'P(x) = a_n x^n + a_{n-1} x^{n-1} + a_{n-2} x^{n-2} + \\dots + a_1 x + a_0',
    symbolExplanation: [
      { symbol: 'n', meaning: 'Derajat tertinggi polinomial (bilangan cacah, n ≥ 0)' },
      { symbol: 'a_n', meaning: 'Koefisien utama (a_n ≠ 0)' },
      { symbol: 'a_{n-1}, ..., a_1', meaning: 'Koefisien dari variabel x berpangkat terkait' },
      { symbol: 'a_0', meaning: 'Suku konstan (suku tetap tanpa variabel x)' },
    ],
    whenToUse: 'Digunakan saat mengidentifikasi derajat, koefisien utama, dan suku tetap dari suatu fungsi suku banyak.',
    quickExample: 'Polinomial P(x) = 3x⁴ - 5x² + 7 memiliki derajat n = 4, koefisien utama 3, dan suku tetap 7 (perhatikan koefisien x³ bernilai 0).',
    exampleLatex: 'P(x) = 3x^4 + 0x^3 - 5x^2 + 0x + 7 \\implies n = 4, a_4 = 3, a_0 = 7',
    audioExplanation: 'Bentuk umum suku banyak adalah Pe dari eks sama dengan a sub n dikali eks pangkat n ditambah a sub n minus satu dikali eks pangkat n minus satu, dan seterusnya sampai ditambah suku konstan a nol.',
    category: 'Dasar',
  },
  {
    id: 2,
    title: '2. Identitas Fundamental Pembagian Polinomial',
    formulaLatex: 'P(x) = D(x) \\cdot H(x) + S(x)',
    symbolExplanation: [
      { symbol: 'P(x)', meaning: 'Polinomial yang dibagi (derajat n)' },
      { symbol: 'D(x)', meaning: 'Pembagi (derajat d, dengan d ≤ n)' },
      { symbol: 'H(x)', meaning: 'Hasil bagi (derajat n - d)' },
      { symbol: 'S(x)', meaning: 'Sisa pembagian (derajat sisa < derajat pembagi, maks d - 1)' },
    ],
    whenToUse: 'Fondasi utama menghubungkan polinomial asal dengan pembagi, hasil bagi, dan sisa. Selalu gunakan rumus ini dalam membuktikan teorema.',
    quickExample: 'Jika P(x) berderajat 4 dibagi D(x) berderajat 1, maka hasil bagi H(x) berderajat 3 dan sisa S(x) berupa konstanta bilangan bulat (derajat 0).',
    exampleLatex: '\\text{derajat } H(x) = \\text{derajat } P(x) - \\text{derajat } D(x)',
    audioExplanation: 'Ingat rumus emas polinomial: yang dibagi sama dengan pembagi dikali hasil bagi ditambah sisa. Sisa selalu memiliki pangkat yang lebih rendah daripada pembagi.',
    category: 'Dasar',
  },
  {
    id: 3,
    title: '3. Teorema Sisa 1 (Pembagi Berderajat Satu)',
    formulaLatex: 'S = P(a) \\quad \\text{untuk pembagi } (x - a)',
    symbolExplanation: [
      { symbol: 'S', meaning: 'Sisa pembagian (suatu konstanta / skalar)' },
      { symbol: 'a', meaning: 'Pembuat nol pembagi (akar dari persamaan x - a = 0)' },
      { symbol: 'P(a)', meaning: 'Nilai fungsi polinomial saat variabel x diganti nilai a' },
    ],
    whenToUse: 'Ketika ingin mencari sisa pembagian oleh (x - a) atau (ax - b) secara kilat tanpa harus melakukan pembagian bersusun atau Horner.',
    quickExample: 'Tentukan sisa P(x) = 2x³ - 3x + 5 dibagi (x - 2). Sisa = P(2) = 2(8) - 3(2) + 5 = 16 - 6 + 5 = 15.',
    exampleLatex: 'S = P(2) = 2(2)^3 - 3(2) + 5 = 15',
    audioExplanation: 'Teorema Sisa 1: jika Pe dari eks dibagi oleh kurung eks dikurangi a, maka sisanya langsung sama dengan Pe dari a. Cukup cari pembuat nol pembagi lalu substitusikan.',
    category: 'Teorema Sisa',
  },
  {
    id: 4,
    title: '4. Teorema Sisa untuk Pembagi (ax + b)',
    formulaLatex: 'S = P\\left(-\\frac{b}{a}\\right) \\quad \\text{untuk pembagi } (ax + b)',
    symbolExplanation: [
      { symbol: '-b/a', meaning: 'Akar pembuat nol dari persamaan linear ax + b = 0' },
      { symbol: 'P(-b/a)', meaning: 'Nilai polinomial pada titik x = -b/a' },
    ],
    whenToUse: 'Bila koefisien x pada pembagi bukan bernilai 1. CATATAN: Pada metode Horner, hasil baginya harus dibagi kembali dengan nilai a.',
    quickExample: 'P(x) dibagi (2x - 3). Pembuat nol: 2x - 3 = 0 => x = 3/2. Sisa pembagiannya adalah P(3/2).',
    exampleLatex: 'D(x) = 2x - 3 \\implies x = \\frac{3}{2} \\implies S = P\\left(\\frac{3}{2}\\right)',
    audioExplanation: 'Untuk pembagi a eks ditambah b, akar pembuat nolnya adalah minus b per a. Sisa pembagiannya adalah Pe dari minus b per a. Jika pakai Horner, jangan lupa baris hasil bagi dibagi dengan a.',
    category: 'Teorema Sisa',
  },
  {
    id: 5,
    title: '5. Teorema Sisa 2 (Pembagi Berderajat Dua)',
    formulaLatex: 'S(x) = mx + n \\quad \\text{untuk pembagi kuadrat } ax^2 + bx + c',
    symbolExplanation: [
      { symbol: 'S(x)', meaning: 'Bentuk sisa pembagian linear derajat satu' },
      { symbol: 'm', meaning: 'Gradien / koefisien x dari sisa pembagian' },
      { symbol: 'n', meaning: 'Konstanta dari sisa pembagian' },
    ],
    whenToUse: 'Digunakan saat pembagi berbentuk kuadrat ax² + bx + c. Karena pembagi derajat 2, derajat sisa maksimal derajat 1.',
    quickExample: 'Jika pembagi memiliki akar r dan s, maka S(r) = P(r) dan S(s) = P(s). Selesaikan sistem 2 persamaan untuk mendapatkan m dan n.',
    exampleLatex: '\\begin{cases} mr + n = P(r) \\\\ ms + n = P(s) \\end{cases} \\implies \\text{eliminasi untuk menemukan } m \\text{ dan } n',
    audioExplanation: 'Untuk pembagi berderajat dua, derajat sisa harus kurang dari dua, sehingga bentuk sisanya adalah m eks ditambah n. Kita susun sistem persamaan linear dua variabel.',
    category: 'Teorema Sisa',
  },
  {
    id: 6,
    title: '6. Teorema Faktor & Akar-Akar Polinomial',
    formulaLatex: '(x - a) \\text{ adalah faktor } P(x) \\iff P(a) = 0',
    symbolExplanation: [
      { symbol: '(x - a)', meaning: 'Faktor linear dari polinomial P(x)' },
      { symbol: 'a', meaning: 'Akar atau pembuat nol dari persamaan P(x) = 0' },
      { symbol: 'P(a) = 0', meaning: 'Sisa pembagian bernilai nol (habis dibagi tanpa sisa)' },
    ],
    whenToUse: 'Menguji apakah suatu suku merupakan faktor, mencari akar-akar polinomial, atau mencari nilai konstanta k yang belum diketahui.',
    quickExample: 'Tunjukkan (x - 1) faktor dari P(x) = x³ - 3x² + 3x - 1. P(1) = 1 - 3 + 3 - 1 = 0, terbukti faktor!',
    exampleLatex: 'P(1) = (1)^3 - 3(1)^2 + 3(1) - 1 = 0 \\implies (x - 1) \\text{ adalah faktor}',
    audioExplanation: 'Teorema faktor menyatakan bahwa kurung eks dikurangi a adalah faktor dari Pe dari eks jika dan hanya jika Pe dari a bernilai nol. Artinya tidak ada sisa pembagian.',
    category: 'Teorema Faktor',
  },
  {
    id: 7,
    title: '7. Metode Horner (Pembagian Sintetis)',
    formulaLatex: '\\begin{array}{c|cccc} k & a_n & a_{n-1} & \\dots & a_0 \\\\ & & k \\cdot b_n & \\dots & k \\cdot b_1 \\\\ \\hline & b_n & b_{n-1} & \\dots & S \\end{array}',
    symbolExplanation: [
      { symbol: 'k', meaning: 'Akar pembuat nol dari pembagi (x - k = 0 => x = k)' },
      { symbol: 'a_n, a_{n-1}, ...', meaning: 'Koefisien polinomial asal ditulis berurutan' },
      { symbol: 'b_n, b_{n-1}, ...', meaning: 'Koefisien dari hasil bagi H(x)' },
      { symbol: 'S', meaning: 'Angka di kolom paling kanan adalah sisa pembagian' },
    ],
    whenToUse: 'Metode super cepat untuk membagi suku banyak tanpa menulis variabel x berulang kali. Alur: turunkan koefisien pertama, kali dengan k, jumlahkan ke bawah, ulangi.',
    quickExample: 'Bagi 2x³ - 5x² + 8x - 12 dengan (x - 3). Akar k = 3. Baris hasil: 2, 1, 11, dan sisa 21.',
    exampleLatex: 'H(x) = 2x^2 + x + 11, \\quad S = 21',
    audioExplanation: 'Metode Horner atau pembagian sintetis: tuliskan koefisien berurutan dari pangkat tertinggi sampai suku tetap. Masukkan akar pembagi di sisi kiri. Kalikan lalu jumlahkan ke bawah secara berulang.',
    category: 'Metode Komputasi',
  },
  {
    id: 8,
    title: '8. Metode Pembagian Bersusun Pendek (Porogapit Aljabar)',
    formulaLatex: '\\begin{array}{r} x^2 - 2x + 1 \\\\ x - 2 \\enclose{longdiv}{x^3 - 4x^2 + 5x + 8} \\\\ \\underline{-(x^3 - 2x^2)} \\phantom{00000} \\\\ -2x^2 + 5x \\phantom{0000} \\\\ \\underline{-(-2x^2 + 4x)} \\phantom{000} \\\\ x + 8 \\phantom{0} \\\\ \\underline{-(x - 2)} \\\\ 10 \\end{array}',
    symbolExplanation: [
      { symbol: 'Pembagi', meaning: 'Diletakkan di luar tanda porogapit (sebelah kiri)' },
      { symbol: 'Hasil Bagi', meaning: 'Dituliskan di atas garis pembagian bertahap' },
      { symbol: 'Pengurangan', meaning: 'Setiap suku tertinggi dieliminasi dengan perkalian hasil bagi' },
      { symbol: 'Sisa Akhir', meaning: 'Angka di baris paling bawah saat derajat sisa < derajat pembagi' },
    ],
    whenToUse: 'Sangat andal ketika pembagi tidak dapat difaktorkan atas bilangan real, seperti pembagi (x² + 1) atau (2x² - 3x + 4).',
    quickExample: 'Bagi x³ - 4x² + 5x + 8 dengan (x - 2) menghasilkan H(x) = x² - 2x + 1 dan sisa 10.',
    exampleLatex: 'P(x) = (x - 2)(x^2 - 2x + 1) + 10',
    audioExplanation: 'Metode pembagian bersusun pendek bekerja seperti pembagian angka biasa. Bagi suku derajat tertinggi dengan suku pembagi pertama, kalikan balik, lalu kurangkan sampai derajatnya lebih kecil dari pembagi.',
    category: 'Metode Komputasi',
  },
  {
    id: 9,
    title: '9. Strategi Variabel Sisipan (Sistem Persamaan Simultan)',
    formulaLatex: '\\begin{cases} P(x_1) = S_1 \\\\ P(x_2) = S_2 \\end{cases} \\implies \\begin{cases} c_1 a + d_1 b = K_1 \\\\ c_2 a + d_2 b = K_2 \\end{cases}',
    symbolExplanation: [
      { symbol: 'a, b', meaning: 'Variabel atau parameter yang disisipkan dalam koefisien polinomial' },
      { symbol: 'x_1, x_2', meaning: 'Akar-akar pembuat nol dari masing-masing pembagi yang diketahui' },
      { symbol: 'S_1, S_2', meaning: 'Nilai sisa pembagian di masing-masing titik' },
    ],
    whenToUse: 'Bila ada 2 parameter yang belum diketahui (misal a dan b) dan tersedia 2 informasi pembagian sisa atau faktor.',
    quickExample: 'P(x) = x⁴ + ax³ + bx² - 8x + 4 habis dibagi (x² - 4) = (x-2)(x+2). Bentuk sistem P(2) = 0 dan P(-2) = 0 untuk menemukan a dan b.',
    exampleLatex: '\\begin{cases} 2a + b = -1 \\\\ -2a + b = -9 \\end{cases} \\implies b = -5, a = 2',
    audioExplanation: 'Strategi variabel sisipan: gunakan setiap informasi sisa pembagian untuk membuat satu persamaan aljabar linear. Kumpulkan semua persamaan menjadi sistem persamaan linear untuk menemukan nilai parameter rahasia.',
    category: 'Sistem Persamaan',
  },
];

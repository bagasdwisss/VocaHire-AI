import { CulturePreset, LanguageCode, Persona, CandidateCV } from '@/types/interview';

export const CULTURE_PRESETS: Record<CulturePreset, { name: string; desc: string; badge: string; icon: string }> = {
  startup: {
    name: 'Startup / Tech Unicorn',
    desc: 'Fokus pada agility, speed, ownership, dan eksekusi produk cepat.',
    badge: 'Agile & Fast-Paced',
    icon: 'Rocket',
  },
  corporate: {
    name: 'Multinational / FMCG',
    desc: 'Fokus ketat pada leadership, struktur STAR, integritas, dan metrik bisnis kuantitatif.',
    badge: 'Structured & Metrics-Driven',
    icon: 'Building2',
  },
  bumn: {
    name: 'BUMN & Pemerintahan',
    desc: 'Fokus pada core value AKHLAK, dedikasi nasional, tata kelola, dan stabilitas.',
    badge: 'AKHLAK & Governance',
    icon: 'Landmark',
  },
  scholarship: {
    name: 'Beasiswa (LPDP / Chevening)',
    desc: 'Fokus pada kontribusi pasca-studi, kepemimpinan publik, dan dampak sosial.',
    badge: 'Social Impact & Vision',
    icon: 'GraduationCap',
  },
};

export const LANGUAGES: { code: LanguageCode; name: string; flag: string }[] = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English (US/UK)', flag: '🇬🇧' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
  { code: 'ko', name: '한국어 (Korean)', flag: '🇰🇷' },
  { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' },
  { code: 'zh', name: '中文 (Mandarin)', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
];

export const PERSONAS: Persona[] = [
  {
    id: 'maya',
    name: 'Maya Hardianti',
    role: 'Lead People & Talent Partner',
    avatar: '👩‍💼',
    tagline: 'Hangat, suportif, namun jeli menggali motivasi personal dan STAR impact.',
    voiceStyle: 'Profesional & Ramah',
    traits: ['Behavioral Expert', 'Culture Fit Assessor', 'STAR Structured'],
  },
  {
    id: 'ken',
    name: 'Kenji "Ken" Tanaka',
    role: 'VP of Product & Tech Strategy',
    avatar: '👨‍💻',
    tagline: 'Kritis, analitis, selalu mengejar metrik data dan resolusi konflik teknis.',
    voiceStyle: 'Tegas & Analitis',
    traits: ['Data-Driven', 'Technical Probing', 'Trade-off Inquisitive'],
  },
];

export const COMMON_FILLER_WORDS = [
  'eee',
  'ee',
  'eee...',
  'umm',
  'um',
  'uhh',
  'uh',
  'hmm',
  'kayak',
  'gitu',
  'apa namanya',
  'jadi kayak',
  'seperti itu',
  'basically',
  'actually',
  'like',
  'you know',
  'sort of',
  'kind of',
];

export const SAMPLE_CANDIDATE_CV: CandidateCV = {
  id: 'cv-sample-1',
  fileName: 'CV_Andi_Pratama_ProductManager_2026.pdf',
  candidateName: 'Andi Pratama',
  targetRole: 'Associate Product Manager / Product Manager',
  experienceYears: 2.5,
  rawText: `Andi Pratama - Product Manager
Email: andi.pratama@email.com | Tel: +62 812-3456-7890 | Jakarta, Indonesia

RINGKASAN PROFESIONAL:
Product Manager dengan 2.5 tahun pengalaman memimpin siklus produk digital end-to-end pada aplikasi B2C dan Fintech. Berpengalaman dalam user research, backlog prioritization, koordinasi sprint scrum, dan A/B testing.

PENGALAMAN KERJA:
1. Associate Product Manager - PT Kreasi Fintech Nusantara (Feb 2024 - Sekarang)
- Memimpin squad Checkout & Payment berisi 5 software engineers, 1 UI/UX designer, dan 1 QA.
- Menginisiasi redisain alur pembayaran 1-Click Checkout yang berhasil meningkatkan payment success rate dari 78% menjadi 88.5%.
- Mengurangi payment drop-off sebesar 14% dalam 3 bulan kuartal pertama.
- Melakukan user interview mingguan dengan 20+ merchant aktif untuk merumuskan PRD integrasi QRIS dinamis.

2. Junior Product Owner - TokoSolusi Digital (Jun 2023 - Jan 2024)
- Mengelola product backlog untuk modul inventaris merchant retail.
- Berkolaborasi dengan tim sales untuk meluncurkan fitur auto-stock notification.

PENDIDIKAN & ORGANISASI:
- S1 Sistem Informasi - Universitas Indonesia (IPK: 3.72/4.00, Lulus 2023)
- Ketua Divisi Event Tech Expo Campus 2022 (Memimpin 25 panitia, 1200 peserta).

CATATAN CELAH / GAP KARIER:
- Jeda 5 bulan (Jan - Mei 2023) pasca lulus sebelum pekerjaan penuh waktu pertama.
- Pengalaman masih didominasi produk B2C, belum banyak memegang metrik enterprise SaaS/B2B kompleks.
`,
  keySkills: [
    'Product Roadmap',
    'User Research',
    'Scrum / Agile',
    'A/B Testing',
    'Payment Gateway Integration',
    'SQL Basics',
    'PRD Writing',
  ],
  careerHighlights: [
    'Menaikkan Payment Success Rate dari 78% ke 88.5%',
    'Menurunkan Payment Drop-off 14%',
    'Memimpin squad checkout lintas fungsi (7 orang)',
  ],
  potentialGaps: [
    'Jeda 5 bulan setelah kelulusan sebelum mulai kerja pertama',
    'Minim pengalaman Enterprise B2B SaaS',
  ],
};

export const SAMPLE_JOB_DESCRIPTION = `Posisi: Product Manager - Core Platform
Perusahaan: PT Finova Solusi Global (Fintech Unicorn)
Lokasi: Jakarta (Hybrid)

TENTANG PERAN:
Kami mencari Product Manager berpengalaman untuk memimpin evolusi platform pembayaran dan retensi pengguna kami. Anda akan bekerja erat dengan engineering, data science, compliance, dan business ops.

TANGGUNG JAWAB:
- Memimpin roadmap produk transaksi dan pembayaran multi-channel.
- Menentukan target OKR kuartalan, memantau metrik funnel konversi, aktivasi, dan churn rate.
- Menjalankan eksperimentasi A/B testing berskala besar dengan jutaan transaksi harian.
- Mengkomunikasikan visi produk kepada C-level dan stakeholder lintas divisi.
- Memastikan kepatuhan terhadap regulasi Bank Indonesia dan OJK dalam setiap fitur finansial baru.

KUALIFIKASI:
- Minimal 2-3 tahun pengalaman sebagai Product Manager / Product Owner di industri teknologi atau fintech.
- Terbukti pernah meningkatkan metrik produk bisnis kuantitatif secara nyata.
- Pemahaman kuat tentang arsitektur microservices, SQL query untuk data retrieval, dan user journey mapping.
- Kemampuan komunikasi persuasif, negosiasi stakeholder, dan pemecahan masalah dengan metodologi STAR.
- Pengalaman dengan platform B2B enterprise merupakan nilai tambah yang kuat.
`;

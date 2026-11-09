import { CulturePreset, LanguageCode, Persona, CandidateCV, TargetRolePreset, TrapQuestionDetail } from '@/types/interview';

export const CULTURE_PRESETS: Record<CulturePreset, { name: string; desc: string; badge: string; icon: string }> = {
  startup: {
    name: 'Startup / Tech Unicorn',
    desc: 'Fokus pada agility, speed, ownership tanpa birokrasi, dan eksekusi produk cepat.',
    badge: 'Agile & Fast-Paced',
    icon: 'Rocket',
  },
  corporate: {
    name: 'Multinational / FMCG',
    desc: 'Fokus ketat pada leadership, struktur STAR formal, integritas, dan metrik bisnis kuantitatif.',
    badge: 'Structured & Metrics-Driven',
    icon: 'Building2',
  },
  bumn: {
    name: 'BUMN & Pemerintahan',
    desc: 'Fokus pada core value AKHLAK, dedikasi nasional, kepatuhan regulasi, dan stabilitas.',
    badge: 'AKHLAK & Governance',
    icon: 'Landmark',
  },
  scholarship: {
    name: 'Beasiswa (LPDP / Chevening)',
    desc: 'Fokus pada kontribusi pasca-studi, kepemimpinan publik, dan dampak sosial bagi Indonesia.',
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
    name: 'Maya Hardianti, M.Psi',
    role: 'Head of Talent Acquisition & Culture',
    company: 'Finova Group Global',
    avatar: '👩‍💼',
    tagline: 'Hangat dan terstruktur, ahli menggali integritas kepemimpinan & STAR impact.',
    voiceStyle: 'Profesional, Ramah, Eksploratif',
    traits: ['Behavioral Master', 'Culture Fit', 'STAR Framework'],
  },
  {
    id: 'ken',
    name: 'Kenji "Ken" Tanaka',
    role: 'VP of Technology & Engineering',
    company: 'Finova Group Global',
    avatar: '👨‍💻',
    tagline: 'Kritis dan data-driven, mengejar trade-off arsitektur & metrik delivery.',
    voiceStyle: 'Tegas, Analitis, Objektif',
    traits: ['System Scalability', 'Trade-off Inquisitive', 'Conflict Resolver'],
  },
  {
    id: 'george',
    name: 'George Henderson',
    role: 'Managing Director & Business Partner',
    company: 'Finova Group Global',
    avatar: '👨‍💼',
    tagline: 'Fokus pada ROI bisnis, kompensasi, dan kesiapan kandidat di level strategis.',
    voiceStyle: 'Eksklusif, Direct, Negosiator',
    traits: ['Commercial Acumen', 'Salary Arbitrage', 'Executive Presence'],
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

export interface RolePresetData {
  id: TargetRolePreset;
  title: string;
  industry: string;
  icon: string;
  badge: string;
  cv: CandidateCV;
  jobDescription: string;
  defaultTrapQuestions: TrapQuestionDetail[];
  benchmarkKeywords: string[];
}

export const ROLE_PRESETS: Record<TargetRolePreset, RolePresetData> = {
  pm: {
    id: 'pm',
    title: 'Product Manager (Core Platform)',
    industry: 'Fintech & Digital Commerce',
    icon: 'Briefcase',
    badge: 'Popular for Tech',
    benchmarkKeywords: [
      'A/B Testing',
      'SQL',
      'B2B SaaS',
      'Stakeholder Management',
      'OKRs & Funnel Metrics',
      'Roadmap Planning',
      'User Retention',
      'Microservices',
      'Data-Driven Decision',
    ],
    cv: {
      id: 'cv-pm-1',
      fileName: 'CV_Andi_Pratama_ProductManager.pdf',
      candidateName: 'Andi Pratama',
      targetRole: 'Product Manager',
      experienceYears: 2.5,
      education: 'S1 Sistem Informasi, Universitas Indonesia (IPK 3.72)',
      rawText: `Andi Pratama - Product Manager
Jakarta, Indonesia | Email: andi.pratama@email.com | LinkedIn: /in/andipratama

RINGKASAN EKSEKUTIF:
Product Manager dengan 2.5 tahun pengalaman memimpin siklus hidup produk digital dari konseptualisasi hingga rilis skala besar. Terbiasa memimpin tim lintas disiplin (engineering, design, data science) serta fokus pada metrik retensi dan funnel konversi.

PENGALAMAN KERJA:
1. Associate Product Manager - PT Kreasi Fintech Nusantara (Feb 2024 - Sekarang)
- Memimpin squad Checkout & Payment beranggotakan 5 backend/frontend engineers, 1 UI/UX designer, dan 1 QA.
- Menginisiasi redisain alur pembayaran "1-Click Express Checkout" yang berhasil menaikkan payment success rate dari 78% menjadi 88.5% dalam 4 bulan.
- Mengurangi payment drop-off sebesar 14% dan menghemat estimasi lost transaction revenue sebesar Rp 1.4 Miliar per kuartal.
- Menjalankan 12 iterasi A/B testing terhadap alur integrasi QRIS dinamis dan kartu debit tokenisasi.

2. Junior Product Owner - TokoSolusi Digital (Jun 2023 - Jan 2024)
- Mengelola product backlog untuk modul inventaris merchant retail (2.000+ merchant aktif).
- Meningkatkan adopsi fitur notifikasi stok otomatis sebesar 32% melalui perbaikan user flow.

PENDIDIKAN:
- S1 Sistem Informasi - Universitas Indonesia (2019 - 2023, IPK: 3.72/4.00)
- Ketua Komisi Event Tech Expo UI 2022 (Memimpin 25 panitia dan 1.200 peserta).

CATATAN CELAH & GAP KARIER:
- Terdapat jeda 5 bulan (Jan - Mei 2023) pasca kelulusan sebelum mulai bekerja di TokoSolusi Digital.
- Portofolio saat ini mayoritas B2C, belum teruji mengelola kontrak enterprise B2B yang kompleks.`,
      keySkills: ['Product Roadmap', 'Funnel Optimization', 'Scrum / Agile', 'A/B Testing', 'SQL', 'Fintech Checkout'],
      careerHighlights: [
        'Menaikkan Payment Success Rate dari 78% ke 88.5% (+10.5%)',
        'Memangkas Payment Drop-Off sebesar 14%',
        'Memimpin squad lintas divisi berisi 7 engineer & desainer',
      ],
      potentialGaps: [
        'Jeda karier 5 bulan setelah kelulusan kuliah',
        'Belum ada pengalaman langsung di Enterprise B2B SaaS',
      ],
    },
    jobDescription: `Posisi: Product Manager - Core Platform
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
- Pengalaman dengan platform B2B enterprise merupakan nilai tambah yang kuat.`,
    defaultTrapQuestions: [
      {
        id: 'pm-trap-1',
        question: 'Saya perhatikan di CV Anda ada jeda sekitar 5 bulan di awal 2023 setelah lulus kuliah. Apa kegiatan produktif yang Anda lakukan selama periode tersebut?',
        gapReason: 'Terdeteksi Career Gap 5 bulan setelah kelulusan sebelum pekerjaan pertama.',
        riskOfWrongAnswer: 'Terdengar pasif atau menganggur tanpa tujuan terencana.',
        suggestedStrategy: 'Jelaskan kegiatan upskilling terstruktur, riset mandiri, proyek freelance, atau sertifikasi yang relevan dengan product management.',
        sampleFormulaAnswer: 'Situation: Pasca lulus di Januari 2023, saya mengambil keputusan strategis untuk memperdalam spesialisasi product analytics. Action: Selama 4 bulan tersebut, saya menyelesaikan sertifikasi SQL & Product Discovery, serta membangun proyek open-source mock-checkout. Result: Kesiapan kompetensi ini memungkinkan saya langsung berkontribusi cepat saat mulai di TokoSolusi di bulan Juni.',
      },
      {
        id: 'pm-trap-2',
        question: 'Pengalaman Anda sebagian besar berfokus pada aplikasi B2C. Di peran ini, kami banyak berurusan dengan integrasi payment gateway Enterprise B2B yang birokratis. Bagaimana Anda membuktikan kemampuan adaptasi Anda?',
        gapReason: 'Minim pengalaman Enterprise B2B SaaS sementara JD mencantumkan poin tersebut sebagai nilai tambah penting.',
        riskOfWrongAnswer: 'Mengabaikan kompleksitas siklus penjualan dan integrasi enterprise B2B.',
        suggestedStrategy: 'Gunakan analogi koordinasi dengan 20+ merchant besar di pengalaman fintech Anda yang memiliki dinamika stakeholder serupa dengan klien B2B.',
        sampleFormulaAnswer: 'Situation: Meskipun berakar di B2C, proyek 1-Click Checkout saya melibatkan negosiasi teknis langsung dengan 20 merchant fintech. Action: Saya menyusun SLA kepatuhan dan dokumentasi API yang mudah diadopsi tim engineering mitra. Result: Pola komunikasi ini identik dengan manajemen klien B2B, sehingga saya yakin kurva adaptasi saya sangat singkat.',
      },
      {
        id: 'pm-trap-3',
        question: 'Dalam proyek 1-Click Checkout, bagaimana Anda bersikap ketika tim engineering menolak prioritas fitur Anda karena tumpukan technical debt yang kritis?',
        gapReason: 'Menguji ketajaman manajemen konflik dan pemahaman trade-off teknis.',
        riskOfWrongAnswer: 'Memaksakan kehendak bisnis atau pasrah menunda seluruh target roadmap.',
        suggestedStrategy: 'Tunjukkan pendekatan kolaboratif data-driven: alokasikan sprint khusus untuk refactoring teknis sambil tetap mempertahankan MVP bisnis.',
        sampleFormulaAnswer: 'Situation: Squad engineering meminta penundaan rilis 3 minggu akibat refactoring database. Action: Saya mengkuantifikasi trade-off dengan menyajikan estimasi kerugian transaksi vs risiko downtime, lalu menyepakati alokasi kapasitas 70% fitur dan 30% technical debt. Result: Rilis tetap tepat waktu dan stabilitas sistem tercapai tanpa insiden bug kritis.',
      },
    ],
  },

  swe: {
    id: 'swe',
    title: 'Senior Software Engineer (Backend & Cloud)',
    industry: 'High-Scale Cloud Infrastructure',
    icon: 'Code',
    badge: 'High Technical Depth',
    benchmarkKeywords: [
      'Golang / Java',
      'Distributed Systems',
      'Kafka / RabbitMQ',
      'Kubernetes & Docker',
      'High Concurrency',
      'Database Sharding',
      'CI/CD Pipeline',
      'System Architecture',
    ],
    cv: {
      id: 'cv-swe-1',
      fileName: 'CV_Budi_Setiawan_BackendEngineer.pdf',
      candidateName: 'Budi Setiawan',
      targetRole: 'Senior Software Engineer',
      experienceYears: 4,
      education: 'S1 Teknik Informatika, Institut Teknologi Bandung (IPK 3.80)',
      rawText: `Budi Setiawan - Senior Backend Engineer
Bandung / Jakarta | budi.setiawan@tech.dev

RINGKASAN TEKNIS:
Backend Engineer dengan 4 tahun spesialisasi arsitektur microservices terdistribusi menggunakan Go (Golang), PostgreSQL, Redis, dan Kafka. Terbiasa menangani traffic peak hingga 15.000 RPS dengan latensi sub-50ms.

PENGALAMAN KERJA:
1. Backend Engineer - PT ScaleUp Global Tech (2022 - Sekarang)
- Merefaktor monolitik menjadi microservices payment gateway menggunakan Go dan gRPC.
- Menurunkan p99 response time dari 320ms menjadi 42ms pada peak event Harbolnas.
- Mengimplementasikan asynchronous message queue menggunakan Apache Kafka yang memproses 8 juta event/hari.

2. Junior Software Engineer - Cipta Prima Solusi (2020 - 2022)
- Mengembangkan RESTful API dengan Java Spring Boot dan Docker.`,
      keySkills: ['Golang', 'Kafka', 'Kubernetes', 'PostgreSQL Optimization', 'gRPC', 'Distributed Locking'],
      careerHighlights: [
        'Menurunkan p99 latency dari 320ms ke 42ms (-86%)',
        'Memproses 8 Juta event/hari dengan Kafka tanpa data loss',
        'Memimpin migrasi monolit ke microservices untuk 4 core services',
      ],
      potentialGaps: ['Belum banyak memegang arsitektur multi-region cloud active-active'],
    },
    jobDescription: `Posisi: Senior Software Engineer (Platform Architecture)
Perusahaan: CloudScale Enterprise Systems
Tanggung Jawab: Merancang layanan backend berlatensi rendah, menangani data pipeline Kafka berskala jutaan event, dan menjaga 99.99% system availability.`,
    defaultTrapQuestions: [
      {
        id: 'swe-trap-1',
        question: 'Pernahkah Anda mengalami insiden production di mana Kafka consumer Anda mengalami consumer lag parah saat traffic spike? Bagaimana Anda mendiagnosis dan menyelesaikannya?',
        gapReason: 'Menguji ketahanan troubleshooting insiden kritis real-time.',
        riskOfWrongAnswer: 'Menjawab panik atau hanya menyalahkan tim infra.',
        suggestedStrategy: 'Jelaskan metode observabilitas (Prometheus/Grafana), identifikasi bottleneck di DB write, dan teknik horizontal pod auto-scaling.',
        sampleFormulaAnswer: 'Situation: Terjadi lag 500k messages di event flash sale. Action: Saya mengisolasi slow query di database, menaikkan partition Kafka, dan mengaktifkan batch insertion di consumer worker. Result: Lag teratasi dalam 12 menit dan tidak ada event yang terduplikasi.',
      },
    ],
  },

  data: {
    id: 'data',
    title: 'Data Scientist & AI Specialist',
    industry: 'Predictive Analytics & GenAI',
    icon: 'BrainCircuit',
    badge: 'AI & Machine Learning',
    benchmarkKeywords: [
      'Python & PyTorch',
      'LLM Fine-tuning',
      'MLOps (MLflow/Kubeflow)',
      'Feature Engineering',
      'Data Pipelines',
      'A/B Testing Statistical Rigor',
      'Predictive Modeling',
    ],
    cv: {
      id: 'cv-data-1',
      fileName: 'CV_Siti_Nurhaliza_DataScientist.pdf',
      candidateName: 'Siti Nurhaliza',
      targetRole: 'Data Scientist & AI Specialist',
      experienceYears: 3,
      education: 'S1 Matematika & Komputasi, Universitas Gadjah Mada (IPK 3.85)',
      rawText: `Siti Nurhaliza - Data Scientist
Yogyakarta / Jakarta | siti.data@email.com
Pengalaman 3 tahun dalam machine learning kuantitatif, customer churn prediction, dan RAG pipeline GenAI.`,
      keySkills: ['Python', 'PyTorch', 'SQL', 'Scikit-Learn', 'RAG Pipeline', 'Statistical Modeling'],
      careerHighlights: [
        'Menaikkan akurasi Churn Prediction Model dari AUC 0.72 ke 0.88',
        'Menghemat estimasi budget retensi pelanggan Rp 800 Juta/tahun',
      ],
      potentialGaps: ['Pengalaman implementasi MLOps di level Kubernetes skala masif masih berkembang'],
    },
    jobDescription: `Posisi: Senior Data Scientist
Membangun model prediktif machine learning dan sistem rekomendasi real-time yang langsung berdampak pada monetisasi produk.`,
    defaultTrapQuestions: [
      {
        id: 'data-trap-1',
        question: 'Bagaimana Anda memastikan model ML Anda tidak mengalami data leakage atau overfitting ketika diuji pada data produksi yang memiliki seasonal drift?',
        gapReason: 'Menguji ketelitian metodologi eksperimen statistik.',
        riskOfWrongAnswer: 'Hanya menyebutkan train-test split standar tanpa konsep time-series validation.',
        suggestedStrategy: 'Jelaskan time-based split, out-of-time validation, dan monitoring Population Stability Index (PSI).',
        sampleFormulaAnswer: 'Situation: Churn model sebelumnya mengalami penurunan akurasi drastis di kuartal liburan. Action: Saya merestrukturisasi cross-validation menjadi rolling time-window dan menambahkan continuous drift monitoring. Result: Model mempertahankan AUC 0.86 stabil selama 6 bulan berturut-turut.',
      },
    ],
  },

  mt: {
    id: 'mt',
    title: 'Management Trainee / Future Leader',
    industry: 'Multinational FMCG & Global Corporate',
    icon: 'TrendingUp',
    badge: 'Executive Leadership',
    benchmarkKeywords: [
      'Cross-functional Leadership',
      'Commercial Awareness',
      'P&L Fundamentals',
      'Problem Solving (STAR)',
      'High Adaptability',
      'Project Management',
    ],
    cv: {
      id: 'cv-mt-1',
      fileName: 'CV_Rani_Wijaya_ManagementTrainee.pdf',
      candidateName: 'Rani Wijaya',
      targetRole: 'Management Trainee',
      experienceYears: 1,
      education: 'S1 Manajemen Bisnis, Institut Teknologi Bandung (Cumlaude, IPK 3.88)',
      rawText: `Rani Wijaya - Fresh Graduate & MT Candidate
Juara 1 National Business Case Competition 2023, Presiden Mahasiswa Fakultas, Pengalaman Magang Supply Chain di Unilever.`,
      keySkills: ['Leadership', 'Strategic Presentation', 'Excel Modeling', 'Design Thinking', 'Negotiation'],
      careerHighlights: [
        'Memimpin organisasi beranggotakan 120 mahasiswa',
        'Mengoptimalkan inventory turnover 18% saat magang supply chain',
      ],
      potentialGaps: ['Fresh graduate dengan pengalaman kerja korporat penuh waktu < 1 tahun'],
    },
    jobDescription: `Posisi: Global Leaders Management Trainee
Program akselerasi 18 bulan untuk mencetak calon direktur dan business unit head lintas fungsi: marketing, supply chain, dan finance.`,
    defaultTrapQuestions: [
      {
        id: 'mt-trap-1',
        question: 'Sebagai fresh graduate yang nanti harus memimpin tim di lapangan yang usianya jauh lebih senior dan berpengalaman dari Anda, bagaimana cara Anda membangun otoritas dan rasa hormat?',
        gapReason: 'Menguji kematangan emosional (EQ) dan kepemimpinan tanpa mengandalkan jabatan.',
        riskOfWrongAnswer: 'Terdengar menggurui atau sebaliknya bersikap terlalu minder dan ragu.',
        suggestedStrategy: 'Tunjukkan Servant Leadership: dengarkan dan hargai keahlian lapangan mereka, lalu bantu selesaikan hambatan sistemik mereka.',
        sampleFormulaAnswer: 'Situation: Saat magang, saya memimpin proyek audit gudang bersama operator senior 10 tahun kerja. Action: Di minggu pertama saya mendengarkan keluhan operasional mereka dan ikut ke lapangan, lalu mendigitalisasi form manual mereka. Result: Mereka proaktif mengadopsi sistem baru dan efisiensi meningkat 18%.',
      },
    ],
  },

  design: {
    id: 'design',
    title: 'Senior Product Designer (UI/UX)',
    industry: 'SaaS & Enterprise Design Systems',
    icon: 'Palette',
    badge: 'User Experience & Vision',
    benchmarkKeywords: [
      'Design Systems',
      'Figma Mastery',
      'User Research & Usability Testing',
      'Information Architecture',
      'Prototyping',
      'Business-Design Alignment',
    ],
    cv: {
      id: 'cv-design-1',
      fileName: 'CV_Faisal_Hakim_ProductDesigner.pdf',
      candidateName: 'Faisal Hakim',
      targetRole: 'Senior Product Designer',
      experienceYears: 3.5,
      education: 'S1 Desain Komunikasi Visual, Universitas Trisakti (IPK 3.65)',
      rawText: `Faisal Hakim - Senior Product Designer
Spesialis dalam merancang design system multi-platform, usability testing, dan mereduksi cognitive load pada alur checkout SaaS.`,
      keySkills: ['Figma', 'Design Systems', 'Usability Testing', 'Micro-interactions', 'User Journey Mapping'],
      careerHighlights: [
        'Merancang Design System yang digunakan oleh 30+ engineer & designer',
        'Meningkatkan Task Completion Rate dari 64% ke 91%',
      ],
      potentialGaps: ['Minim pengalaman coding langsung (HTML/CSS/JS)'],
    },
    jobDescription: `Posisi: Senior UI/UX Designer
Memimpin pengalaman visual dan interaksi end-to-end, menyelaraskan estetika kelas dunia dengan metrik konversi bisnis.`,
    defaultTrapQuestions: [
      {
        id: 'design-trap-1',
        question: 'Bagaimana Anda membela keputusan desain Anda ketika Product Manager atau VP Business meminta desain diubah menjadi lebih mencolok demi monetisasi instan?',
        gapReason: 'Menguji diplomasi antara user advocacy vs business viability.',
        riskOfWrongAnswer: 'Kaku menolak masukan bisnis atau tunduk tanpa argumen riset user.',
        suggestedStrategy: 'Gunakan data usability testing dan tawarkan opsi A/B testing kompromistis.',
        sampleFormulaAnswer: 'Situation: Stakeholder menginginkan popup banner promosi agresif di tengah alur pembelian. Action: Saya menyajikan data drop-off dari uji usability dan mengusulkan varian banner kontekstual non-intrusif via A/B test. Result: Konversi promosi tercapai tanpa merusak retention rate.',
      },
    ],
  },
};

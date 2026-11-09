# PRODUCT REQUIREMENTS DOCUMENT (PRD) — EDISI EKSPANSI & DIFERENSIASI
**Nama Proyek / Produk Baru**: **VocaHire AI** *(Evolusi & Pengembangan dari Konsep ReIntrview)*  
**Tagline Produk**: *"Kuasi Ruang Wawancara: Simulasi HR & User AI Real-Time dengan Analitik STAR & Vokal"*  
**Versi Dokumen**: 3.0 (Full-Scale Product, UX Modification & Engineering Blueprint)  
**Status**: Ready for UI/UX Design & Full-Stack Engineering  
**Target Platform**: Progressive Web App (PWA) & Responsive Web (Mobile & Desktop)

---

## 1. RINGKASAN EKSEKUTIF & DIFERENSIASI DESAIN

### 1.1 Visi Pengembangan Produk
Dokumen ini memperluas spesifikasi dasar platform simulasi wawancara AI menjadi ekosistem persiapan karier yang lebih komprehensif dan berdaya saing tinggi. Selain mempertahankan keunggulan utama berupa wawancara suara dua arah berbasis CV dan penulisan ulang jawaban (*answer rewriting*), versi ini menghadirkan **diferensiasi desain antarmuka (UI/UX)** serta **7 modul fitur baru** yang belum dimiliki kompetitor.

### 1.2 Modifikasi Desain & Identitas Visual (Agar Tidak Sama Persis)
Untuk memastikan produk memiliki identitas orisinal dan pengalaman pengguna yang lebih modern dibandingkan referensi awalnya, dilakukan perombakan desain sebagai berikut:

| Aspek Desain | Desain Referensi Lama | Desain Baru (VocaHire AI) |
| :--- | :--- | :--- |
| **Konsep Tata Letak (Layout)** | Alur linier sederhana 3 kartu (`01 / 02 / 03`) dengan satu kolom terpusat. | **Bento-Grid Command Center & Split-Screen Studio**: Tata letak modular bergaya ruang kendali modern. |
| **Tema & Palet Warna** | Minimalis monokrom/netral dengan aksen standar. | **Neo-Executive Adaptive Theme**: Kombinasi *Deep Obsidian Slate* (`#0B0F19`), *Electric Teal* (`#14B8A6`) untuk indikator keberhasilan, dan *Electric Violet* (`#6366F1`) untuk kecerdasan AI. |
| **Visualisasi Saat Wawancara** | Lingkaran inisial huruf (misal: `B` untuk Brian) dengan teks pertanyaan di tengah layar. | **Reactive Audio Orb & Live HUD (Head-Up Display)**: Visualisasi gelombang suara 3D/Partikel yang berubah warna sesuai intonasi, dilengkapi panel indikator **STAR Method** yang menyala otomatis saat kandidat berbicara. |
| **Penyajian Evaluasi (Feedback)** | Daftar kartu vertikal berisi skor dan teks jawaban yang ditulis ulang. | **Interactive Split-Diff & Radar Analytics**: Perbandingan *side-by-side* (Kiri: Jawaban Asli + *Filler Words*, Kanan: Jawaban Rewritten STAR), grafik radar 5 dimensi kompetensi, dan *timeline* audio gelombang suara interaktif. |

---

## 2. TARGET PASAR & PERSONA PENGGUNA YANG DIPERLUAS

1. **Rani (Fresh Graduate & Pelamar MT — 21–24 Tahun)**
   * **Masalah**: Sering bicara bertele-tele, banyak gumaman (*"eee"*, *"umm"*, *"gitu"*), dan bingung mengubah pengalaman kepanitiaan kampus menjadi bahasa profesional.
   * **Solusi Baru**: *Live STAR Tracker*, *Filler-Word Detector*, dan *Smart Teleprompter (Mode Copilot)*.
2. **Budi (Mid-Level Professional & Career Switcher — 25–33 Tahun)**
   * **Masalah**: Memiliki celah karier (*career gap*) atau pindah jalur industri, serta ragu saat bernegosiasi gaji dengan HR.
   * **Solusi Baru**: *CV-to-JD Gap & Trap Question Analyzer* serta *Salary Negotiation Simulator*.
3. **Siti (Pelamar Perusahaan Global & Beasiswa LPDP/Chevening — 22–30 Tahun)**
   * **Masalah**: Membutuhkan simulasi wawancara panel yang menekan (*stress interview*) dalam bahasa asing dengan standar penilaian multinasional.
   * **Solusi Baru**: *Multi-Persona Panel Mode* (HR + User Manager sekaligus) dalam 8 bahasa.

---

## 3. FITUR INOVATIF BARU (MUST-HAVE DIFFERENTIATORS)

Bagian ini merinci fitur-fitur baru yang wajib ditambahkan untuk menjadikan produk jauh lebih unggul di pasar:

### 3.1 Pre-Interview CV vs JD Gap Analyzer & "Deteksi Pertanyaan Jebakan" (FITUR BARU - P0)
Sebelum wawancara dimulai, sistem tidak hanya menandai CV "terbaca", melainkan langsung menganalisis kecocokan CV dengan deskripsi lowongan:
* Menampilkan **Skor Kecocokan CV ($0\% - 100\%$)**.
* Mendeteksi **Kata Kunci yang Hilang** (*Missing Keywords*) dari CV kandidat.
* Menghasilkan **3 Prediksi Pertanyaan Jebakan (*Trap Questions*)**: Mengidentifikasi titik lemah di CV (misal: jeda menganggur 8 bulan, pindah kerja terlalu cepat, atau lintas jurusan) yang pasti akan ditanyakan HR.

### 3.2 Real-Time STAR Method Indicator (FITUR BARU - P0)
Saat kandidat menjawab pertanyaan *behavioral*, layar menampilkan 4 kapsul indikator: **`[S] Situation`**, **`[T] Task`**, **`[A] Action`**, dan **`[R] Result`**.
* Indikator menyala secara *real-time* (hijau) ketika AI mendeteksi kandidat telah menyebutkan elemen tersebut.
* Jika kandidat berhenti bicara saat indikator **`[R] Result`** masih mati, kandidat langsung sadar bahwa jawabannya belum menyertakan hasil nyata sebelum HR menyela.

### 3.3 Vocal Delivery & Paralinguistic Analytics (FITUR BARU - P1)
Selain menilai isi teks jawaban, sistem menganalisis cara penyampaian suara kandidat:
* **Kecepatan Bicara (*Speaking Pace*)**: Mengukur *Words Per Minute* ($\text{WPM}$). Memberi peringatan jika terlalu cepat ($> 160\text{ WPM}$, terkesan gugup) atau terlalu lambat ($< 100\text{ WPM}$, terkesan ragu).
* **Penghitung Kata Pengisi (*Filler Words Counter*)**: Menghitung jumlah gumaman seperti *"eee"*, *"hmm"*, *"apa namanya"*, *"jadi kayak"*, *"actually"*, atau *"basically"*.
* **Analisis Jeda & Kepercayaan Diri**: Mengukur jeda hening sebelum menjawab (*response latency* kandidat).

### 3.4 Preset Budaya Perusahaan & Jenis Wawancara (FITUR BARU - P1)
Pengguna dapat memilih konteks spesifik agar gaya bahasa dan standar penilaian AI menyesuaikan:
* **Startup / Tech Unicorn**: Fokus pada *agility*, *ownership*, dan eksekusi cepat.
* **BUMN & Pemerintahan**: Fokus pada nilai AKHLAK, dedikasi, hierarki, dan stabilitas.
* **Multinational Corporate / FMCG**: Fokus ketat pada *leadership*, struktur STAR, dan metrik bisnis.
* **Beasiswa (LPDP / Global Scholarship)**: Fokus pada kontribusi pasca-studi, rencana riset, dan dampak sosial.

### 3.5 Simulasi Negosiasi Gaji & Penawaran Kerja (FITUR BARU - P1)
Di akhir sesi wawancara (atau sebagai modul terpisah), pengguna dapat mengaktifkan **Babak Negosiasi Gaji** selama 3 menit:
* AI berperan sebagai HR yang memberikan tawaran di bawah ekspektasi kandidat atau menanyakan *"Berapa ekspektasi gaji Anda?"*.
* Sistem melatih kandidat memberikan argumen nilai jual tanpa terdengar arogan maupun merendahkan diri.

### 3.6 Mode Wawancara Panel (Dual-AI Interviewer) (FITUR BARU - P2)
Untuk simulasi tahap akhir, pengguna dapat memilih **Mode Panel**:
* Diwawancarai oleh **2 Persona AI sekaligus** secara bergantian dalam satu ruangan (contoh: **Zara** sebagai HR yang ramah menggali budaya kerja, dan **George** sebagai *Hiring Manager* yang kritis mengejar detail teknis dan angka).

### 3.7 Generator "Buku Saku Wawancara" (PDF / Notion Cheat-Sheet) (FITUR BARU - P1)
Setelah sesi evaluasi selesai, pengguna dapat mengunduh dokumen ringkas 1 halaman berisi:
* Daftar pertanyaan yang tadi diajukan beserta **Jawaban Versi Terbaik (Skor 9-10/10)** milik pengguna sendiri.
* Poin-poin pencapaian utama dari CV yang wajib diingat saat wawancara sesungguhnya.

---

## 4. SPESIFIKASI FUNGSIONAL INTI & KRITERIA PENERIMAAN

| ID Modul | Nama Fitur | Spesifikasi Teknis & Perilaku Sistem | Target SLA / Latensi | Prioritas |
| :--- | :--- | :--- | :--- | :--- |
| **MOD-01** | Smart CV & JD Analyzer | Ekstraksi PDF/DOCX, kalkulasi skor kecocokan CV vs JD, dan identifikasi 3 potensi kelemahan kandidat. | $\le 3.5\text{ detik}$ | **P0** |
| **MOD-02** | Multi-Language Voice Engine | Percakapan dua arah dalam 8 bahasa (ID, EN, MS, JA, KO, DE, ZH-Mandarin, AR-Arab) dengan deteksi jeda adaptif. | $\le 1.2\text{ detik}$ | **P0** |
| **MOD-03** | Dynamic Probing & Panel AI | AI menyela sopan atau mengajukan *follow-up question* jika jawaban pasif/tanpa metrik angka. | Real-time | **P0** |
| **MOD-04** | Copilot / Teleprompter Mode | Menampilkan 3 *bullet points* kata kunci jawaban dari CV (bukan paragraf panjang agar kandidat tidak terdengar membaca teks). | $\le 0.8\text{ detik}$ | **P1** |
| **MOD-05** | STAR Rewriter & Diff View | Menulis ulang jawaban kandidat menjadi skor $\ge 9/10$ dengan perbandingan *Before vs After* dan rasionalisasi HR. | $\le 4.5\text{ detik}$ | **P0** |
| **MOD-06** | Vocal & Filler Word Tracker | Menghitung $\text{WPM}$, jumlah *filler words*, dan persentase waktu bicara kandidat vs interviewer. | Real-time | **P1** |
| **MOD-07** | Salary Negotiation Round | Sesi mini 3 giliran bicara khusus latihan negosiasi kompensasi dan benefit. | Real-time | **P2** |

---

## 5. DESAIN UI/UX BARU & WIREFRAME PER LAYAR

### 5.1 Sistem Desain (Design Tokens)
* **Tipografi**:
  * Heading: `Plus Jakarta Sans` (SemiBold / Bold) — memberikan kesan modern, profesional, dan bersahabat.
  * Body & Transkrip: `Inter` (Regular / Medium) — keterbacaan tinggi di layar ponsel maupun desktop.
  * Angka, Skor & Timestamp: `JetBrains Mono` — presisi tinggi untuk metrik dan penanda waktu.
* **Sistem Warna**:
  * Background Primer: `#0B0F19` (Dark Mode Default) / `#F8FAFC` (Light Mode)
  * Surface / Card: `#111827` dengan border tipis `#1F2937` (Glassmorphism halus)
  * Primary Accent: `#6366F1` (Indigo AI)
  * Success / Active Verb Highlight: `#10B981` (Emerald Green)
  * Warning / Filler Word Highlight: `#F59E0B` (Amber)
  * Danger / Low Score: `#EF4444` (Rose Red)

### 5.2 Wireframe Layar 1: Bento-Grid Persiapan & Analisis CV (`/studio/setup`)
Berbeda dari tampilan form 1 kolom biasa, halaman persiapan menggunakan tata letak **2 Kolom Interaktif** (di Desktop) atau **Step-Drawer** (di Mobile) yang langsung menampilkan hasil bedah CV sebelum wawancara dimulai:

```
+-----------------------------------------------------------------------------------+
| [Logo: VocaHire AI]          Studio Persiapan Wawancara     [Kuota: 2 Sesi] [ID/EN]|
+-----------------------------------------+-----------------------------------------+
| KOLOM KIRI: KONTEKS & KONFIGURASI       | KOLOM KANAN: BRIEFING INTELIJEN CV (AI) |
|                                         |                                         |
| 1. Target Posisi & Industri             | +-------------------------------------+ |
| [ Product Manager             ] [Tech v]| | SKOR KECOCOKAN CV vs JD: 78% (Baik) | |
|                                         | | [||||||||||||||||||||||......]      | |
| 2. Tempel Kualifikasi Lowongan (JD)     | +-------------------------------------+ |
| [ Memimpin roadmap produk...          ] |                                         |
| [ Analisis metrik retensi...          ] | [!] POTENSI PERTANYAAN JEBAKAN HR:      |
|                                         | 1. "Di CV ada jeda 6 bulan di 2025,     |
| 3. Dokumen CV Kandidat                  |     apa aktivitas Anda saat itu?"       |
| [v] CV_Andi_2026.pdf (Terbaca - 2 Hal)  | 2. "Belum ada pengalaman B2B SaaS,      |
|                                         |     bagaimana cara Anda beradaptasi?"   |
| 4. Pengaturan Ruangan Simulasi          |                                         |
| Bahasa : (ID) (EN) (JA) (KO) (DE) (ZH)  | [+] KATA KUNCI JD YANG BELUM ADA DI CV: |
| Mode   : [x] Single HR  [ ] Panel 2 AI  |  #A/B Testing  #SQL  #StakeholderMgmt   |
| Bantuan: [x] Copilot Hint  [x] +Negosiasi|                                         |
|                                         | +-------------------------------------+ |
| Pilih Persona Pewawancara:              | | [  MASUK RUANG WAWANCARA SEKARANG ] | |
| [(*) Maya - HR Lead] [( ) Ken - Tech VP]| +-------------------------------------+ |
+-----------------------------------------+-----------------------------------------+
```

### 5.3 Wireframe Layar 2: Split-Screen Virtual Interview Studio (`/studio/live`)
Menghilangkan kesan halaman kosong dengan menghadirkan indikator **STAR Real-Time** dan **Copilot Poin Kunci**:

```
+-----------------------------------------------------------------------------------+
| [REC ● 03:45]  Posisi: Product Manager  |  Kecepatan: 132 WPM (Ideal) | Gumaman: 2|
+-----------------------------------------+-----------------------------------------+
| AREA VISUAL PEWAWANCARA AI              | PANEL KENDALI & COPILOT KANDIDAT        |
|                                         |                                         |
|            . - ~ ~ ~ - .                | INDIKATOR STRUKTUR JAWABAN (LIVE STAR): |
|        . '   (  o   o )  ' .            | [v] Situation  (Konteks disebut)        |
|       /     (   ~~~    )    \           | [v] Task       (Tantangan jelas)        |
|      |   ~ ~ ` - . . - ' ~ ~ |          | [v] Action     (Kata kerja aktif OK)    |
|       \    Reactive 3D Orb  /           | [ ] Result     (BELUM ADA ANGKA/HASIL!) |
|        ' .               . '            |                                         |
|            ' - . _ . - '                | --------------------------------------- |
|     Maya (Senior HR) & Ken (VP)         | 💡 COPILOT HINT (Dari Pengalaman CV):   |
|                                         | • Sebutkan proyek aplikasi kasir 2025   |
| "Tadi kamu sebutkan berhasil menaikkan  | • Tekankan kenaikan transaksi +35%      |
|  retensi user. Bagaimana cara kamu      | • Jelaskan kolaborasi dengan 4 engineer |
|  mengukurnya secara spesifik?"          |                                         |
|  [Badge: Pertanyaan Lanjutan / Probing] | --------------------------------------- |
|                                         | TRANSKRIP LANGSUNG KAMU:                |
|                                         | "Waktu itu saya menginisiasi riset..."  |
+-----------------------------------------+-----------------------------------------+
| [ 🎙️ Gelombang Suara Kamu: |||l||l| ]   [Tahan Spasi: Bicara]   [Akhiri & Nilai]  |
+-----------------------------------------------------------------------------------+
```

### 5.4 Wireframe Layar 3: Laporan Analitik Komprehensif (`/studio/report`)
Menyajikan evaluasi secara visual dengan grafik kompetensi, pemutar audio berbasis *waveform*, dan perbandingan teks *Side-by-Side*:

```
+-----------------------------------------------------------------------------------+
| LAPORAN EVALUASI WAWANCARA #VH-8821               [Unduh Buku Saku PDF] [Latih Lagi]|
+-----------------------------------------------------------------------------------+
| SKOR TOTAL: 8.4 / 10 (Siap Wawancara)                                             |
| • Struktur STAR : 8.5/10   • Relevansi CV : 9.0/10   • Ketajaman Metrik : 7.5/10  |
| • Kelancaran    : 135 WPM  • Kata Pengisi : 4x ("eee", "kayak")                   |
+-----------------------------------------------------------------------------------+
| 🔊 TIMELINE REKAMAN AUDIO & TRANSKRIP INTERAKTIF                                  |
| [▶] 01:12 ──────●────────────────────── 08:40  [Klik balon chat untuk putar detik]|
| [01:15 Maya]: Ceritakan kegagalan terbesar Anda...  [01:28 Kamu]: Waktu di kampus.|
+-----------------------------------------------------------------------------------+
| BEDAH JAWABAN #2 — Pertanyaan Lanjutan: "Apa dampak nyatanya bagi tim?"           |
| Skor Awal: [ 6.5 / 10 ]  ===(Setelah Diperbaiki)===>  Potensi Skor: [ 9.5 / 10 ]  |
+-----------------------------------------+-----------------------------------------+
| JAWABAN ASLI KAMU (TRANSKRIP)           | REKOMENDASI JAWABAN (VERSI HR LOLOS)    |
| "Waktu itu saya [eee] ikut bantu-bantu  | "Saya [memimpin langsung] tim berisi    |
|  tim acara kampus dan acaranya lumayan  |  12 panitia dan berhasil [menarik 500   |
|  ramai sih sekitar 500 orang datang."   |  peserta] serta [surplus dana 15%]."    |
+-----------------------------------------+-----------------------------------------+
| 🎯 KENAPA VERSI KANAN LEBIHLOLOS HR?                                              |
| Mengganti frasa pasif "ikut bantu-bantu" menjadi kepemimpinan aktif serta         |
| mengubah klaim subjektif "lumayan ramai" menjadi metrik terukur.                  |
+-----------------------------------------------------------------------------------+
```

---

## 6. ARSITEKTUR TEKNIS, PIPELINE AI & KALKULASI SKOR

### 6.1 Diagram Arsitektur Real-Time Berlatensi Rendah
```
[Browser Klien: Next.js PWA]
   │  ▲
   │  └── (1) WebRTC / WebSocket Audio Stream (Opus Codec, 16kHz) & JSON Events
   ▼
[API Gateway & Edge Orchestrator (Go / FastAPI)]
   ├──► [Streaming STT Engine (Deepgram Nova-3 / Whisper Turbo)]
   │       └── Menghasilkan transkrip + deteksi Filler Words ("eee", "umm") + WPM
   ├──► [Parallel AI Processing Pipeline]
   │       ├──► (Jalur Cepat) [Real-Time LLM: Gemini 2.5 Flash] -> Respons Pertanyaan & Probing
   │       └──► (Jalur HUD)   [STAR Classifier Micro-Agent]     -> Update lampu [S][T][A][R]
   └──► [Streaming Neural TTS (ElevenLabs Turbo / Cartesia Sonic)]
           └── Mengirim potongan audio balik ke browser dalam < 400ms
```

### 6.2 Rumus Kalkulasi Skor Otomatis (Scoring Rubric Engine)
Sistem menghitung Skor Akhir Sesi ($S_{\text{total}}$) pada rentang $1.0$ hingga $10.0$ menggunakan pembobotan lima dimensi terukur:

$$S_{\text{total}} = 0.30(C_{\text{STAR}}) + 0.25(C_{\text{impact}}) + 0.20(C_{\text{relevance}}) + 0.15(C_{\text{delivery}}) + 0.10(C_{\text{conciseness}})$$

Dimana:
* $C_{\text{STAR}}$: Kelengkapan struktur *Situation, Task, Action, Result* ($1 - 10$).
* $C_{\text{impact}}$: Penggunaan kata kerja aktif dan bukti kuantitatif/angka ($1 - 10$).
* $C_{\text{relevance}}$: Kesesuaian jawaban dengan kompetensi di deskripsi lowongan ($1 - 10$).
* $C_{\text{delivery}}$: Skor kelancaran vokal berdasarkan rasio *filler words* dan deviasi kecepatan bicara dari rentang ideal ($110 \le \text{WPM} \le 150$).
* $C_{\text{conciseness}}$: Efisiensi durasi jawaban (ideal $60 - 120\text{ detik}$ per jawaban kompleks).

Untuk penalti kata pengisi (*filler word rate* $r_f$), skor $C_{\text{delivery}}$ dihitung sebagai berikut:

$$r_f = \frac{N_{\text{filler}}}{N_{\text{total\_words}}} \times 100\%$$

$$C_{\text{delivery}} = \max\left(1, 10 - \lfloor 1.5 \times r_f \rfloor - P_{\text{pace}}\right)$$

*(dengan $P_{\text{pace}}$ adalah penalti sebesar $1.5$ poin apabila kecepatan bicara berada di luar batas $90 - 170\text{ WPM}$).*

### 6.3 Spesifikasi Prompt Engineering Sistem Baru

#### A. Prompt Analisis Pra-Wawancara (CV vs JD Gap & Trap Detector)
```text
Role: Senior Technical Recruiter & Career Strategist.
Input: Teks CV Kandidat dan Teks Deskripsi Lowongan (JD) untuk posisi {{target_position}}.
Tugas:
1. Hitung match_percentage (0-100) berdasarkan kesesuaian hard skills, pengalaman, dan ekspektasi peran.
2. Identifikasi maksimal 5 missing_keywords penting yang ada di JD tetapi belum tertulis eksplisit di CV.
3. Identifikasi 3 trap_questions (pertanyaan jebakan spesifik) berdasarkan celah CV kandidat (seperti jeda karier, kurangnya pengalaman spesifik, atau transisi industri) yang wajib diwaspadai kandidat.
Output: Kembalikan dalam format JSON terstruktur.
```

#### B. Prompt Detektor STAR & Interviewer Real-Time
```text
Role: {{persona_name}}, seorang {{persona_role}} dengan gaya wawancara {{company_culture_preset}}.
Konteks: CV kandidat dan JD terlampir. Bahasa wawancara: {{language}}.
Tugas Ganda pada Setiap Giliran:
1. Analisis jawaban terakhir kandidat: tandai boolean untuk {has_situation, has_task, has_action, has_result}.
2. Jika has_action == false atau has_result == false, JANGAN pindah ke topik baru. Ajukan 1 kalimat pertanyaan kejaran (follow-up probing) yang tajam namun profesional untuk menggali tindakan spesifik kandidat atau dampak terukurnya.
3. Jika seluruh elemen STAR sudah terpenuhi, lanjutkan ke kompetensi berikutnya atau masuk ke babak negosiasi gaji apabila ini adalah giliran terakhir.
```

---

## 7. SKEMA DATABASE LENGKAP (POSTGRESQL) & KONTRAK API

### 7.1 Skema Database (DDL) yang Diperluas
```sql
-- 1. Tabel Pengguna & Saldo Kredit
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    preferred_ui_lang VARCHAR(5) DEFAULT 'id',
    free_quota_remaining INT DEFAULT 1,
    paid_credits_balance INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Dokumen CV & Analisis Gap
CREATE TABLE candidate_cvs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    storage_url TEXT NOT NULL,
    parsed_markdown TEXT NOT NULL,
    structured_profile JSONB, -- Menyimpan ringkasan skill, pengalaman, edukasi
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Sesi Wawancara (Termasuk Fitur Baru)
CREATE TABLE interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cv_id UUID REFERENCES candidate_cvs(id),
    target_position VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    culture_preset VARCHAR(30) DEFAULT 'corporate', -- startup, bumn, corporate, scholarship
    language_code VARCHAR(10) NOT NULL, -- id, en, ms, ja, ko, de, zh, ar
    interview_mode VARCHAR(20) DEFAULT 'single', -- single, panel_dual
    primary_persona VARCHAR(30) NOT NULL,
    secondary_persona VARCHAR(30), -- Terisi jika mode panel_dual aktif
    copilot_enabled BOOLEAN DEFAULT false,
    include_salary_round BOOLEAN DEFAULT false,
    cv_match_score INT,
    pre_interview_briefing JSONB, -- Menyimpan missing_keywords & trap_questions
    status VARCHAR(20) DEFAULT 'ready', -- ready, live, completed, interrupted
    overall_score NUMERIC(3,1),
    radar_metrics JSONB, -- Skor 5 dimensi: star, impact, relevance, delivery, conciseness
    avg_wpm INT,
    total_filler_words INT,
    full_recording_url TEXT,
    cheatsheet_pdf_url TEXT,
    duration_seconds INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Giliran Percakapan & Evaluasi Detail
CREATE TABLE session_turns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    speaker_persona VARCHAR(30) NOT NULL,
    turn_type VARCHAR(25) DEFAULT 'main_question', -- main_question, followup_probe, salary_negotiation
    question_text TEXT NOT NULL,
    copilot_bullet_hints JSONB, -- 3 poin petunjuk dari CV jika copilot aktif
    candidate_raw_answer TEXT,
    start_sec NUMERIC(6,2),
    end_sec NUMERIC(6,2),
    wpm_rate INT,
    filler_words_detected JSONB, -- Contoh: [{"word": "eee", "count": 3}]
    star_flags JSONB, -- {"S": true, "T": true, "A": true, "R": false}
    original_score NUMERIC(3,1),
    rewritten_star_answer TEXT,
    rewritten_score NUMERIC(3,1),
    diff_highlights JSONB, -- Segmen kata kerja aktif & metrik yang disorot
    hr_rationale TEXT -- Penjelasan "Kenapa versi ini lebih lolos HR"
);

-- 5. Tabel Transaksi Pembayaran
CREATE TABLE billing_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    bundle_code VARCHAR(50) NOT NULL, -- starter_1, pro_3, career_bootcamp_10
    credits_granted INT NOT NULL,
    amount_idr BIGINT NOT NULL,
    payment_channel VARCHAR(30) NOT NULL, -- qris, dana, gopay, va_bca, va_mandiri
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, expired, failed
    external_gateway_id VARCHAR(255),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### 7.2 Kontrak Endpoint API & WebSocket Events

* **`POST /api/v2/precheck/analyze-gap`**
  * **Fungsi**: Mengunggah CV + JD, mengembalikan skor kecocokan CV, kata kunci yang kurang, dan 3 prediksi pertanyaan jebakan dalam waktu $< 3.5\text{ detik}$.
* **`POST /api/v2/sessions/initialize`**
  * **Fungsi**: Mengunci konfigurasi ruangan (bahasa, preset budaya perusahaan, mode single/panel, negosiasi gaji) dan menerbitkan `wss_token`.
* **`WSS /api/v2/sessions/{id}/realtime-studio`**
  * **Event Klien -> Server**:
    * `audio.chunk`: Potongan audio PCM/Opus dari mikrofon pengguna.
    * `turn.force_commit`: Sinyal ketika pengguna menekan tombol selesai bicara.
  * **Event Server -> Klien**:
    * `transcript.partial`: Teks transkrip langsung beserta deteksi *filler word*.
    * `hud.star_update`: Status *real-time* elemen `{"S": true, "T": true, "A": false, "R": false}`.
    * `copilot.hints`: 3 poin petunjuk pengalaman CV untuk pertanyaan yang sedang aktif.
    * `interviewer.audio_stream`: Aliran suara respons AI + *lip-sync/orb amplitude metadata*.
* **`POST /api/v2/sessions/{id}/finalize`**
  * **Fungsi**: Menutup sesi, menjalankan kalkulasi skor 5 dimensi, menyusun penulisan ulang jawaban (*STAR rewriting*), dan menghasilkan dokumen PDF Buku Saku Wawancara.

---

## 8. MODEL MONETISASI & STRATEGI PAKET HARGA (PAY-AS-YOU-GO)

Tetap mempertahankan filosofi **"Tanpajebakan langganan bulanan & kredit berlaku selamanya"**, namun diperkaya dengan struktur paket bertingkat (*Tiered Credit Bundles*) untuk meningkatkan *Average Order Value* (AOV):

| Nama Paket | Jumlah Kredit Sesi | Fitur yang Terbuka | Target Pengguna | Metode Pembayaran |
| :--- | :--- | :--- | :--- | :--- |
| **Free Trial Pass** | 1 Sesi Gratis | Analisis CV Gap, Wawancara Single HR (6 Bahasa), Evaluasi Skor & Rewriting. | Pengguna baru (Selama kuota gratis bulanan tersedia). | Tanpa Kartu / Langsung Aktif |
| **Single Boost** | 1 Sesi Penuh | Semua fitur Free + Mode Copilot, Rekaman Audio Penuh & Buku Saku PDF. | Kandidat yang besok pagi sudah jadwal wawancara mendadak. | QRIS, DANA, GoPay, VA Bank |
| **Career Pack (Best Value)** | 4 Sesi Penuh | Semua fitur + **Mode Wawancara Panel (2 AI)** + **Simulasi Negosiasi Gaji** + 8 Bahasa. | Pencari kerja aktif yang melamar ke beberapa perusahaan. | QRIS, DANA, GoPay, VA Bank |
| **B2B Campus / Bootcamp License** | Kuota Massal (100+ Sesi) | Dashboard Admin Kampus/Bootcamp untuk memantau kesiapan karier lulusan. | Universitas, Career Center, dan Coding Bootcamp. | Invoice / Transfer Bank |

---

## 9. KEBUTUHAN NON-FUNGSIONAL, PRIVASI (UU PDP) & EDGE CASES

### 9.1 Kepatuhan Privasi & Keamanan Data (Standar UU PDP Indonesia)
* **Zero-Training Guarantee**: Data CV dan rekaman suara pengguna dijamin tidak digunakan untuk melatih model AI publik.
* **Auto-Purge Option (Hak untuk Dilupakan)**: Pengguna memiliki tombol **"Hapus Permanen CV & Rekaman Saya"** di halaman profil yang langsung menghapus objek dari S3/GCS dan database.
* **Enkripsi & Akses**: Seluruh file audio dan PDF disimpan menggunakan enkripsi `AES-256` dan hanya dapat diakses melalui *Signed URL* yang kedaluwarsa dalam 15 menit.

### 9.2 Penanganan Kondisi Ekstrem (Edge Cases)
1. **Lingkungan Pengguna Bising (Kafe/Kamar Kos)**:
   * Sistem menerapkan *Client-Side Noise Suppression* (WebRTC `noiseSuppression: true` dan filter RNNoise) agar suara kendaraan atau kipas angin tidak memicu pemotongan bicara AI secara tidak sengaja.
2. **Koneksi Internet Tidak Stabil di Tengah Sesi**:
   * Setiap giliran tanya-jawab (*turn*) langsung disimpan ke Redis. Jika tab browser tertutup atau sinyal hilang, pengguna dapat menekan tombol **"Lanjutkan Sesi Terakhir"** dalam waktu 24 jam dari pertanyaan terakhir tanpa memotong kuota kredit.
3. **Kandidat Menjawab dengan Bahasa Campuran (Code-Switching ID + EN)**:
   * Sangat umum di Indonesia kandidat menjawab dalam Bahasa Indonesia yang dicampur istilah Bahasa Inggris (*"Jujur waktu itu saya handle end-to-end project..."*). Pipeline STT dikonfigurasi dengan mode *Code-Switching Multilingual* agar istilah Inggris tidak salah ditranskripsikan menjadi kata Indonesia yang aneh.

---

## 10. METRIK KEBERHASILAN (KPI) & ROADMAP IMPLEMENTASI

### 10.1 Key Performance Indicators (North Star & Metrik Produk)
* **North Star Metric**: *Percentage of Interview-Ready Candidates* — Persentase pengguna yang berhasil mencapai skor $\ge 8.0/10$ pada latihan kedua atau ketiga mereka.
* **CV-to-Interview Activation Rate**: Persentase pengguna yang selesai melihat *CV Gap Analysis* lalu langsung menekan tombol mulai wawancara (Target: $\ge 72\%$).
* **Audio Turnaround Latency (P95)**: Waktu respons dari akhir kalimat kandidat hingga suara AI terdengar (Target: $\le 1.2\text{ detik}$).
* **Bundle Conversion Rate**: Persentase pengguna gratis yang membeli paket *Single Boost* atau *Career Pack* (Target: $\ge 10\%$).

### 10.2 Roadmap Pengembangan Bertahap
* **Kuartal 1 (Foundation & Core Redesign)**:
  * Peluncuran antarmuka baru *Bento-Grid Setup* dan *Split-Screen Studio*.
  * Integrasi *CV-to-JD Gap Analyzer*, *Real-Time STAR Indicator*, dan mesin wawancara suara 8 bahasa.
  * Integrasi pembayaran instan QRIS, e-Wallet, dan Virtual Account.
* **Kuartal 2 (Paralinguistic & Advanced Modes)**:
  * Peluncuran *Vocal Delivery Analytics* ($\text{WPM}$ & *Filler Words Counter*).
  * Peluncuran *Salary Negotiation Simulator*, *Mode Panel 2 AI*, dan ekspor *Buku Saku PDF*.
* **Kuartal 3 (Industry Expansion & B2B Dashboard)**:
  * Penambahan mode wawancara teknis spesifik (*Live Case Study* untuk Product, Consulting, dan Software Engineering).
  * Peluncuran portal *Career Center Dashboard* untuk kemitraan universitas dan lembaga pelatihan kerja.

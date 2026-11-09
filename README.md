# VocaHire AI (v3.0 PWA) 🎙️✨
> *"Kuasi Ruang Wawancara: Simulasi HR & User AI Real-Time dengan Analitik STAR & Vokal"*

VocaHire AI adalah platform simulasi wawancara kerja cerdas berbasis web (PWA & Desktop) yang dirancang khusus untuk membantu pelamar kerja, fresh graduate, maupun profesional mempersiapkan wawancara secara terukur, berstruktur STAR (*Situation, Task, Action, Result*), dan bebas gumaman.

---

## 🚀 Fitur Utama Sesuai PRD v3.0

1. **Layar 1 — Bento-Grid Command Center & CV Gap Analyzer (`/studio/setup`)**:
   - Ekstraksi kualifikasi lowongan (JD) dan dokumen CV kandidat.
   - **Skor Kecocokan CV vs JD ($0\% - 100\%$)** otomatis.
   - Deteksi kata kunci penting yang belum tercantum di CV (*Missing Keywords*).
   - **3 Prediksi Pertanyaan Jebakan HR (*Trap Questions*)** berdasarkan celah CV (jeda menganggur, transisi bidang, dsb.) beserta strategi jawabannya.
   - Pilihan preset budaya perusahaan (Startup, BUMN/Pemerintahan, Multinational/FMCG, Beasiswa LPDP).

2. **Layar 2 — Split-Screen Virtual Studio (`/studio/live`)**:
   - **Reactive 3D Audio Orb**: Visualisasi gelombang suara interaktif berbasis HTML5 Canvas yang berdenyut sesuai ritme suara pewawancara AI dan mikrofon kandidat.
   - **Live STAR Indicator HUD**: 4 kapsul `[S]`, `[T]`, `[A]`, `[R]` yang menyala hijau/teal secara dinamis saat kandidat berbicara, memberi peringatan dini jika hasil/angka (*Result*) belum disebutkan.
   - **Smart Copilot Teleprompter**: 3 poin pencapaian dari CV sebagai pemantik ide tanpa membaca naskah panjang.
   - **Vocal & Paralinguistic Tracker**: Mengukur *Words Per Minute* (WPM) dan menghitung gumaman (*filler words* seperti *"eee"*, *"umm"*, *"kayak"*).
   - Dukungan persona pewawancara (Maya - HR Lead & Ken - VP Tech Strategy).

3. **Layar 3 — Laporan Analitik Komprehensif (`/studio/report`)**:
   - **Kalkulasi Skor Otomatis ($1.0 - 10.0$)** menggunakan formula bobot PRD 6.2 ($0.30 C_{\text{STAR}} + 0.25 C_{\text{impact}} + 0.20 C_{\text{relevance}} + 0.15 C_{\text{delivery}} + 0.10 C_{\text{conciseness}}$).
   - **Grafik Radar 5 Dimensi**: Visualisasi kompetensi menyeluruh.
   - **Interactive Split-Diff View**: Komparasi *Side-by-Side* transkrip asli (dengan kata pengisi disorot) vs rekomendasi jawaban STAR lolos HR (skor 9.5/10 dengan kata kerja aktif & metrik bisnis).
   - **Penjelasan Rasionalisasi HR**: *"Kenapa versi ini lebih lolos HR?"*.
   - **Generator "Buku Saku Wawancara"**: Lembar panduan 1 halaman (*cheat-sheet*) yang siap dicetak / disimpan sebagai PDF.

---

## 🛠️ Tech Stack & Arsitektur Zero-Cost (Vercel Ready)

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling & UI**: Tailwind CSS (Tema *Neo-Executive* `#0B0F19`, `#14B8A6`, `#6366F1`)
- **Iconography**: Lucide React
- **Audio Processing**: HTML5 Web Audio API & Web Speech API (Client-Side, 0 biaya server)
- **Deployment**: Vercel Hobby Tier (100% Gratis)

---

## 💻 Panduan Menjalankan di Lokal (Development)

1. Pastikan Anda telah menginstal Node.js ($\ge 18.x$ atau $\ge 20.x$).
2. Di terminal folder proyek, jalankan:
   ```bash
   npm run dev
   ```
3. Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🌐 Panduan Deploy Gratis ke Vercel (Langkah Demi Langkah)

Proyek ini telah dikonfigurasi dengan standar *zero-configuration* Vercel.

### Cara 1: Menggunakan GitHub (Sangat Disarankan)
1. Buat repository baru di [GitHub](https://github.com/new) (misal: `VocaHire-AI`).
2. Di terminal folder ini, hubungkan git lokal dan push ke GitHub:
   ```bash
   git add .
   git commit -m "feat: complete VocaHire AI v3.0 core implementation"
   git branch -M main
   git remote add origin https://github.com/<username-github-anda>/VocaHire-AI.git
   git push -u origin main
   ```
3. Buka [Vercel Dashboard](https://vercel.com/) dan login (bisa login dengan akun GitHub).
4. Klik tombol **"Add New..."** $\rightarrow$ **"Project"**.
5. Pilih repository `VocaHire-AI` yang baru Anda buat, lalu klik **"Import"**.
6. Biarkan seluruh konfigurasi pada nilai default (Framework Preset: **Next.js**), lalu klik **"Deploy"**.
7. Dalam $\pm 1$ menit, website VocaHire AI Anda sudah live secara global dengan URL HTTPS gratis (contoh: `vocahire-ai.vercel.app`)!

### Cara 2: Menggunakan Vercel CLI
1. Jalankan di terminal:
   ```bash
   npx vercel
   ```
2. Ikuti instruksi login dan konfirmasi direktori (tekan Enter untuk pilihan default).

---

## 📄 Kepatuhan Privasi (UU PDP Indonesia)
Sesuai PRD Bab 9, sistem mengadopsi prinsip *Zero-Training Guarantee* di mana data CV kandidat dan sampel suara tidak digunakan untuk pelatihan model publik.

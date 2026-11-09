import { StarFlags } from '@/types/interview';

const SITUATION_PATTERNS = [
  /\b(saat itu|waktu itu|ketika|pada tahun|di perusahaan|di kampus|latar belakang|kondisinya|proyek ini bermula|sewaktu)\b/i,
  /\b(when I was|at that time|in my previous role|during my time|the background|we were facing)\b/i,
];

const TASK_PATTERNS = [
  /\b(tanggung jawab|tugas|tantangan|problem|masalah|objektif|target|tujuan|diwajibkan|deadline|kendala)\b/i,
  /\b(my responsibility|my task|the challenge|the problem|objective|our goal|required to|needed to)\b/i,
];

const ACTION_PATTERNS = [
  /\b(saya memimpin|saya menginisiasi|saya merancang|saya membuat|saya mengembangkan|saya menganalisis|saya mengeksekusi|saya berkolaborasi|saya memutuskan|langkah saya|solusi yang saya ambil)\b/i,
  /\b(I led|I initiated|I designed|I developed|I implemented|I analyzed|I executed|I collaborated|my strategy|I created)\b/i,
];

const RESULT_PATTERNS = [
  /\b(hasilnya|berhasil|meningkatkan|menaikkan|menurunkan|menghemat|pertumbuhan|sebesar|persen|%|angka|kuartal|dampaknya|outcome)\b/i,
  /\b(the result|as a result|successfully|increased|decreased|saved|growth|by \d+|reduced|improved|outcome was)\b/i,
  /\d+(\.\d+)?%/, // Angka persentase
  /\b\d+\s*(orang|user|merchant|juta|ribu|miliar|panitia|kandidat)\b/i,
];

export function detectStarFlags(transcript: string): StarFlags {
  if (!transcript || transcript.trim().length === 0) {
    return { situation: false, task: false, action: false, result: false };
  }

  const text = transcript.trim();
  const wordCount = text.split(/\s+/).length;

  const situation = SITUATION_PATTERNS.some((p) => p.test(text)) || wordCount >= 8;
  const task = TASK_PATTERNS.some((p) => p.test(text)) || (wordCount >= 18 && (text.includes('karena') || text.includes('harus') || text.includes('butuh')));
  const action = ACTION_PATTERNS.some((p) => p.test(text)) || (wordCount >= 28 && (text.includes('saya') || text.includes('kami')));
  const result = RESULT_PATTERNS.some((p) => p.test(text));

  return { situation, task, action, result };
}

export function getStarGuidance(flags: StarFlags): string {
  if (!flags.situation) {
    return 'Mulai dengan latar belakang: Di mana & kapan situasi ini terjadi?';
  }
  if (!flags.task) {
    return 'Jelaskan tantangan utama atau target yang harus Anda selesaikan.';
  }
  if (!flags.action) {
    return 'Sebutkan tindakan nyata ANDA (gunakan kata kerja aktif: "Saya memimpin...", "Saya merancang...").';
  }
  if (!flags.result) {
    return '⚠️ HASIL BELUM TERDETEKSI: Sebutkan angka dampak nyata (misal: "kenaikan 20%", "menghemat waktu 2 jam").';
  }
  return '🌟 Struktur STAR Anda lengkap dan sangat kuat!';
}

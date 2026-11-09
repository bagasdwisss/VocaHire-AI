import type { Metadata } from 'next';
import './globals.css';
import { InterviewProvider } from '@/lib/interviewStore';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'VocaHire AI — Kuasi Ruang Wawancara Real-Time',
  description:
    'Simulasi wawancara HR & User AI Real-Time dengan Analitik STAR, pendeteksi gumaman vokal, dan bedah jawaban komprehensif.',
  keywords: [
    'interview simulator',
    'simulasi wawancara',
    'AI interview practice',
    'STAR method AI',
    'VocaHire AI',
    'persiapan kerja',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-obsidian-900 text-slate-100 antialiased flex flex-col selection:bg-electric-violet selection:text-white font-sans">
        <InterviewProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </InterviewProvider>
      </body>
    </html>
  );
}

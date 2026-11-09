import { NextRequest, NextResponse } from 'next/server';
import { generateDynamicTrapQuestions, extractKeywordsFromJd, extractProfileFromText } from '@/lib/dynamicNlp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cvText, jobDescription, targetPosition } = body;

    const profile = extractProfileFromText(cvText || '', 'Kandidat');
    const jdKeywords = extractKeywordsFromJd(jobDescription || '');

    const cvLower = (cvText || '').toLowerCase();
    const missing = jdKeywords.filter((k) => !cvLower.includes(k.toLowerCase()));

    const trapQuestions = generateDynamicTrapQuestions(
      {
        id: 'dyn-cv',
        fileName: 'CV_Uploaded.pdf',
        candidateName: profile.name,
        targetRole: targetPosition || 'Professional',
        experienceYears: profile.years,
        education: 'Pendidikan Terverifikasi',
        rawText: cvText || '',
        keySkills: profile.skills,
        careerHighlights: profile.projects,
        potentialGaps: ['Perlu penyesuaian terminologi spesifik industri'],
      },
      jobDescription || '',
      targetPosition || 'Target Position'
    );

    const hardSkillScore = Math.min(95, Math.max(65, 65 + (jdKeywords.length - missing.length) * 5));
    const experienceScore = profile.years >= 3 ? 90 : profile.years >= 2 ? 82 : 75;
    const matchScore = Math.round(hardSkillScore * 0.5 + experienceScore * 0.35 + 85 * 0.15);

    return NextResponse.json({
      success: true,
      data: {
        matchScore,
        hardSkillScore,
        experienceScore,
        cultureScore: 85,
        missingKeywords: missing.slice(0, 5).map((w, idx) => ({
          word: w,
          importance: idx < 2 ? 'high' : 'medium',
          category: 'Kualifikasi Inti',
        })),
        trapQuestions,
        profile,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ 
    success: true, 
    streamlitUrl: 'https://legalizer-gen-ai-ixq3l2dwx7du62zittqlcv.streamlit.app/',
    message: 'Opening Legalizer AI Analyzer...'
  });
}

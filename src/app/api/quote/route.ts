import { NextResponse } from 'next/server';
import quotes from '@/data/quotes.json'; // or fetch from DB

export async function GET() {

  // Add 2-second delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { quote, author } = quotes[randomIndex];

  return NextResponse.json({ quote, author });
}

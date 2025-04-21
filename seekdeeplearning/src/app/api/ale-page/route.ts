import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';
import FlashcardSet from '@/models/flashcardset';

interface QuizQuestion {
  id: string;
  definition: string;
  options: string[];
  correctAnswer: string;
}

interface AnswerSubmission {
  questionId: string;
  selectedTerm: string;
}

interface QuizResult {
  score: number;
  total: number;
  correctAnswers: string[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const setId = searchParams.get('setId');
  const numQuestions = parseInt(searchParams.get('numQuestions') || '4');

  if (!setId) {
    return NextResponse.json({ error: 'setId is required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const flashcardSet = await FlashcardSet.findById(setId);
    if (!flashcardSet) {
      return NextResponse.json({ error: 'Flashcard set not found' }, { status: 404 });
    }

    const cards = flashcardSet.cards;
    if (cards.length < numQuestions) {
      return NextResponse.json({ error: 'Not enough cards in set' }, { status: 400 });
    }

    // Randomly select cards
    const selectedCards = cards.sort(() => Math.random() - 0.5).slice(0, numQuestions);
    const questions: QuizQuestion[] = selectedCards.map((card: any) => {
      // Select 3 random distractors
      const distractors = cards
        .filter((c: any) => c._id.toString() !== card._id.toString())
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((c: any) => c.term);
      const options = [...distractors, card.term].sort(() => Math.random() - 0.5);
      return {
        id: card._id.toString(),
        definition: card.definition,
        options,
        correctAnswer: card.term,
      };
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { setId, answers }: { setId: string; answers: AnswerSubmission[] } = await request.json();
    if (!setId || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    await connectToDatabase();
    const flashcardSet = await FlashcardSet.findById(setId);
    if (!flashcardSet) {
      return NextResponse.json({ error: 'Flashcard set not found' }, { status: 404 });
    }

    let score = 0;
    const correctAnswers: string[] = [];
    answers.forEach(({ questionId, selectedTerm }) => {
      const card = flashcardSet.cards.find((c: any) => c._id.toString() === questionId);
      if (card && card.term === selectedTerm) {
        score++;
      }
      if (card) {
        correctAnswers.push(card.term);
      }
    });

    const result: QuizResult = {
      score,
      total: answers.length,
      correctAnswers,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing quiz answers:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
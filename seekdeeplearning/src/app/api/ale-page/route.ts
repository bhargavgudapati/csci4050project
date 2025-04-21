import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Flashcard from "@/models/flashcard";
import mongoose from "mongoose";

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
  const numQuestions = parseInt(searchParams.get('numQuestions') || '10');

  if (!setId) {
    return NextResponse.json({ error: 'setId is required' }, { status: 400 });
  }

  try {
    await connectMongoDB();

    // First, find the flashcard to get its groupTitle
    const flashcard = await Flashcard.findById(setId);
    if (!flashcard) {
      return NextResponse.json({ error: 'Flashcard set not found' }, { status: 404 });
    }

    // Then find all flashcards with the same groupTitle
    const flashcards = await Flashcard.find({ groupTitle: flashcard.groupTitle });
    
    if (!flashcards || flashcards.length === 0) {
      return NextResponse.json({ error: 'No flashcards found in set' }, { status: 404 });
    }

    // Transform flashcards into quiz questions
    const questions = flashcards.map(card => {
      // Get other cards to use as incorrect options
      const otherCards = flashcards.filter(c => c._id.toString() !== card._id.toString());
      const incorrectOptions = otherCards
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.term);

      return {
        id: card._id.toString(),
        definition: card.definition,
        options: [...incorrectOptions, card.term].sort(() => Math.random() - 0.5),
        correctAnswer: card.term
      };
    });

    // Shuffle and limit questions
    const shuffledQuestions = questions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numQuestions, questions.length));

    return NextResponse.json(shuffledQuestions);

  } catch (error) {
    console.error('Error:', error);
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ error: 'Invalid setId format' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
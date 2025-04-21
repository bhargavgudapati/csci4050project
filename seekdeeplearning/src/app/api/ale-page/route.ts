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
  const groupTitle = searchParams.get('setId'); // now contains the groupTitle

  if (!groupTitle) {
    return NextResponse.json({ error: 'setId is required' }, { status: 400 });
  }

  try {
    await connectMongoDB();
    
    // Find all flashcards with matching groupTitle
    const flashcards = await Flashcard.find({ groupTitle });
    
    if (!flashcards || flashcards.length === 0) {
      return NextResponse.json({ error: 'No flashcards found' }, { status: 404 });
    }

    // Transform into quiz questions
    const questions = flashcards.map(card => ({
      id: card._id.toString(),
      definition: card.definition,
      options: generateOptions(flashcards, card.term),
      correctAnswer: card.term
    }));

    // Shuffle questions
    return NextResponse.json(questions.sort(() => Math.random() - 0.5));
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateOptions(flashcards: any[], correctTerm: string) {
  const allTerms = flashcards.map(card => card.term);
  const options = [correctTerm];
  
  while (options.length < 4 && options.length < allTerms.length) {
    const randomTerm = allTerms[Math.floor(Math.random() * allTerms.length)];
    if (!options.includes(randomTerm)) {
      options.push(randomTerm);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
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
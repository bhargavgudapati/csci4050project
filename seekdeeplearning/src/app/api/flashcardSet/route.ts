import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Flashcard from '@/models/flashcard';
import FlashcardSet from '@/models/flashcardset';

export async function GET() {
    try {
        await connectMongoDB();
        
        // Group flashcards by groupTitle and get counts
        const groupedFlashcards = await Flashcard.aggregate([
            {
                $group: {
                    _id: '$groupTitle',
                    count: { $sum: 1 },
                    lastStudied: { $max: '$_id' }
                }
            },
            {
                $project: {
                    _id: 1,
                    groupTitle: '$_id',
                    count: 1,
                    lastStudied: 1
                }
            },
            { $sort: { lastStudied: -1 } }
        ]);

        return NextResponse.json({ items: groupedFlashcards });
    } catch (error) {
        console.error('Error fetching flashcard sets:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { groupTitle } = await request.json();
        if (!groupTitle) {
            return NextResponse.json({ message: "Group title is required" }, { status: 400 });
        }

        await connectMongoDB();
        
        // Get count of flashcards with this groupTitle
        const count = await Flashcard.countDocuments({ groupTitle });
        
        return NextResponse.json({ 
            _id: new Date().toISOString(),
            groupTitle,
            count,
            lastStudied: new Date()
        });
    } catch (error) {
        console.error('Error creating flashcard set:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { count, groupTitle, id } = await request.json();
    if (!count || !groupTitle || !id) {
        return NextResponse.json({ message: "need to provide all fields" }, { status: 400 });
    } else {
        connectMongoDB();
        await FlashcardSet.findByIdAndUpdate(id, {count, groupTitle, retrieve: "all"});
    }
}

import connectMongoDB from '@/libs/mongodb';
import Flashcard from '@/models/flashcard';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { id: string };
}

// GET: Get all flashcards by groupTitle
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;

    try {
        await connectMongoDB();
        const items = await Flashcard.find({ groupTitle: id });
        return NextResponse.json({ items }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch flashcards', error }, { status: 500 });
    }
}

// DELETE: Delete a flashcard by its _id
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'You need to provide a flashcard id to delete' }, { status: 400 });
        }

        await connectMongoDB();
        const deletedItem = await Flashcard.findByIdAndDelete(id);

        if (!deletedItem) {
            return NextResponse.json({ message: 'Flashcard not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Flashcard removed' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete flashcard', error }, { status: 500 });
    }
}

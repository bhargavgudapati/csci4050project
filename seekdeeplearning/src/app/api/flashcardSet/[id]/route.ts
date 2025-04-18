
import connectMongoDB from '@/libs/mongodb';
import FlashcardSet from '@/models/flashcardset';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: {
	id: string
    }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const item = await FlashcardSet.findOne({ groupID: id});
    return NextResponse.json({ item }, { status: 200 });
}

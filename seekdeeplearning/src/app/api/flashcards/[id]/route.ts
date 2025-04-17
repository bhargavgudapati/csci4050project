
import connectMongoDB from '@/libs/mongodb';
import Flashcard from '@/models/flashcard';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const id = await params;
    await connectMongoDB();
    const items = await Flashcard.find({ groupTitle: id });
    return NextResponse.json({ items }, { status: 200 });
}


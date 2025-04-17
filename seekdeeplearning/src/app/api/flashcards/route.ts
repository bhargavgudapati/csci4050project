
import connectMongoDB from '@/libs/mongodb';
import Flashcard from '@/models/flashcard';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { term, definition, groupTitle } = await request.json();
    if (!term || !definition || !groupTitle ) {
	return NextResponse.json({ message: "you must provide all the fields" }, { status: 400 });
    } else {
	await connectMongoDB();
	Flashcard.create({ term, definition, groupTitle });
	return NextResponse.json({ message: "added the flashcard" }, { status: 200 });
    }
}

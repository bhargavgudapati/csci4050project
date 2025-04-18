
import connectMongoDB from '@/libs/mongodb';
import FlashcardSet from '@/models/flashcardset';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { count, groupTitle } = await request.json();
    if (!count || !groupTitle) {
	return NextResponse.json({ message: "need to provide all fields"}, { status: 400 });
    } else {
	await connectMongoDB();
	FlashcardSet.create({ count, groupTitle, retrieve: "all" });
	return NextResponse.json({ message: "added the flashcardSet"}, { status: 200 });
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

export async function GET() {
    await connectMongoDB();
    const items = FlashcardSet.find({ retrieve: "all" });
    return NextResponse.json({ items });
}

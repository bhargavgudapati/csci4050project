
import connectMongoDB from '@/libs/mongodb';
import Flashcard from '@/models/flashcard';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const items = await Flashcard.find({ groupTitle: id });
    return NextResponse.json({ items }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    if (!id) {
	return NextResponse.json( { message: "you need to provide a flashcard id to delete" }, { status: 400 });
    } else {
	await connectMongoDB();
	const deletedItem = Flashcard.findByIdAndDelete(id);
	if (!deletedItem) {
	    return NextResponse.json( {message: "flashcard not found" }, { status: 400 });
	} else {
	    return NextResponse.json( { message: "flashcard removed" }, { status: 200 });
	}
    }
}

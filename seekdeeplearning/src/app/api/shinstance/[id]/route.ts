
import connectMongoDB from '@/libs/mongodb';
import SHInstance from '@/models/shinstance';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    try {
	if (!(await SHInstance.findOneAndDelete({ roomNumber: id }))) {
	    return NextResponse.json({ message: "room not found" }, { status: 400 });
	} else {
	    return NextResponse.json({ message: "deleted the room"}, { status: 200 });
	}
    } catch (error) {
	console.log(error);
	return NextResponse.json({ message: "there was an error" }, { status: 500 });
    }
}


export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    if (isNaN(Number(id))) {
	return NextResponse.json( { item: null }, { status: 201 });
    }
    await connectMongoDB();
    const item = await SHInstance.findOne({ roomNumber: id });
    return NextResponse.json( { item }, { status: 200 });
}


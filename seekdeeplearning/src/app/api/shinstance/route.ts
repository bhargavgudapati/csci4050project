
import connectMongoDB from '@/libs/mongodb';
import SHInstance from '@/models/shinstance';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
	const { groupTitle, roomNumber } = await request.json();
	if (!groupTitle || !roomNumber) {
	    return NextResponse.json({ message: "need to provide all fields" }, { status: 400 });
	} else {
	    await connectMongoDB();
	    await SHInstance.create({ groupTitle, roomNumber });
	    return NextResponse.json({ message: "seekhoot instance added to database" }, { status: 200 });
	}
    } catch (error) {
	console.log(error);
	return NextResponse.json({ message: "failed to add seekhoot instance"}, { status: 500 });
    }
}

import connectMongoDB from '@/libs/mongodb';
import Flashcard from '@/models/flashcard';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { term, definition, groupTitle, count } = await request.json();

        if (!term || !definition || !groupTitle || !count) {
            return NextResponse.json(
                { message: 'You must provide all the fields' },
                { status: 400 }
            );
        }

        await connectMongoDB();
        await Flashcard.create({ term, definition, groupTitle, count });

        return NextResponse.json({ message: 'Flashcard added successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to create flashcard', error },
            { status: 500 }
        );
    }
}
<<<<<<< HEAD


=======
>>>>>>> f26576c29fd6112bab45ca61c13433ca5bfa39f1


import mongoose, { Schema, Document, Model } from 'mongoose';

interface flashcardsetFields extends Document {
    count: number;
    groupID: string;
}

const flashcardsetSchema = new Schema<flashcardsetFields>({
    count: {
	type: Number,
	required: true
    },
    groupID: {
	type: String,
	required: true
    }
});

const FlashcardSet: Model<flashcardsetFields> = mongoose.models.FlashcardSet || mongoose.model<flashcardsetFields>("FlashcardSet", flashcardsetSchema);
export default FlashcardSet;





import mongoose, { Schema, Document, Model } from 'mongoose';

interface flashcardFields extends Document {
    term: string;
    definition: string;
    groupTitle: string;
}

const flashcardSchema = new Schema<flashcardFields>({
    term: {
	type: String,
	required: true
    },
    definition: {
	type: String,
	required: true
    },
    groupTitle: {
	type: String,
	required: true
    }
    
});

const Flashcard: Model<flashcardFields> = mongoose.models.Flashcard || mongoose.model<flashcardFields>("Flashcard", flashcardSchema);
export default Flashcard;

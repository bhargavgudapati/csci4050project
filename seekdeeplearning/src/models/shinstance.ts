
import mongoose, { Schema, Document, Model } from 'mongoose';

//this model is for storing seekhoot sessions, each seekhoot room will have one SHinstance
interface SHinstanceFields extends Document {
    groupTitle: string;
    roomNumber: number;
}

const SHinstanceSchema = new Schema<SHinstanceFields>({
    groupTitle: {
	type: String,
	required: true
    },
    roomNumber: {
	type: Number,
	required: true
    }
});

const SHInstance: Model<SHinstanceFields> = mongoose.models.SHInstance || mongoose.model<SHinstanceFields>("SHInstance", SHinstanceSchema);
export default SHInstance;

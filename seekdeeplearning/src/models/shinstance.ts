
import mongoose, { Schema, Document, Model } from 'mongoose';

interface SHinstanceFields extends Document {
    groupID: string;
    clientName: string;
}

const SHinstanceSchema = new Schema<SHinstanceFields>({
    groupID: {
	type: String,
	required: true
    },
    clientName: {
	type: String,
	required: true
    }
});

const SHInstance: Model<SHinstanceFields> = mongoose.models.SHInstance || mongoose.model<SHinstanceFields>("SHInstance", SHinstanceSchema);
export default SHInstance;

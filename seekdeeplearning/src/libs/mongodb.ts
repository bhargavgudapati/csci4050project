
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
	const uri = process.env.MONGOOSE_URI;
	if (!uri) {
	    throw new Error("you need to define a database uri in the .env file");
	}

	await mongoose.connect(uri);
	console.log("connected to the mongo database");
    } catch (error) {
	console.log("there was error connectig: " + error);
    }
}

export default connectMongoDB;

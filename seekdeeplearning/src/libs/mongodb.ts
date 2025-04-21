import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        const uri = process.env.MONGOOSE_URI;
        if (!uri) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }

        // Configure Mongoose
        mongoose.set('strictQuery', false);

        // Connection options
        const options = {
            bufferCommands: true,
            bufferTimeoutMS: 30000,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 30000,
        };

        // Connect with options
        await mongoose.connect(uri, options);
        
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        return connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

export default connectMongoDB;

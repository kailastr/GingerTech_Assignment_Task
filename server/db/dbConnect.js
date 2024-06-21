import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Connect DB Error : ", error.message);
    }
}

export default connectDB;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo db connection established :${connection.connection.host}`);
        
    } catch (error) {
        console.log('Error connecting to Mongo'+error);
    }
}
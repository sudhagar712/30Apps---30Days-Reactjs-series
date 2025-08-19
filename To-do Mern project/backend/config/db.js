import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("✅ MongoDB connected successfully ")
    } catch (error) {
        console.log("mongodb connection failed")
    }
}


export default connectDB;
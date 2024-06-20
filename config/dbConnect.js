import mongoose from "mongoose";

export const connectDatabase = () => {
    const URI = process.env.DB_URI || "mongodb+srv://tabare5935:IMbest01@cluster0.clueweu.mongodb.net/shoppay?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(process.env.DB_URI).then((con) => {
        console.log(`MongoDB Database connected with HOST: MONGODB_CLOUD`);
    });
};
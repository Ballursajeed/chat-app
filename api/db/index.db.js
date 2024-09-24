import mongoose from "mongoose";

const DB_NAME = "chat-app";

const connectDB = async() => {
    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(".....MONGO DB is Connected!!!, DB host:",connectionInstance.connection.host);

    } catch (error) {
        console.log("MONGO DB CONNECTION ERROR!!: ",error);
    }
}

export {
    connectDB
}
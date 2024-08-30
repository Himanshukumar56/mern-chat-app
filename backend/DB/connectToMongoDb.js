import mongoose  from "mongoose";

const connectToMongoDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to Databse");
    } catch (error) {
        console.log("Error connecting to Database : " , error.message);
    }
}

export default connectToMongoDb;
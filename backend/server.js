import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDb from "./DB/connectToMongoDb.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// app.get("/", (req,res) => {
//     res.send("Hello");
// });

app.use(express.json()); // to parse the incoming requests with json payloads (from req.body)

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`)
});
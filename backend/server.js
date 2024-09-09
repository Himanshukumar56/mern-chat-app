//Package Import
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//Routes conncetions
import messageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

//Database Connection
import connectToMongoDb from "./DB/connectToMongoDb.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// app.get("/", (req,res) => {
//     res.send("Hello");
// });

app.use(express.json()); // to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running on port ${PORT}`);
});

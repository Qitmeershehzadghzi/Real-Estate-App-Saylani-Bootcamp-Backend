import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
const app = express();
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}));
app.use(CookieParser());
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import testRoutes from "./routes/test.route.js"
import chatRoutes from "./routes/chat.route.js"
import messageRoutes from "./routes/message.route.js"


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/test",testRoutes);
app.use("/api/chats",chatRoutes);
app.use("/api/messages",messageRoutes);



















app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(8080,()=>{
    console.log(`server is running on port 8080`);
})
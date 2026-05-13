import dotenv from "dotenv";
dotenv.config();
import express from "express";
import CookieParser from "cookie-parser";
const app = express();
app.use(CookieParser());
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);



















app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(8080,()=>{
    console.log(`server is running on port 8080`);
})
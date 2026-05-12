import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use(express.json());



















app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(8080,()=>{
    console.log(`server is running on port 8080`);
})
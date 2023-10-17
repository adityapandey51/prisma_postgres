import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./Routes/userRoutes.js"
import postRoutes from "./Routes/postRoutes.js"
import commentRoutes from "./Routes/commentRoutes.js"

const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("everything is running well and good")
})

// routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/comment",commentRoutes)


const PORT =process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`connected to serever on port ${PORT}`)
})

import express from "express";
import { createCommentController, deleteController, getCommentController, getSingleCommentController, updateCommentController } from "../Controllers/commentController.js";


const router=express.Router();

router.post("/createcomment",createCommentController)
router.put("/updatecomment/:id",updateCommentController)
router.get("/getcomments",getCommentController)
router.get("/getcomment/:id",getSingleCommentController)
router.delete("/delete/:id",deleteController)



export default router
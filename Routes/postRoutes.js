import express from "express";
import { createPostController, deleteController, getPostController, getSinglePostController, searchPostController, updatePostController } from "../Controllers/postController.js";

const router=express.Router()


router.post("/createpost",createPostController)
router.put("/updatepost/:id",updatePostController)
router.get("/getposts",getPostController)
router.get("/getpost/:id",getSinglePostController)
router.delete("/delete/:id",deleteController)
router.get("/searchpost",searchPostController)


export default router
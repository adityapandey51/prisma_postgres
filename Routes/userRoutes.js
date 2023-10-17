import express from "express";
import { createUserController, deleteController, getSingleUserController, getUserController, updateUserController } from "../Controllers/userController.js";

const router=express.Router()


router.post("/createuser",createUserController)
router.put("/updateuser/:id",updateUserController)
router.get("/getusers",getUserController)
router.get("/getuser/:id",getSingleUserController)
router.delete("/delete/:id",deleteController)



export default router
import prisma from "../DB/db.config.js";

export const createUserController=async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        const emailExists=await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if (emailExists) return res.status(400).send("Email already exists")

        const newUser=await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:password
            }
        })

        res.status(200).json({
            success:true,
            newUser
        })
    } catch (error) {
      res.status(500).send(`error at the server end ${error}`)
    }
}

export const updateUserController=async(req,res)=>{
    try {
        // req.params returns a string
        const userId=req.params.id
        const {name,email,password}=req.body;

        await prisma.user.update({
            where:{
                id:Number(userId)
            },
            data:{
                name,
                email,
                password
            }
        })

        res.status(201).json({
            success:true,
            message:'User updated successfully'
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)
    }
}

export const getUserController=async(req,res)=>{
    try {
        const users=await prisma.user.findMany({
            include:{
                post:{
                    select:{
                        title:true,
                        commentCount:true
                    }
                }
            },
            // to get the count of posts and comments only
            // select:{
            //     _count:{
            //         select:{
            //             post:true
                            // comment:true
            //         }
            //     }
            // }
        })
        
        res.status(201).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)
    }
}

export const getSingleUserController=async (req,res)=>{
    try {
        const userId=req.params.id;
        const user=await prisma.user.findFirst({
            where:{
                id:Number(userId)
            }
        })
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)

    }
}

export const deleteController=async (req,res)=>{
    try {
        const userId=req.params.id;
        await prisma.user.delete({
            where:{
                id:Number(userId)
            }
        })
        res.status(200).json({
            success:true,
            message:"the User has been deleted"
        })
    } catch (error) {
        res.status(500).send(`error on the server ${error}`)
    }
}
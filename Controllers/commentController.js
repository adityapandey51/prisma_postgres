import prisma from "../DB/db.config.js";

export const createCommentController=async(req,res)=>{
    try {
        const {post_id,user_id,comment}=req.body;

        await prisma.post.update({
            where:{
                id:Number(post_id)
            },
            data:{
                commentCount:{
                    increment:1
                }
            }
        })

        const newComment=await prisma.comment.create({
            data:{
                post_id:Number(post_id),
                user_id:Number(user_id),
                comment
            }
        })

        res.status(200).json({
            success:true,
            newComment
        })
    } catch (error) {
      res.status(500).send(`error at the server end ${error}`)
    }
}

export const updateCommentController=async(req,res)=>{
    try {
        // req.params returns a string
        const commentId=req.params.id
        const {comment}=req.body;

        await prisma.comment.update({
            where:{
                id:Number(commentId)
            },
            data:{
               comment
            }
        })

        res.status(201).json({
            success:true,
            message:'Comment updated successfully'
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)
    }
}

export const getCommentController=async(req,res)=>{
    try {
        const comments=await prisma.comment.findMany({
            include:{
                post:{
                   include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                   }
                },
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })
        res.status(201).json({
            success:true,
            comments
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)
    }
}

export const getSingleCommentController=async (req,res)=>{
    try {
        const commentId=req.params.id;
        const comment=await prisma.comment.findFirst({
            where:{
                id:Number(commentId)
            }
        })
        res.status(200).json({
            success:true,
            comment
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)

    }
}

export const deleteController=async (req,res)=>{
    try {
        const commentId=req.params.id;

        await prisma.post.update({
            where:{
                id:Number(post_id)
            },
            data:{
                commentCount:{
                    decrement:1
                }
            }
        })
        await prisma.comment.delete({
            where:{
                id:Number(commentId)
            }
        })
        res.status(200).json({
            success:true,
            message:"the comment has been deleted"
        })
    } catch (error) {
        res.status(500).send(`error on the server ${error}`)
    }
}
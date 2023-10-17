import prisma from "../DB/db.config.js";

export const createPostController=async(req,res)=>{
    try {
        const {user_id,title,description}=req.body;

        const newPost=await prisma.post.create({
            data:{
                user_id:Number(user_id),
                title,
                description
            }
        })

        res.status(200).json({
            success:true,
            newPost
        })
    } catch (error) {
      res.status(500).send(`error at the server end ${error}`)
    }
}

export const updatePostController=async(req,res)=>{
    try {
        // req.params returns a string
        const postId=req.params.id
        const {title,description}=req.body;

        await prisma.post.update({
            where:{
                id:Number(postId)
            },
            data:{
               title,
               description
            }
        })

        res.status(201).json({
            success:true,
            message:'Post updated successfully'
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)
    }
}

export const getPostController=async(req,res)=>{
    try {
        const page=req.query.page || 1;
        const limit=req.query.limit || 10
        if (page<=0){
            page=1
        }
        if (limit<=0 || limit>100){
            limit=10
        }
        
        const posts=await prisma.post.findMany({
            skip:(page-1)*limit,
            take:limit,
            // to get selected fields of comment
            // include:{
            //     comment:{
            //         select:{
            //             comment:true
            //         }
            //     }
            // }

            // to include user who commented along with the comment
            include:{
                comment:{
                    include:{
                        user:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            },
            orderBy:{
                id:"desc"
            },
            where:{
                commentCount:{
                    gt:2
                },
                title:{
                    startsWith:"hello",
                    // endsWith,
                    // equals
                }
                // AND:[{},{}]
                // similarly OR
                // NOT:{}
            }


            // to just get count of cooments,
            // select:{
            //     _count:{
            //         select:{
            //             comment:true
            //         }
            //     }
            // }
        })
        const totalPost=await prisma.post.count()
        const totalPages=Math.ceil(totalPost/limit)
        res.status(201).json({
            success:true,
            posts,
            meta:{
                totalPages:totalPages,
                currentPage:page,
                limit:limit
            }
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)
    }
}

export const getSinglePostController=async (req,res)=>{
    try {
        const postId=req.params.id;
        const post=await prisma.post.findFirst({
            where:{
                id:Number(postId)
            }
        })
        res.status(200).json({
            success:true,
            post
        })
    } catch (error) {
        res.status(500).send(`error in the server ${error}`)

    }
}

export const deleteController=async (req,res)=>{
    try {
        const postId=req.params.id;
        await prisma.post.delete({
            where:{
                id:Number(postId)
            }
        })
        res.status(200).json({
            success:true,
            message:"the Post has been deleted"
        })
    } catch (error) {
        res.status(500).send(`error on the server ${error}`)
    }
}

export const searchPostController=async(req,res)=>{
    try {
        const keyword=req.query.keyword;
        const posts=await prisma.post.findMany({
            where:{
                description:{
                    search:keyword
                }
            }
        })

        res.status(200).json({
            success:true,
            posts
        })
        
    } catch (error) {
        res.status(500).send(`error on the server ${error}`)
    }
}
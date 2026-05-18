import  {prisma}  from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const getPosts = async(req,res)=>{
    const query =req.query;
    const filters = {};

    if (query.city) {
      filters.city = {
        equals: query.city,
        mode: "insensitive",
      };
    }

    if (query.type) filters.type = query.type;
    if (query.property) filters.property = query.property;
    if (query.bedroom) filters.bedroom = Number(query.bedroom);

    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);
    if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
      filters.price = {
        ...(!Number.isNaN(minPrice) && { gte: minPrice }),
        ...(!Number.isNaN(maxPrice) && { lte: maxPrice }),
      };
    }

     try {
    const posts = await prisma.post.findMany({
      where: filters,
    });
    // setTimeout(() => {
      return res.status(200).json(posts);
    // }, 2000);
  }  catch (error) {
        console.log(error);
                res.status(500).json({message:"Failed to get posts"})

    }
}
export const getPost = async(req,res)=>{
    const id =req.params.id;
    if (!/^[a-f\d]{24}$/i.test(id)) {
        return res.status(400).json({message:"Invalid post id"});
    }

    try {
             const post =await prisma.post.findUnique({
                where:{id},
                include:{
                    postDetail:true,
                    user:{
                        select:{
                            id:true,
                            name:true,
                            email:true,
                            avatar:true,
                        }
                    }
                }
             });
             let userId
             const token =req.cookies.token;
             if(token){
                jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
                    if(err){
                        return;
                    }
                    userId=user.id;
                })
             }
             const saved = userId
                ? await prisma.savePost.findUnique({
                    where:{
                        userId_postId:{
                            userId,
                            postId:id,
                        },
                    },
                })
                : null;
             res.status(200).json({post,isSaved:saved?true:false}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get post"})
    }
}
export const addPost = async(req,res)=>{
    const body=req.body;
    const userId=req.userId;
    try {
        const newPost =await prisma.post.create({
            data:{
                ...body.postData,
                userId,
                postDetail: {
                    create: body.postDetail,
                },
            }
        });
        return res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to add post"})
    }
}
export const updatePost = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to update post"})
    }
}
export const deletePost = async(req,res)=>{
    const id=req.params.id;
    const userId=req.userId;
    try {
        const post = await prisma.post.findUnique({
            where:{id}
        });
        if(post.userId !==userId){
            return res.status(403).json({message:"You are not authorized to delete this post"});
        }
        await prisma.post.delete({
            where:{id}
        });
        return res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        console.log(error);
                res.status(500).json({message:"Failed to delete post"})

    }
}

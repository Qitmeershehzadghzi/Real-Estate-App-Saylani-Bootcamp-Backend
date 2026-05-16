import  {prisma}  from "../lib/prisma.js";
export const getPosts = async(req,res)=>{
    try {
       const posts =await prisma.post.findMany();
       res.status(200).json(posts); 
    } catch (error) {
        console.log(error);
                res.status(500).json({message:"Failed to get posts"})

    }
}
export const getPost = async(req,res)=>{
    const id =req.params.id;
    try {
             const post =await prisma.post.findUnique({
                where:{id},
                include:{
                    user:{
                        select:{
                            name:true,
                            email:true,
                            avatar:true,
                        }
                    }
                }
             });
             res.status(200).json(post); 
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
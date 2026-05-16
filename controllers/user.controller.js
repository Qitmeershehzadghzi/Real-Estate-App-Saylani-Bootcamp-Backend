import { prisma } from "../lib/prisma.js";

export const getUsers = async (req,res)=>{

    try {

  const users= await prisma.user.findMany()
  return res.status(200).json(users);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Users"})
    }
    
}
export const getUser= async (req,res)=>{
const id=req.params.id;
    try {
 const user= await prisma.user.findUnique({
    where:{id}
 })
  return res.status(200).json(user);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Users"})
    }
    
}
export const updateUser = async (req,res)=>{
    const id =req.params.id
const tokenUserId =req.userId;
const {password,avatar, ...inputs}=req.body;
if (id != tokenUserId) {
    return res.status(403).json({message:"You are not authorized to update this profile"})
}
const updatePassword=null;
if(password){
    updatePassword=await bcrypt.hash(password,10);
}
// const body={...inputs,password:updatePassword}

try {
const updateuser=await prisma.user.update({
    where:{id},
    data:{
        ...inputs,
        password:updatePassword,
        ...(avatar && {avatar}),
    },
   
})
const {password:userPassword, ...rest}=updateuser;
return res.status(200).json(updateuser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Users"})
    }
    
}
export const deleteUser = async (req,res)=>{
const id =req.params.id
const tokenUserId =req.userId;
if (id != tokenUserId) {
    return res.status(403).json({message:"You are not authorized to update this profile"})
}

    try {
        await prisma.user.delete({
            where:{id}
        })
        return res.status(200).json({message:"User deleted successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Users"})
    }
    
}
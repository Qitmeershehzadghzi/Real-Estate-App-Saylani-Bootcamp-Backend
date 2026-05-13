import bcrypt from "bcrypt";
import {prisma} from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // password hashing by bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    // create new user in database
    const newUser = await prisma.user.create({
      data: {
          name,
        email,
        password: hashPassword,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
console.log(newUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "failed to register user",
    });
  }
};
export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    // check if the user exist or not
    const user= await prisma.user.findUnique({
      where: {
        name,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // compare password
   const checkPassword = await bcrypt.compare(password, user.password);
   if (!checkPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
   }
   const age=1000*60*60*24*7;



   const token =jwt.sign({
    id: user.id,
   }, process.env.JWT_SECRET, {
    expiresIn: age,
   });
   res.cookie("token", token,{
    httpOnly: true,
    maxAge: age,
   }).status(200).json({
    message: "User logged in successfully",
    user,
   });
  
  } catch (error) {
    log.error(error);
    res.status(500).json({
      message: "failed to login user",
    });
  }

}
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "User logged out successfully",
  });
}
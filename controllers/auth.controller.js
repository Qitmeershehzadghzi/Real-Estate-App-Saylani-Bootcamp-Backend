import bcrypt from "bcrypt";
import {prisma} from "../lib/prisma.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // password hashing by bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    // create new user in database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const login = (req, res) => {

}
export const logout = (req, res) => {
    
}
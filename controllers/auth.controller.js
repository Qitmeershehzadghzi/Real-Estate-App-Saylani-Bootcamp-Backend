import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ name }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to register user",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user.id ,
        isAdmin:false
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieAge = 1000 * 60 * 60 * 24 * 7;
const {password:pass,...userWithoutPassword} =user
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: cookieAge,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        userWithoutPassword,
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to login user",
    });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({
      message: "User logged out successfully",
    });
};
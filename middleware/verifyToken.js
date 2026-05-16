import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {

    if (error) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    req.userId = payload.id;

    next();
  });
};
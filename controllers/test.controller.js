import jwt from "jsonwebtoken";
export const showBeLoggedIn = async (req, res) => { 
    console.log(req.userId);

  return res.status(200).json({
    message: "You are logged in",
  });

};
export const showBeAdmin = async (req, res) => {
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

    // admin check
    if (payload.isAdmin) {
      return res.status(200).json({
        message: "You are Admin",
      });
    } else {
      return res.status(403).json({
        message: "You are not Admin",
      });
    }

  });
};
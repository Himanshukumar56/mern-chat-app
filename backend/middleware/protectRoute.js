import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorised - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECURITY);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorised - No Token Provided" });
    }
    const user = await User.findbyId(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middlware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;

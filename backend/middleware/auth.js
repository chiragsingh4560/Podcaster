import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware function that validates the user by validating user token
const authMiddleWare = async (req, res, next) => {
  // Get the token from req by calling its name that you created
  const token = req.cookies.podcasterUserToken;
  try {
    if (token) {
      // Decode the jwt token by using the secret. Now the decode will have user's id and email since that's how it was created in sign-in
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Set user in req and pass onto next middleware functionality
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: "No token provided" });
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid token" });
  }
};

export default authMiddleWare;

const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
// middleware function that validates the user by validating user token
const authMiddleWare = async (req, res, next) => {
  // get the token from req by calling its name that you created
  const token = req.cookies.podcasterUserToken;
  try {
    if (token) {
      // decode the jwt token by using the secret , now the decode will have user's id and email since thats how it was created in sign-in
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }
      //set user in req and pass onto next # middleware functionality
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleWare;

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authMiddleWare = require("../middleware/auth");
router.use(cookieParser());
// signup - router i.e (create a new account)
// mtlb ye base route+ /sign-up p routed hai
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must have atleast 5 characters" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must have atleast 5 characters" });
    }
    // check if user already exists or not with current email:-
    const existingEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ username: username });
    if (existingEmail || existingUsername) {
      return res
        .status(400)
        .json({ message: "User name or email already exists" });
    }
    // now if we reach this point then hash the password and pusth it into database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // now create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(200).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// sign-in route:- i.e (access an existing account)
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if this user exists or not
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exists" });
    }
    // check if password matches
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // if password and email mathces then generate a JWT token
    // jwt requires (data,secret,expiresIn)
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // create cookie of name podcasterUserToken
    res.cookie("podcasterUserToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 days expiry  in milliseconds
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    // send response:-
    return res.status(200).json({
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      message: "Sign in Successful",
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// log-out route i.e (to logout of the account)
router.post("/logout", async (req, res) => {
  console.log("Clearing cookie...");
  res.clearCookie("podcasterUserToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    path: "/",  // Ensure the path matches the one used when setting the cookie
  });
  console.log("Cookie cleared.");
  res.status(200).json({ message: "Logged out" });
});

// check if cookie is present or not
router.get("/check-cookie", async (req, res) => {
  const token = req.cookies.podcasterUserToken;
  if (token) {
    return res.status(200).json({ message: true });
  }
  res.status(200).json({ message: false });
});

// route to fetch user details:-
// use authMiddleware to get the user by a middleware in req
router.get("/user-details",authMiddleWare,async (req,res)=>{
  try {
    const {email}=req.user;
    // exclude password so "-password"
    const existingUser=await User.findOne({email:email}).select("-password");
    return res.status(200).json({
      user:existingUser,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"error occured"})
  }
});



 
module.exports = router;

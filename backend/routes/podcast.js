import express from "express";
import upload from "../middleware/multer.js"; // Multer for Cloudinary upload
import authMiddleWare from "../middleware/auth.js";
import Category from "../models/category.js";
import User from "../models/user.js";
import Podcast from "../models/podcast.js";

const router = express.Router();

// Add Podcast
router.post("/add-podcast", authMiddleWare, async (req, res) => {
  try {
       console.log("Received Data:", req.body); // Log received data
    // Destructure from req.body
    const { title, description, category, frontImage, audioFile } = req.body; // Now receiving URLs directly

    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get user from auth middleware
    const user = req.user;

    // Find category by name
    const cat = await Category.findOne({ categoryName: category });
    if (!cat) {
      return res.status(400).json({ message: "No such category found" });
    }

    // Extract IDs
    const catId = cat._id;
    const userId = user._id;

    // Create new podcast with Cloudinary URLs
    const newPodcast = new Podcast({
      title,
      description,
      category: catId,
      frontImage, // Already a Cloudinary URL from frontend
      audioFile, // Already a Cloudinary URL from frontend
      user: userId,
    });

    // Save podcast in DB
    await newPodcast.save();

    // Push new podcast ID to Category & User schemas
    await Category.findByIdAndUpdate(catId, {
      $push: { podcasts: newPodcast._id },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { podcasts: newPodcast._id },
    });

    // Send success response
    res
      .status(201)
      .json({ message: "Podcast added successfully", data: newPodcast });
  } catch (error) {
    console.error("Error adding podcast:", error);
    res.status(500).json({ message: "Cannot create Podcast" });
  }
});

// Get All Podcasts
router.get("/get-podcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.find({})
      .populate("category")
      .sort({ createdAt: -1 });

    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get Podcasts by User
router.get("/get-user-podcasts", authMiddleWare, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;

    const data = await User.findById(userId)
      .populate({
        path: "podcasts",
        populate: { path: "category" },
      })
      .select("-password");

    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get Podcast by ID
router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcast });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Podcasts by Category
router.get("/category/:cat", async (req, res) => {
  try {
    const { cat } = req.params;
    const categories = await Category.find({ categoryName: cat }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });

    let podcasts = [];
    categories.forEach((category) => {
      podcasts = [...podcasts, ...category.podcasts];
    });

    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
